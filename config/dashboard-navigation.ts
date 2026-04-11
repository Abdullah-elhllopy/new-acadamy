import {
  Home,
  Video,
  Info,
  Layers,
  Lightbulb,
  MessageSquare,
  Users,
  BookOpen,
  Presentation,
  Image as ImageIcon,
  Award,
  Briefcase,
  UserCheck,
  FileText,
  Search,
  Settings,
  FileCode,
  BarChart3,
  type LucideIcon
} from 'lucide-react'

export interface NavItem {
  label: string
  labelAr: string
  href: string
  icon?: LucideIcon
}

export interface NavSection {
  id: string
  label: string
  labelAr: string
  icon: LucideIcon
  items: NavItem[]
}

export const dashboardNavigation: NavSection[] = [
  {
    id: 'programs',
    label: 'Our Programs',
    labelAr: 'برامجنا',
    icon: Video,
    items: [
      {
        label: 'Courses',
        labelAr: 'الدورات',
        href: '/dashboard/courses',
        icon: BookOpen
      },
      {
        label: 'Lectures',
        labelAr: 'المحاضرات',
        href: '/dashboard/lectures',
        icon: Presentation
      },
      {
        label: 'Sliders',
        labelAr: 'سلايدر',
        href: '/dashboard/sliders',
        icon: ImageIcon
      },
      {
        label: 'Articles',
        labelAr: 'المقالات',
        href: '/dashboard/articles',
        icon: BookOpen
      },
    ],
  },
  {
    id: 'about',
    label: 'About Academy',
    labelAr: 'عن الأكاديمية',
    icon: Info,
    items: [
      {
        label: 'About Us',
        labelAr: 'عن الشركة',
        href: '/dashboard/about-us'
      },
      {
        label: 'Trainers',
        labelAr: 'المدربين',
        href: '/dashboard/trainers'
      },
      {
        label: 'Partners',
        labelAr: 'شركائنا',
        href: '/dashboard/partners'
      },
      {
        label: 'Team',
        labelAr: 'فريقنا',
        href: '/dashboard/team'
      },
      {
        label: 'Advisory Board',
        labelAr: 'المجلس الاستشاري',
        href: '/dashboard/advisory-board',
        icon: UserCheck
      },
      {
        label: 'Static Pages',
        labelAr: 'الصفحات الثابتة',
        href: '/dashboard/static-pages',
        icon: FileText
      },
    ],
  },
  {
    id: 'departments',
    label: 'Departments',
    labelAr: 'الأقسام',
    icon: Layers,
    items: [
      {
        label: 'Main Departments',
        labelAr: 'الأقسام الرئيسية',
        href: '/dashboard/departments/main'
      },
    ],
  },
  {
    id: 'knowledge',
    label: 'Knowledge Center',
    labelAr: 'مركز المعرفة',
    icon: Lightbulb,
    items: [
      {
        label: 'Images Center',
        labelAr: 'مركز الصور',
        href: '/dashboard/images-center'
      },
    ],
  },
  {
    id: 'communication',
    label: 'Communication Center',
    labelAr: 'مركز التواصل',
    icon: MessageSquare,
    items: [
      {
        label: 'Contact Messages',
        labelAr: 'رسائل للتواصل',
        href: '/dashboard/requests/contact'
      },
      {
        label: 'Training Requests',
        labelAr: 'طلبات التدريب',
        href: '/dashboard/requests/training'
      },
      {
        label: 'User Training Requests',
        labelAr: 'طلبات التدريب لمستخدم',
        href: '/dashboard/requests/user-training'
      },
      {
        label: 'Be Trainer Requests',
        labelAr: 'طلبات الالتحاق كمدرب',
        href: '/dashboard/requests/be-trainer'
      },
      {
        label: 'Email Subscriptions',
        labelAr: 'القائمة البريدية',
        href: '/dashboard/requests/email-subscriptions'
      },
      {
        label: 'Job Vacancies',
        labelAr: 'الوظائف الشاغرة',
        href: '/dashboard/vacancies',
        icon: Briefcase
      },
    ],
  },
  {
    id: 'users',
    label: 'Users',
    labelAr: 'المستخدمين',
    icon: Users,
    items: [
      {
        label: 'All Users',
        labelAr: 'المستخدمين',
        href: '/dashboard/users'
      },
    ],
  },
  {
    id: 'certificates',
    label: 'Certificates',
    labelAr: 'الشهادات',
    icon: Award,
    items: [
      {
        label: 'All Certificates',
        labelAr: 'جميع الشهادات',
        href: '/dashboard/certificates',
        icon: Award
      },
    ],
  },
  {
    id: "add-what-will-learn",
    label: 'What Will You Learn',
    labelAr: 'ماذا ستتعلم',
    icon: BookOpen,
    items: [
      {
        label: 'Manage Learning Outcomes',
        labelAr: 'إدارة مخرجات التعلم',
        href: '/dashboard/lectures/add-what-will-learn'
      },
    ],
  },
  {
    id: 'seo-analytics',
    label: 'SEO & Analytics',
    labelAr: 'تحسين محركات البحث والتحليلات',
    icon: Search,
    items: [
      {
        label: 'SEO Manager',
        labelAr: 'إدارة تحسين محركات البحث',
        href: '/dashboard/seo',
        icon: Search
      },
      {
        label: 'Content Manager',
        labelAr: 'إدارة المحتوى',
        href: '/dashboard/content',
        icon: FileText
      },
      {
        label: 'Sitemap',
        labelAr: 'خريطة الموقع',
        href: '/dashboard/sitemap',
        icon: FileCode
      },
      {
        label: 'Robots.txt',
        labelAr: 'ملف Robots',
        href: '/dashboard/robots',
        icon: FileCode
      },
      {
        label: 'Analytics Settings',
        labelAr: 'إعدادات التحليلات',
        href: '/dashboard/settings/analytics',
        icon: BarChart3
      },
    ],
  }
]

export const dashboardHomeLink = {
  label: 'Dashboard',
  labelAr: 'لوحة المعلومات',
  href: '/dashboard',
  icon: Home,
}
