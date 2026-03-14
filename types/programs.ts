// types/programs.ts
export interface ProgramCourse {
    id: string
    title: string
    titleAr: string
    image: string
    courseType: 'presence' | 'online' | 'live'
    startDate: string
    duration: {
        hours: number
        months: number
    }
    location: {
        city: string
        venue: string
    }
    price: number
    currency: string
    instructor: {
        id: string
        name: string
        nameAr: string
        image: string
    }
    badge?: 'mostWanted' | 'new' | 'soon'
}

export interface ProgramSection {
    id: string
    titleEn: string
    titleAr: string
    viewAllLink: string
    viewAllLabel: { en: string; ar: string }
    courses: ProgramCourse[]
    variant: 'carousel' | 'grid' | 'compact'
    emptyMessage?: { en: string; ar: string }
}