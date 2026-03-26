'use client'

import { SimpleAvatar } from '../../../../components/shared/simple-avatar'

interface Trainer {
  instructorid: number
  instructorname: string
  instructorfield: string
  instructorimage: string
}

export function CourseTrainers({ trainers }: { trainers: Trainer[] }) {
  return (
    <div>
      <h2 className="text-4xl font-bold text-primary mb-10">المدربون</h2>
      <div className="space-y-10">
        {trainers.map((trainer) => (
          <div key={trainer.instructorid} className="flex items-center gap-6">
            <SimpleAvatar 
              src={trainer.instructorimage} 
              alt={trainer.instructorname} 
              className="w-25 h-25 text-2xl"
            />
            <div>
              <h3 className="text-[28px] font-bold text-primary hover:text-secondary transition-base cursor-pointer">
                {trainer.instructorname}
              </h3>
              <p className="text-hero-bg mt-1">{trainer.instructorfield}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
