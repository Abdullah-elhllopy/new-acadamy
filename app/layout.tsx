import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ErrorBoundary } from '@/components/error-boundary'
import { LocalizationProvider } from '@/locales/localization-provider'
import { InitLangScript } from '@/locales/init-lang-script'
import './globals.css'
import { I18nProvider } from '@/locales'

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'ID Academy | Professional Training & Development',
  description: 'ID Academy offers professional on-site training programs in leadership, business, and technical skills for corporates, governments, and NGOs.',
  metadataBase: new URL('https://id-academy.com'),
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'ID Academy | Professional Training & Development',
    description: 'Professional on-site training programs for corporate development',
    type: 'website',
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
        <ErrorBoundary>
          <I18nProvider>
            <LocalizationProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster />
              <Analytics />
            </LocalizationProvider>
          </I18nProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
