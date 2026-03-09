'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Video, HelpCircle } from 'lucide-react'

interface Lecture {
  id: number
  title: string
  duration: string
  type: 'video' | 'quiz'
}

interface LectureSection {
  id: number
  lecturename: string
  lectures: Lecture[]
}

export function CourseLectures({ lectures }: { lectures: LectureSection[] }) {
  return (
    <div className="bg-muted p-10 rounded-lg">
      <h2 className="text-4xl font-bold text-primary mb-10">محتويات هذه الدورة</h2>
      <Accordion type="multiple" className="space-y-4">
        {lectures.map((section) => (
          <AccordionItem key={section.id} value={`section-${section.id}`} className="border border-primary bg-muted overflow-visible">
            <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-transparent font-bold text-primary text-base">
              {section.lecturename}
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-0">
              {section.lectures.map((lecture) => (
                <div key={lecture.id} className="px-4 py-3 grid grid-cols-[5%_80%_10%] gap-5 items-center border-t border-border/50">
                  {lecture.type === 'video' ? (
                    <Video className="w-6 h-6 text-primary" />
                  ) : (
                    <HelpCircle className="w-6 h-6 text-primary" />
                  )}
                  <span className="text-sm font-bold text-primary pt-2">{lecture.title}</span>
                  <span className="text-base text-primary">{lecture.duration}</span>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
