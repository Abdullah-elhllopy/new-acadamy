'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Video, HelpCircle } from 'lucide-react'
interface LectureSection {
  lecturedescription : string;
  lectureid : string;
  lecturename : string;
}

export function CourseLectures({ lectures }: { lectures: LectureSection[] }) {
  return (
    <div className="bg-muted p-10 rounded-lg">
      <h2 className="text-4xl font-bold text-primary mb-10">محتويات هذه الدورة</h2>
      <Accordion type="multiple" className="space-y-4">
          <AccordionItem  value="section-1" className="border border-foreground rounded-sm  ">
            <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-transparent font-bold text-primary text-base">
              المحتوى
            </AccordionTrigger>
            <AccordionContent className="p-0">
              {lectures.map((lecture) => (
                <div key={lecture.lectureid} className="px-4 py-3 grid grid-cols-[5%_80%_10%] gap-5 items-center border-t border-border/50">
                  {lecture.lectureid === 'video' ? (
                    <Video className="w-6 h-6 text-primary" />
                  ) : (
                    <HelpCircle className="w-6 h-6 text-primary" />
                  )}
                  <span className="text-sm font-bold text-primary pt-2">{lecture.lecturename}</span>
                  {/* <span className="text-base text-primary">{lecture.duration}</span> */}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
      <div className='h-1'/>

      </Accordion>
    </div>
  )
}
