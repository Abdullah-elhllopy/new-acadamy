'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslate } from '@/locales/use-locales'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, MapPin, Star, ArrowRight, Calendar } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function FeaturedPrograms() {
  const { t, currentLang } = useTranslate('programs')

  const programs = [
    {
      id: 1,
      titleEn: 'Leadership Development',
      titleAr: 'تطوير المهارات القيادية',
      descriptionEn: 'Comprehensive program for developing leadership skills',
      descriptionAr: 'برنامج شامل لتطوير المهارات القيادية',
      category: currentLang.value === 'ar' ? 'القيادة' : 'Leadership',
      trainer: currentLang.value === 'ar' ? 'د. محمد أحمد' : 'Dr. Mohammed Ahmed',
      location: currentLang.value === 'ar' ? 'الرياض' : 'Riyadh',
      duration: '24',
      price: '2,999',
      date: '2024-03-15',
      image: '/placeholder.jpg',
      type: 'new',
    },
    {
      id: 2,
      titleEn: 'Digital Marketing',
      titleAr: 'التسويق الرقمي',
      descriptionEn: 'Modern digital marketing strategies',
      descriptionAr: 'استراتيجيات التسويق الرقمي',
      category: currentLang.value === 'ar' ? 'التسويق' : 'Marketing',
      trainer: currentLang.value === 'ar' ? 'فاطمة الشهري' : 'Fatima Al-Shehri',
      location: currentLang.value === 'ar' ? 'جدة' : 'Jeddah',
      duration: '40',
      price: '3,499',
      date: '2024-03-22',
      image: '/placeholder.jpg',
      type: 'mostWanted',
    },
    {
      id: 3,
      titleEn: 'Project Management',
      titleAr: 'إدارة المشاريع',
      descriptionEn: 'Master project management methodologies',
      descriptionAr: 'إتقان منهجيات إدارة المشاريع',
      category: currentLang.value === 'ar' ? 'الإدارة' : 'Management',
      trainer: currentLang.value === 'ar' ? 'أ. سلمان الدوسري' : 'A. Salman Al-Dosari',
      location: currentLang.value === 'ar' ? 'الدمام' : 'Dammam',
      duration: '32',
      price: '2,799',
      date: '2024-03-29',
      image: '/placeholder.jpg',
      type: 'new',
    },
  ]

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-20">
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-12">
          {t('title')}
        </h2>

        <Tabs defaultValue="new" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-10">
            <TabsTrigger value="new" className="rounded-full">
              {t('new')}
            </TabsTrigger>
            <TabsTrigger value="mostWanted" className="rounded-full">
              {t('mostWanted')}
            </TabsTrigger>
            <TabsTrigger value="soon" className="rounded-full">
              {t('soon')}
            </TabsTrigger>
            <TabsTrigger value="recommended" className="rounded-full">
              {t('recommended')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.filter(p => p.type === 'new').map((program) => (
                <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-border rounded-xl">
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <Badge className="absolute top-4 right-4 bg-white text-primary border-none shadow-sm">
                      {program.category}
                    </Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-primary">
                      {currentLang.value === 'ar' ? program.titleAr : program.titleEn}
                    </CardTitle>
                    <CardDescription>
                      {currentLang.value === 'ar' ? program.descriptionAr : program.descriptionEn}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-semibold text-foreground">{program.trainer}</span>
                      </p>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{t('starts')} {program.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{program.duration} {t('hours')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{program.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <p className="text-2xl font-bold text-primary">
                        {program.price} <span className="text-sm font-normal text-muted-foreground">SR</span>
                      </p>
                      <Button size="sm" className="rounded-full bg-primary hover:bg-secondary" asChild>
                        <Link href={`/programs/${program.id}`}>
                          {t('details')}
                          <ArrowRight className="w-4 h-4 mr-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mostWanted">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.filter(p => p.type === 'mostWanted').map((program) => (
                <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-border rounded-xl">
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <Badge className="absolute top-4 right-4 bg-white text-primary border-none shadow-sm">
                      {program.category}
                    </Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-primary">
                      {currentLang.value === 'ar' ? program.titleAr : program.titleEn}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between pt-4">
                      <p className="text-2xl font-bold text-primary">
                        {program.price} <span className="text-sm font-normal">SR</span>
                      </p>
                      <Button size="sm" className="rounded-full" asChild>
                        <Link href={`/programs/${program.id}`}>
                          {t('view')}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="soon">
            <div className="text-center py-12 text-muted-foreground">
              {t('comingSoon')}
            </div>
          </TabsContent>

          <TabsContent value="recommended">
            <div className="text-center py-12 text-muted-foreground">
              {t('comingSoon')}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button size="lg" className="rounded-full h-14 px-10 bg-primary hover:bg-secondary" asChild>
            <Link href="/programs">
              {t('browseAll')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
