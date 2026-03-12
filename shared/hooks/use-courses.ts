// hooks/use-courses.ts
'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Program, Trainer } from '@/shared/types'

export interface Department {
    id: string
    name: string
    nameAr: string
    icon?: string
}

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
// Dummy Data
const DUMMY_DEPARTMENTS: Department[] = [
    { id: 'leadership', name: 'Leadership', nameAr: 'القيادة', icon: 'users' },
    { id: 'management', name: 'Management', nameAr: 'الإدارة', icon: 'briefcase' },
    { id: 'technology', name: 'Technology', nameAr: 'التقنية', icon: 'monitor' },
    { id: 'marketing', name: 'Marketing', nameAr: 'التسويق', icon: 'trending-up' },
    { id: 'sales', name: 'Sales', nameAr: 'المبيعات', icon: 'dollar-sign' },
    { id: 'hr', name: 'Human Resources', nameAr: 'الموارد البشرية', icon: 'user-plus' },
]

const DUMMY_SUB_DEPARTMENTS: Record<string, Department[]> = {
    leadership: [
        { id: 'exec-leadership', name: 'Executive Leadership', nameAr: 'القيادة التنفيذية' },
        { id: 'team-leadership', name: 'Team Leadership', nameAr: 'قيادة الفريق' },
        { id: 'strategic-leadership', name: 'Strategic Leadership', nameAr: 'القيادة الاستراتيجية' },
    ],
    management: [
        { id: 'project-mgmt', name: 'Project Management', nameAr: 'إدارة المشاريع' },
        { id: 'operations-mgmt', name: 'Operations Management', nameAr: 'إدارة العمليات' },
        { id: 'risk-mgmt', name: 'Risk Management', nameAr: 'إدارة المخاطر' },
    ],
    technology: [
        { id: 'web-dev', name: 'Web Development', nameAr: 'تطوير الويب' },
        { id: 'data-science', name: 'Data Science', nameAr: 'علم البيانات' },
        { id: 'cybersecurity', name: 'Cybersecurity', nameAr: 'الأمن السيبراني' },
        { id: 'cloud-computing', name: 'Cloud Computing', nameAr: 'الحوسبة السحابية' },
    ],
    marketing: [
        { id: 'digital-marketing', name: 'Digital Marketing', nameAr: 'التسويق الرقمي' },
        { id: 'content-marketing', name: 'Content Marketing', nameAr: 'تسويق المحتوى' },
        { id: 'social-media', name: 'Social Media', nameAr: 'وسائل التواصل الاجتماعي' },
    ],
    sales: [
        { id: 'b2b-sales', name: 'B2B Sales', nameAr: 'مبيعات B2B' },
        { id: 'retail-sales', name: 'Retail Sales', nameAr: 'مبيعات التجزئة' },
    ],
    hr: [
        { id: 'talent-acquisition', name: 'Talent Acquisition', nameAr: 'اكتساب المواهب' },
        { id: 'performance-mgmt', name: 'Performance Management', nameAr: 'إدارة الأداء' },
    ],
}

