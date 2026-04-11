import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ErrorBoundary } from '@/components/error-boundary'
import { LocalizationProvider } from '@/locales/localization-provider'
import { InitLangScript } from '@/locales/init-lang-script'
import { ReactQueryProvider } from '@/components/providers/react-query-provider'
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider'
import { GoogleTagManagerNoScript } from '@/components/analytics/GoogleTagManager'
import { SEO_CONFIG } from '@/lib/seo-config'
import './globals.css'
import { I18nProvider } from '@/locales'
import { Suspense } from 'react'
import Loading from './loading'

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: SEO_CONFIG.siteName.en,
    template: `%s | ${SEO_CONFIG.siteName.en}`,
  },
  description: SEO_CONFIG.siteDescription.en,
  metadataBase: new URL(SEO_CONFIG.baseUrl),
  keywords: ['training academy', 'professional development', 'leadership training', 'business training', 'corporate training', 'egypt training'],
  authors: [{ name: 'ID Academy' }],
  creator: 'ID Academy',
  publisher: 'ID Academy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: 'en_US',
    url: SEO_CONFIG.baseUrl,
    siteName: SEO_CONFIG.siteName.en,
    title: SEO_CONFIG.siteName.en,
    description: SEO_CONFIG.siteDescription.en,
    images: [
      {
        url: SEO_CONFIG.defaultOgImage,
        width: 1200,
        height: 630,
        alt: SEO_CONFIG.siteName.en,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_CONFIG.siteName.en,
    description: SEO_CONFIG.siteDescription.en,
    creator: SEO_CONFIG.twitterHandle,
    images: [SEO_CONFIG.defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <InitLangScript />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManagerNoScript gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        <ErrorBoundary>
          <ReactQueryProvider>
            <Suspense fallback={<Loading />}>
              <I18nProvider>
                <LocalizationProvider>
                  <div className="min-h-screen flex flex-col">
                    <Suspense fallback={null}>
                      <Header />
                    </Suspense>
                    <main className="flex-1">
                      {/* <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}> */}
                        {children}
                      {/* </Suspense> */}
                    </main>
                    <Suspense fallback={null}>
                      <Footer />
                    </Suspense>
                  </div>
                  <Toaster />
                  <Analytics />
                  <AnalyticsProvider />
                </LocalizationProvider>
              </I18nProvider>
            </Suspense>
          </ReactQueryProvider>
        </ErrorBoundary>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SEO_CONFIG.organizationSchema),
          }}
        />
      </body>
    </html>
  )
}
