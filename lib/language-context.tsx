'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Language = 'en' | 'ar'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.aboutAcademy': 'About Academy',
    'nav.aboutUs': 'About Us',
    'nav.ourTeam': 'Our Team',
    'nav.trainers': 'Trainers',
    'nav.ourPartners': 'Our Partners',
    'nav.ourPrograms': 'Our Programs',
    'nav.allPrograms': 'All Programs',
    'nav.presenceCourses': 'Presence Courses',
    'nav.knowledgeCenter': 'Knowledge Center',
    'nav.imagesCenter': 'Images Center',
    'nav.contactCenter': 'Contact Center',
    'nav.contact': 'Contact',
    'nav.beTrainer': 'Be a Trainer',
    'nav.login': 'Login',
    'programs.title': 'Featured Programs',
    'programs.new': 'New',
    'programs.mostWanted': 'Most Wanted',
    'programs.soon': 'Soon',
    'programs.recommended': 'Recommended',
    'programs.starts': 'Starts',
    'programs.hours': 'hours',
    'programs.details': 'Details',
    'programs.view': 'View',
    'programs.comingSoon': 'Coming Soon',
    'programs.browseAll': 'Browse All Programs',
  },
  ar: {
    'nav.aboutAcademy': 'عن الأكاديمية',
    'nav.aboutUs': 'من نحن',
    'nav.ourTeam': 'فريقنا',
    'nav.trainers': 'المدربون',
    'nav.ourPartners': 'شركاؤنا',
    'nav.ourPrograms': 'برامجنا',
    'nav.allPrograms': 'جميع البرامج',
    'nav.presenceCourses': 'الدورات الحضورية',
    'nav.knowledgeCenter': 'مركز المعرفة',
    'nav.imagesCenter': 'مركز الصور',
    'nav.contactCenter': 'مركز التواصل',
    'nav.contact': 'تواصل معنا',
    'nav.beTrainer': 'كن مدرباً',
    'nav.login': 'تسجيل الدخول',
    'programs.title': 'البرامج المميزة',
    'programs.new': 'جديد',
    'programs.mostWanted': 'الأكثر طلباً',
    'programs.soon': 'قريباً',
    'programs.recommended': 'موصى به',
    'programs.starts': 'يبدأ',
    'programs.hours': 'ساعة',
    'programs.details': 'التفاصيل',
    'programs.view': 'عرض',
    'programs.comingSoon': 'قريباً',
    'programs.browseAll': 'تصفح جميع البرامج',
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'en' || saved === 'ar')) {
      setLanguageState(saved)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = language
      localStorage.setItem('language', language)
    }
  }, [language, mounted])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const t = (key: string) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
