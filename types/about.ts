// types/about.ts
export interface CompanyValue {
    id: string
    title: string
    titleAr: string
    description: string
    descriptionAr: string
}

export interface AboutUsData {
    name: string
    nameAr: string
    description: string
    descriptionAr: string
    vision: string
    visionAr: string
    mission: string
    missionAr: string
    values: CompanyValue[]
}