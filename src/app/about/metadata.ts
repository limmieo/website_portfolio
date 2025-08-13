import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Tony Destin',
  description: 'Learn more about my background, skills, and experience.',
  openGraph: {
    title: 'About - Tony Destin',
    description: 'Learn more about my background, skills, and experience.',
    images: [
      {
        url: '/images/og/about.jpg',
        width: 1200,
        height: 630,
        alt: 'About Tony Destin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About - Tony Destin',
    description: 'Learn more about my background, skills, and experience.',
    images: ['/images/og/about.jpg'],
  },
}
