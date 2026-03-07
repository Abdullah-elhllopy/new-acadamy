'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

const MOCK_IMAGES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Image ${i + 1}`,
  titleAr: `صورة ${i + 1}`
}))

export default function ImageGalleryPage({ params }: { params: { id: string } }) {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 md:py-24 border-b border-border">
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/images-center">
                {isArabic ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
              </Link>
            </Button>
            <div className={isArabic ? 'text-right flex-1' : 'flex-1'}>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {isArabic ? 'معرض الصور' : 'Image Gallery'}
              </h1>
              <p className="text-lg text-muted-foreground">
                {isArabic ? 'تدريب القيادة 2024' : 'Leadership Training 2024'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {MOCK_IMAGES.map((image) => (
              <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-primary" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
