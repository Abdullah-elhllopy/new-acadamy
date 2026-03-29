'use client';

import i18next from 'i18next';
import { useEffect } from 'react';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, I18nextProvider as Provider } from 'react-i18next';

import { i18nOptions } from './config-locales';
import type { LanguageValue } from './config-locales';
import { I18LANG } from '@/shared/constants/constant';

// ----------------------------------------------------------------------
const fallbackLng = (typeof window !== 'undefined' ? localStorage?.getItem(I18LANG) : null) || 'ar' as LanguageValue | undefined;

const init = {
  ...i18nOptions(fallbackLng),
  detection: {
    order: ['localStorage', 'cookie', 'navigator'],
    lookupLocalStorage: I18LANG,
    caches: ['localStorage', 'cookie'],
  },
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(resourcesToBackend((lang: string, ns: string) => import(`./langs/${lang}/${ns}.json`)))
  .init(init);

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function I18nProvider({  children }: Props) {
  // const lang = localStorage.getItem('i18nextLng') || 'ar' as LanguageValue | undefined;
  // useEffect(() => {
  //   if (lang) {
  //     i18next.changeLanguage(lang);
  //   }
  // }, [lang]);

  return <Provider i18n={i18next}>{children}</Provider>;
}
