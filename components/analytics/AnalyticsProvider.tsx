// components/analytics/AnalyticsProvider.tsx
'use client';

import { GoogleAnalytics } from './GoogleAnalytics';
import { GoogleTagManager } from './GoogleTagManager';
import { MicrosoftClarity } from './MicrosoftClarity';

export function AnalyticsProvider() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {gaId && <GoogleAnalytics measurementId={gaId} />}
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      {clarityId && <MicrosoftClarity clarityId={clarityId} />}
    </>
  );
}
