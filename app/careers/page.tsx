'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Clock, Search, Filter } from 'lucide-react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Layout, ContentLayout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { Title } from '@/components/shared/title'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'

// Mock data - will be replaced with API
const MOCK_VACANCIES = [
  {
    id: '1',
    title: 'Senior Training Consultant',
    titleAr: 'مستشار تدريب أول',
    department: 'Training & Development',
    departmentAr: 'التدريب والتطوير',
    location: 'Cairo, Egypt',
    locationAr: 'القاهرة، مصر',
    type: 'Full-time',
    typeAr: 'دوام كامل',
    postedDate: '2024-01-15',
    description: 'Lead training initiatives and develop comprehensive training programs for corporate clients.',
    descriptionAr: 'قيادة مبادرات التدريب وتطوير برامج تدريبية شاملة للعملاء المؤسسيين.',
  },
  {
    id: '2',
    title: 'Corporate Training Specialist',
    titleAr: 'أخصائي تدريب مؤسسي',
    department: 'Corporate Services',
    departmentAr: 'الخدمات المؤسسية',
    location: 'Remote',
    locationAr: 'عن بُعد',
    type: 'Full-time',
    typeAr: 'دوام كامل',
    postedDate: '2024-01-10',
    description: 'Deliver high-quality training sessions to corporate clients across various industries.',
    descriptionAr: 'تقديم جلسات تدريبية عالية الجودة للعملاء المؤسسيين في مختلف الصناعات.',
  },
  {
    id: '3',
    title: 'Content Developer',
    titleAr: 'مطور محتوى تدريبي',
    department: 'Content & Curriculum',
    departmentAr: 'المحتوى والمناهج',
    location: 'Cairo, Egypt',
    locationAr: 'القاهرة، مصر',
    type: 'Part-time',
    typeAr: 'دوام جزئي',
    postedDate: '2024-01-05',
    description: 'Create engaging training content and develop innovative learning materials.',
    descriptionAr: 'إنشاء محتوى تدريبي جذاب وتطوير مواد تعليمية مبتكرة.',
  },
  {
    id: '4',
    title: 'Learning & Development Manager',
    titleAr: 'مدير التعلم والتطوير',
    department: 'Training & Development',
    departmentAr: 'التدريب والتطوير',
    location: 'Cairo, Egypt',
    locationAr: 'القاهرة، مصر',
    type: 'Full-time',
    typeAr: 'دوام كامل',
    postedDate: '2024-01-01',
    description: 'Oversee all learning and development initiatives and manage training team.',
    descriptionAr: 'الإشراف على جميع مبادرات التعلم والتطوير وإدارة فريق التدريب.',
  },
]

export default function CareersPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterLocation, setFilterLocation] = useState('all')

  const breadcrumbs = [
    { label: 'Home', labelAr: 'الرئيسية', href: '/' },
    { label: 'Careers', labelAr: 'الوظائف' },
  ]

  const filteredVacancies = MOCK_VACANCIES.filter((vacancy) => {
    const matchesSearch =
      vacancy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vacancy.titleAr.includes(searchQuery) ||
      vacancy.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vacancy.departmentAr.includes(searchQuery)

    const matchesType = filterType === 'all' || vacancy.type === filterType
    const matchesLocation =
      filterLocation === 'all' || vacancy.location === filterLocation

    return matchesSearch && matchesType && matchesLocation
  })

  return (
    <Layout>
      <Hero breadcrumbItems={breadcrumbs}>
        <Title title={isArabic ? 'الوظائف الشاغرة' : 'Career Opportunities'} />
      </Hero>

      <ContentLayout className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {isArabic ? 'انضم إلى فريقنا' : 'Join Our Team'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {isArabic
              ? 'نبحث عن أفراد موهوبين ومتحمسين للانضمام إلى فريقنا المتنامي. استكشف الفرص المتاحة وابدأ رحلتك المهنية معنا.'
              : 'We are looking for talented and passionate individuals to join our growing team. Explore available opportunities and start your career journey with us.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-md p-6 mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder={
                    isArabic ? 'ابحث عن وظيفة...' : 'Search for a job...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue
                  placeholder={isArabic ? 'نوع الوظيفة' : 'Job Type'}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {isArabic ? 'جميع الأنواع' : 'All Types'}
                </SelectItem>
                <SelectItem value="Full-time">
                  {isArabic ? 'دوام كامل' : 'Full-time'}
                </SelectItem>
                <SelectItem value="Part-time">
                  {isArabic ? 'دوام جزئي' : 'Part-time'}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger>
                <SelectValue
                  placeholder={isArabic ? 'الموقع' : 'Location'}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {isArabic ? 'جميع المواقع' : 'All Locations'}
                </SelectItem>
                <SelectItem value="Cairo, Egypt">
                  {isArabic ? 'القاهرة، مصر' : 'Cairo, Egypt'}
                </SelectItem>
                <SelectItem value="Remote">
                  {isArabic ? 'عن بُعد' : 'Remote'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <div className="mb-6">
          <p className="text-muted-foreground">
            {isArabic
              ? `${filteredVacancies.length} وظيفة متاحة`
              : `${filteredVacancies.length} positions available`}
          </p>
        </div>

        <div className="space-y-6">
          {filteredVacancies.length > 0 ? (
            filteredVacancies.map((vacancy, index) => (
              <motion.div
                key={vacancy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                          <Briefcase className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="text-xl font-bold text-foreground">
                              {isArabic ? vacancy.titleAr : vacancy.title}
                            </h3>
                            <span className="text-xs font-medium px-3 py-1 bg-secondary/20 text-secondary rounded-full whitespace-nowrap">
                              {isArabic ? vacancy.typeAr : vacancy.type}
                            </span>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3">
                            {isArabic
                              ? vacancy.departmentAr
                              : vacancy.department}
                          </p>

                          <p className="text-muted-foreground mb-4">
                            {isArabic
                              ? vacancy.descriptionAr
                              : vacancy.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>
                                {isArabic
                                  ? vacancy.locationAr
                                  : vacancy.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>
                                {isArabic ? 'نُشر في' : 'Posted'}{' '}
                                {new Date(vacancy.postedDate).toLocaleDateString(
                                  isArabic ? 'ar-EG' : 'en-US',
                                  {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:ml-4">
                      <Link href={`/careers/${vacancy.id}`}>
                        <Button className="w-full md:w-auto">
                          {isArabic ? 'التقديم الآن' : 'Apply Now'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card className="p-12 text-center">
              <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {isArabic ? 'لا توجد وظائف' : 'No Vacancies Found'}
              </h3>
              <p className="text-muted-foreground">
                {isArabic
                  ? 'جرب تغيير معايير البحث أو الفلاتر'
                  : 'Try adjusting your search criteria or filters'}
              </p>
            </Card>
          )}
        </div>
      </ContentLayout>
    </Layout>
  )
}
