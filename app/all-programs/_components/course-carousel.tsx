// components/courses/course-carousel.tsx
'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { ProgramCourse } from '@/types/programs'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { ProgramCard } from '@/components/cards/program-card'
import { mockPrograms } from '@/app/programs/page'

interface CourseCarouselProps {
    courses: ProgramCourse[]
    className?: string
}

export function CourseCarousel({ courses, className }: CourseCarouselProps) {
    const { isRTL } = useLanguage()

    if (courses.length === 0) return null

    return (
        <Carousel
            opts={{
                loop: true,
                align: 'start',
                direction: isRTL ? 'rtl' : 'ltr',
                slidesToScroll: 1,
                containScroll: 'trimSnaps'
            }}
            className={cn("relative", className)}
        >
            {({ scrollPrev, scrollNext, canScrollPrev, canScrollNext }) => (
                <>
                    <div className={cn("absolute -top-20 flex gap-3", isRTL ? "left-0 flex-row-reverse" : "right-0 ")}>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={scrollPrev}
                            disabled={!canScrollPrev}
                            className={cn(
                                "rounded-full w-12 h-12 border-foreground bg-white hover:bg-primary hover:text-primary-foreground transition-colors",
                                !canScrollPrev && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={scrollNext}
                            disabled={!canScrollNext}
                            className={cn(
                                "rounded-full w-12 h-12 border-foreground bg-white hover:bg-primary hover:text-primary-foreground transition-colors",
                                !canScrollNext && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>

                    <CarouselContent className="-ml-6">
                        {mockPrograms.map((course, index) => (
                            <CarouselItem key={course.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <ProgramCard   program={course} language={'ar'} />
                                </motion.div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </>
            )}
        </Carousel>
    )
}