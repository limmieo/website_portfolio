"use client"

import React, { useState, useEffect } from 'react'
import { Mail } from 'lucide-react'

import { Section } from '@/components/section'
import { CopyButton } from '@/components/copy-button'
import { ContactForm } from '@/components/contact-form'
import { useContent } from '@/lib/content'
import { Button } from '@/components/ui/button'

// Metadata is now in a separate metadata.ts file

export default function ContactPage() {
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

  const email = content.site.email

  return (
    <div className="flex flex-col min-h-screen">
      <Section className="py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            Have a question or want to work together? Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="mt-16 max-w-2xl mx-auto">
          <ContactForm />
          
          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Or reach out directly</h2>
            <div className="mt-4 flex items-center">
              <Mail className="h-6 w-6 text-gray-400" />
              <span className="ml-3 text-gray-600 dark:text-gray-300">
                {email}
              </span>
              <CopyButton text={email} className="ml-2" />
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
