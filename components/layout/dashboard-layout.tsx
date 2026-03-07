'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, LogOut, Settings, User, Globe } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface DashboardLayoutProps {
  children: React.ReactNode
  sidebarItems: Array<{
    label: string
    href: string
    icon: React.ReactNode
  }>
  userEmail?: string
}

export function DashboardLayout({
  children,
  sidebarItems,
  userEmail = 'user@example.com',
}: DashboardLayoutProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { language, toggleLanguage } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col border-r border-border bg-card">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-sm">
              ID
            </div>
            <span>Academy</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-auto p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/10 text-foreground transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* User section */}
        <div className="border-t border-border p-4 space-y-2">
          <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
            <Link href="/profile">
              <User className="w-4 h-4 mr-2" />
              {isArabic ? 'الملف الشخصي' : 'Profile'}
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
            <Link href="/settings">
              <Settings className="w-4 h-4 mr-2" />
              {isArabic ? 'الإعدادات' : 'Settings'}
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive" asChild>
            <Link href="/logout">
              <LogOut className="w-4 h-4 mr-2" />
              {isArabic ? 'تسجيل خروج' : 'Logout'}
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <header className="border-b border-border bg-background px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isArabic ? 'right' : 'left'} className="w-64">
                <div className="mt-8 space-y-2">
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/10 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <span className="text-sm text-muted-foreground hidden sm:inline">{userEmail}</span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleLanguage(language === 'en' ? 'ar' : 'en')}
              className="inline-flex items-center justify-center rounded-md border border-border bg-background hover:bg-muted p-2 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs ml-1 font-medium">{language.toUpperCase()}</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
