// hooks/use-courses.ts
'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Program, Trainer } from '@/shared/types'
import { useCourses as useCoursesAPI, useCoursesFilterByBool } from '@/hooks/api/use-courses'
import { useMainDepartments, useSubDepartmentsByMain } from '@/hooks/api/use-departments'
import { MainDepartment, SubDepartment } from '@/services/api'

export interface PaginationParams {
    page: number
    limit: number
    total: number
}

export interface CourseFilters {
    department?: string
    subDepartment?: string
    search?: string
    priceRange?: [number, number]
    locations?: string[]
}


interface UseCoursesOptions {
    type: 'presence' | 'online' | 'live'
    initialFilters?: CourseFilters
}

interface UseCoursesReturn {
    courses: Program[]
    departments: MainDepartment[]
    subDepartments: SubDepartment[]
    loading: boolean
    error: Error | null
    pagination: PaginationParams & { totalPages: number }
    filters: CourseFilters
    activeDepartment: string | null
    activeSubDepartment: string | null
    setPage: (page: number) => void
    setFilters: (filters: CourseFilters) => void
    selectDepartment: (id: string | null) => void
    selectSubDepartment: (id: string | null) => void
    refresh: () => void
}

export function useCourses({ type, initialFilters }: UseCoursesOptions): UseCoursesReturn {
    const [activeDepartment, setActiveDepartment] = useState<string | null>(null)
    const [activeSubDepartment, setActiveSubDepartment] = useState<string | null>(null)
    const [pagination, setPagination] = useState<PaginationParams>({
        page: 1,
        limit: 9,
        total: 0
    })
    const [filters, setFilters] = useState<CourseFilters>(initialFilters || {})

    // Fetch all courses (we'll filter by type client-side)
    const { data: coursesData, isLoading: coursesLoading, error: coursesError } = useCoursesAPI()
    const { data: departments, isLoading: deptLoading } = useMainDepartments()
    const { data: subDepartments, isLoading: subDeptLoading } = useSubDepartmentsByMain(activeDepartment || '')

    // Transform API data
    const courses = useMemo(() => {
        if (!coursesData?.allCoursesDetails) return []
        let filtered = coursesData.allCoursesDetails

        // Filter by course type
        if (type === 'presence') {
            filtered = filtered.filter(c => c.courseType?.toLowerCase() === 'offline')
        } else if (type === 'online') {
            filtered = filtered.filter(c => c.courseType?.toLowerCase() === 'online')
        } else if (type === 'live') {
            filtered = filtered.filter(c => c.courseType?.includes('مباشر'))
        }

        // Filter by department
        if (activeDepartment) {
            filtered = filtered.filter(c => c.mainDebId === activeDepartment)
        }

        // Filter by sub-department
        if (activeSubDepartment) {
            filtered = filtered.filter(c => c.subDebId === activeSubDepartment)
        }

        // Map Course to Program
        return filtered.map(course => ({
            id: course.courseId,
            titleEn: course.courseName,
            titleAr: course.courseName,
            descriptionEn: course.courseDescripTion,
            descriptionAr: course.courseDescripTion,
            category: course.mainDebId || '',
            trainer: course.ourinstructors?.[0] ? {
                id: course.ourinstructors[0].instructorId || '',
                nameEn: course.ourinstructors[0].instructorName || '',
                nameAr: course.ourinstructors[0].instructorNameAr || '',
                rating: 0,
                reviewCount: 0,
                photo: course.ourinstructors[0].instructorImage
            } : {
                id: '',
                nameEn: '',
                nameAr: '',
                rating: 0,
                reviewCount: 0
            },
            location: course.place,
            price: course.courseCost,
            duration: course.courseNumberOfHours,
            capacity: 0,
            image: course.image,
            objectives: course.wwwlText || [],
            createdAt: new Date(),
            updatedAt: new Date(),
            courseType: course.courseType,
            status: (course.now ? 'in-progress' : course.soon ? 'upcoming' : 'completed') as 'in-progress' | 'upcoming' | 'completed'
        } as Program))
    }, [coursesData, activeDepartment, activeSubDepartment, type])

    useEffect(() => {
        setPagination(prev => ({ ...prev, total: courses.length }))
    }, [courses.length])

    // Reset sub-department when department changes
    useEffect(() => {
        if (!activeDepartment) {
            setActiveSubDepartment(null)
        }
    }, [activeDepartment])

    const setPage = useCallback((page: number) => {
        setPagination(prev => ({ ...prev, page }))
    }, [])

    const selectDepartment = useCallback((id: string | null) => {
        setActiveDepartment(id)
        setActiveSubDepartment(null)
        setPagination(prev => ({ ...prev, page: 1 }))
    }, [])

    const selectSubDepartment = useCallback((id: string | null) => {
        setActiveSubDepartment(id)
        setPagination(prev => ({ ...prev, page: 1 }))
    }, [])

    const updateFilters = useCallback((newFilters: CourseFilters) => {
        setFilters(newFilters)
        setPagination(prev => ({ ...prev, page: 1 }))
    }, [])

    const totalPages = useMemo(() =>
        Math.max(1, Math.ceil(pagination.total / pagination.limit)),
        [pagination.total, pagination.limit]
    )

    const loading = coursesLoading || deptLoading
    const error = coursesError as Error | null

    return {
        courses,
        departments : departments || [],
        subDepartments :subDepartments || [],
        loading,
        error,
        pagination: {
            ...pagination,
            totalPages
        },
        filters,
        activeDepartment,
        activeSubDepartment,
        setPage,
        setFilters: updateFilters,
        selectDepartment,
        selectSubDepartment,
        refresh: () => {}
    }
}