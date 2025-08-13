// This file is deprecated - use metadata.server.ts for server components
// This file exists only for backward compatibility

import { Metadata } from 'next'
// Removed server-only import

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
  // This function is deprecated - use metadata.server.ts for server components
  console.warn('metadata.ts is deprecated - use metadata.server.ts for server components')
  
  const siteName = 'Tony Destin'
  const siteDescription = 'Building digital products that people love to use.'
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
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      // Using X profile URL if present; Next metadata accepts string[] or string
      // Omit creator username since socials.x is a URL in content.json
    },
    ...(publishedTime && {
      publishedTime,
    }),
    ...(modifiedTime && {
      modifiedTime,
    }),
    ...(author && {
      authors: [{ name: author }],
    }),
    ...(section && {
      section,
    }),
    ...(tags.length > 0 && {
      keywords: tags,
    }),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#ffffff' },
      { media: '(prefers-color-scheme: dark)', color: '#000000' },
    ],
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}
