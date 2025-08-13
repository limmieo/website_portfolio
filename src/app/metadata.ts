import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tony Destin - Product Engineer & Designer',
  description: 'Building digital products that people love to use.',
  openGraph: {
    title: 'Tony Destin - Product Engineer & Designer',
    description: 'Building digital products that people love to use.',
    images: [
      {
        url: '/images/og/home.jpg',
        width: 1200,
        height: 630,
        alt: 'Tony Destin - Product Engineer & Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tony Destin - Product Engineer & Designer',
    description: 'Building digital products that people love to use.',
    images: ['/images/og/home.jpg'],
  },
}
