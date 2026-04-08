'use client'

import { useState } from 'react'
import { Edit } from 'lucide-react'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const STATIC_PAGES = [
  {
    id: 'consulting-services',
    title: 'Consulting Services',
    titleAr: 'الخدمات الاستشارية',
    description: 'Manage consulting services content and offerings',
    descriptionAr: 'إدارة محتوى وعروض الخدمات الاستشارية',
    route: '/consulting-services',
    lastUpdated: '2024-01-15',
  },
  {
    id: 'fields-of-work',
    title: 'Fields of Work',
    titleAr: 'مجالات العمل',
    description: 'Manage sectors and industries content',
    descriptionAr: 'إدارة محتوى القطاعات والصناعات',
    route: '/fields-of-work',
    lastUpdated: '2024-01-15',
  },
  {
    id: 'methodology',
    title: 'Our Methodology',
    titleAr: 'منهجيتنا',
    description: 'Manage training methodology and process steps',
    descriptionAr: 'إدارة منهجية التدريب وخطوات العملية',
    route: '/our-methodology',
    lastUpdated: '2024-01-15',
  },
]

export default function StaticPagesPage() {
  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Static Pages', href: '/dashboard/static-pages' },
        ]}
        title="Static Pages Management"
      />

      <ContentLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STATIC_PAGES.map((page) => (
            <Card key={page.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{page.title}</span>
                  <Button size="sm" variant="ghost" asChild>
                    <Link href={`/dashboard/static-pages/${page.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardTitle>
                <CardDescription>{page.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Arabic Title:</span>
                    <span className="font-medium">{page.titleAr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span className="font-medium">
                      {new Date(page.lastUpdated).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={page.route} target="_blank">
                        View Page
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About Static Pages</CardTitle>
            <CardDescription>
              Static pages contain content that doesn't change frequently. Use the edit buttons above to update the content for each page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Consulting Services: Manage service offerings, benefits, and CTAs</li>
              <li>Fields of Work: Update sectors, industries, and target audiences</li>
              <li>Our Methodology: Edit training process steps and core principles</li>
            </ul>
          </CardContent>
        </Card>
      </ContentLayout>
    </>
  )
}
