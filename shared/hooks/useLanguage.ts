'use client'

import { useTranslate } from '@/locales/use-locales'

export type Language = 'en' | 'ar'

export const useLanguage = () => {
  const { currentLang, onChangeLang } = useTranslate()

  const toggleLanguage = (newLang: Language) => {
    onChangeLang(newLang)
  }

  return {
    language: currentLang.value as Language,
    isArabic: currentLang.value === 'ar',
    toggleLanguage,
  }
}
