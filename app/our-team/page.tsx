'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Facebook, Linkedin, Twitter } from 'lucide-react'
import { ContentLayout, Layout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { TitleContainer } from '@/components/shared/title'
import { useTeamMembers } from '@/hooks/api'
import { DataStateHandler } from '@/components/shared/data-state-handler'

const MOCK_TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Dr. Ahmed Al-Saud',
    nameAr: 'د. أحمد السعود',
    job: 'Chief Executive Officer',
    jobAr: 'الرئيس التنفيذي',
    initials: 'AS',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    nameAr: 'سارة جونسون',
    job: 'Head of Training',
    jobAr: 'رئيس التدريب',
    initials: 'SJ',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  {
    id: 3,
    name: 'Mohammed Al-Rashid',
    nameAr: 'محمد الراشد',
    job: 'Corporate Relations Manager',
    jobAr: 'مدير العلاقات المؤسسية',
    initials: 'MR',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  {
    id: 4,
    name: 'Fatima Al-Zahrani',
    nameAr: 'فاطمة الزهراني',
    job: 'Marketing Director',
    jobAr: 'مدير التسويق',
    initials: 'FZ',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  {
    id: 5,
    name: 'Omar Abdullah',
    nameAr: 'عمر عبدالله',
    job: 'Technology Lead',
    jobAr: 'قائد التكنولوجيا',
    initials: 'OA',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  {
    id: 6,
    name: 'Layla Hassan',
    nameAr: 'ليلى حسن',
    job: 'Customer Success Manager',
    jobAr: 'مدير نجاح العملاء',
    initials: 'LH',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  }
]

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function OurTeamPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const { data: members, isLoading ,error, refetch} = useTeamMembers()

  // Use API data if available, otherwise fallback to mock data
  const displayMembers = members && members.length > 0 ? members : MOCK_TEAM_MEMBERS

  return (
    <Layout>
      <Hero>
        <TitleContainer
          title={isArabic ? 'فريقنا' : 'Our Team'}
          subtitle={isArabic ? 'تعرف على الفريق المتميز الذي يقود نجاح أكاديمية ID' : 'Meet the exceptional team driving ID Academy\'s success'}
        />
      </Hero>

      <ContentLayout>
        <DataStateHandler  isLoading={isLoading} error={error} onRetry={refetch}> 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayMembers.map((member) => {
              const displayName = 'name' in member ? member.name : 'Mock Name'
              const displayJob = 'job' in member ? member.job : 'Mock Job'
              const initials = 'initials' in member ? member.initials : getInitials(displayName)

              return (
                <Card key={member.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <Avatar className="w-24 h-24">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-xl text-foreground mb-1">
                          {displayName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {displayJob}
                        </p>
                      </div>
                      <div className="flex gap-3 pt-2">
                        {member.facebook && (
                          <a
                            href={member.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                          >
                            <Facebook className="w-4 h-4" />
                          </a>
                        )}
                        {/* {(member.linkedIn || member.linkedin) && (
                          <a
                            href={member.linkedIn || member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )} */}
                        {member.twitter && (
                          <a
                            href={member.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </DataStateHandler>
      </ContentLayout>
    </Layout>
  )
}
