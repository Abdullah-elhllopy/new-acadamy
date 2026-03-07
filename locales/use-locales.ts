'use client';

import dayjs from 'dayjs';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';


import { allLangs } from './all-langs';
import { fallbackLng, changeLangMessages as messages } from './config-locales';

import type { LanguageValue } from './config-locales';
import { useRouter } from 'next/navigation';
import { I18LANG } from '@/shared/constants/constant';

// ----------------------------------------------------------------------

export function useTranslate(ns?: string) {
  const router = useRouter();

  const { t, i18n } = useTranslation(ns);

  const fallback = allLangs.filter((lang) => lang.value === fallbackLng)[0];

  const currentLang = allLangs.find((lang) => lang.value === i18n.resolvedLanguage);

  useEffect(() => {
    const lang = allLangs.find((l) => l.value === i18n.language) ?? fallback;
    document.documentElement.dir = lang.dir;
    document.documentElement.lang = lang.value;
    dayjs.locale(lang.adapterLocale);
  }, [i18n.language, fallback]);

  const onChangeLang = useCallback(
    async (newLang: LanguageValue) => {
      try {
        await i18n.changeLanguage(newLang);
        localStorage.setItem(I18LANG, newLang);

        const lang = allLangs.find((l) => l.value === newLang);
        if (lang) {
          document.documentElement.dir = lang.dir;
          document.documentElement.lang = lang.value;
          dayjs.locale(lang.adapterLocale);
        }

        router.refresh();
      } catch (error) {
        console.error(error);
      }
    },
    [i18n, router]
  );

  return {
    t,
    i18n,
    onChangeLang,
    currentLang: currentLang ?? fallback,
  };
}
