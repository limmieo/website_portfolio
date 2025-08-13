import { Metadata } from 'next'
import { getCaseStudyBySlug, getAllCaseStudySlugs } from '@/lib/metadata.server'

interface PageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getCaseStudyBySlug(params.id)
  
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The project you are looking for does not exist.',
    }
  }
  
  return {
    title: `${project.title} - Tony Destin`,
    description: project.summary,
    openGraph: {
      title: `${project.title} - Tony Destin`,
      description: project.summary,
      images: [
        {
          url: project.cover.src,
          width: 1200,
          height: 630,
          alt: project.cover.alt,
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  return await getAllCaseStudySlugs()
}
