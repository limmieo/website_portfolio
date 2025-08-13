"use client"

import React, { useState, useEffect } from 'react'
import { Section } from '@/components/section'
import { ProjectCard } from '@/components/project-card'
import { ProjectFilter } from '@/components/project-filter'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useContent } from '@/lib/content'
import ProjectSkeleton from '@/components/project-skeleton'
import { type Content, type System } from '@/types/content'

// Metadata is now in a separate metadata.ts file

export default function SystemsPage() {
  const { content, isLoading, error } = useContent()
  const [filteredSystems, setFilteredSystems] = useState<System[]>([])
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  
  // Update filtered systems and extract categories when content loads
  useEffect(() => {
    if (content?.systems) {
      setFilteredSystems(content.systems)
      
      // Extract unique categories from systems
      const allCategories = new Set<string>()
      
      content.systems.forEach(system => {
        // Add stack items as categories
        system.stack?.forEach(tech => allCategories.add(tech))
      })
      
      setCategories(Array.from(allCategories))
    }
  }, [content])
  
  // Handle filter changes
  const handleFilterChange = (category: string | null) => {
    setActiveFilter(category)
    if (!content?.systems) return
    
    if (category === null) {
      setFilteredSystems(content.systems)
    } else {
      const filtered = content.systems.filter(system => 
        system.stack?.includes(category)
      )
      setFilteredSystems(filtered)
    }
  }
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Section className="pt-24 pb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Systems & Tools
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A collection of internal tools and systems I've built to improve workflows.
            </p>
          </div>
        </Section>
        
        <Section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Systems
            </h2>
            <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
          
          <ProjectSkeleton />
        </Section>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading systems</p>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Section className="pt-24 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Systems & Tools
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            A collection of internal tools and systems I've built to improve workflows.
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
              {filteredSystems.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-muted-foreground">No systems match the selected filter.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4" 
                    onClick={() => handleFilterChange(null)}
                  >
                    Clear filter
                  </Button>
                </div>
              ) : (
                filteredSystems.map((system) => (
                  <ProjectCard
                    key={system.slug}
                    title={system.title}
                    description={system.subtitle}
                    cover={system.cover}
                    tags={system.stack || []}
                    href={`/systems/${system.slug}`}
                  />
                ))
              )}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Interested in learning more about my systems?
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
