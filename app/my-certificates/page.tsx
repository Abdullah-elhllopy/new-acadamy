'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Download, Loader2, QrCode } from 'lucide-react'
import Link from 'next/link'
import { useUserCertificates } from '@/hooks/api/use-certificates'
import { EmptyState } from '@/components/states/empty-state'
import { Skeleton } from '@/components/ui/skeleton'
import { downloadCertificatePDF } from '@/services/certificate-generator'
import { CertificateData } from '@/shared/types'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Hero } from '@/components/sections/hero'
import { TitleContainer } from '@/components/shared/title'
import { DataStateHandler } from '@/components/shared/data-state-handler'
import { ContentLayout } from '@/layout/page-layout'
import CertificateCard from '@/components/cards/certificate-card'

export default function MyCertificatesPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const router = useRouter()

  // TODO: Get actual user ID from auth context
  const userId = 'user-001' // Placeholder
  const { data: certificates, isLoading, error, refetch } = useUserCertificates(userId)

  const handleDownload = async (cert: any) => {
    try {
      const certificateData: CertificateData = {
        certificateId: cert.id,
        certificateNumber: cert.certificateNumber,
        userName: cert.userName,
        userNameAr: cert.userNameAr,
        courseName: cert.courseName,
        courseNameAr: cert.courseNameAr,
        completionDate: cert.completionDate,
        issueDate: cert.issueDate,
        trainerName: cert.trainerName,
        trainerNameAr: cert.trainerNameAr,
        trainerSignature: cert.trainerSignature,
        directorSignature: cert.directorSignature,
      }

      await downloadCertificatePDF(certificateData)
      toast.success(isArabic ? 'تم تحميل الشهادة' : 'Certificate downloaded')
    } catch (error) {
      toast.error(isArabic ? 'فشل تحميل الشهادة' : 'Failed to download certificate')
    }
  }

  const handleViewQR = (certId: string) => {
    router.push(`/verify-certificate/${certId}`)
  }

  return (
    <>
      <Hero>
        <div className='flex items-center justify-between'>
          <TitleContainer title={isArabic ? 'شهاداتي' : 'My Certificates'} subtitle={isArabic ? 'عرض وتحميل شهاداتك التدريبية' : 'View and download your training certificates'} />
          <Button asChild>
            <Link href="/verify-certificate">
              {isArabic ? 'التحقق من الشهادات' : 'Verify Certificates'}
            </Link>
          </Button>
        </div>
      </Hero>
      <ContentLayout>
        <DataStateHandler listLoaderProps={{ showHeader: false }} isLoading={isLoading} error={error} onRetry={refetch} >
          {certificates && certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <CertificateCard key={`my-certificates-${cert.id}`}  cert={cert} handleDownload={handleDownload} handleViewQR={handleViewQR} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Award}
              title={isArabic ? 'لا توجد شهادات حالياً' : 'No certificates yet'}
              description={
                isArabic
                  ? 'أكمل دوراتك التدريبية للحصول على الشهادات'
                  : 'Complete your training courses to earn certificates'
              }
              action={{
                label: isArabic ? 'تصفح البرامج' : 'Browse Programs',
                href: '/programs',
              }}
              language={language}
            />
          )}
        </DataStateHandler>
      </ContentLayout>
    </>
  )
}
