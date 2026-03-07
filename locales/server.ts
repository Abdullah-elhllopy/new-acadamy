
import { cookies as getCookies } from 'next/headers';

import {  cookieName,  fallbackLng } from './config-locales';

import type { LanguageValue } from './config-locales';

// ----------------------------------------------------------------------
export async function detectLanguage() {
  const cookies = await getCookies();

  const language = cookies.get(cookieName)?.value ?? fallbackLng;

  return language as LanguageValue;
}

