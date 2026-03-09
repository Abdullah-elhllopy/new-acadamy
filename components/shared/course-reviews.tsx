import Link from 'next/link'
import { Star } from 'lucide-react'
import { SimpleAvatar } from './simple-avatar'

interface Review {
  id: number
  author: string
  date: string
  rating: number
  comment: string
  avatar: string
}

export function CourseReviews({ reviews }: { reviews: Review[] }) {
  return (
    <section>
      <h2 className="text-4xl font-bold text-primary mb-10">اراء المتدربين</h2>
      <div className="flex items-center gap-5 mb-10">
        <span className="text-5xl font-bold text-primary">4.5</span>
        <div>
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
            ))}
          </div>
          <span className="text-primary">( مراجعة 15 )</span>
        </div>
      </div>
      <div className="space-y-10">
        {reviews.map((review) => (
          <div key={review.id}>
            <div className="flex items-start gap-4 mb-3">
              <SimpleAvatar src={review.avatar} alt={review.author} className="w-16 h-16" />
              <div className="flex-1">
                <h4 className="text-xl font-bold text-primary">
                  {review.author}
                  <span className="text-base text-hero-bg font-normal mr-5">{review.date}</span>
                </h4>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-hero-bg leading-relaxed">{review.comment}</p>
          </div>
        ))}
        <Link href="#" className="text-primary hover:text-secondary transition-base">
          اظهار المزيد
        </Link>
      </div>
    </section>
  )
}
