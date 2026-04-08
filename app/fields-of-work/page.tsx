'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Layout, ContentLayout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { Title } from '@/components/shared/title'
import { Card } from '@/components/ui/card'
import {
  Building2,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Factory,
  Hospital,
  Briefcase,
  Users,
} from 'lucide-react'

const FIELDS = [
  {
    icon: Building2,
    title: 'Corporate Sector',
    titleAr: 'القطاع المؤسسي',
    description:
      'Training and development programs for private sector companies across all industries, focusing on leadership, management, and professional skills.',
    descriptionAr:
      'برامج التدريب والتطوير لشركات القطاع الخاص في جميع الصناعات، مع التركيز على القيادة والإدارة والمهارات المهنية.',
  },
  {
    icon: Landmark,
    title: 'Government Entities',
    titleAr: 'الجهات الحكومية',
    description:
      'Specialized training solutions for government organizations, ministries, and public sector institutions to enhance service delivery and efficiency.',
    descriptionAr:
      'حلول تدريبية متخصصة للمؤسسات الحكومية والوزارات ومؤسسات القطاع العام لتعزيز تقديم الخدمات والكفاءة.',
  },
  {
    icon: HeartHandshake,
    title: 'NGOs & Non-Profits',
    titleAr: 'المنظمات غير الحكومية',
    description:
      'Capacity building and organizational development programs tailored for NGOs, charities, and civil society organizations.',
    descriptionAr:
      'برامج بناء القدرات والتطوير المؤسسي المصممة خصيصًا للمنظمات غير الحكومية والجمعيات الخيرية ومنظمات المجتمع المدني.',
  },
  {
    icon: GraduationCap,
    title: 'Educational Institutions',
    titleAr: 'المؤسسات التعليمية',
    description:
      'Professional development for educators, administrators, and academic staff to enhance teaching quality and institutional effectiveness.',
    descriptionAr:
      'التطوير المهني للمعلمين والإداريين والهيئة الأكاديمية لتعزيز جودة التعليم والفعالية المؤسسية.',
  },
  {
    icon: Hospital,
    title: 'Healthcare Sector',
    titleAr: 'القطاع الصحي',
    description:
      'Specialized training for healthcare professionals, focusing on leadership, patient care, and healthcare management excellence.',
    descriptionAr:
      'تدريب متخصص لمتخصصي الرعاية الصحية، مع التركيز على القيادة ورعاية المرضى والتميز في إدارة الرعاية الصحية.',
  },
  {
    icon: Factory,
    title: 'Manufacturing & Industry',
    titleAr: 'التصنيع والصناعة',
    description:
      'Technical and managerial training programs for manufacturing and industrial sectors, including quality management and operational excellence.',
    descriptionAr:
      'برامج تدريبية فنية وإدارية لقطاعات التصنيع والصناعة، بما في ذلك إدارة الجودة والتميز التشغيلي.',
  },
  {
    icon: Briefcase,
    title: 'Financial Services',
    titleAr: 'الخدمات المالية',
    description:
      'Professional training for banking, insurance, and financial institutions focusing on compliance, risk management, and customer service.',
    descriptionAr:
      'تدريب مهني للبنوك والتأمين والمؤسسات المالية مع التركيز على الامتثال وإدارة المخاطر وخدمة العملاء.',
  },
  {
    icon: Users,
    title: 'SMEs & Startups',
    titleAr: 'المشاريع الصغيرة والناشئة',
    description:
      'Entrepreneurship and business development training for small and medium enterprises and startup founders.',
    descriptionAr:
      'تدريب ريادة الأعمال وتطوير الأعمال للمشاريع الصغيرة والمتوسطة ومؤسسي الشركات الناشئة.',
  },
]

export default function FieldsOfWorkPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  const breadcrumbs = [
    { label: 'Home', labelAr: 'الرئيسية', href: '/' },
    { label: 'Fields of Work', labelAr: 'مجالات العمل' },
  ]

  return (
    <Layout>
      <Hero breadcrumbItems={breadcrumbs}>
        <Title title={isArabic ? 'مجالات العمل' : 'Fields of Work'} />
      </Hero>

      <ContentLayout className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {isArabic
              ? 'نخدم مختلف القطاعات والصناعات'
              : 'Serving Diverse Sectors & Industries'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {isArabic
              ? 'نقدم حلول تدريبية متخصصة ومصممة خصيصًا لتلبية الاحتياجات الفريدة لكل قطاع، مع خبرة واسعة في مختلف المجالات.'
              : 'We provide specialized training solutions tailored to meet the unique needs of each sector, with extensive experience across various industries.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FIELDS.map((field, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 h-full hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl mb-6">
                    <field.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {isArabic ? field.titleAr : field.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {isArabic ? field.descriptionAr : field.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {isArabic
                ? 'قطاعك غير موجود في القائمة؟'
                : 'Your Sector Not Listed?'}
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              {isArabic
                ? 'نحن نعمل مع مجموعة واسعة من القطاعات والصناعات. تواصل معنا لمناقشة احتياجاتك التدريبية الخاصة.'
                : 'We work with a wide range of sectors and industries. Contact us to discuss your specific training needs.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="px-4 py-2 bg-white rounded-full text-sm font-medium text-foreground shadow-sm">
                {isArabic ? 'الاتصالات' : 'Telecommunications'}
              </div>
              <div className="px-4 py-2 bg-white rounded-full text-sm font-medium text-foreground shadow-sm">
                {isArabic ? 'الطاقة' : 'Energy'}
              </div>
              <div className="px-4 py-2 bg-white rounded-full text-sm font-medium text-foreground shadow-sm">
                {isArabic ? 'السياحة' : 'Tourism'}
              </div>
              <div className="px-4 py-2 bg-white rounded-full text-sm font-medium text-foreground shadow-sm">
                {isArabic ? 'التكنولوجيا' : 'Technology'}
              </div>
              <div className="px-4 py-2 bg-white rounded-full text-sm font-medium text-foreground shadow-sm">
                {isArabic ? 'النقل' : 'Transportation'}
              </div>
              <div className="px-4 py-2 bg-white rounded-full text-sm font-medium text-foreground shadow-sm">
                {isArabic ? 'العقارات' : 'Real Estate'}
              </div>
            </div>
          </div>
        </motion.section>
      </ContentLayout>
    </Layout>
  )
}
