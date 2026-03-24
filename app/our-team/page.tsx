'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Facebook, Linkedin, Twitter } from 'lucide-react'
import { ContentLayout, Layout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { TitleContainer } from '@/components/shared/title'

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

export default function OurTeamPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <Layout>
      {/* <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 md:py-24 border-b border-border">
        <div className="container px-4 md:px-6">
          <div className={`max-w-2xl ${isArabic ? 'text-right' : ''}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {isArabic ? 'فريقنا' : 'Our Team'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isArabic
                ? 'تعرف على الفريق المتميز الذي يقود نجاح أكاديمية ID'
                : 'Meet the exceptional team driving ID Academy\'s success'}
            </p>
          </div>
        </div>
      </section> */}
      <Hero >
        <TitleContainer title={isArabic ? 'فريقنا' : 'Our Team'} subtitle={isArabic ? 'تعرف على الفريق المتميز الذي يقود نجاح أكاديمية ID' : 'Meet the exceptional team driving ID Academy\'s success'} />
      </Hero>

      <ContentLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_TEAM_MEMBERS.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-xl text-foreground mb-1">
                      {isArabic ? member.nameAr : member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isArabic ? member.jobAr : member.job}
                    </p>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <a
                      href={member.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentLayout>
    </Layout>
  )
}
