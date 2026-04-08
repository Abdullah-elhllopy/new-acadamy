'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Layout, ContentLayout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { Title } from '@/components/shared/title'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Target,
  Users,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

const SERVICES = [
  {
    icon: Target,
    title: 'Training Needs Analysis',
    titleAr: 'تحليل الاحتياجات التدريبية',
    description:
      'Comprehensive assessment of organizational training requirements and skill gaps to design targeted development programs.',
    descriptionAr:
      'تقييم شامل لمتطلبات التدريب المؤسسي وفجوات المهارات لتصميم برامج تطوير مستهدفة.',
  },
  {
    icon: Users,
    title: 'Custom Curriculum Design',
    titleAr: 'تصميم المناهج المخصصة',
    description:
      'Tailored training curricula developed specifically for your organization\'s unique needs and industry requirements.',
    descriptionAr:
      'مناهج تدريبية مخصصة تم تطويرها خصيصًا لتلبية احتياجات مؤسستك الفريدة ومتطلبات الصناعة.',
  },
  {
    icon: TrendingUp,
    title: 'Performance Improvement',
    titleAr: 'تحسين الأداء',
    description:
      'Strategic consulting to enhance employee performance and organizational effectiveness through targeted interventions.',
    descriptionAr:
      'استشارات استراتيجية لتعزيز أداء الموظفين والفعالية المؤسسية من خلال تدخلات مستهدفة.',
  },
  {
    icon: Award,
    title: 'Leadership Development',
    titleAr: 'تطوير القيادة',
    description:
      'Executive coaching and leadership programs designed to build strong leaders at all organizational levels.',
    descriptionAr:
      'برامج التدريب التنفيذي والقيادة المصممة لبناء قادة أقوياء على جميع المستويات المؤسسية.',
  },
]

const BENEFITS = [
  {
    title: 'Expert Consultants',
    titleAr: 'مستشارون خبراء',
    description: '15+ years of industry experience',
    descriptionAr: 'أكثر من 15 عامًا من الخبرة في الصناعة',
  },
  {
    title: 'Proven Methodology',
    titleAr: 'منهجية مثبتة',
    description: 'Data-driven approach with measurable results',
    descriptionAr: 'نهج قائم على البيانات مع نتائج قابلة للقياس',
  },
  {
    title: 'Customized Solutions',
    titleAr: 'حلول مخصصة',
    description: 'Tailored to your specific needs',
    descriptionAr: 'مصممة خصيصًا لتلبية احتياجاتك',
  },
  {
    title: 'Ongoing Support',
    titleAr: 'دعم مستمر',
    description: 'Continuous guidance and follow-up',
    descriptionAr: 'إرشاد ومتابعة مستمرة',
  },
]

export default function ConsultingServicesPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  const breadcrumbs = [
    { label: 'Home', labelAr: 'الرئيسية', href: '/' },
    { label: 'Consulting Services', labelAr: 'الخدمات الاستشارية' },
  ]

  return (
    <Layout>
      <Hero breadcrumbItems={breadcrumbs}>
        <Title
          title={
            isArabic ? 'الخدمات الاستشارية' : 'Consulting Services'
          }
        />
      </Hero>

      <ContentLayout className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {isArabic
              ? 'حلول تدريبية واستشارية متكاملة'
              : 'Comprehensive Training & Consulting Solutions'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {isArabic
              ? 'نقدم خدمات استشارية متخصصة لمساعدة المؤسسات على تحقيق أهدافها التدريبية والتطويرية من خلال حلول مبتكرة ومخصصة.'
              : 'We provide specialized consulting services to help organizations achieve their training and development goals through innovative and customized solutions.'}
          </p>
        </motion.div>

        <section className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center mb-12"
          >
            {isArabic ? 'خدماتنا الاستشارية' : 'Our Consulting Services'}
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-4 bg-primary/10 rounded-lg shrink-0">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-foreground mb-3">
                        {isArabic ? service.titleAr : service.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {isArabic
                          ? service.descriptionAr
                          : service.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-20 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center mb-12"
          >
            {isArabic ? 'لماذا تختارنا' : 'Why Choose Us'}
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {isArabic ? benefit.titleAr : benefit.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {isArabic ? benefit.descriptionAr : benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {isArabic
              ? 'هل أنت مستعد لتحويل مؤسستك؟'
              : 'Ready to Transform Your Organization?'}
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            {isArabic
              ? 'تواصل معنا اليوم لمناقشة احتياجاتك التدريبية والاستشارية والحصول على حل مخصص لمؤسستك.'
              : 'Contact us today to discuss your training and consulting needs and get a customized solution for your organization.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full h-14 px-10"
              >
                {isArabic ? 'تواصل معنا' : 'Contact Us'}
                <ArrowRight className="w-5 h-5 mr-2" />
              </Button>
            </Link>
            <Link href="/apply-for-program/custom">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-14 px-10 bg-white/10 border-white text-white hover:bg-white hover:text-primary"
              >
                {isArabic ? 'طلب استشارة' : 'Request Consultation'}
              </Button>
            </Link>
          </div>
        </motion.section>
      </ContentLayout>
    </Layout>
  )
}
