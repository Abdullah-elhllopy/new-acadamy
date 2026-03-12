// app/[locale]/courses/online/page.tsx
// import { CoursesTemplate } from '@/components/templates/courses-template'

import { CoursesTemplate } from "@/components/templates/courses-template";

export default function OnlineCoursesPage() {
  return (
    <CoursesTemplate
      type="online"
      title={{ en: 'Online Courses', ar: 'الدورات الأونلاين' }}
      description={{
        en: 'Learn anytime, anywhere with our online training courses',
        ar: 'تعلم في أي وقت ومن أي مكان مع دوراتنا التدريبية عبر الإنترنت'
      }}
    />
  )
}