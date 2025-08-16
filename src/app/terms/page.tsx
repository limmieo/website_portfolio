"use client"

import React from 'react'
import Link from 'next/link'
import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
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

      <Section>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h1>Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: August 15, 2025</p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to Tony Destin's portfolio website. By accessing and using this website, 
            you accept and agree to be bound by the terms and provisions of this agreement.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            All content on this website, including but not limited to text, graphics, logos, 
            images, code snippets, and design elements, is the property of Tony Destin and 
            is protected by copyright and other intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, or create derivative works from any 
            content on this website without explicit written permission.
          </p>

          <h2>3. Project Showcases</h2>
          <p>
            The website features various projects I've worked on. These showcases are provided 
            for informational and portfolio purposes only. While I strive for accuracy in all 
            project descriptions, I make no guarantees regarding their completeness or applicability 
            to your specific needs.
          </p>

          <h2>4. Code Samples</h2>
          <p>
            Any code samples shared on this website are provided "as is" without warranty of any kind. 
            You may use these code samples for reference, but I am not responsible for any issues that 
            may arise from their implementation in your projects.
          </p>

          <h2>5. External Links</h2>
          <p>
            This website may contain links to third-party websites. These links are provided for your 
            convenience only. I have no control over the content of those websites and accept no 
            responsibility for them or for any loss or damage that may arise from your use of them.
          </p>

          <h2>6. No Warranties</h2>
          <p>
            This website is provided on an "as is" basis. I make no representations or warranties of any kind, 
            express or implied, as to the operation of the site or the information, content, materials, 
            or products included on this site.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, I shall not be liable for any direct, indirect, 
            incidental, special, consequential, or punitive damages arising out of or in connection with your 
            use of this website.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction 
            in which I operate, without regard to its conflict of law provisions.
          </p>

          <h2>9. Changes to Terms</h2>
          <p>
            I reserve the right to modify these Terms at any time. Changes will be effective immediately 
            upon posting to the website. Your continued use of the website after any changes indicates 
            your acceptance of the modified Terms.
          </p>

          <h2>10. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact me at: <a href="mailto:tonydestinprmo@gmail.com">tonydestinprmo@gmail.com</a>
          </p>
        </div>
      </Section>
    </div>
  )
}
