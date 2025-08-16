"use client"

import React from 'react'
import Link from 'next/link'
import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="container py-12">
      <div className="mb-8">
        <Button asChild variant="ghost" size="sm">
          <Link href="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: August 15, 2025</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Introduction Card */}
          <div className="col-span-full rounded-xl bg-gradient-to-br from-black to-gray-800 p-1 transition-all duration-300 hover:shadow-lg hover:from-gray-900 hover:to-black group">
            <div className="h-full rounded-lg bg-card p-6 transition-transform duration-300 group-hover:scale-[0.99]">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Introduction</h2>
              <p className="text-foreground/90">
                This Privacy Policy explains how Tony Destin ("I", "me", or "my") collects, uses, and discloses information 
                about you when you visit my personal portfolio website.
              </p>
            </div>
          </div>

          {/* Information Collection Card */}
          <div className="rounded-xl bg-gradient-to-br from-black to-gray-800 p-1 transition-all duration-300 hover:shadow-lg hover:from-gray-900 hover:to-black group">
            <div className="h-full rounded-lg bg-card p-6 transition-transform duration-300 group-hover:scale-[0.99]">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Information I Collect</h2>
              <p className="mb-3 text-foreground/90">
                When you visit my website, I may collect certain information automatically from your device. This information may include:
              </p>
              <ul className="space-y-2">
                {[
                  'IP address',
                  'Browser type and version',
                  'Device type',
                  'Operating system',
                  'Page views and navigation patterns',
                  'Referring website or source'
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary mr-3" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Information Usage Card */}
          <div className="rounded-xl bg-gradient-to-br from-black to-gray-800 p-1 transition-all duration-300 hover:shadow-lg hover:from-gray-900 hover:to-black group">
            <div className="h-full rounded-lg bg-card p-6 transition-transform duration-300 group-hover:scale-[0.99]">
              <h2 className="text-2xl font-semibold mb-4 text-primary">How I Use Your Information</h2>
              <p className="mb-3 text-foreground/90">
                I use the information I collect to:
              </p>
              <ul className="space-y-2">
                {[
                  'Understand how visitors interact with my website',
                  'Improve my website and user experience',
                  'Analyze usage patterns and trends',
                  'Protect against unauthorized access and security threats'
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary mr-3" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cookies Card */}
          <div className="rounded-xl bg-gradient-to-br from-black to-gray-800 p-1 transition-all duration-300 hover:shadow-lg hover:from-gray-900 hover:to-black group">
            <div className="h-full rounded-lg bg-card p-6 transition-transform duration-300 group-hover:scale-[0.99]">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Cookies and Similar Technologies</h2>
              <p className="text-foreground/90">
                My website may use cookies and similar tracking technologies to collect information about your browsing activities. 
                You can control cookies through your browser settings.
              </p>
            </div>
          </div>

          {/* Third-Party Services Card */}
          <div className="rounded-xl bg-gradient-to-br from-black to-gray-800 p-1 transition-all duration-300 hover:shadow-lg hover:from-gray-900 hover:to-black group">
            <div className="h-full rounded-lg bg-card p-6 transition-transform duration-300 group-hover:scale-[0.99]">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Third-Party Services</h2>
              <p className="mb-3 text-foreground/90">
                I may use third-party services that collect information about you:
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  'Google Analytics - for website traffic analysis',
                  'Netlify - for website hosting'
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary mr-3" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground/90">
                These services have their own privacy policies that govern how they use your information.
              </p>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="col-span-full rounded-xl bg-gradient-to-br from-black to-gray-800 p-1 transition-all duration-300 hover:shadow-lg hover:from-gray-900 hover:to-black group">
            <div className="h-full rounded-lg bg-card p-6 transition-transform duration-300 group-hover:scale-[0.99]">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Contact Information</h2>
              <p className="text-foreground/90">
                If you choose to contact me through the website, I will collect your name, email address, and any information 
                you provide in your message. This information is only used to respond to your inquiries.
              </p>
            </div>
          </div>

          {/* Rights Card */}
          <div className="rounded-xl bg-gradient-to-br from-black to-gray-800 p-1 transition-all duration-300 hover:shadow-lg hover:from-gray-900 hover:to-black group">
            <div className="h-full rounded-lg bg-card p-6 transition-transform duration-300 group-hover:scale-[0.99]">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Your Rights</h2>
              <p className="mb-3 text-foreground/90">
                You have the right to:
              </p>
              <ul className="space-y-2">
                {[
                  'Access the personal information I hold about you',
                  'Request that I correct inaccurate information',
                  'Request that I delete your information',
                  'Object to my processing of your information'
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary mr-3" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Changes Card */}
          <div className="rounded-xl bg-gradient-to-br from-black to-gray-800 p-1 transition-all duration-300 hover:shadow-lg hover:from-gray-900 hover:to-black group">
            <div className="h-full rounded-lg bg-card p-6 transition-transform duration-300 group-hover:scale-[0.99]">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Changes to This Privacy Policy</h2>
              <p className="text-foreground/90">
                I may update this Privacy Policy from time to time. The updated version will be indicated by an updated 
                "Last updated" date at the top of this Privacy Policy.
              </p>
            </div>
          </div>

          {/* Contact Me Card */}
          <div className="col-span-full rounded-xl bg-gradient-to-br from-black to-gray-800 p-1 transition-all duration-300 hover:shadow-lg hover:from-gray-900 hover:to-black group">
            <div className="h-full rounded-lg bg-card p-6 transition-transform duration-300 group-hover:scale-[0.99]">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Contact Me</h2>
              <p className="text-foreground/90">
                If you have questions about this Privacy Policy, please contact me at: <a href="mailto:tonydestinprmo@gmail.com" className="text-primary hover:underline">tonydestinprmo@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
