// hooks/use-courses.ts
'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Program, Trainer } from '@/shared/types'
import { useFilteredPagedCourses } from '@/hooks/api/use-courses'
import { useMainDepartments, useSubDepartmentsByMain } from '@/hooks/api/use-departments'
import { MainDepartment, SubDepartment, Course } from '@/services/api'

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
    type?: 'presence' | 'online' | 'live'
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
    const searchParams = useSearchParams()
    const departmentId = searchParams.get('category')
    const [activeDepartment, setActiveDepartment] = useState<string | null>(departmentId || null)
    const [activeSubDepartment, setActiveSubDepartment] = useState<string | null>(null)
    const [pagination, setPagination] = useState<PaginationParams>({
        page: 1,
        limit: 9,
        total: 0
    })
    const [filters, setFilters] = useState<CourseFilters>(initialFilters || {})

    // Fetch paginated courses with filters
    const { data: apiResponse, isLoading: coursesLoading, error: coursesError, refetch } = useFilteredPagedCourses({
        pageNumber: pagination.page,
        pageSize: pagination.limit,
        mainDepartmentId: activeDepartment ||  undefined,
        subDepartmentId: activeSubDepartment || undefined,
    })

    const { data: departments, isLoading: deptLoading } = useMainDepartments()
    const { data: subDepartments } = useSubDepartmentsByMain(activeDepartment || '')

    // Transform API data to Program format
    const courses = useMemo(() => {
        if (!apiResponse?.rows) return []

        return apiResponse.rows.map((course: any) => ({
            id: course.courseId,
            titleEn: course.courseName,
            titleAr: course.courseName,
            descriptionEn: course.courseDescripTion,
            descriptionAr: course.courseDescripTion,
            category: '',
            trainer: course.instructorid ? {
                id: course.instructorid,
                nameEn: course.instructorname || '',
                nameAr: course.instructorname || '',
                rating: 0,
                reviewCount: 0,
                photo: course.instructorimage
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
            objectives: [],
            createdAt: new Date(course.courseStartDate),
            updatedAt: new Date(),
            courseType: course.courseType,
            status: (course.now ? 'in-progress' : course.soon ? 'upcoming' : 'completed') as 'in-progress' | 'upcoming' | 'completed'
        } as Program))
    }, [apiResponse])

    // Update pagination when API response changes
    useEffect(() => {
        if (apiResponse) {
            setPagination(prev => ({
                ...prev,
                total: apiResponse.totalCount || 0
            }))
        }
    }, [apiResponse])

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
        departments: departments || [],
        subDepartments: subDepartments || [],
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
        refresh: refetch
    }
}