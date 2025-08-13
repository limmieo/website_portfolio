"use client"

import React, { useState, useEffect } from 'react'
import { Section } from '@/components/section'
import { ProjectCard } from '@/components/project-card'
import { ProjectFilter } from '@/components/project-filter'
import { Button } from '@/components/ui/button'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { useContent } from '@/lib/content'
import ProjectSkeleton from '@/components/project-skeleton'
import { type Content, type CaseStudy } from '@/types/content'
import Link from 'next/link'

export default function WorkPage() {
  const { content, isLoading, error } = useContent()
  const [filteredProjects, setFilteredProjects] = useState<CaseStudy[]>([])
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])

  // Update filtered projects and extract categories when content loads
  useEffect(() => {
    if (content?.caseStudies) {
      setFilteredProjects(content.caseStudies)
      
      // Extract unique categories from projects
      const allCategories = new Set<string>()
      
      content.caseStudies.forEach(project => {
        if (project.category) {
          allCategories.add(project.category)
        }
        
        // Add tags as categories
        project.tags?.forEach(tag => allCategories.add(tag))
        
        // Add stack items as categories
        project.stack?.forEach(tech => allCategories.add(tech))
      })
      
      setCategories(Array.from(allCategories))
    }
  }, [content])

  // Handle filter changes
  const handleFilterChange = (category: string | null) => {
    setActiveFilter(category)
    if (!content?.caseStudies) return
    
    if (category === null) {
      setFilteredProjects(content.caseStudies)
    } else {
      const filtered = content.caseStudies.filter(project => 
        project.category === category || 
        project.tags?.includes(category) ||
        project.stack?.includes(category)
      )
      setFilteredProjects(filtered)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Section className="pt-24 pb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              My Work
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore my portfolio of design and development projects.
            </p>
          </div>
        </Section>
        
        <Section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Case Studies
            </h2>
            <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="h-40 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            ))}
          </div>
          <ProjectSkeleton />
        </Section>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          <p>Error loading content. Please try again later.</p>
          <p className="text-sm text-muted-foreground mt-2">{error}</p>
        </div>
      </div>
    )
  }

  if (!content || !filteredProjects.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>No projects found.</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Section className="pt-24 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            My Work
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            A collection of projects I've worked on, from concept to completion.
          </p>
        </div>
      </Section>
      
      <Section className="flex-1">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-wrap justify-center mb-8">
            <ProjectFilter
              filters={[
                { label: 'All', value: null },
                ...categories.map(category => ({ label: category, value: category }))
              ]}
              activeFilter={activeFilter}
              onChange={handleFilterChange}
              className="w-full"
            />
          </div>
          
          <div className="w-full">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-muted-foreground">No projects match the selected filter.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4" 
                    onClick={() => handleFilterChange(null)}
                  >
                    Clear filter
                  </Button>
                </div>
              ) : (
                filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    title={project.title}
                    description={project.summary}
                    cover={project.cover}
                    tags={project.stack ?? []}
                    year={project.year}
                    href={`/work/${project.slug}`}
                  />
                ))
              )}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Want to see more of my work?
              </p>
              <Button asChild variant="outline">
                <a href="/contact">
                  Get in touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
