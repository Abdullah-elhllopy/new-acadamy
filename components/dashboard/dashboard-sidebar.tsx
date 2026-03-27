'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { dashboardNavigation, dashboardHomeLink } from '@/config/dashboard-navigation'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

export function DashboardSidebar() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  // Determine which sections should be open by default based on current path
  const getDefaultOpenSections = () => {
    const openSections: string[] = []
    dashboardNavigation.forEach((section) => {
      const hasActiveItem = section.items.some((item) => pathname.startsWith(item.href))
      if (hasActiveItem) {
        openSections.push(section.id)
      }
    })
    return openSections
  }

  const isActiveLink = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <ScrollArea className="h-full py-4">
      <div className="space-y-2 px-3">
        {/* Dashboard Home Link */}
        <Link href={dashboardHomeLink.href}>
          <Button
            variant={isActiveLink(dashboardHomeLink.href) ? 'secondary' : 'ghost'}
            className={cn(
              'w-full justify-start gap-2',
              isArabic && 'flex-row-reverse'
            )}
          >
            <dashboardHomeLink.icon className="h-4 w-4" />
            <span>{isArabic ? dashboardHomeLink.labelAr : dashboardHomeLink.label}</span>
          </Button>
        </Link>

        {/* Accordion Sections */}
        <Accordion 
          type="multiple" 
          defaultValue={getDefaultOpenSections()}
          className="space-y-1"
        >
          {dashboardNavigation.map((section) => (
            <AccordionItem 
              key={section.id} 
              value={section.id}
              className="border-none"
            >
              <AccordionTrigger 
                className={cn(
                  'hover:no-underline hover:bg-accent rounded-md px-3 py-2 text-sm font-medium',
                  isArabic && 'flex-row-reverse'
                )}
              >
                <div className={cn('flex items-center gap-2', isArabic && 'flex-row-reverse')}>
                  <section.icon className="h-4 w-4" />
                  <span>{isArabic ? section.labelAr : section.label}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-1 pt-1">
                <div className="space-y-1 pl-6">
                  {section.items.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={isActiveLink(item.href) ? 'secondary' : 'ghost'}
                        size="sm"
                        className={cn(
                          'w-full justify-start gap-2',
                          isArabic && 'flex-row-reverse'
                        )}
                      >
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{isArabic ? item.labelAr : item.label}</span>
                      </Button>
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </ScrollArea>
  )
}
