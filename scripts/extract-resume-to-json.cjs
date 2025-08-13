'use strict'

const fs = require('fs')
const fsp = require('fs/promises')
const path = require('path')
const pdf = require('pdf-parse')

const ROOT = process.cwd()
const CONTENT_JSON = path.join(ROOT, 'public', 'content', 'content.json')
const BACKUP_JSON = path.join(ROOT, 'public', 'content', `content.backup.${Date.now()}.json`)

const CANDIDATE_PDFS = {
  resume: [
    path.join(ROOT, 'src', 'app', '_TONY DESTIN Resume.pdf'),
    path.join(ROOT, 'public', 'images', '_TONY DESTIN Resume.pdf'),
    path.join(ROOT, 'public', 'Tony_Destin_Resume.pdf'),
  ],
  portfolio: [
    path.join(ROOT, 'src', 'app', 'Tony Destin Portfolio.pdf'),
  ],
}

async function readFirstExisting(paths) {
  for (const p of paths) {
    try {
      await fsp.access(p)
      return p
    } catch {}
  }
  return null
}

async function readPdfText(filePath) {
  const dataBuffer = await fsp.readFile(filePath)
  const data = await pdf(dataBuffer)
  // Normalize whitespace
  return data.text
    .replace(/\r/g, '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

function extractEmail(lines) {
  for (const l of lines) {
    const m = l.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
    if (m) return m[0]
  }
  return null
}

function extractPhone(lines) {
  // Capture common US/international formats; return just the matched number
  const phoneRegex = /(\+?\d{1,3}[\s.-]?)?(\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4})/
  for (const l of lines) {
    const m = l.match(phoneRegex)
    if (m) return m[0].replace(/\s+/g, ' ').trim()
  }
  return null
}

function isSectionHeader(line) {
  // Heuristic: ALL CAPS lines or lines ending with ':' are section headers
  if (!line) return false
  const noPunct = line.replace(/[^A-Za-z: ]/g, '')
  const isAllCaps = noPunct.trim() && noPunct === noPunct.toUpperCase()
  return isAllCaps || /:\s*$/.test(line)
}

function splitSections(lines) {
  const sections = []
  let current = { title: 'INTRO', lines: [] }
  for (const l of lines) {
    if (isSectionHeader(l) && l.length < 60) {
      if (current.lines.length) sections.push(current)
      current = { title: l.replace(/:$/, '').trim(), lines: [] }
    } else {
      current.lines.push(l)
    }
  }
  if (current.lines.length) sections.push(current)
  return sections
}

function pickSection(sections, names) {
  const idx = sections.findIndex((s) => names.some((n) => s.title.toLowerCase().includes(n)))
  return idx >= 0 ? sections[idx] : null
}

function parseSkills(section) {
  if (!section) return []
  const text = section.lines.join(' ')
  // Split by common delimiters
  const items = text.split(/[,•\u2022\n]+/).map((s) => s.trim()).filter(Boolean)
  if (!items.length) return []
  // Try to group if keywords exist
  const groups = [
    { category: 'Strategy', keywords: ['strategy', 'planning', 'growth'] },
    { category: 'Content', keywords: ['script', 'video', 'ugc', 'short'] },
    { category: 'Engineering', keywords: ['python', 'api', 'fastapi', 'ffmpeg', 'next', 'typescript', 'automation'] },
    { category: 'Tools', keywords: ['notion', 'figma', 'adobe', 'premiere', 'after effects', 'canva'] },
  ]

  const buckets = groups.map((g) => ({ category: g.category, items: [] }))
  const other = { category: 'Other', items: [] }

  for (const it of items) {
    const lower = it.toLowerCase()
    const grpIdx = groups.findIndex((g) => g.keywords.some((k) => lower.includes(k)))
    if (grpIdx >= 0) buckets[grpIdx].items.push(it)
    else other.items.push(it)
  }

  const result = [...buckets.filter((b) => b.items.length > 0)]
  if (other.items.length) result.push(other)
  return result
}

function parseExperience(section) {
  if (!section) return []
  const blocks = section.lines.join('\n').split(/\n{2,}/)
  const exps = []
  for (const b of blocks) {
    const lines = b.split('\n').map((l) => l.trim()).filter(Boolean)
    if (lines.length < 2) continue
    const header = lines[0]
    // Try to parse "Role — Company"
    const m = header.match(/^(.*?)[\u2014\-–]{1,2}\s*(.*)$/)
    let role = m ? m[1].trim() : header
    let company = m ? m[2].trim() : ''

    // Heuristic: if first part looks like a company, swap
    const looksLikeCompany = (s) => /\b(LLC|Inc\.?|Incorporated|Corporation|Company|Co\.?|Ltd\.?)\b/i.test(s)
    if (looksLikeCompany(role) || (!company && role.split(' ').length <= 4)) {
      const tmp = role
      role = company || role
      company = tmp
    }

    // If a plausible role is on the next line, prefer it
    const roleKeywords = /(Director|Manager|Owner|Engineer|Strategist|Consultant|Lead|Developer|Designer|Producer|Founder|CEO|CTO|Specialist)/i
    const roleLine = lines.slice(1, 4).find((l) => roleKeywords.test(l) && !/\b\d{4}\b|Present/i.test(l))
    if (roleLine) {
      role = roleLine.trim()
    }

    // Dates: extract only the date range substring
    const monthRange = /(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t)?(?:ember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{4}\s*[\-–—]\s*(Present|\d{4})/i
    const yearRange = /\b\d{4}\b\s*[\-–—]\s*(Present|\d{4})/i
    let duration = ''
    for (const ln of lines) {
      const m1 = ln.match(monthRange)
      if (m1) { duration = m1[0]; break }
      const m2 = ln.match(yearRange)
      if (m2) { duration = m2[0]; break }
    }

    const locationLine = lines.find((l) => /(Remote|Philadelphia|New York|San Francisco|USA|United States|PA|NY|CA)/i.test(l)) || ''

    // Responsibilities (bulleted or sentences), remove header/duration/location
    const resp = lines
      .slice(1)
      .filter((l) => l !== header && (!duration || !l.includes(duration)) && l !== locationLine)

    if (!role && !company && resp.length === 0) continue

    exps.push({
      role,
      company,
      duration,
      location: locationLine || '',
      // Strip common bullet markers: Unicode minus (\u2212), ASCII hyphen (-), bullet (•, \u2022) and black circle (●, \u25CF)
      responsibilities: resp.map((r) => r.replace(/^[\u2212\-•\u2022\u25CF]\s*/, '')).slice(0, 12),
    })
  }
  return exps
}

function parseEducation(section) {
  if (!section) return []
  const blocks = section.lines.join('\n').split(/\n{2,}/)
  const edus = []
  for (const b of blocks) {
    const lines = b.split('\n').map((l) => l.trim()).filter(Boolean)
    if (!lines.length) continue
    const head = lines[0]
    const instMatch = head.match(/^(.*?)[\u2014\-–]{1,2}\s*(.*)$/)
    const degree = instMatch ? instMatch[1].trim() : head
    const institution = instMatch ? instMatch[2].trim() : ''
    const duration = lines.find((l) => /(\d{4}).*(\d{4}|Present)/.test(l)) || ''
    const description = lines.slice(1).filter((l) => l !== duration).join(' ')
    edus.push({ degree, institution, duration, description })
  }
  return edus
}

function toHtmlParagraphs(lines) {
  // Use first 3-6 lines as summary paragraphs
  const text = lines.slice(0, 8).join(' ')
  const sentences = text.split(/(?<=[.!?])\s+/)
  const chunks = []
  let cur = ''
  for (const s of sentences) {
    if ((cur + ' ' + s).length > 220) {
      chunks.push(cur.trim())
      cur = s
    } else {
      cur = (cur ? cur + ' ' : '') + s
    }
  }
  if (cur) chunks.push(cur.trim())
  return chunks.map((p) => `<p>${p}</p>`).join('')
}

async function main() {
  console.log('🔎 Looking for PDFs...')
  const resumePath = await readFirstExisting(CANDIDATE_PDFS.resume)
  const portfolioPath = await readFirstExisting(CANDIDATE_PDFS.portfolio)

  if (!resumePath && !portfolioPath) {
    console.error('❌ No resume or portfolio PDFs found in expected locations.')
    console.error('Checked:', CANDIDATE_PDFS)
    process.exit(1)
  }

  console.log('• Resume:', resumePath || 'not found')
  console.log('• Portfolio:', portfolioPath || 'not found')

  let resumeLines = []
  let portfolioLines = []

  if (resumePath) {
    console.log('📄 Reading resume...')
    resumeLines = await readPdfText(resumePath)
  }
  if (portfolioPath) {
    console.log('📄 Reading portfolio...')
    portfolioLines = await readPdfText(portfolioPath)
  }

  const sections = splitSections(resumeLines)

  const email = extractEmail(resumeLines)
  const phone = extractPhone(resumeLines)
  const locationGuess = resumeLines.find((l) => /(Philadelphia|PA|Pennsylvania|Remote|USA|United States)/i.test(l)) || ''

  const skillsSec = pickSection(sections, ['skill', 'tools'])
  const expSec = pickSection(sections, ['experience', 'work'])
  const eduSec = pickSection(sections, ['education', 'study'])
  const summarySec = pickSection(sections, ['summary', 'objective', 'profile']) ||
    sections.find((s) => s.title === 'INTRO') || { lines: resumeLines }

  const about = {
    title: 'About Tony Destin',
    summary: toHtmlParagraphs(summarySec.lines),
    headshot: { src: '/images/about/headshot.jpg', alt: 'Tony headshot' },
    skills: parseSkills(skillsSec),
    experience: parseExperience(expSec),
    education: parseEducation(eduSec),
    faqs: [
      { question: 'What do you focus on?', answer: '<p>I ship MVPs fast, then iterate. I pick the simplest path that scales.</p>' },
      { question: 'How do you work?', answer: '<p>Small scopes, tight loops, visible results. I document as I build.</p>' },
    ],
  }

  // Basic portfolio parsing -> create minimal case studies if any titles detected
  let caseStudies = []
  if (portfolioLines.length) {
    const titles = portfolioLines.filter((l) => l.length < 70 && /^[A-Z][A-Za-z0-9 .,&-]+$/.test(l))
    caseStudies = Array.from(new Set(titles)).slice(0, 8).map((t, i) => ({
      slug: t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: t,
      year: new Date().getFullYear().toString(),
      cover: { src: `/images/work/${i + 1}.png`, alt: `${t} cover` },
      summary: 'Project from portfolio PDF (details TBD).',
      role: ['Product', 'Engineering', 'Design'],
      stack: ['Next.js', 'TypeScript', 'Tailwind'],
      metrics: [],
      whyItWorks: [],
      responsibilities: [],
      media: [],
      links: {},
      mdx: `/content/case-studies/${t.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.mdx`,
    }))
  }

  // Load existing content
  const raw = await fsp.readFile(CONTENT_JSON, 'utf-8')
  const existing = JSON.parse(raw)

  // Backup
  await fsp.writeFile(BACKUP_JSON, JSON.stringify(existing, null, 2))

  // Merge
  const merged = {
    ...existing,
    site: {
      ...(existing.site || {}),
      email: email || existing.site?.email,
      location: (existing.site?.location || locationGuess || '').toString(),
      resume: '/Tony_Destin_Resume.pdf',
      phone: phone || existing.site?.phone,
    },
    about: {
      ...(existing.about || {}),
      ...about,
    },
    ...(caseStudies.length
      ? { caseStudies: mergeCaseStudies(existing.caseStudies || [], caseStudies) }
      : {}),
  }

  await fsp.writeFile(CONTENT_JSON, JSON.stringify(merged, null, 2))

  console.log('✅ Updated content.json')
  console.log('   Backup saved at:', BACKUP_JSON)
}

function mergeCaseStudies(existing, incoming) {
  const bySlug = new Map(existing.map((c) => [c.slug, c]))
  for (const cs of incoming) {
    if (!bySlug.has(cs.slug)) bySlug.set(cs.slug, cs)
  }
  return Array.from(bySlug.values())
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
