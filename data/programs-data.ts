// data/programs-data.ts
import { ProgramCourse, ProgramSection } from '@/types/programs'

export const DUMMY_PROGRAMS: ProgramCourse[] = [
    // Most Wanted
    {
        id: 'mw-1',
        title: 'Executive Leadership Masterclass',
        titleAr: 'دورة القيادة التنفيذية المتقدمة',
        image: '/images/courses/leadership-1.jpg',
        courseType: 'presence',
        startDate: '2024-04-15',
        duration: { hours: 40, months: 2 },
        location: { city: 'الرياض', venue: 'مركز التدريب الرئيسي' },
        price: 4500,
        currency: 'EGP',
        instructor: {
            id: '1',
            name: 'Dr. Ahmed Hassan',
            nameAr: 'د. أحمد حسن',
            image: '/images/instructors/ahmed.jpg'
        },
        badge: 'mostWanted'
    },
    {
        id: 'mw-2',
        title: 'Project Management Professional',
        titleAr: 'محترف إدارة المشاريع PMP',
        image: '/images/courses/pmp.jpg',
        courseType: 'presence',
        startDate: '2024-05-01',
        duration: { hours: 56, months: 3 },
        location: { city: 'جدة', venue: 'مركز التدريب - جدة' },
        price: 5500,
        currency: 'EGP',
        instructor: {
            id: '2',
            name: 'Khalid Al-Omari',
            nameAr: 'خالد العمري',
            image: '/images/instructors/khalid.jpg'
        },
        badge: 'mostWanted'
    },
    {
        id: 'mw-3',
        title: 'Digital Marketing Strategy',
        titleAr: 'استراتيجية التسويق الرقمي',
        image: '/images/courses/marketing.jpg',
        courseType: 'online',
        startDate: '2024-04-20',
        duration: { hours: 36, months: 2 },
        location: { city: 'Online', venue: 'منصة التعلم' },
        price: 3200,
        currency: 'EGP',
        instructor: {
            id: '3',
            name: 'Layla Mansour',
            nameAr: 'ليلى منصور',
            image: '/images/instructors/layla.jpg'
        },
        badge: 'mostWanted'
    },
    {
        id: 'mw-4',
        title: 'Data Science with Python',
        titleAr: 'علم البيانات باستخدام بايثون',
        image: '/images/courses/datascience.jpg',
        courseType: 'online',
        startDate: '2024-03-15',
        duration: { hours: 60, months: 3 },
        location: { city: 'Online', venue: 'منصة التعلم' },
        price: 3900,
        currency: 'EGP',
        instructor: {
            id: '4',
            name: 'Dr. Aisha Mahmoud',
            nameAr: 'د. عائشة محمود',
            image: '/images/instructors/aisha.jpg'
        },
        badge: 'mostWanted'
    },
    {
        id: 'mw-5',
        title: 'Full Stack Web Development',
        titleAr: 'تطوير الويب المتكامل',
        image: '/images/courses/fullstack.jpg',
        courseType: 'online',
        startDate: '2024-04-01',
        duration: { hours: 80, months: 4 },
        location: { city: 'Online', venue: 'منصة التعلم التفاعلية' },
        price: 4800,
        currency: 'EGP',
        instructor: {
            id: '5',
            name: 'Youssef Benali',
            nameAr: 'يوسف بنعلي',
            image: '/images/instructors/youssef.jpg'
        },
        badge: 'mostWanted'
    },

    // New Courses
    {
        id: 'new-1',
        title: 'Cybersecurity Fundamentals',
        titleAr: 'أساسيات الأمن السيبراني',
        image: '/images/courses/cybersecurity.jpg',
        courseType: 'presence',
        startDate: '2024-05-20',
        duration: { hours: 40, months: 2 },
        location: { city: 'الرياض', venue: 'مركز التدريب التقني' },
        price: 5200,
        currency: 'EGP',
        instructor: {
            id: '6',
            name: 'Omar Al-Sharif',
            nameAr: 'عمر الشريف',
            image: '/images/instructors/omar.jpg'
        },
        badge: 'new'
    },
    {
        id: 'new-2',
        title: 'AWS Cloud Architecture',
        titleAr: 'بنية الحوسبة السحابية AWS',
        image: '/images/courses/aws.jpg',
        courseType: 'online',
        startDate: '2024-04-10',
        duration: { hours: 48, months: 2 },
        location: { city: 'Online', venue: 'منصة التعلم' },
        price: 4500,
        currency: 'EGP',
        instructor: {
            id: '7',
            name: 'Hassan Ibrahim',
            nameAr: 'حسن إبراهيم',
            image: '/images/instructors/hassan.jpg'
        },
        badge: 'new'
    },
    {
        id: 'new-3',
        title: 'B2B Sales Excellence',
        titleAr: 'التميز في مبيعات B2B',
        image: '/images/courses/b2b-sales.jpg',
        courseType: 'presence',
        startDate: '2024-05-10',
        duration: { hours: 32, months: 1 },
        location: { city: 'جدة', venue: 'مركز التدريب - جدة' },
        price: 3600,
        currency: 'EGP',
        instructor: {
            id: '8',
            name: 'Tariq Al-Faisal',
            nameAr: 'طارق الفيصل',
            image: '/images/instructors/tariq.jpg'
        },
        badge: 'new'
    },
    {
        id: 'new-4',
        title: 'Agile Project Management',
        titleAr: 'إدارة المشاريع الرشيقة',
        image: '/images/courses/agile.jpg',
        courseType: 'online',
        startDate: '2024-03-25',
        duration: { hours: 30, months: 1 },
        location: { city: 'Online', venue: 'منصة التعلم' },
        price: 2800,
        currency: 'EGP',
        instructor: {
            id: '9',
            name: 'Fatima Al-Zahra',
            nameAr: 'فاطمة الزهراء',
            image: '/images/instructors/fatima.jpg'
        },
        badge: 'new'
    },

    // Soon Courses
    {
        id: 'soon-1',
        title: 'AI & Machine Learning',
        titleAr: 'الذكاء الاصطناعي والتعلم الآلي',
        image: '/images/courses/ai.jpg',
        courseType: 'online',
        startDate: '2024-06-01',
        duration: { hours: 72, months: 4 },
        location: { city: 'Online', venue: 'منصة التعلم' },
        price: 5800,
        currency: 'EGP',
        instructor: {
            id: '10',
            name: 'Dr. Sami Al-Rashid',
            nameAr: 'د. سامي الراشد',
            image: '/images/instructors/sami.jpg'
        },
        badge: 'soon'
    },
    {
        id: 'soon-2',
        title: 'Blockchain Development',
        titleAr: 'تطوير سلسلة الكتل',
        image: '/images/courses/blockchain.jpg',
        courseType: 'online',
        startDate: '2024-06-15',
        duration: { hours: 48, months: 2 },
        location: { city: 'Online', venue: 'منصة التعلم' },
        price: 4200,
        currency: 'EGP',
        instructor: {
            id: '11',
            name: 'Nasser Al-Qahtani',
            nameAr: 'ناصر القحطاني',
            image: '/images/instructors/nasser.jpg'
        },
        badge: 'soon'
    },
    {
        id: 'soon-3',
        title: 'Strategic HR Management',
        titleAr: 'إدارة الموارد البشرية الاستراتيجية',
        image: '/images/courses/hr.jpg',
        courseType: 'presence',
        startDate: '2024-06-10',
        duration: { hours: 36, months: 2 },
        location: { city: 'الرياض', venue: 'مركز التدريب' },
        price: 3800,
        currency: 'EGP',
        instructor: {
            id: '12',
            name: 'Mona Al-Harbi',
            nameAr: 'منى الحربي',
            image: '/images/instructors/mona.jpg'
        },
        badge: 'soon'
    },

    // Presence Courses (6 items)
    {
        id: 'pr-1',
        title: 'Leadership Skills Workshop',
        titleAr: 'ورشة مهارات القيادة',
        image: '/images/courses/leadership-1.jpg',
        courseType: 'presence',
        startDate: '2024-04-15',
        duration: { hours: 40, months: 2 },
        location: { city: 'الرياض', venue: 'مركز التدريب الرئيسي' },
        price: 4500,
        currency: 'EGP',
        instructor: {
            id: '1',
            name: 'Dr. Ahmed Hassan',
            nameAr: 'د. أحمد حسن',
            image: '/images/instructors/ahmed.jpg'
        }
    },
    {
        id: 'pr-2',
        title: 'Project Management Professional',
        titleAr: 'محترف إدارة المشاريع',
        image: '/images/courses/pmp.jpg',
        courseType: 'presence',
        startDate: '2024-05-01',
        duration: { hours: 56, months: 3 },
        location: { city: 'جدة', venue: 'مركز التدريب - جدة' },
        price: 5500,
        currency: 'EGP',
        instructor: {
            id: '2',
            name: 'Khalid Al-Omari',
            nameAr: 'خالد العمري',
            image: '/images/instructors/khalid.jpg'
        }
    },
    {
        id: 'pr-3',
        title: 'Advanced Negotiation Skills',
        titleAr: 'مهارات التفاوض المتقدمة',
        image: '/images/courses/negotiation.jpg',
        courseType: 'presence',
        startDate: '2024-04-22',
        duration: { hours: 24, months: 1 },
        location: { city: 'الدمام', venue: 'مركز التدريب - الدمام' },
        price: 3200,
        currency: 'EGP',
        instructor: {
            id: '13',
            name: 'Amr Diab',
            nameAr: 'عمرو دياب',
            image: '/images/instructors/amr.jpg'
        }
    },
    {
        id: 'pr-4',
        title: 'Financial Analysis',
        titleAr: 'التحليل المالي',
        image: '/images/courses/finance.jpg',
        courseType: 'presence',
        startDate: '2024-05-12',
        duration: { hours: 32, months: 2 },
        location: { city: 'الرياض', venue: 'مركز الأعمال' },
        price: 4100,
        currency: 'EGP',
        instructor: {
            id: '14',
            name: 'Hanaa Sadiq',
            nameAr: 'هناء صادق',
            image: '/images/instructors/hanaa.jpg'
        }
    },
    {
        id: 'pr-5',
        title: 'Operations Excellence',
        titleAr: 'التميز في العمليات',
        image: '/images/courses/operations.jpg',
        courseType: 'presence',
        startDate: '2024-05-18',
        duration: { hours: 36, months: 2 },
        location: { city: 'جدة', venue: 'مركز التدريب' },
        price: 4200,
        currency: 'EGP',
        instructor: {
            id: '6',
            name: 'Nasser Al-Qahtani',
            nameAr: 'ناصر القحطاني',
            image: '/images/instructors/nasser.jpg'
        }
    },
    {
        id: 'pr-6',
        title: 'Supply Chain Management',
        titleAr: 'إدارة سلسلة التوريد',
        image: '/images/courses/supply.jpg',
        courseType: 'presence',
        startDate: '2024-06-05',
        duration: { hours: 40, months: 2 },
        location: { city: 'الدمام', venue: 'مركز اللوجستيات' },
        price: 4600,
        currency: 'EGP',
        instructor: {
            id: '15',
            name: 'Faisal Al-Otaibi',
            nameAr: 'فيصل العتيبي',
            image: '/images/instructors/faisal.jpg'
        }
    },

    // Live Courses
    {
        id: 'live-1',
        title: 'Live Digital Marketing',
        titleAr: 'التسويق الرقمي المباشر',
        image: '/images/courses/live-marketing.jpg',
        courseType: 'live',
        startDate: '2024-03-30',
        duration: { hours: 20, months: 1 },
        location: { city: 'Online', venue: 'بث مباشر يومي' },
        price: 1800,
        currency: 'EGP',
        instructor: {
            id: '12',
            name: 'Rania El-Sayed',
            nameAr: 'رانيا السيد',
            image: '/images/instructors/rania.jpg'
        }
    },
    {
        id: 'live-2',
        title: 'Live Python Bootcamp',
        titleAr: 'معسكر بايثون المباشر',
        image: '/images/courses/live-python.jpg',
        courseType: 'live',
        startDate: '2024-04-05',
        duration: { hours: 40, months: 2 },
        location: { city: 'Online', venue: 'بث مباشر مسائي' },
        price: 2900,
        currency: 'EGP',
        instructor: {
            id: '4',
            name: 'Dr. Aisha Mahmoud',
            nameAr: 'د. عائشة محمود',
            image: '/images/instructors/aisha.jpg'
        }
    },

    // Online Courses (6 items)
    {
        id: 'on-1',
        title: 'Full Stack Development',
        titleAr: 'تطوير الويب المتكامل',
        image: '/images/courses/fullstack.jpg',
        courseType: 'online',
        startDate: '2024-04-01',
        duration: { hours: 80, months: 4 },
        location: { city: 'Online', venue: 'منصة التعلم' },
        price: 4800,
        currency: 'EGP',
        instructor: {
            id: '5',
            name: 'Youssef Benali',
            nameAr: 'يوسف بنعلي',
            image: '/images/instructors/youssef.jpg'
        }
    },
    {
        id: 'on-2',
        title: 'Data Science Fundamentals',
        titleAr: 'أساسيات علم البيانات',
        image: '/images/courses/datascience.jpg',
        courseType: 'online',
        startDate: '2024-03-15',
        duration: { hours: 60, months: 3 },
        location: { city: 'Online', venue: 'منصة التعلم' },
        price: 3900,
        currency: 'EGP',
        instructor: {
            id: '4',
            name: 'Dr. Aisha Mahmoud',
            nameAr: 'د. عائشة محمود',
            image: '/images/instructors/aisha.jpg'
        }
    },
    {
        id: 'on-3',
        title: 'UX/UI Design Masterclass',
        titleAr: 'دورة تصميم UX/UI',
        image: '/images/courses/design.jpg',
        courseType: 'online',
        startDate: '2024-04-20',
        duration: { hours: 48, months: 2 },
        location: { city: 'Online', venue: 'منصة التعلم' },
        price: 3400,
        currency: 'EGP',
        instructor: {
            id: '16',
            name: 'Lina Karam',
            nameAr: 'لينا كرم',
            image: '/images/instructors/lina.jpg'
        }
    },
    {
        id: 'on-4',
        title: 'DevOps Engineering',
        titleAr: 'هندسة DevOps',
        image: '/images/courses/devops.jpg',
        courseType: 'online',
        startDate: '2024-05-01',
        duration: { hours: 56, months: 3 },
        location: { city: 'Online', venue: 'منصة التعلم' },
        price: 4200,
        currency: 'EGP',
        instructor: {
            id: '17',
            name: 'Zaid Al-Masri',
            nameAr: 'زيد المصري',
            image: '/images/instructors/zaid.jpg'
        }
    },
    {
        id: 'on-5',
        title: 'Mobile App Development',
        titleAr: 'تطوير تطبيقات الموبايل',
        image: '/images/courses/mobile.jpg',
        courseType: 'online',
        startDate: '2024-04-25',
        duration: { hours: 64, months: 3 },
        location: { city: 'Online', venue: 'منصة التعلم' },
        price: 4500,
        currency: 'EGP',
        instructor: {
            id: '18',
            name: 'Rami Suleiman',
            nameAr: 'رامي سليمان',
            image: '/images/instructors/rami.jpg'
        }
    },
    {
        id: 'on-6',
        title: 'Business Analytics',
        titleAr: 'تحليل الأعمال',
        image: '/images/courses/analytics.jpg',
        courseType: 'online',
        startDate: '2024-05-10',
        duration: { hours: 40, months: 2 },
        location: { city: 'Online', venue: 'منصة التعلم' },
        price: 3600,
        currency: 'EGP',
        instructor: {
            id: '19',
            name: 'Dana Hussein',
            nameAr: 'دانا حسين',
            image: '/images/instructors/dana.jpg'
        }
    }
]

