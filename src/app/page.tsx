"use client"

import React, { useState } from 'react'
import { Hero } from '@/components/hero'
import { Section } from '@/components/section'
import { Stat } from '@/components/stat'
import { ProjectCard } from '@/components/project-card'
import { Button } from '@/components/ui/button'
import { MessageSquare, ChevronDown, ChevronUp, ExternalLink, Github } from 'lucide-react'
import { useContent } from '@/lib/content'
import ClientsSection from '@/components/clients-section'
import { Timeline } from '@/components/timeline'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Image from 'next/image'

// Metadata is now in a separate metadata.ts file

export default function Home() {
  const { content, isLoading, error } = useContent()
  const [showAllWork, setShowAllWork] = useState(false)
  const [showFullTimeline, setShowFullTimeline] = useState(false)
  const [showAllSystems, setShowAllSystems] = useState(false)
  const [showAllSkills, setShowAllSkills] = useState(false)
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading content...</p>
        </div>
      </div>
    )
  }

  if (error || !content) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading content</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  // Build a robust combined timeline, preferring curated work items; education appears at the bottom
  const expList = Array.isArray(content.about?.experience) ? content.about.experience : []
  const eduList = Array.isArray(content.about?.education) ? content.about.education : []
  const timelineList = Array.isArray((content as any).about?.timeline) ? (content as any).about.timeline : []

  // Helpers to parse dates like "October 2020", "Jan 2024", or ranges like "Jan 2020 - May 2021".
  const monthMap: Record<string, number> = {
    jan: 0, january: 0,
    feb: 1, february: 1,
    mar: 2, march: 2,
    apr: 3, april: 3,
    may: 4,
    jun: 5, june: 5,
    jul: 6, july: 6,
    aug: 7, august: 7,
    sep: 8, sept: 8, september: 8,
    oct: 9, october: 9,
    nov: 10, november: 10,
    dec: 11, december: 11,
  }

  function parseSingleDate(input?: string): number | null {
    if (!input) return null
    const s = input.trim()
    if (!s) return null
    if (/present/i.test(s)) return Date.now() + 1000 // treat Present as newest
    // Try formats: "Month YYYY" or "Mon YYYY"
    const parts = s.split(/\s+/)
    if (parts.length >= 2) {
      const m = monthMap[parts[0].toLowerCase()]
      const y = parseInt(parts[1], 10)
      if (!Number.isNaN(m) && !Number.isNaN(y)) {
        return new Date(y, m, 1).getTime()
      }
    }
    // Fallback to Date.parse
    const t = Date.parse(s)
    return Number.isNaN(t) ? null : t
  }

  function parseRange(range?: string): { start?: string; end?: string } {
    if (!range) return {}
    // Split on common dashes
    const [startRaw, endRaw] = range.split(/\s*[–—-]\s*/)
    return { start: startRaw?.trim(), end: endRaw?.trim() }
  }

  const eduItems = eduList.map((edu: any) => {
    const degRaw = (edu.degree ?? '').trim()
    let title = degRaw
    let company = 'Education'
    // Try to split "Institution, Degree"
    const parts = degRaw.split(',')
    if (parts.length >= 2) {
      const inst = (parts[0] || '').replace(/^•|^●/, '').trim()
      const deg = parts.slice(1).join(',').trim()
      if (inst && deg) {
        title = inst
        company = deg
      }
    } else if (edu.institution && degRaw) {
      title = String(edu.institution).trim()
      company = degRaw
    }
    const companyUrl = /kutztown/i.test(degRaw) || /kutztown/i.test(title)
      ? 'https://www.kutztown.edu/'
      : undefined
    return {
      title,
      company,
      location: '',
      startDate: edu.duration ?? '',
      endDate: '',
      description: edu.description ? [edu.description] : [],
      current: false,
      companyUrl,
    }
  })

  const expItems = expList.map((exp: any) => {
    const { start, end } = parseRange(exp.duration)
    return {
      title: exp.role,
      company: exp.company,
      location: exp.location ?? '',
      startDate: start ?? (exp.duration ?? ''),
      endDate: end ?? '',
      description: Array.isArray(exp.responsibilities) ? exp.responsibilities : [],
      current: /present/i.test(end ?? '') || false,
    }
  })

  const curatedItems = timelineList.map((t: any) => ({
    title: t.title,
    company: t.company,
    location: t.location ?? '',
    startDate: t.startDate ?? '',
    endDate: t.endDate ?? '',
    description: Array.isArray(t.description) ? t.description : [],
    current: Boolean(t.current),
  }))

  // Sort newest to oldest using endDate if available, else startDate; then put education at the bottom
  const workItems = (timelineList.length > 0 ? curatedItems : expItems)
  const score = (item: any) => {
    const hasOpenEnd = !item.endDate || /present/i.test(item.endDate || '')
    if (item.current || hasOpenEnd) return Number.MAX_SAFE_INTEGER
    const d = parseSingleDate(item.endDate) ?? parseSingleDate(item.startDate) ?? -Infinity
    return d
  }
  const byNewest = (a: any, b: any) => score(b) - score(a)
  workItems.sort(byNewest)
  eduItems.sort(byNewest)

  // Prepare Education + Certification items in timeline format
  const certList = Array.isArray((content as any).about?.certifications)
    ? (content as any).about.certifications
    : []
  const certUrl = (name: string): string | undefined => {
    const n = name.toLowerCase()
    if (/meta/.test(n)) return 'https://www.facebook.com/business/learn/certification'
    if (/google\s*analytics/.test(n)) return 'https://skillshop.exceedlms.com/student/catalog/list?category_ids=53-google-analytics'
    if (/hootsuite/.test(n)) return 'https://education.hootsuite.com/certification'
    return undefined
  }

  const certItems = certList.map((c: any) => ({
    title: c.name,
    company: 'Certification',
    location: '',
    startDate: c.date ?? '',
    endDate: '',
    description: [],
    current: false,
    url: certUrl(String(c.name || '')),
  }))
  certItems.sort(byNewest)
  const eduCertItems = [...eduItems, ...certItems]

  // Compact Skills list (flattened, deduped)
  const flatSkills = Array.isArray(content.about?.skills)
    ? (content.about!.skills as any[]).flatMap((g: any) => Array.isArray(g.items) ? g.items : [])
    : []
  const uniqueSkills = Array.from(new Set(flatSkills)) as string[]
  // Only show work in the timeline to avoid duplication; education will be shown in its own section
  let timelineItems = [...workItems]

  // Dedupe items by a simple composite key
  {
    const seen = new Set<string>()
    timelineItems = timelineItems.filter((item) => {
      const key = `${item.title}|${item.company}|${item.startDate}|${item.endDate ?? ''}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }

  // Fallback: if no experience/education provided, derive a timeline from projects and systems
  if (timelineItems.length === 0) {
    const projectItems = Array.isArray(content.caseStudies)
      ? content.caseStudies.map((p: any) => ({
          title: p.title,
          company: 'Project',
          location: '',
          startDate: p.year ?? '',
          endDate: '',
          description: [p.summary, ...(Array.isArray(p.whyItWorks) ? p.whyItWorks : [])].filter(Boolean),
          current: false,
        }))
      : []
    const systemItems = Array.isArray(content.systems)
      ? content.systems.map((s: any) => ({
          title: s.title,
          company: 'System',
          location: '',
          startDate: '',
          endDate: '',
          description: Array.isArray(s.outcomes) ? s.outcomes : [],
          current: false,
        }))
      : []
    timelineItems = [...projectItems, ...systemItems]
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero 
        {...content.hero} 
        ctaPrimary={undefined}
        ctaSecondary={{
          text: content.hero.ctas?.[1]?.label || 'Contact',
          href: '/#contact'
        }}
      />
      
      {/* Clients Section - Moved before highlights */}
      <ClientsSection />
      
      {/* Stats Section */}
      <Section className="bg-muted/50" id="highlights">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {(content?.highlights ?? []).map((highlight, index) => (
            <Stat
              key={index}
              value={highlight.value}
              label={highlight.label}
              description={highlight.desc}
            />
          ))}
        </div>
      </Section>
      
      {/* Featured Work (hidden for now) */}
      {false && (
      <Section id="work">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Featured Work
          </h2>
        </div>

        <div className={`grid gap-6 items-stretch ${showAllSystems || (content?.systems ?? []).length > 2 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
          {(content?.caseStudies ?? [])
            .slice(0, showAllWork ? undefined : 3)
            .map((project) => (
              <Dialog key={project.slug}>
                <DialogTrigger asChild>
                  <div className="cursor-pointer">
                    <ProjectCard
                      title={project.title}
                      description={project.summary}
                      cover={project.cover}
                      tags={project.stack ?? []}
                      year={project.year}
                      href={`#`}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    {project.cover && (
                      <div className="relative h-64 w-full overflow-hidden rounded-lg">
                        <Image
                          src={project.cover.src}
                          alt={project.cover.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 800px"
                        />
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {(project.stack ?? []).map(tech => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        {project.year}
                      </span>
                    </div>
                    
                    <p className="text-lg text-muted-foreground">
                      {project.summary}
                    </p>
                    
                    {Array.isArray(project.whyItWorks) && project.whyItWorks.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Why it works</h3>
                        <ul className="list-disc list-inside space-y-1">
                          {project.whyItWorks.map((item: string) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {Array.isArray(project.metrics) && project.metrics.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Metrics</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {project.metrics.map((m: any) => (
                            <div key={m.label} className="text-center p-3 bg-muted/50 rounded-lg">
                              <div className="text-2xl font-bold text-primary">{m.value}</div>
                              <div className="text-sm text-muted-foreground">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-4 pt-4">
                      {project.links?.demo && (
                        <Button asChild>
                          <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                            View Live
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {project.links?.repo && (
                        <Button asChild variant="outline">
                          <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            View Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
        </div>
        
        {(content?.caseStudies ?? []).length > 3 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => setShowAllWork(!showAllWork)}
              className="group"
            >
              {showAllWork ? 'Show Less' : `Show All ${(content?.caseStudies ?? []).length} Projects`}
              {showAllWork ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </Section>
      )}
      
      
      
      

      {/* Systems */}
      <Section id="systems">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Systems & Tools
            </h2>
            <p className="mt-2 text-muted-foreground">
              Internal tools and systems I've built to improve workflows
            </p>
          </div>
        </div>

        <div className={`grid gap-6 items-stretch ${showAllSystems || (content?.systems ?? []).length > 2 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
          {(content?.systems ?? [])
            .slice(0, showAllSystems ? undefined : 2)
            .map((system) => (
              <div key={system.slug} className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-1 flex-col space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{system.title}</h3>
                      <p className="text-sm text-muted-foreground">{system.subtitle}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {(system.stack ?? []).map(tech => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  {system.outcomes && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Outcomes:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {system.outcomes.map((outcome: string) => (
                          <li key={outcome} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {system.repo && (
                    <div className="mt-auto pt-4">
                      <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                        <a href={system.repo} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-3 w-3" />
                          View Code
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
        
        {(content?.systems ?? []).length > 2 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => setShowAllSystems(!showAllSystems)}
              className="group"
            >
              {showAllSystems ? 'Show Less' : `Show All ${(content?.systems ?? []).length} Systems`}
              {showAllSystems ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </Section>

      {/* Clients Section moved to top */}

      {/* Timeline (at end; education at bottom) */}
      <Section className="bg-muted/50" id="timeline">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Experience
            </h2>
          </div>
          <Timeline items={(showFullTimeline ? timelineItems : timelineItems.slice(0, 6))} />
          {timelineItems.length > 6 && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={() => setShowFullTimeline(!showFullTimeline)}
                className="group"
              >
                {showFullTimeline ? 'Show Less' : `Show Full Timeline (${timelineItems.length} items)`}
                {showFullTimeline ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </div>
      </Section>

      {/* Education & Certifications (under timeline) */}
      {(eduCertItems.length > 0) ? (
        <Section id="education-certifications">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Education and Certifications
              </h2>
            </div>
            <Timeline items={eduCertItems} dense />
            {uniqueSkills.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {uniqueSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm rounded-full">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Section>
      ) : null}

      {/* CTA Section */}
      <Section className="text-center" id="contact">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Let's work together
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            {content.contact.note}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <a href={`mailto:${content.contact.email}`}>Get in touch</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={`mailto:${content.contact.email}?subject=Project Inquiry`}>Email directly</a>
            </Button>
          </div>
        </div>
      </Section>


    </div>
  )
}
