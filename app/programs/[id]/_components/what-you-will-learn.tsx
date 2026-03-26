'use client'
export function WhatYouWillLearn({ objectives }: { objectives: string[] }) {
  return (
    <div>
      <h2 className="text-4xl font-bold text-primary mb-10">سنتعلم في هذه الدورة</h2>
      <div className="space-y-5">
        {objectives.map((point, idx) => (
          <p key={idx} className="text-xl text-primary flex items-start gap-3">
            <span className="text-secondary text-2xl mt-1">✓</span>
            {point}
          </p>
        ))}
      </div>
    </div>
  )
}
