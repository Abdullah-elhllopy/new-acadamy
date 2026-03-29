'use client';

import i18next from 'i18next';
import { useEffect, useState } from 'react';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, I18nextProvider as Provider } from 'react-i18next';

import { i18nOptions } from './config-locales';
import { I18LANG } from '@/shared/constants/constant';

let isInitialized = false;

const initializeI18n = () => {
  if (isInitialized || i18next.isInitialized) return;
  isInitialized = true;

  const init = {
    ...i18nOptions(),
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      lookupLocalStorage: I18LANG,
      lookupCookie: 'i18next',
      caches: ['localStorage', 'cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  };

  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(resourcesToBackend((lang: string, ns: string) => import(`./langs/${lang}/${ns}.json`)))
    .init(init);
};

type Props = {
  children: React.ReactNode;
};

export function I18nProvider({ children }: Props) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initializeI18n();
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <>{children}</>;
  }

  return <Provider i18n={i18next}>{children}</Provider>;
}
