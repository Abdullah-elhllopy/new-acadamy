'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Download, Share2, Linkedin } from 'lucide-react'
import Link from 'next/link'

const MOCK_CERTIFICATES = [
  {
    id: 1,
    title: 'Leadership Skills Certificate',
    titleAr: 'شهادة مهارات القيادة',
    issueDate: '2024-02-15',
    courseId: 1
  },
  {
    id: 2,
    title: 'Project Management Professional',
    titleAr: 'شهادة إدارة المشاريع الاحترافية',
    issueDate: '2024-01-20',
    courseId: 2
  },
  {
    id: 3,
    title: 'Business Communication Excellence',
    titleAr: 'شهادة التميز في التواصل المهني',
    issueDate: '2023-12-10',
    courseId: 5
  }
]

export default function MyCertificatesPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  const handleDownload = (certId: number) => {
    console.log('Download certificate:', certId)
  }

  const handleLinkedInShare = (certId: number) => {
    console.log('Share to LinkedIn:', certId)
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 md:py-24 border-b border-border">
        <div className="container px-4 md:px-6">
          <div className={`max-w-2xl ${isArabic ? 'text-right' : ''}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {isArabic ? 'شهاداتي' : 'My Certificates'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isArabic
                ? 'عرض وتحميل شهاداتك التدريبية'
                : 'View and download your training certificates'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          {MOCK_CERTIFICATES.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_CERTIFICATES.map((cert) => (
                <Card key={cert.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                          <Award className="w-20 h-20 text-primary" />
                        </div>
                      </div>
                      <div className={isArabic ? 'text-right' : ''}>
                        <h3 className="font-bold text-lg mb-2">
                          {isArabic ? cert.titleAr : cert.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {isArabic ? 'تاريخ الإصدار:' : 'Issued:'} {cert.issueDate}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleDownload(cert.id)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {isArabic ? 'تحميل' : 'Download'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleLinkedInShare(cert.id)}
                        >
                          <Linkedin className="w-4 h-4 mr-2" />
                          {isArabic ? 'لينكد إن' : 'LinkedIn'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {isArabic ? 'لا توجد شهادات حالياً' : 'No certificates yet'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {isArabic
                  ? 'أكمل دوراتك التدريبية للحصول على الشهادات'
                  : 'Complete your training courses to earn certificates'}
              </p>
              <Button asChild>
                <Link href="/programs">
                  {isArabic ? 'تصفح البرامج' : 'Browse Programs'}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
