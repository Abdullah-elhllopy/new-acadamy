// app/[locale]/images-center/page.tsx
'use client'

import { GalleryLayout } from './_components/gallery-layout'
import { ImageGroupCard } from './_components/image-group-card'
import { GallerySkeleton } from './_components/gallery-skeleton'
import { EmptyState } from '@/components/states/empty-state'
import { useGallery } from './_hooks/use-gallery'
import { useLanguage } from '@/shared/hooks/useLanguage'


export default function ImagesCenterPage() {
  const { groups, loading, error } = useGallery()
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  const breadcrumbs = [
    { label:  'Home', labelAr: 'الرئيسية', href: '/' },
    { label: 'Image Center', labelAr: 'مركز الصور', href: '/images-center' }
  ]

  return (
    <GalleryLayout
      title="Image Center"
      titleAr="مركز الصور"
      breadcrumbs={breadcrumbs}
    >
      {loading ? (
        <GallerySkeleton count={6} variant="groups" />
      ) : error ? (
        <EmptyState
          // type="no-courses"
          title={isArabic ? 'حدث خطأ' : 'Error occurred'}
          description={error.message}
        />
      ) : groups.length === 0 ? (
        <EmptyState
          // type="no-courses"
          title={isArabic ? 'لا توجد مجموعات صور' : 'No image groups'}
          description={isArabic ? 'سيتم إضافة معارض صور قريباً' : 'Galleries will be added soon'}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, index) => (
            <ImageGroupCard 
              key={group.id} 
              group={group} 
              index={index}
            />
          ))}
        </div>
      )}
    </GalleryLayout>
  )
}