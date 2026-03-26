'use client'

import Link from 'next/link'
import { useTranslate } from '@/locales/use-locales'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockPrograms } from '@/app/programs/page'
import { ProgramCard } from '../../cards/program-card'

export function FeaturedPrograms() {
  const { t, currentLang } = useTranslate('programs')

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
              {mockPrograms.filter(p => p.type === 'new').map((program) => (
                <ProgramCard program={program } key={`home_${program.id}`} language={currentLang.value as any} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mostWanted">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockPrograms.filter(p => p.type === 'mostWanted').map((program) => (
                <ProgramCard program={program } key={`home_${program.id}`} language={currentLang.value as any} />
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
