// types/gallery.ts
export interface ImageGroup {
    id: string
    name: string
    nameAr: string
    coverImage: string
    imageCount: number
    createdAt: string
}

export interface GalleryImage {
    id: string
    src: string
    alt: string
    caption?: string
    width?: number
    height?: number
}

export interface ImageGroupDetail {
    id: string
    name: string
    nameAr: string
    images: GalleryImage[]
}