const DUMMY_COURSES: Program[] = [
    // Leadership Courses
    {
        id: '1',
        titleEn: 'Executive Leadership Masterclass',
        titleAr: 'دورة القيادة التنفيذية المتقدمة',
        descriptionEn: 'Master the art of executive leadership and strategic decision making',
        descriptionAr: 'أتقن فن القيادة التنفيذية وصنع القرار الاستراتيجي',
        image: '/images/courses/leadership-1.jpg',
        courseType: 'presence',
        category: 'leadership',
        location: 'الرياض - مركز التدريب الرئيسي',
        price: 4500,
        duration: 40,
        capacity: 30,
        trainer: {
            id: '1',
            nameEn: 'Dr. Ahmed Hassan',
            nameAr: 'د. أحمد حسن',
            photo: '/images/instructors/ahmed.jpg',
            rating: 4.9,
            reviewCount: 120
        },
        objectives: [],
        status: 'upcoming',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '2',
        titleEn: 'Strategic Leadership in Digital Age',
        titleAr: 'القيادة الاستراتيجية في العصر الرقمي',
        descriptionEn: 'Learn how to lead organizations through digital transformation',
        descriptionAr: 'تعلم كيفية قيادة المؤسسات خلال التحول الرقمي',
        image: '/images/courses/leadership-2.jpg',
        courseType: 'presence',
        category: 'leadership',
        location: 'جدة - مركز التدريب',
        price: 3800,
        duration: 32,
        capacity: 25,
        trainer: {
            id: '2',
            nameEn: 'Sarah Al-Rashid',
            nameAr: 'سارة الراشد',
            photo: '/images/instructors/sarah.jpg',
            rating: 4.8,
            reviewCount: 95
        },
        objectives: [],
        status: 'upcoming',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '3',
        titleEn: 'Team Leadership Essentials',
        titleAr: 'أساسيات قيادة الفريق',
        descriptionEn: 'Build high-performing teams through effective leadership',
        descriptionAr: 'بناء فرق عالية الأداء من خلال القيادة الفعالة',
        image: '/images/courses/leadership-3.jpg',
        courseType: 'online',
        category: 'leadership',
        location: 'أونلاين',
        price: 2200,
        duration: 24,
        capacity: 50,
        trainer: {
            id: '3',
            nameEn: 'Mohammed Al-Farsi',
            nameAr: 'محمد الفارسي',
            photo: '/images/instructors/mohammed.jpg',
            rating: 4.7,
            reviewCount: 80
        },
        objectives: [],
        status: 'in-progress',
        progress: 35,
        createdAt: new Date(),
        updatedAt: new Date()
    },

    // Management Courses
    {
        id: '4',
        titleEn: 'Project Management Professional (PMP)',
        titleAr: 'محترف إدارة المشاريع (PMP)',
        descriptionEn: 'Prepare for PMP certification with comprehensive training',
        descriptionAr: 'التحضير لشهادة PMP مع تدريب شامل',
        image: '/images/courses/pmp.jpg',
        courseType: 'presence',
        category: 'management',
        location: 'الرياض - مركز التدريب الرئيسي',
        price: 5500,
        duration: 56,
        capacity: 20,
        trainer: {
            id: '4',
            nameEn: 'Khalid Al-Omari',
            nameAr: 'خالد العمري',
            photo: '/images/instructors/khalid.jpg',
            rating: 4.9,
            reviewCount: 150
        },
        objectives: [],
        status: 'upcoming',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '5',
        titleEn: 'Agile Project Management',
        titleAr: 'إدارة المشاريع الرشيقة',
        descriptionEn: 'Master Agile methodologies and Scrum framework',
        descriptionAr: 'إتقن منهجيات Agile وإطار العمل Scrum',
        image: '/images/courses/agile.jpg',
        courseType: 'online',
        category: 'management',
        location: 'أونلاين',
        price: 2800,
        duration: 30,
        capacity: 40,
        trainer: {
            id: '5',
            nameEn: 'Fatima Al-Zahra',
            nameAr: 'فاطمة الزهراء',
            photo: '/images/instructors/fatima.jpg',
            rating: 4.8,
            reviewCount: 110
        },
        objectives: [],
        status: 'completed',
        progress: 100,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '6',
        titleEn: 'Operations Management Excellence',
        titleAr: 'التميز في إدارة العمليات',
        descriptionEn: 'Optimize business operations for maximum efficiency',
        descriptionAr: 'تحسين العمليات التجارية لأقصى قدر من الكفاءة',
        image: '/images/courses/operations.jpg',
        courseType: 'presence',
        category: 'management',
        location: 'الدمام - مركز التدريب',
        price: 4200,
        duration: 36,
        capacity: 25,
        trainer: {
            id: '6',
            nameEn: 'Nasser Al-Qahtani',
            nameAr: 'ناصر القحطاني',
            photo: '/images/instructors/nasser.jpg',
            rating: 4.7,
            reviewCount: 88
        },
        objectives: [],
        status: 'upcoming',
        createdAt: new Date(),
        updatedAt: new Date()
    },

    // Technology Courses
    {
        id: '7',
        titleEn: 'Full Stack Web Development',
        titleAr: 'تطوير الويب المتكامل',
        descriptionEn: 'Become a full-stack developer with React and Node.js',
        descriptionAr: 'أصبح مطور Full Stack مع React و Node.js',
        image: '/images/courses/fullstack.jpg',
        courseType: 'online',
        category: 'technology',
        location: 'أونلاين',
        price: 4800,
        duration: 80,
        capacity: 50,
        trainer: {
            id: '7',
            nameEn: 'Youssef Benali',
            nameAr: 'يوسف بنعلي',
            photo: '/images/instructors/youssef.jpg',
            rating: 4.9,
            reviewCount: 130
        },
        objectives: [],
        status: 'upcoming',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '8',
        titleEn: 'Data Science with Python',
        titleAr: 'علم البيانات باستخدام بايثون',
        descriptionEn: 'Master data analysis, visualization, and machine learning',
        descriptionAr: 'إتقن تحليل البيانات والتصور والتعلم الآلي',
        image: '/images/courses/datascience.jpg',
        courseType: 'online',
        category: 'technology',
        location: 'أونلاين',
        price: 3900,
        duration: 60,
        capacity: 40,
        trainer: {
            id: '8',
            nameEn: 'Dr. Aisha Mahmoud',
            nameAr: 'د. عائشة محمود',
            photo: '/images/instructors/aisha.jpg',
            rating: 4.9,
            reviewCount: 145
        },
        objectives: [],
        status: 'in-progress',
        progress: 65,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '9',
        titleEn: 'Cybersecurity Fundamentals',
        titleAr: 'أساسيات الأمن السيبراني',
        descriptionEn: 'Learn essential cybersecurity concepts and practices',
        descriptionAr: 'تعلم المفاهيم والممارسات الأساسية للأمن السيبراني',
        image: '/images/courses/cybersecurity.jpg',
        courseType: 'presence',
        category: 'technology',
        location: 'الرياض - مركز التدريب التقني',
        price: 5200,
        duration: 40,
        capacity: 20,
        trainer: {
            id: '9',
            nameEn: 'Omar Al-Sharif',
            nameAr: 'عمر الشريف',
            photo: '/images/instructors/omar.jpg',
            rating: 4.8,
            reviewCount: 98
        },
        objectives: [],
        status: 'upcoming',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '10',
        titleEn: 'AWS Cloud Architecture',
        titleAr: 'بنية الحوسبة السحابية AWS',
        descriptionEn: 'Design and deploy scalable cloud solutions on AWS',
        descriptionAr: 'تصميم ونشر حلول سحابية قابلة للتطوير على AWS',
        image: '/images/courses/aws.jpg',
        courseType: 'online',
        category: 'technology',
        location: 'أونلاين',
        price: 4500,
        duration: 48,
        capacity: 35,
        trainer: {
            id: '10',
            nameEn: 'Hassan Ibrahim',
            nameAr: 'حسن إبراهيم',
            photo: '/images/instructors/hassan.jpg',
            rating: 4.7,
            reviewCount: 102
        },
        objectives: [],
        status: 'completed',
        progress: 100,
        createdAt: new Date(),
        updatedAt: new Date()
    },

    // Marketing Courses
    {
        id: '11',
        titleEn: 'Digital Marketing Masterclass',
        titleAr: 'دورة التسويق الرقمي المتقدمة',
        descriptionEn: 'Comprehensive digital marketing strategy and execution',
        descriptionAr: 'استراتيجية التسويق الرقمي الشاملة والتنفيذ',
        image: '/images/courses/digital-marketing.jpg',
        courseType: 'online',
        category: 'marketing',
        location: 'أونلاين',
        price: 3200,
        duration: 36,
        capacity: 45,
        trainer: {
            id: '11',
            nameEn: 'Layla Mansour',
            nameAr: 'ليلى منصور',
            photo: '/images/instructors/layla.jpg',
            rating: 4.8,
            reviewCount: 115
        },
        objectives: [],
        status: 'upcoming',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '12',
        titleEn: 'Social Media Marketing',
        titleAr: 'التسويق عبر وسائل التواصل الاجتماعي',
        descriptionEn: 'Build powerful social media campaigns that convert',
        descriptionAr: 'بناء حملات قوية على وسائل التواصل الاجتماعي',
        image: '/images/courses/social-media.jpg',
        courseType: 'live',
        category: 'marketing',
        location: 'بث مباشر',
        price: 1800,
        duration: 20,
        capacity: 60,
        trainer: {
            id: '12',
            nameEn: 'Rania El-Sayed',
            nameAr: 'رانيا السيد',
            photo: '/images/instructors/rania.jpg',
            rating: 4.9,
            reviewCount: 125
        },
        objectives: [],
        status: 'in-progress',
        progress: 45,
        createdAt: new Date(),
        updatedAt: new Date()
    },

    // Sales Courses
    {
        id: '13',
        titleEn: 'B2B Sales Excellence',
        titleAr: 'التميز في مبيعات B2B',
        descriptionEn: 'Master complex B2B sales cycles and negotiations',
        descriptionAr: 'إتقان دورات مبيعات B2B المعقدة والتفاوض',
        image: '/images/courses/b2b-sales.jpg',
        courseType: 'presence',
        category: 'sales',
        location: 'جدة - مركز التدريب',
        price: 3600,
        duration: 32,
        capacity: 25,
        trainer: {
            id: '13',
            nameEn: 'Tariq Al-Faisal',
            nameAr: 'طارق الفيصل',
            photo: '/images/instructors/tariq.jpg',
            rating: 4.8,
            reviewCount: 92
        },
        objectives: [],
        status: 'upcoming',
        createdAt: new Date(),
        updatedAt: new Date()
    },

    // HR Courses
    {
        id: '14',
        titleEn: 'Talent Acquisition Strategies',
        titleAr: 'استراتيجيات اكتساب المواهب',
        descriptionEn: 'Attract and retain top talent in competitive markets',
        descriptionAr: 'جذب والاحتفاظ بالمواهب المتميزة في الأسواق التنافسية',
        image: '/images/courses/talent.jpg',
        courseType: 'online',
        category: 'hr',
        location: 'أونلاين',
        price: 2900,
        duration: 28,
        capacity: 40,
        trainer: {
            id: '14',
            nameEn: 'Mona Al-Harbi',
            nameAr: 'منى الحربي',
            photo: '/images/instructors/mona.jpg',
            rating: 4.7,
            reviewCount: 85
        },
        objectives: [],
        status: 'upcoming',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '15',
        titleEn: 'Performance Management Systems',
        titleAr: 'أنظمة إدارة الأداء',
        descriptionEn: 'Design and implement effective performance management',
        descriptionAr: 'تصميم وتنفيذ إدارة الأداء الفعالة',
        image: '/images/courses/performance.jpg',
        courseType: 'presence',
        category: 'hr',
        location: 'الرياض - مركز التدريب',
        price: 3100,
        duration: 24,
        capacity: 30,
        trainer: {
            id: '15',
            nameEn: 'Sami Al-Johani',
            nameAr: 'سامي الجهني',
            photo: '/images/instructors/sami.jpg',
            rating: 4.6,
            reviewCount: 78
        },
        objectives: [],
        status: 'completed',
        progress: 100,
        createdAt: new Date(),
        updatedAt: new Date()
    },
]

