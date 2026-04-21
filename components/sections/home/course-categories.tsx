'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { useMainDepartments } from '@/hooks/api/use-departments'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { TitleContainer } from '@/components/shared/title'

export function CourseCategoriesSection() {
  const { isArabic } = useLanguage()
  const { data: departments, isLoading } = useMainDepartments()

  if (isLoading) {
    return (
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-20">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  if (!departments || departments.length === 0) {
    return null
  }

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {isArabic ? 'مجالات التدريب' : 'Training Categories'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isArabic
              ? 'استكشف مجالاتنا التدريبية المتنوعة واختر ما يناسب احتياجاتك'
              : 'Explore our diverse training fields and choose what suits your needs'}
          </p>
        </motion.div>
        <TitleContainer title={isArabic ? 'مجالات التدريب' : 'Training Categories'} subtitle={isArabic
          ? 'استكشف مجالاتنا التدريبية المتنوعة واختر ما يناسب احتياجاتك'
          : 'Explore our diverse training fields and choose what suits your needs'} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.slice(0, 6).map((department, index) => (
            <motion.div
              key={department.departmentID}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/all-courses?category=${department.departmentID}`}>
                <Card className="group hover:shadow-card-hover transition-all duration-300 cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {department.name}
                        </h3>
                        {department.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {department.description}
                          </p>
                        )}
                      </div>
                      <div className="shrink-0 ml-4">
                        {isArabic ? (
                          <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform" />
                        ) : (
                          <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {departments.length > 6 && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="rounded-full h-14 px-10 bg-primary hover:bg-secondary"
              asChild
            >
              <Link href="/all-programs">
                {isArabic ? 'عرض جميع المجالات' : 'View All Categories'}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
