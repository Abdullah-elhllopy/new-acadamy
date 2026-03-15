// hooks/use-team-application.ts
'use client'

import { useState, useCallback } from 'react'
// import { useMutation } from '@tanstack/react-query'
import { TeamApplicationFormData } from '@/types/team-application'
import { CourseDetails } from '@/types/team-application'
import { DUMMY_COURSE_DETAILS } from '@/data/team-application-data'

interface UseCourseDetailsReturn {
    course: CourseDetails | null
    loading: boolean
    error: Error | null
}

const simulateDelay = (ms: number = 400) =>
    new Promise(resolve => setTimeout(resolve, ms))

export function useCourseDetails(courseId: string): UseCourseDetailsReturn {
    const [course, setCourse] = useState<CourseDetails | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    // Simulate fetch
    const fetchCourse = useCallback(async () => {
        setLoading(true)
        try {
            await simulateDelay(500)
            const data = DUMMY_COURSE_DETAILS[courseId]
            if (!data) throw new Error('Course not found')
            setCourse(data)
        } catch (err) {
            setError(err as Error)
        } finally {
            setLoading(false)
        }
    }, [courseId])

    // Auto-fetch on mount
    useState(() => {
        fetchCourse()
    })

    return { course, loading, error }
}

// Submission hook
async function submitApplication(data: TeamApplicationFormData): Promise<{ success: boolean }> {
    await simulateDelay(1500)

    // Simulate API call
    console.log('Submitting application:', data)

    // Simulate random success (95% success rate)
    if (Math.random() > 0.05) {
        return { success: true }
    }
    throw new Error('Server error')
}

export function useTeamApplication() {
    // return useMutation({
    //     mutationFn: submitApplication,
    //     onSuccess: () => {
    //         // Redirect handled in component
    //     }
    // })
}