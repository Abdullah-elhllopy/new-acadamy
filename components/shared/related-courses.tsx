'use client'

import { ProgramCard } from '@/components/cards/program-card'
import { Program, Session } from '@/shared/types'

interface RelatedCoursesProps {
  courses: (Program & { sessions: Session[] })[]
  language: 'en' | 'ar'
}

export function RelatedCourses({
  courses,
  language,

}: RelatedCoursesProps) {


  if (!courses || courses.length === 0) {
    return null
  }

  return (

    <section className="py-20 px-4 md:px-20">
      <h2 className="text-4xl font-bold text-primary text-center mb-10">دورات ذات صله</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.map((course) => (
          <ProgramCard
            key={course.id}
            program={course}
            session={course.sessions[0]}
            language={language}
          />
        ))}
      </div>
    </section>
  )
}
