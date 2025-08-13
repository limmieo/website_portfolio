import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - Tony Destin',
  description: 'Get in touch with me for project inquiries or just to say hello!',
  openGraph: {
    title: 'Contact - Tony Destin',
    description: 'Get in touch with me for project inquiries or just to say hello!',
    images: [
      {
        url: '/images/og/contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Tony Destin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact - Tony Destin',
    description: 'Get in touch with me for project inquiries or just to say hello!',
    images: ['/images/og/contact.jpg'],
  },
}