interface UseCoursesOptions {
    type: 'presence' | 'online' | 'live'
    initialFilters?: CourseFilters
}

interface UseCoursesReturn {
    courses: Program[]
    departments: Department[]
    subDepartments: Department[]
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

// Simulate network delay
const simulateDelay = (ms: number = 500) =>
    new Promise(resolve => setTimeout(resolve, ms))

export function useCourses({ type, initialFilters }: UseCoursesOptions): UseCoursesReturn {
    const [courses, setCourses] = useState<Program[]>([])
    const [departments, setDepartments] = useState<Department[]>([])
    const [subDepartments, setSubDepartments] = useState<Department[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [pagination, setPagination] = useState<PaginationParams>({
        page: 1,
        limit: 5,
        total: 0
    })
    const [filters, setFilters] = useState<CourseFilters>(initialFilters || {})
    const [activeDepartment, setActiveDepartment] = useState<string | null>(null)
    const [activeSubDepartment, setActiveSubDepartment] = useState<string | null>(null)

    // Filter courses based on type and filters
    const filterCourses = useCallback(() => {
        let filtered = [...DUMMY_COURSES]

        // Filter by course type (presence/online/live)
        if (type !== 'presence') {
            filtered = filtered.filter(c => c.courseType === type)
        } else {
            filtered = filtered.filter(c => c.courseType === 'presence' || c.courseType === 'live')
        }

        // Filter by department
        if (activeDepartment) {
            filtered = filtered.filter(c => c.category === activeDepartment)
        }

        // Filter by sub-department
        if (activeSubDepartment) {
            // For now, we'll skip sub-department filtering since Program type doesn't have this field
            // You can add a subCategory field to Program type if needed
        }

        // Filter by search query
        if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            filtered = filtered.filter(c => {
                const titleMatch = c.titleEn?.toLowerCase().includes(searchLower) || c.titleAr?.includes(filters.search || '')
                const trainerMatch = c.trainer?.nameEn?.toLowerCase().includes(searchLower) || c.trainer?.nameAr?.includes(filters.search || '')
                return titleMatch || trainerMatch
            })
        }

        // Filter by price range
        if (filters.priceRange) {
            filtered = filtered.filter(c =>
                c.price >= filters.priceRange![0] &&
                c.price <= filters.priceRange![1]
            )
        }

        // Filter by locations
        if (filters.locations && filters.locations.length > 0) {
            filtered = filtered.filter(c =>
                filters.locations!.some(loc =>
                    c.location?.toLowerCase().includes(loc.toLowerCase())
                )
            )
        }

        return filtered
    }, [type, activeDepartment, activeSubDepartment, filters])

    // Simulate fetching departments
    const fetchDepartments = useCallback(async () => {
        await simulateDelay(300)
        setDepartments(DUMMY_DEPARTMENTS)
    }, [])

    // Simulate fetching sub-departments
    const fetchSubDepartments = useCallback(async (mainId: string) => {
        await simulateDelay(200)
        const subs = DUMMY_SUB_DEPARTMENTS[mainId] || []
        setSubDepartments(subs)
    }, [])

    // Simulate fetching courses with pagination
    const fetchCourses = useCallback(async () => {
        setLoading(true)
        try {
            await simulateDelay(600) // Simulate network delay

            const allFiltered = filterCourses()
            const total = allFiltered.length

            // Apply pagination
            const start = (pagination.page - 1) * pagination.limit
            const end = start + pagination.limit
            const paginated = allFiltered.slice(start, end)

            setCourses(paginated)
            setPagination(prev => ({ ...prev, total }))
            setError(null)
        } catch (err) {
            setError(err as Error)
        } finally {
            setLoading(false)
        }
    }, [filterCourses, pagination.page, pagination.limit])

    // Initial load
    useEffect(() => {
        fetchDepartments()
    }, [fetchDepartments])

    // Load sub-departments when department changes
    useEffect(() => {
        if (activeDepartment) {
            fetchSubDepartments(activeDepartment)
            setActiveSubDepartment(null) // Reset sub-department selection
        } else {
            setSubDepartments([])
            setActiveSubDepartment(null)
        }
    }, [activeDepartment, fetchSubDepartments])

    // Fetch courses when dependencies change
    useEffect(() => {
        fetchCourses()
    }, [fetchCourses])

    // Scroll to top on page change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [pagination.page])

    const setPage = useCallback((page: number) => {
        setPagination(prev => ({ ...prev, page }))
    }, [])

    const selectDepartment = useCallback((id: string | null) => {
        setActiveDepartment(id)
        setPagination(prev => ({ ...prev, page: 1 })) // Reset to first page
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
        Math.max(1, Math.ceil(pagination.total / pagination.limit))
        , [pagination.total, pagination.limit])

    const refresh = useCallback(() => {
        fetchCourses()
    }, [fetchCourses])

    return {
        courses,
        departments,
        subDepartments,
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
        refresh
    }
}