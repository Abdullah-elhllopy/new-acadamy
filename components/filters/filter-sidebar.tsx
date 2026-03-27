'use client'

import { useLanguage } from '@/shared/hooks/useLanguage'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { X } from 'lucide-react'

export interface FilterState {
  categories: string[]
  priceRange: [number, number]
  locations: string[]
  trainers: string[]
  fields: string[]
  tracks: string[]
  courseTypes: string[]
  languages: string[]
  dates: string[]
}

interface FilterSidebarProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  onReset?: () => void
}

const FIELDS = [
  { id: 'it', labelEn: 'IT', labelAr: 'تكنولوجيا المعلومات' },
  { id: 'business', labelEn: 'Business', labelAr: 'الأعمال' },
  { id: 'hr', labelEn: 'HR', labelAr: 'الموارد البشرية' },
  { id: 'finance', labelEn: 'Finance', labelAr: 'المالية' },
]

const TRACKS = [
  { id: 'beginner', labelEn: 'Beginner', labelAr: 'مبتدئ' },
  { id: 'intermediate', labelEn: 'Intermediate', labelAr: 'متوسط' },
  { id: 'advanced', labelEn: 'Advanced', labelAr: 'متقدم' },
]

const CATEGORIES = [
  { id: 'leadership', labelEn: 'Leadership', labelAr: 'القيادة' },
  { id: 'marketing', labelEn: 'Marketing', labelAr: 'التسويق' },
  { id: 'management', labelEn: 'Management', labelAr: 'الإدارة' },
  { id: 'technical', labelEn: 'Technical', labelAr: 'تقني' },
  { id: 'sales', labelEn: 'Sales', labelAr: 'المبيعات' },
]

const LOCATIONS = [
  { id: 'riyadh', labelEn: 'Riyadh', labelAr: 'الرياض' },
  { id: 'jeddah', labelEn: 'Jeddah', labelAr: 'جدة' },
  { id: 'dammam', labelEn: 'Dammam', labelAr: 'الدمام' },
  { id: 'online', labelEn: 'Online', labelAr: 'أونلاين' },
]

const COURSE_TYPES = [
  { id: 'workshop', labelEn: 'Workshop', labelAr: 'ورشة عمل' },
  { id: 'seminar', labelEn: 'Seminar', labelAr: 'ندوة' },
  { id: 'course', labelEn: 'Course', labelAr: 'دورة' },
  { id: 'certification', labelEn: 'Certification', labelAr: 'شهادة' },
]

const LANGUAGES = [
  { id: 'ar', labelEn: 'Arabic', labelAr: 'العربية' },
  { id: 'en', labelEn: 'English', labelAr: 'الإنجليزية' },
  { id: 'fr', labelEn: 'French', labelAr: 'الفرنسية' },
]

const INSTRUCTORS = [
  { id: 'mohammed', labelEn: 'Dr. Mohammed Ahmed', labelAr: 'د. محمد أحمد' },
  { id: 'fatima', labelEn: 'Fatima Al-Shehri', labelAr: 'فاطمة الشهري' },
  { id: 'salman', labelEn: 'A. Salman Al-Dosari', labelAr: 'أ. سلمان الدوسري' },
]

export function FilterSidebar({ filters, onChange, onReset }: FilterSidebarProps) {
  const { isArabic } = useLanguage()

  const handleCheckboxChange = (
    filterType: 'categories' | 'fields' | 'tracks' | 'locations' | 'courseTypes' | 'languages' | 'trainers' | 'dates',
    value: string,
    checked: boolean
  ) => {
    const currentArray = filters[filterType] as string[]
    const newArray = checked
      ? [...currentArray, value]
      : currentArray.filter((item) => item !== value)
    onChange({ ...filters, [filterType]: newArray })
  }

  const handlePriceChange = (value: number[]) => {
    onChange({ ...filters, priceRange: [value[0], value[1]] as [number, number] })
  }

  const renderFilterSection = (
    title: string,
    filterType: 'categories' | 'fields' | 'tracks' | 'locations' | 'courseTypes' | 'languages' | 'trainers' | 'dates',
    options: Array<{ id: string; labelEn: string; labelAr: string }>
  ) => (
    <>
      <div>
        <Label className="font-semibold text-foreground mb-3 block">
          {title}
        </Label>
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={`${filterType}-${option.id}`}
                checked={(filters[filterType] as string[]).includes(option.id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(filterType, option.id, checked as boolean)
                }
              />
              <Label
                htmlFor={`${filterType}-${option.id}`}
                className="font-normal cursor-pointer"
              >
                {isArabic ? option.labelAr : option.labelEn}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <Separator />
    </>
  )

  const hasActiveFilters = filters.categories.length > 0 || 
    filters.locations.length > 0 || 
    filters.fields.length > 0 || 
    filters.tracks.length > 0 || 
    filters.courseTypes.length > 0 || 
    filters.languages.length > 0 || 
    filters.trainers.length > 0

  return (
    <div className="space-y-6 p-6 bg-card rounded-lg border border-border overflow-y-auto max-h-[calc(100vh-200px)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">
          {isArabic ? 'المرشحات المتقدمة' : 'Advanced Filters'}
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-auto p-0 text-destructive hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Fields */}
      {renderFilterSection(
        isArabic ? 'المجال' : 'Field',
        'fields',
        FIELDS
      )}

      {/* Tracks */}
      {renderFilterSection(
        isArabic ? 'المسار' : 'Track',
        'tracks',
        TRACKS
      )}

      {/* Categories */}
      {renderFilterSection(
        isArabic ? 'الفئة' : 'Category',
        'categories',
        CATEGORIES
      )}

      {/* Locations */}
      {renderFilterSection(
        isArabic ? 'المكان' : 'Location',
        'locations',
        LOCATIONS
      )}

      {/* Course Types */}
      {renderFilterSection(
        isArabic ? 'نوع الدورة' : 'Course Type',
        'courseTypes',
        COURSE_TYPES
      )}

      {/* Languages */}
      {renderFilterSection(
        isArabic ? 'اللغة' : 'Language',
        'languages',
        LANGUAGES
      )}

      {/* Instructors */}
      {renderFilterSection(
        isArabic ? 'المدرب' : 'Instructor',
        'trainers',
        INSTRUCTORS
      )}

      {/* Price Range */}
      <div>
        <Label className="font-semibold text-foreground mb-4 block">
          {isArabic ? 'نطاق السعر' : 'Price Range'}
        </Label>
        <div className="space-y-4">
          <Slider
            min={0}
            max={10000}
            step={100}
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{filters.priceRange[0].toLocaleString()} SR</span>
            <span>-</span>
            <span>{filters.priceRange[1].toLocaleString()} SR</span>
          </div>
        </div>
      </div>
    </div>
  )
}