export const PROGRAM_SECTIONS: ProgramSection[] = [
    {
        id: 'most-wanted',
        titleEn: 'Most Wanted',
        titleAr: 'الأكثر طلباً',
        viewAllLink: '/courses?sort=popular',
        viewAllLabel: { en: 'Browse All', ar: 'تصفح الكل' },
        courses: DUMMY_PROGRAMS.filter(c => c.badge === 'mostWanted'),
        variant: 'carousel'
    },
    {
        id: 'new',
        titleEn: 'New',
        titleAr: 'الجديد',
        viewAllLink: '/courses?sort=newest',
        viewAllLabel: { en: 'Browse All', ar: 'تصفح الكل' },
        courses: DUMMY_PROGRAMS.filter(c => c.badge === 'new'),
        variant: 'carousel'
    },
    {
        id: 'soon',
        titleEn: 'Coming Soon',
        titleAr: 'قريباً',
        viewAllLink: '/courses?filter=soon',
        viewAllLabel: { en: 'Browse All', ar: 'تصفح الكل' },
        courses: DUMMY_PROGRAMS.filter(c => c.badge === 'soon'),
        variant: 'grid'
    },
    {
        id: 'presence',
        titleEn: 'In-Person Courses',
        titleAr: 'دورات حضورية',
        viewAllLink: '/courses/presence',
        viewAllLabel: { en: 'Browse All', ar: 'تصفح الكل' },
        courses: DUMMY_PROGRAMS.filter(c => c.courseType === 'presence' && !c.badge).slice(0, 6),
        variant: 'grid'
    },
    {
        id: 'live',
        titleEn: 'Live Courses',
        titleAr: 'دورات مباشرة',
        viewAllLink: '/courses/live',
        viewAllLabel: { en: 'Browse All', ar: 'تصفح الكل' },
        courses: DUMMY_PROGRAMS.filter(c => c.courseType === 'live'),
        variant: 'grid',
        emptyMessage: { en: 'No live courses available', ar: 'لا توجد دورات مباشرة حالياً' }
    },
    {
        id: 'online',
        titleEn: 'Online Courses',
        titleAr: 'دورات عبر الإنترنت',
        viewAllLink: '/courses/online',
        viewAllLabel: { en: 'Browse All', ar: 'تصفح الكل' },
        courses: DUMMY_PROGRAMS.filter(c => c.courseType === 'online' && !c.badge).slice(0, 6),
        variant: 'grid'
    }
]