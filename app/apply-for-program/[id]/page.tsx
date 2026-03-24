// app/[locale]/apply/team/[courseId]/page.tsx
'use client'
import { TeamApplicationForm } from './_components/team-application-form'
import { EmptyState } from '@/components/states/empty-state'
import { useCourseDetails } from './_hooks/use-team-application'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { GallerySkeleton } from '@/app/images-center/_components/gallery-skeleton'
import { ContentLayout, Layout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { Title } from '@/components/shared/title'
import { CourseDetailsCard } from '@/app/payment/[id]/_components'

export default function TeamApplicationPage() {
    // const params = useParams()
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const { course, loading, error } = useCourseDetails('leadership-masterclass')

    if (loading) {
        return (
            <div className="min-h-screen bg-background pt-20">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                        <GallerySkeleton count={5} variant="groups" />
                        <GallerySkeleton count={1} variant="groups" />
                    </div>
                </div>
            </div>
        )
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-background pt-20">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <EmptyState
                        // type="no-results"
                        title={isArabic ? 'الدورة غير موجودة' : 'Course not found'}
                        description={isArabic ? 'الرجاء التحقق من الرابط' : 'Please check the URL'}
                    />
                </div>
            </div>
        )
    }

    const title = isArabic ? 'تدريب مجموعة أو فريق' : 'Group or Team Training'

    return (
        <Layout>
            {/* Header */}
            <Hero>
                <Title title={title} />
            </Hero>

            {/* Main Content */}
            <ContentLayout>
                <section className="grid grid-cols-1 lg:grid-cols-[44%_10%_45%] gap-2">
                    <TeamApplicationForm
                        courseId={course.id}
                        courseName={isArabic ? course.nameAr : course.name}
                    />
                    <div />
                    <CourseDetailsCard course={{
                        // courseId: 1,
                        courseSpecies: 'حضوري',
                        courseName: 'مهارات القيادة المتقدمة',
                        courseDescripTion: 'دورة تدريبية متقدمة في مهارات القيادة والإدارة الفعالة',
                        courseStartDate: '2024-02-15',
                        courseNumberOfHours: 40,
                        numberOfMonths: 2,
                        placeSub: 'الرياض',
                        place: 'مركز التدريب',
                        courseCost: 2500
                    }} />
                </section>
            </ContentLayout>
        </Layout>
    )
}