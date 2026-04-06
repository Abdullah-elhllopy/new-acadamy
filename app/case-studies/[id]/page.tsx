import { Metadata } from 'next'
import { caseStudyService } from '@/services/api'
import CaseStudyDetailClient from './client'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  
  try {
    // TODO: Replace with actual API call when backend is ready
    const caseStudy = await caseStudyService.getById(id)
    
    return {
      title: caseStudy.titleEn,
      description: caseStudy.challengeEn.substring(0, 160),
      openGraph: {
        title: caseStudy.titleEn,
        description: caseStudy.challengeEn.substring(0, 160),
        images: caseStudy.coverImage ? [{ url: caseStudy.coverImage }] : [],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: caseStudy.titleEn,
        description: caseStudy.challengeEn.substring(0, 160),
        images: caseStudy.coverImage ? [caseStudy.coverImage] : [],
      },
    }
  } catch {
    return {
      title: 'Case Study',
      description: 'Read our case study',
    }
  }
}

export default function CaseStudyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <CaseStudyDetailClient params={params} />
}

