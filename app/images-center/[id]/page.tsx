// app/[locale]/images-center/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { GalleryLayout } from '../_components/gallery-layout'
import { GalleryGrid } from '../_components/gallery-grid'
import { GallerySkeleton } from '../_components/gallery-skeleton'
import { EmptyState } from '@/components/states/empty-state'
import { useGalleryDetail } from '../_hooks/use-gallery'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { GalleryLightbox } from '@/components/shared/lightbox'

export default function ImageGroupDetailPage() {
  const params = useParams()
  const groupId = params.id as string
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  const {
    group,
    loading,
    error,
    lightboxIndex,
    isLightboxOpen,
    openLightbox,
    closeLightbox
  } = useGalleryDetail(groupId)

  const breadcrumbs = [
    { label: 'Image Center', labelAr: 'مركز الصور', href: '/images-center' },
    {
      label: group?.name || 'Gallery',
      labelAr: group?.nameAr || 'المعرض'
    }
  ]

  if (loading) {
    return (
      <GalleryLayout
        title="Loading..."
        titleAr="جاري التحميل..."
        breadcrumbs={breadcrumbs}
      >
        <GallerySkeleton count={12} variant="grid" />
      </GalleryLayout>
    )
  }

  if (error || !group) {
    return (
      <GalleryLayout
        title="Not Found"
        titleAr="غير موجود"
        breadcrumbs={breadcrumbs}
      >
        <EmptyState
          // type="no-results"
          title={isArabic ? 'المجموعة غير موجودة' : 'Group not found'}
          description={isArabic ? 'الرجاء التحقق من الرابط' : 'Please check the URL'}
          action={{
            label: isArabic ? 'العودة لمركز الصور' : 'Back to Image Center',
            href: '/images-center'
          }}
        />
      </GalleryLayout>
    )
  }

  return (
    <>
      <GalleryLayout
        title={group.name}
        titleAr={group.nameAr}
        breadcrumbs={breadcrumbs}
      >
        {/* Back Button */}
        <div className="mb-8">
          <Button
            variant="outline"
            asChild
            className="rounded-full"
          >
            <Link href="/images-center">
              {isArabic ? 'العودة للمعارض' : 'Back to Galleries'}
              <ChevronLeft className={'arrow-left'} />
            </Link>
          </Button>
        </div>

        {/* Image Count */}
        <p className="text-muted-foreground mb-6">
          {group.images.length} {isArabic ? 'صورة' : 'images'}
        </p>

        {/* Gallery Grid */}
        {group.images.length > 0 ? (
          <GalleryGrid
            images={group.images}
            onImageClick={openLightbox}
          />
        ) : (
          <EmptyState
            // type="no-courses"
            title={isArabic ? 'لا توجد صور' : 'No images'}
            description={isArabic ? 'هذه المجموعة فارغة' : 'This group is empty'}
          />
        )}
      </GalleryLayout>

      {/* Lightbox */}
      <GalleryLightbox
        images={group.images}
        index={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
      />
    </>
  )
}