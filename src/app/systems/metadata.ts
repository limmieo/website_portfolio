import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Systems & Tools - Tony Destin',
  description: 'Internal tools and systems I\'ve built to improve workflows.',
  openGraph: {
    title: 'Systems & Tools - Tony Destin',
    description: 'Internal tools and systems I\'ve built to improve workflows.',
    images: [
      {
        url: '/images/og/systems.jpg',
        width: 1200,
        height: 630,
        alt: 'Systems & Tools by Tony Destin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Systems & Tools - Tony Destin',
    description: 'Internal tools and systems I\'ve built to improve workflows.',
    images: ['/images/og/systems.jpg'],
  },
}
