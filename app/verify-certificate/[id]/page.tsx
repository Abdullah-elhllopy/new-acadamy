'use client'

import { useParams } from 'next/navigation'
import { useVerifyCertificate } from '@/hooks/api/use-certificates'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, Loader2, Award, Download, View, Eye } from 'lucide-react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import Link from 'next/link'
import { CertificateQRCode } from '@/components/certificate/certificate-qr-code'
import { downloadCertificatePDF, previewCertificatePDF } from '@/services/certificate-generator'
import { CertificateData } from '@/shared/types'
import { toast } from 'sonner'

export default function VerifyCertificatePage() {
  const params = useParams()
  const certificateId = params.id as string
  const { isArabic } = useLanguage()

  const { data: certificate, isLoading, error } = useVerifyCertificate(certificateId)

  const handleDownload = async () => {
    if (!certificate) return

    try {
      const certificateData: CertificateData = {
        certificateId: certificate.id,
        certificateNumber: certificate.certificateNumber,
        userName: certificate.userName,
        userNameAr: certificate.userNameAr,
        courseName: certificate.courseName,
        courseNameAr: certificate.courseNameAr,
        completionDate: certificate.completionDate,
        issueDate: certificate.issueDate,
        trainerName: certificate.trainerName,
        trainerNameAr: certificate.trainerNameAr,
        trainerSignature: certificate.trainerSignature,
        directorSignature: certificate.directorSignature,
      }

      await downloadCertificatePDF(certificateData)
      toast.success(isArabic ? 'تم تحميل الشهادة' : 'Certificate downloaded')
    } catch (error) {
      toast.error(isArabic ? 'فشل تحميل الشهادة' : 'Failed to download certificate')
    }
  }
  const handleView = async () => {
    if (!certificate) return

    try {
      const certificateData: CertificateData = {
        certificateId: certificate.id,
        certificateNumber: certificate.certificateNumber,
        userName: certificate.userName,
        userNameAr: certificate.userNameAr,
        courseName: certificate.courseName,
        courseNameAr: certificate.courseNameAr,
        completionDate: certificate.completionDate,
        issueDate: certificate.issueDate,
        trainerName: certificate.trainerName,
        trainerNameAr: certificate.trainerNameAr,
        trainerSignature: certificate.trainerSignature,
        directorSignature: certificate.directorSignature,
      }

      await previewCertificatePDF(certificateData)
      toast.success(isArabic ? 'تم تحميل الشهادة' : 'Certificate downloaded')
    } catch (error) {
      toast.error(isArabic ? 'فشل تحميل الشهادة' : 'Failed to download certificate')
    }
  }
  if (isLoading) {
    return (
      <div className="container py-16 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !certificate) {
    return (
      <div className="container py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              <XCircle className="w-8 h-8 text-destructive" />
              <CardTitle>
                {isArabic ? 'شهادة غير صالحة' : 'Invalid Certificate'}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {isArabic
                ? 'لم يتم العثور على الشهادة أو أنها غير صالحة.'
                : 'Certificate not found or invalid.'}
            </p>
            <Button asChild>
              <Link href="/">
                {isArabic ? 'العودة للرئيسية' : 'Back to Home'}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isValid = certificate.status === 'valid'

  return (
    <div className="container py-16">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-3">
            {isValid ? (
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-destructive" />
            )}
            <CardTitle>
              {isValid
                ? isArabic
                  ? 'شهادة صالحة'
                  : 'Valid Certificate'
                : isArabic
                  ? 'شهادة غير صالحة'
                  : 'Invalid Certificate'}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Award className="w-24 h-24 text-primary" />
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                {isArabic ? 'رقم الشهادة' : 'Certificate Number'}
              </p>
              <p className="font-semibold">{certificate.certificateNumber}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                {isArabic ? 'اسم المتدرب' : 'Trainee Name'}
              </p>
              <p className="font-semibold">
                {isArabic ? certificate.userNameAr : certificate.userName}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                {isArabic ? 'اسم الدورة' : 'Course Name'}
              </p>
              <p className="font-semibold">
                {isArabic ? certificate.courseNameAr : certificate.courseName}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {isArabic ? 'تاريخ الإصدار' : 'Issue Date'}
                </p>
                <p className="font-semibold">
                  {new Date(certificate.issueDate).toLocaleDateString(
                    isArabic ? 'ar-SA' : 'en-US'
                  )}
                </p>
              </div>

              {certificate.completionDate && (
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isArabic ? 'تاريخ الإكمال' : 'Completion Date'}
                  </p>
                  <p className="font-semibold">
                    {new Date(certificate.completionDate).toLocaleDateString(
                      isArabic ? 'ar-SA' : 'en-US'
                    )}
                  </p>
                </div>
              )}
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                {isArabic ? 'الحالة' : 'Status'}
              </p>
              <p className="font-semibold capitalize">{certificate.status}</p>
            </div>
          </div>

          {isValid && (
            <div className="flex gap-3">
              <Button onClick={handleDownload} className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                {isArabic ? 'تحميل الشهادة' : 'Download Certificate'}
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleView}>
                <Eye className="w-4 h-4 mr-2" />
                {isArabic ? 'عرض' : 'View'}
              </Button>
            </div>
          )}

          <div className="flex justify-center pt-4">
            <CertificateQRCode
              certificateId={certificate.id}
              size={150}
              label={isArabic ? 'امسح للتحقق' : 'Scan to Verify'}
              labelAr="امسح للتحقق"
            />
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground text-center">
              {isArabic
                ? 'هذه الشهادة صادرة عن الأكاديمية وموثقة رسمياً'
                : 'This certificate is issued by the Academy and officially verified'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
