"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download, Star, Calendar } from 'lucide-react'

import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Timeline } from '@/components/timeline'
import { Testimonials } from '@/components/testimonials'
import { useContent } from '@/lib/content'

// Metadata is now in a separate metadata.ts file

export default function AboutPage() {
  const { content, isLoading, error } = useContent()
  
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
  
  const { about } = content

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Section className="pt-24 pb-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {about.title}
            </h1>
            <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: about.summary }} />
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg">
                <Link href="/contact">
                  Get in touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/Tony_Destin_Resume.pdf" download>
                  Download CV
                  <Download className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border shadow-2xl">
            <Image
              src={about.headshot.src}
              alt={about.headshot.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          </div>
        </div>
      </Section>
      
      {/* Skills Section — removed progress bars to reduce redundancy with Home */}
      <Section className="bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Technologies & Tools
            </h2>
          </div>
          <div className="space-y-6">
            {about.skills.map((skillGroup) => (
              <div key={skillGroup.category} className="space-y-3">
                <h4 className="text-lg font-medium text-primary">{skillGroup.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Fun Facts removed per simplification */}
      
      {/* Experience Section */}
      <Section className="bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Professional Timeline
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              My journey in content creation and digital marketing
            </p>
          </div>
          
          {/* Use experience items for timeline */}
          {about.experience && about.experience.length > 0 && (
            <Timeline items={about.experience.map(exp => ({
              title: exp.role || '',
              company: exp.company || '',
              location: exp.location || '',
              startDate: exp.duration?.split('-')?.[0]?.trim() || '',
              endDate: exp.duration?.includes('-') ? exp.duration?.split('-')?.[1]?.trim() : 'Present',
              description: Array.isArray(exp.responsibilities) ? exp.responsibilities : 
                          (exp.responsibilities ? [exp.responsibilities] : []),
              current: !exp.duration?.includes('-') || exp.duration?.split('-')?.[1]?.trim() === 'Present'
            }))} />
          )}
        </div>
      </Section>


      
      {/* Education Section */}
      <Section className="bg-muted/30">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Education
          </h2>
          
          <div className="mt-12 space-y-8">
            {about.education.map((edu, index) => (
              <div key={index} className="relative pl-8">
                <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-primary" />
                
                <h3 className="text-xl font-semibold">
                  {edu.degree}
                </h3>
                
                <div className="mt-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <p className="text-muted-foreground">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {edu.duration}
                  </p>
                </div>
                
                {edu.description && (
                  <p className="mt-2 text-muted-foreground">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>
      
      {/* FAQ Section */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Answers to common questions about my work and process
            </p>
          </div>
          
          <div className="mt-12">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {about.faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <h3 className="font-medium">{faq.question}</h3>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 text-muted-foreground">
                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Section>
      
      {/* CTA Section */}
      <Section className="bg-muted/30">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Let's work together
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a project in mind? I'd love to hear about it.
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
