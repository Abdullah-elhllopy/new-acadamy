'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslate } from '@/locales/use-locales'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu, Globe, ChevronDown } from 'lucide-react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { t, currentLang, onChangeLang } = useTranslate('nav')

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-20">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              ID
            </div>
            <span className="hidden sm:inline text-primary font-bold text-xl">Academy</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-base font-medium text-foreground hover:text-primary transition-colors">
                <span suppressHydrationWarning>{t('aboutAcademy')}</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/about" className="w-full cursor-pointer">
                    {t('aboutUs')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/our-team" className="w-full cursor-pointer">
                    {t('ourTeam')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/trainers" className="w-full cursor-pointer">
                    {t('trainers')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/our-partners" className="w-full cursor-pointer">
                    {t('ourPartners')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/our-customers" className="w-full cursor-pointer">
                    {t('ourCustomers')}
                  </Link>
                </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                  <Link href="/articles" className="w-full cursor-pointer">
                    {t('articles')}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-base font-medium text-foreground hover:text-primary transition-colors">
                <span suppressHydrationWarning>{t('ourPrograms')}</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/all-programs" className="w-full cursor-pointer">
                    {t('allPrograms')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/programs" className="w-full cursor-pointer">
                    {'البرامج التدريبية'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/presence-courses" className="w-full cursor-pointer">
                    {t('presenceCourses')}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-base font-medium text-foreground hover:text-primary transition-colors">
                <span suppressHydrationWarning>{t('knowledgeCenter')}</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/images-center" className="w-full cursor-pointer">
                    {t('imagesCenter')}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-base font-medium text-foreground hover:text-primary transition-colors">
                <span suppressHydrationWarning>{t('contactCenter')}</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/contact" className="w-full cursor-pointer">
                    {t('contact')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/be-trainer" className="w-full cursor-pointer">
                    {t('beTrainer')}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onChangeLang(currentLang.value === 'en' ? 'ar' : 'en')}
              className="inline-flex items-center justify-center rounded-full w-11 h-11 border border-muted-foreground bg-white hover:bg-primary hover:text-white hover:border-primary transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
            </button>

            <Button
              className="hidden sm:inline-flex rounded-full h-11 px-8 bg-primary hover:bg-secondary text-white font-medium"
              asChild
            >
              <Link href="/login">
                <span suppressHydrationWarning>{t('login')}</span>
              </Link>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-muted">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side={currentLang.value === 'ar' ? 'left' : 'right'} className="w-80">
                <div className="flex flex-col gap-6 mt-8">
                  <Link href="/about" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
                    {t('aboutUs')}
                  </Link>
                  <Link href="/our-team" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
                    {t('ourTeam')}
                  </Link>
                  <Link href="/programs" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
                    {t('allPrograms')}
                  </Link>
                  <Link href="/trainers" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
                    {t('trainers')}
                  </Link>
                  <Link href="/images-center" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
                    {t('imagesCenter')}
                  </Link>
                  <Link href="/contact" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
                    {t('contact')}
                  </Link>
                  <Link href="/be-trainer" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
                    {t('beTrainer')}
                  </Link>
                  <Button
                    className="rounded-full h-11 bg-primary hover:bg-secondary text-white font-medium mt-4"
                    asChild
                  >
                    <Link href="/login">
                      <span suppressHydrationWarning>{t('login')}</span>
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
