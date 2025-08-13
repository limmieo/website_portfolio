"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'

import { Section } from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Gallery } from '@/components/gallery'
import { useContent } from '@/lib/content'
import { CaseStudy } from '@/types/content'

interface PageProps {
  params: {
    id: string
  }
}

// Metadata is now handled in a separate metadata.ts file

export default function WorkPage({ params }: PageProps) {
  const router = useRouter()
  const { content, isLoading, error } = useContent()
  const [project, setProject] = useState<CaseStudy | null>(null)
  
  useEffect(() => {
    if (content?.caseStudies) {
      const foundProject = content.caseStudies.find(p => p.slug === params.id)
      if (foundProject) {
        setProject(foundProject)
      } else if (!isLoading) {
        // If no project matches the slug, redirect to the Work listing
        router.replace('/work')
      }
    }
  }, [content, params.id, isLoading])
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading project...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading project</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }
  
  if (!project) {
    return null // Redirecting to /work when project not found
  }
  
  // Find the index of the current project for navigation
  const projectIndex = content?.caseStudies?.findIndex(p => p.slug === params.id) ?? -1
  const prevProject = projectIndex > 0 ? content?.caseStudies?.[projectIndex - 1] : null
  const nextProject = projectIndex < (content?.caseStudies?.length ?? 0) - 1 ? content?.caseStudies?.[projectIndex + 1] : null
  
  // Prepare media items for the gallery
  const mediaItems = (project.media || [])
    .filter((item: any) => item.type === 'image' || item.type === 'video')
    .map((item: any) => ({
      type: item.type as 'image' | 'video',
      src: item.src,
      alt: item.alt || '',
      caption: item.caption,
    }))

  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Back button */}
      <Section className="pt-6 pb-0">
        <Button asChild variant="ghost" className="-ml-2">
          <Link href="/work">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Work
          </Link>
        </Button>
      </Section>
      
      {/* Hero section */}
      <Section className="pt-0">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            {(project.stack ?? []).map(tech => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
            <span className="text-sm text-muted-foreground">
              {project.year}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          
          <p className="text-xl text-muted-foreground">
            {project.summary}
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
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
      </Section>
      
      {/* Cover image */}
      {project.cover && (
        <Section className="px-0 py-0 max-w-[100vw]">
          <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </Section>
      )}
      
      {/* Project details */}
      <Section>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Overview</h2>
          <p>{project.summary}</p>

          {Array.isArray(project.whyItWorks) && project.whyItWorks.length > 0 && (
            <>
              <h2>Why it works</h2>
              <ul>
                {project.whyItWorks.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {Array.isArray(project.metrics) && project.metrics.length > 0 && (
            <>
              <h2>Metrics</h2>
              <ul>
                {project.metrics.map((m: any) => (
                  <li key={m.label}><strong>{m.label}:</strong> {m.value}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </Section>
      
      {/* Gallery */}
      {mediaItems.length > 0 && (
        <Section className="bg-muted/30">
          <h2 className="mb-8 text-3xl font-bold tracking-tight">Gallery</h2>
          <Gallery items={mediaItems} />
        </Section>
      )}
      
      {/* Project navigation */}
      <Section>
        <div className="flex flex-col space-y-4 border-t pt-8 md:flex-row md:justify-between md:space-y-0">
          {prevProject ? (
            <Button asChild variant="ghost" className="w-full justify-start md:w-auto">
              <Link href={`/work/${prevProject.slug}`} className="group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {prevProject.title}
              </Link>
            </Button>
          ) : (
            <div />
          )}
          
          {nextProject && (
            <Button asChild variant="ghost" className="w-full justify-end md:w-auto">
              <Link href={`/work/${nextProject.slug}`} className="group">
                {nextProject.title}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          )}
        </div>
      </Section>
      
      {/* CTA */}
      <Section className="bg-muted/30">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Have a project in mind?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            I'm always open to discussing product design work or partnership opportunities.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/contact">
              Get in touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </div>
  )
}

// Helper component for the arrow icon
const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)
