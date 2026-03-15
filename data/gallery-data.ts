// data/gallery-data.ts
import { ImageGroup, ImageGroupDetail, GalleryImage } from '@/types/gallery'

export const DUMMY_IMAGE_GROUPS: ImageGroup[] = [
    {
        id: 'training-2024',
        name: 'Training Sessions 2024',
        nameAr: 'جلسات التدريب 2024',
        coverImage: '/images/gallery/training-2024-cover.jpg',
        imageCount: 24,
        createdAt: '2024-01-15'
    },
    {
        id: 'graduation-ceremony',
        name: 'Graduation Ceremony',
        nameAr: 'حفل التخرج',
        coverImage: '/images/gallery/graduation-cover.jpg',
        imageCount: 45,
        createdAt: '2023-12-20'
    },
    {
        id: 'leadership-summit',
        name: 'Leadership Summit',
        nameAr: 'قمة القيادة',
        coverImage: '/images/gallery/summit-cover.jpg',
        imageCount: 32,
        createdAt: '2023-11-10'
    },
    {
        id: 'workshops',
        name: 'Workshop Sessions',
        nameAr: 'ورش العمل',
        coverImage: '/images/gallery/workshops-cover.jpg',
        imageCount: 18,
        createdAt: '2023-10-05'
    },
    {
        id: 'conference-2023',
        name: 'Annual Conference 2023',
        nameAr: 'المؤتمر السنوي 2023',
        coverImage: '/images/gallery/conference-cover.jpg',
        imageCount: 56,
        createdAt: '2023-09-15'
    },
    {
        id: 'team-building',
        name: 'Team Building Events',
        nameAr: 'فعاليات بناء الفريق',
        coverImage: '/images/gallery/team-building-cover.jpg',
        imageCount: 28,
        createdAt: '2023-08-20'
    }
]

const generateGalleryImages = (groupId: string, count: number): GalleryImage[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: `${groupId}-${i + 1}`,
        src: `/images/gallery/${groupId}/${i + 1}.jpg`,
        alt: `Gallery image ${i + 1}`,
        caption: i % 3 === 0 ? `Training session moment ${i + 1}` : undefined,
        width: 1200,
        height: 800
    }))
}

export const DUMMY_GROUP_DETAILS: Record<string, ImageGroupDetail> = {
    'training-2024': {
        id: 'training-2024',
        name: 'Training Sessions 2024',
        nameAr: 'جلسات التدريب 2024',
        images: generateGalleryImages('training-2024', 24)
    },
    'graduation-ceremony': {
        id: 'graduation-ceremony',
        name: 'Graduation Ceremony',
        nameAr: 'حفل التخرج',
        images: generateGalleryImages('graduation', 45)
    },
    'leadership-summit': {
        id: 'leadership-summit',
        name: 'Leadership Summit',
        nameAr: 'قمة القيادة',
        images: generateGalleryImages('summit', 32)
    },
    'workshops': {
        id: 'workshops',
        name: 'Workshop Sessions',
        nameAr: 'ورش العمل',
        images: generateGalleryImages('workshops', 18)
    },
    'conference-2023': {
        id: 'conference-2023',
        name: 'Annual Conference 2023',
        nameAr: 'المؤتمر السنوي 2023',
        images: generateGalleryImages('conference', 56)
    },
    'team-building': {
        id: 'team-building',
        name: 'Team Building Events',
        nameAr: 'فعاليات بناء الفريق',
        images: generateGalleryImages('team', 28)
    }
}