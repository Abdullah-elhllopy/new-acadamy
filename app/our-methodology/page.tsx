'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Layout, ContentLayout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { Title } from '@/components/shared/title'
import { Card } from '@/components/ui/card'
import {
  Search,
  Target,
  Lightbulb,
  Rocket,
  BarChart3,
  RefreshCw,
} from 'lucide-react'

const METHODOLOGY_STEPS = [
  {
    icon: Search,
    step: '01',
    title: 'Needs Assessment',
    titleAr: 'تقييم الاحتياجات',
    description:
      'We begin by conducting a comprehensive analysis of your organization\'s training needs, identifying skill gaps, and understanding your strategic objectives.',
    descriptionAr:
      'نبدأ بإجراء تحليل شامل لاحتياجات التدريب في مؤسستك، وتحديد فجوات المهارات، وفهم أهدافك الاستراتيجية.',
  },
  {
    icon: Target,
    step: '02',
    title: 'Goal Setting',
    titleAr: 'تحديد الأهداف',
    description:
      'Together, we establish clear, measurable learning objectives aligned with your organizational goals and desired outcomes.',
    descriptionAr:
      'معًا، نضع أهداف تعليمية واضحة وقابلة للقياس تتماشى مع أهداف مؤسستك والنتائج المرجوة.',
  },
  {
    icon: Lightbulb,
    step: '03',
    title: 'Program Design',
    titleAr: 'تصميم البرنامج',
    description:
      'Our experts design customized training programs using proven methodologies, interactive techniques, and industry best practices.',
    descriptionAr:
      'يقوم خبراؤنا بتصميم برامج تدريبية مخصصة باستخدام منهجيات مثبتة وتقنيات تفاعلية وأفضل الممارسات في الصناعة.',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Implementation',
    titleAr: 'التنفيذ',
    description:
      'We deliver engaging training sessions through experienced facilitators, utilizing modern tools and techniques to maximize learning impact.',
    descriptionAr:
      'نقدم جلسات تدريبية جذابة من خلال ميسرين ذوي خبرة، باستخدام أدوات وتقنيات حديثة لتعظيم تأثير التعلم.',
  },
  {
    icon: BarChart3,
    step: '05',
    title: 'Evaluation',
    titleAr: 'التقييم',
    description:
      'We measure training effectiveness through comprehensive assessments, feedback collection, and performance metrics analysis.',
    descriptionAr:
      'نقيس فعالية التدريب من خلال تقييمات شاملة وجمع الملاحظات وتحليل مقاييس الأداء.',
  },
  {
    icon: RefreshCw,
    step: '06',
    title: 'Continuous Improvement',
    titleAr: 'التحسين المستمر',
    description:
      'Based on evaluation results, we refine and optimize programs to ensure sustained impact and continuous development.',
    descriptionAr:
      'بناءً على نتائج التقييم، نقوم بتحسين وتطوير البرامج لضمان التأثير المستدام والتطوير المستمر.',
  },
]

const PRINCIPLES = [
  {
    title: 'Learner-Centered Approach',
    titleAr: 'نهج يركز على المتعلم',
    description: 'Tailored to individual learning styles and needs',
    descriptionAr: 'مصمم وفقًا لأساليب واحتياجات التعلم الفردية',
  },
  {
    title: 'Practical Application',
    titleAr: 'التطبيق العملي',
    description: 'Focus on real-world scenarios and hands-on practice',
    descriptionAr: 'التركيز على السيناريوهات الواقعية والممارسة العملية',
  },
  {
    title: 'Evidence-Based',
    titleAr: 'قائم على الأدلة',
    description: 'Grounded in research and proven learning theories',
    descriptionAr: 'مبني على البحث ونظريات التعلم المثبتة',
  },
  {
    title: 'Interactive Learning',
    titleAr: 'التعلم التفاعلي',
    description: 'Engaging activities and collaborative exercises',
    descriptionAr: 'أنشطة جذابة وتمارين تعاونية',
  },
]

export default function OurMethodologyPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  const breadcrumbs = [
    { label: 'Home', labelAr: 'الرئيسية', href: '/' },
    { label: 'Our Methodology', labelAr: 'منهجيتنا' },
  ]

  return (
    <Layout>
      <Hero breadcrumbItems={breadcrumbs}>
        <Title title={isArabic ? 'منهجيتنا' : 'Our Methodology'} />
      </Hero>

      <ContentLayout className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {isArabic
              ? 'نهج منظم لتحقيق التميز في التدريب'
              : 'A Structured Approach to Training Excellence'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {isArabic
              ? 'منهجيتنا المثبتة تضمن تقديم برامج تدريبية عالية الجودة تحقق نتائج قابلة للقياس وتأثير مستدام على مؤسستك.'
              : 'Our proven methodology ensures the delivery of high-quality training programs that achieve measurable results and lasting impact on your organization.'}
          </p>
        </motion.div>

        <section className="mb-20">
          <div className="space-y-12">
            {METHODOLOGY_STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-6xl font-bold text-primary/10">
                        {step.step}
                      </div>
                      <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl">
                        <step.icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {isArabic ? step.titleAr : step.title}
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {isArabic ? step.descriptionAr : step.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {isArabic ? 'مبادئنا الأساسية' : 'Our Core Principles'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRINCIPLES.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    {isArabic ? principle.titleAr : principle.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {isArabic
                      ? principle.descriptionAr
                      : principle.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {isArabic
                ? 'النتيجة: تحول حقيقي وقابل للقياس'
                : 'The Result: Real, Measurable Transformation'}
            </h3>
            <p className="text-lg text-muted-foreground">
              {isArabic
                ? 'من خلال اتباع منهجيتنا المنظمة، نضمن أن كل برنامج تدريبي يقدم قيمة حقيقية، ويحسن الأداء، ويساهم في تحقيق أهدافك الاستراتيجية.'
                : 'By following our structured methodology, we ensure that every training program delivers real value, improves performance, and contributes to achieving your strategic objectives.'}
            </p>
          </div>
        </motion.section>
      </ContentLayout>
    </Layout>
  )
}
