import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

// Define the schema for validation
const contentSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  siteDescription: z.string().min(1, 'Site description is required'),
  siteUrl: z.string().url('Valid site URL is required'),
  author: z.object({
    name: z.string().min(1, 'Author name is required'),
    role: z.string().min(1, 'Author role is required'),
    bio: z.string().min(1, 'Author bio is required'),
    avatar: z.string().min(1, 'Author avatar path is required'),
  }),
  socials: z.array(
    z.object({
      name: z.string().min(1, 'Social network name is required'),
      url: z.string().url('Valid social URL is required'),
      icon: z.string().min(1, 'Icon name is required'),
    })
  ).min(1, 'At least one social link is required'),
  navigation: z.array(
    z.object({
      name: z.string().min(1, 'Navigation item name is required'),
      href: z.string().min(1, 'Navigation item href is required'),
    })
  ).min(1, 'At least one navigation item is required'),
  hero: z.object({
    title: z.string().min(1, 'Hero title is required'),
    subtitle: z.string().min(1, 'Hero subtitle is required'),
    ctaPrimary: z.string().min(1, 'Primary CTA text is required'),
    ctaSecondary: z.string().min(1, 'Secondary CTA text is required'),
    image: z.string().min(1, 'Hero image path is required'),
  }),
  about: z.object({
    title: z.string().min(1, 'About title is required'),
    description: z.string().min(1, 'About description is required'),
    skills: z.array(
      z.object({
        category: z.string().min(1, 'Skill category is required'),
        items: z.array(z.string()).min(1, 'At least one skill is required'),
      })
    ).min(1, 'At least one skill category is required'),
    experience: z.array(
      z.object({
        role: z.string().min(1, 'Role is required'),
        company: z.string().min(1, 'Company is required'),
        period: z.string().min(1, 'Period is required'),
        description: z.string().min(1, 'Description is required'),
      })
    ).min(1, 'At least one experience is required'),
  }),
  work: z.object({
    title: z.string().min(1, 'Work section title is required'),
    subtitle: z.string().min(1, 'Work section subtitle is required'),
    caseStudies: z.array(
      z.object({
        id: z.string().min(1, 'Case study ID is required'),
        title: z.string().min(1, 'Case study title is required'),
        description: z.string().min(1, 'Case study description is required'),
        year: z.number().min(2000, 'Valid year is required'),
        client: z.string().min(1, 'Client name is required'),
        role: z.string().min(1, 'Role is required'),
        stack: z.array(z.string()).min(1, 'At least one tech stack item is required'),
        tags: z.array(z.string()).min(1, 'At least one tag is required'),
        featured: z.boolean(),
        coverImage: z.string().min(1, 'Cover image path is required'),
        content: z.string().min(1, 'Content path is required'),
      })
    ).min(1, 'At least one case study is required'),
  }),
  contact: z.object({
    title: z.string().min(1, 'Contact section title is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().min(1, 'Phone number is required'),
    location: z.string().min(1, 'Location is required'),
    workingHours: z.string().min(1, 'Working hours are required'),
  }),
})

async function validateContent() {
  try {
    console.log('🔍 Validating content structure...')
    
    // Read the content file
    const contentPath = path.join(process.cwd(), 'public', 'content', 'content.json')
    const contentData = await fs.readFile(contentPath, 'utf-8')
    const content = JSON.parse(contentData)
    
    // Validate against schema
    const result = contentSchema.safeParse(content)
    
    if (!result.success) {
      console.error('❌ Content validation failed:')
      result.error.errors.forEach((err) => {
        console.error(`- ${err.path.join('.')}: ${err.message}`)
      })
      process.exit(1)
    }
    
    // Check if all referenced files exist
    const fileChecks = []
    
    // Check avatar
    if (content.author.avatar) {
      fileChecks.push(
        fs.access(path.join(process.cwd(), 'public', content.author.avatar))
          .then(() => ({}))
          .catch(() => `Author avatar not found: ${content.author.avatar}`)
      )
    }
    
    // Check hero image
    if (content.hero.image) {
      fileChecks.push(
        fs.access(path.join(process.cwd(), 'public', content.hero.image))
          .then(() => ({}))
          .catch(() => `Hero image not found: ${content.hero.image}`)
      )
    }
    
    // Check case study images and content
    if (content.work.caseStudies) {
      content.work.caseStudies.forEach((project: any) => {
        if (project.coverImage) {
          fileChecks.push(
            fs.access(path.join(process.cwd(), 'public', project.coverImage))
              .then(() => ({}))
              .catch(() => `Cover image not found for ${project.title}: ${project.coverImage}`)
          )
        }
        
        if (project.content) {
          const contentPath = path.join(process.cwd(), 'src', 'content', 'case-studies', project.content)
          fileChecks.push(
            fs.access(contentPath)
              .then(() => ({}))
              .catch(() => `Content file not found for ${project.title}: ${contentPath}`)
          )
        }
      })
    }
    
    // Wait for all file checks to complete
    const fileCheckResults = await Promise.allSettled(fileChecks)
    const fileErrors = fileCheckResults
      .filter((result): result is PromiseFulfilledResult<string> => 
        result.status === 'fulfilled' && typeof result.value === 'string'
      )
      .map(result => result.value)
    
    if (fileErrors.length > 0) {
      console.error('❌ File validation errors:')
      fileErrors.forEach(error => console.error(`- ${error}`))
      process.exit(1)
    }
    
    console.log('✅ Content validation passed successfully!')
    
  } catch (error) {
    console.error('❌ Error during content validation:', error)
    process.exit(1)
  }
}

// Run the validation
validateContent()
