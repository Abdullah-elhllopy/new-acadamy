'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, Target, Lightbulb } from 'lucide-react'

export default function AboutPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  const values = [
    {
      titleEn: 'Excellence',
      titleAr: 'التميز',
      descEn: 'We deliver high-quality training programs that exceed expectations',
      descAr: 'نقدم برامج تدريب عالية الجودة تتجاوز التوقعات',
      icon: Target,
    },
    {
      titleEn: 'Innovation',
      titleAr: 'الابتكار',
      descEn: 'We continuously evolve our methodologies to stay relevant',
      descAr: 'نطور باستمرار منهجياتنا لنبقى ذات صلة',
      icon: Lightbulb,
    },
    {
      titleEn: 'Impact',
      titleAr: 'التأثير',
      descEn: 'Our programs create measurable improvements in organizational performance',
      descAr: 'تخلق برامجنا تحسينات قابلة للقياس في أداء المنظمات',
      icon: CheckCircle2,
    },
  ]

  const team = [
    {
      nameEn: 'Dr. Abdullah Al-Tamimi',
      nameAr: 'د. عبدالله التميمي',
      roleEn: 'Founder & CEO',
      roleAr: 'المؤسس والرئيس التنفيذي',
      bio: 'PhD in Organizational Development with 20+ years of experience',
      initials: 'AT',
    },
    {
      nameEn: 'Sarah Johnson',
      nameAr: 'سارة جونسون',
      roleEn: 'Head of Training Programs',
      roleAr: 'رئيس برامج التدريب',
      bio: 'Expert in curriculum design and instructional methodology',
      initials: 'SJ',
    },
    {
      nameEn: 'Mohammed Al-Rashid',
      nameAr: 'محمد الراشد',
      roleEn: 'Head of Corporate Relations',
      roleAr: 'رئيس العلاقات المؤسسية',
      bio: 'Specialist in B2B partnerships and organizational consulting',
      initials: 'MR',
    },
  ]

  return (
    <>
      {/* Hero section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 md:py-24 border-b border-border">
        <div className="container px-4 md:px-6">
          <div className={`max-w-2xl ${isArabic ? 'text-right' : ''}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {isArabic ? 'من نحن' : 'About ID Academy'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isArabic
                ? 'منصة تعليمية متخصصة في توفير برامج تدريب عالية الجودة للشركات والحكومات والمنظمات غير الربحية'
                : 'A specialized digital platform delivering premium training programs for corporates, governments, and NGOs.'}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <Card>
              <CardContent className="pt-6">
                <h2 className={`text-2xl font-bold text-foreground mb-4 ${isArabic ? 'text-right' : ''}`}>
                  {isArabic ? 'رسالتنا' : 'Our Mission'}
                </h2>
                <p className={`text-muted-foreground leading-relaxed ${isArabic ? 'text-right' : ''}`}>
                  {isArabic
                    ? 'تمكين المنظمات والأفراد بمهارات وقدرات حديثة من خلال برامج تدريب مبتكرة وفعّالة، بما يساهم في نموهم المهني والتنظيمي.'
                    : 'To empower organizations and individuals with contemporary skills and capabilities through innovative and effective training programs that drive professional and organizational growth.'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className={`text-2xl font-bold text-foreground mb-4 ${isArabic ? 'text-right' : ''}`}>
                  {isArabic ? 'رؤيتنا' : 'Our Vision'}
                </h2>
                <p className={`text-muted-foreground leading-relaxed ${isArabic ? 'text-right' : ''}`}>
                  {isArabic
                    ? 'أن نكون المنصة الرائدة في تقديم حلول التدريب والتطوير في المنطقة، معروفة بجودة برامجها وتأثيرها الإيجابي على الأفراد والمنظمات.'
                    : 'To be the leading digital training platform in the region, recognized for exceptional program quality and meaningful impact on individuals and organizations.'}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className={`mb-16 ${isArabic ? 'text-right' : ''}`}>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {isArabic ? 'قيمنا الأساسية' : 'Our Core Values'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, idx) => {
                const Icon = value.icon
                return (
                  <Card key={idx}>
                    <CardContent className="pt-6">
                      <div className={`flex items-start gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <Icon className="w-8 h-8 text-primary flex-shrink-0" />
                        <div className={isArabic ? 'text-right' : ''}>
                          <h3 className="font-semibold text-foreground mb-2">
                            {isArabic ? value.titleAr : value.titleEn}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {isArabic ? value.descAr : value.descEn}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          <Separator className="my-16" />

          <div className={isArabic ? 'text-right' : ''}>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {isArabic ? 'فريق القيادة' : 'Leadership Team'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <div className={`flex flex-col items-center text-center space-y-4 ${isArabic ? 'text-right items-end' : ''}`}>
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {isArabic ? member.nameAr : member.nameEn}
                        </h3>
                        <p className="text-sm text-primary font-medium">
                          {isArabic ? member.roleAr : member.roleEn}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { valueEn: '15+', valueAr: '15+', labelEn: 'Years of Experience', labelAr: 'سنة خبرة' },
              { valueEn: '100+', valueAr: '100+', labelEn: 'Corporate Clients', labelAr: 'عميل مؤسسي' },
              { valueEn: '50+', valueAr: '50+', labelEn: 'Training Programs', labelAr: 'برنامج تدريبي' },
              { valueEn: '10K+', valueAr: '10K+', labelEn: 'Trainees Served', labelAr: 'متدرب تم تدريبهم' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl font-bold mb-2">
                  {isArabic ? stat.valueAr : stat.valueEn}
                </p>
                <p className="text-sm text-primary-foreground/80">
                  {isArabic ? stat.labelAr : stat.labelEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
