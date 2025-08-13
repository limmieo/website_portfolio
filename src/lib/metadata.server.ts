import { Metadata } from 'next'
import { getContent } from '@/lib/content.server'

// This file is explicitly for server-side metadata generation
// Do not import this in client components

type MetadataParams = {
  title?: string
  description?: string
  path?: string
  image?: {
    url: string
    width: number
    height: number
    alt: string
  }
  type?: 'website' | 'article' | 'profile' | 'book'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export async function generateMetadata({
  title: customTitle,
  description: customDescription,
  path = '/',
  image: customImage,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Tony Destin',
  section,
  tags = [],
}: MetadataParams = {}): Promise<Metadata> {
  const content = await getContent()
  const siteName = 'Tony Destin'
  const siteDescription = content.hero?.tagline || 'Building digital products that people love to use.'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const title = customTitle
    ? `${customTitle} | ${siteName}`
    : siteName

  const description = customDescription || siteDescription
  const url = `${siteUrl}${path}`
  
  const defaultImage = {
    url: `${siteUrl}/images/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: siteName,
  }
  
  const image = customImage || defaultImage

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [image],
      locale: 'en_US',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
      creator: '@tonydestin',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Helper function to get case study by slug
export async function getCaseStudyBySlug(slug: string) {
  const content = await getContent()
  return content.caseStudies.find(p => p.slug === slug)
}

// Helper function to get all case study slugs for static paths
export async function getAllCaseStudySlugs() {
  const content = await getContent()
  return content.caseStudies.map(project => ({
    id: project.slug,
  }))
}
