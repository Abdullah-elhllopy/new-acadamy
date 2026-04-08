'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Facebook, Linkedin, Twitter } from 'lucide-react'
import { ContentLayout, Layout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { Title } from '@/components/shared/title'

const MOCK_ADVISORY_BOARD = [
  {
    id: 1,
    name: 'Prof. Dr. Hassan Al-Mansour',
    nameAr: 'أ.د. حسن المنصور',
    job: 'Strategic Advisor - Leadership Development',
    jobAr: 'مستشار استراتيجي - تطوير القيادة',
    initials: 'HM',
    about: 'Former Dean of Business School with 25+ years in executive education',
    aboutAr: 'عميد سابق لكلية إدارة الأعمال مع أكثر من 25 عامًا في التعليم التنفيذي',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 2,
    name: 'Dr. Nadia Ibrahim',
    nameAr: 'د. نادية إبراهيم',
    job: 'Advisor - Organizational Development',
    jobAr: 'مستشارة - التطوير المؤسسي',
    initials: 'NI',
    about: 'International consultant specializing in change management',
    aboutAr: 'مستشارة دولية متخصصة في إدارة التغيير',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 3,
    name: 'Eng. Khalid Al-Otaibi',
    nameAr: 'م. خالد العتيبي',
    job: 'Technology & Innovation Advisor',
    jobAr: 'مستشار التكنولوجيا والابتكار',
    initials: 'KO',
    about: 'Former CTO of leading tech companies in the region',
    aboutAr: 'مدير تقني سابق لشركات تقنية رائدة في المنطقة',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 4,
    name: 'Dr. Mona Al-Sharif',
    nameAr: 'د. منى الشريف',
    job: 'HR & Talent Development Advisor',
    jobAr: 'مستشارة الموارد البشرية وتطوير المواهب',
    initials: 'MS',
    about: 'Expert in talent management and workforce development',
    aboutAr: 'خبيرة في إدارة المواهب وتطوير القوى العاملة',
    linkedin: 'https://linkedin.com',
  },
]

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function AdvisoryBoardPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  const breadcrumbs = [
    { label: 'Home', labelAr: 'الرئيسية', href: '/' },
    { label: 'Advisory Board', labelAr: 'المجلس الاستشاري' },
  ]

  return (
    <Layout>
      <Hero breadcrumbItems={breadcrumbs}>
        <Title title={isArabic ? 'المجلس الاستشاري' : 'Advisory Board'} />
      </Hero>

      <ContentLayout className="py-12">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {isArabic
              ? 'خبراء يوجهون رؤيتنا الاستراتيجية'
              : 'Experts Guiding Our Strategic Vision'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {isArabic
              ? 'يضم مجلسنا الاستشاري نخبة من الخبراء والقادة في مختلف المجالات، يقدمون التوجيه الاستراتيجي والخبرة لضمان تميز برامجنا التدريبية.'
              : 'Our advisory board comprises elite experts and leaders across various fields, providing strategic guidance and expertise to ensure the excellence of our training programs.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_ADVISORY_BOARD.map((advisor) => (
            <Card
              key={advisor.id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-6">
                  <Avatar className="w-20 h-20 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                      {advisor.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-foreground mb-1">
                      {isArabic ? advisor.nameAr : advisor.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-3">
                      {isArabic ? advisor.jobAr : advisor.job}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {isArabic ? advisor.aboutAr : advisor.about}
                    </p>
                    <div className="flex gap-3">
                      {advisor.linkedin && (
                        <a
                          href={advisor.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {isArabic
              ? 'هل ترغب في الانضمام إلى مجلسنا الاستشاري؟'
              : 'Interested in Joining Our Advisory Board?'}
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isArabic
              ? 'نحن دائمًا نبحث عن خبراء متميزين للانضمام إلى مجلسنا الاستشاري. تواصل معنا لمعرفة المزيد.'
              : 'We are always looking for distinguished experts to join our advisory board. Contact us to learn more.'}
          </p>
        </div>
      </ContentLayout>
    </Layout>
  )
}
