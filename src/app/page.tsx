"use client"

import React, { useState, useEffect } from 'react'
import { Hero } from '@/components/hero'
import { Section } from '@/components/section'
import { Stat } from '@/components/stat'
import { ProjectCard } from '@/components/project-card'
import { LogoStrip } from '@/components/logo-strip'
import { Button } from '@/components/ui/button'
import { ArrowRight, Briefcase, Code, MessageSquare, Sparkles } from 'lucide-react'
import { useContent } from '@/lib/content'
import Link from 'next/link'
import ClientsSection from '@/components/clients-section-client'
import { type Content } from '@/types/content'

// Metadata is now in a separate metadata.ts file

export default function Home() {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Hero 
        {...content.hero} 
        ctaPrimary={{
          text: content.hero.ctas?.[0]?.label || 'View Work',
          href: content.hero.ctas?.[0]?.href || '/work'
        }}
        ctaSecondary={{
          text: content.hero.ctas?.[1]?.label || 'Contact',
          href: content.hero.ctas?.[1]?.href || '/contact'
        }}
      />
      
      {/* Stats Section */}
      <Section className="bg-muted/50">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {content.highlights.map((highlight, index) => (
            <Stat
              key={index}
              value={highlight.value}
              label={highlight.label}
              description={highlight.desc}
            />
          ))}
        </div>
      </Section>

      {/* Featured Work */}
      <Section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Featured Work
          </h2>
          <Button asChild variant="ghost" className="group">
            <Link href="/work" className="flex items-center">
              View all projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.caseStudies
            .slice(0, 3)
            .map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.summary}
                cover={project.cover}
                tags={project.stack ?? []}
                year={project.year}
                href={`/work/${project.slug}`}
              />
            ))}
        </div>
      </Section>

      {/* Systems */}
      <Section className="bg-muted/50">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Systems & Tools
            </h2>
            <p className="mt-2 text-muted-foreground">
              Internal tools and systems I've built to improve workflows
            </p>
          </div>
          <Button asChild variant="ghost" className="group">
            <Link href="/systems" className="flex items-center">
              View all
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.systems
            .slice(0, 3)
            .map((system) => (
              <ProjectCard
                key={system.slug}
                title={system.title}
                description={system.subtitle}
                cover={system.cover}
                tags={system.stack ?? []}
                href={`/systems#${system.slug}`}
              />
            ))}
        </div>
      </Section>

      {/* Clients Section */}
      <ClientsSection />

      {/* CTA Section */}
      <Section className="text-center">
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
            Have a project in mind? I'd love to hear about it. Let's create something amazing together.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Get in touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">Learn more about me</Link>
            </Button>
          </div>
        </div>
      </Section>


    </div>
  )
}
