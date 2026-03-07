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
}

interface FilterSidebarProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  onReset?: () => void
}

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

export function FilterSidebar({ filters, onChange, onReset }: FilterSidebarProps) {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter((c) => c !== categoryId)
    onChange({ ...filters, categories: newCategories })
  }

  const handleLocationChange = (locationId: string, checked: boolean) => {
    const newLocations = checked
      ? [...filters.locations, locationId]
      : filters.locations.filter((l) => l !== locationId)
    onChange({ ...filters, locations: newLocations })
  }

  const handlePriceChange = (value: number[]) => {
    onChange({ ...filters, priceRange: [value[0], value[1]] as [number, number] })
  }

  return (
    <div className="space-y-6 p-6 bg-card rounded-lg border border-border">
      {/* Header */}
      <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
        <h3 className="font-semibold text-foreground">
          {isArabic ? 'المرشحات' : 'Filters'}
        </h3>
        {(filters.categories.length > 0 || filters.locations.length > 0) && (
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

      {/* Categories */}
      <div className={isArabic ? 'text-right' : ''}>
        <Label className="font-semibold text-foreground mb-3 block">
          {isArabic ? 'الفئات' : 'Categories'}
        </Label>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              className={`flex items-center space-x-2 ${isArabic ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <Checkbox
                id={category.id}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category.id, checked as boolean)
                }
              />
              <Label
                htmlFor={category.id}
                className="font-normal cursor-pointer"
              >
                {isArabic ? category.labelAr : category.labelEn}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className={isArabic ? 'text-right' : ''}>
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
          <div className={`flex items-center justify-between text-sm text-muted-foreground ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span>{filters.priceRange[0].toLocaleString()} SR</span>
            <span>-</span>
            <span>{filters.priceRange[1].toLocaleString()} SR</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Locations */}
      <div className={isArabic ? 'text-right' : ''}>
        <Label className="font-semibold text-foreground mb-3 block">
          {isArabic ? 'المواقع' : 'Locations'}
        </Label>
        <div className="space-y-2">
          {LOCATIONS.map((location) => (
            <div
              key={location.id}
              className={`flex items-center space-x-2 ${isArabic ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <Checkbox
                id={location.id}
                checked={filters.locations.includes(location.id)}
                onCheckedChange={(checked) =>
                  handleLocationChange(location.id, checked as boolean)
                }
              />
              <Label
                htmlFor={location.id}
                className="font-normal cursor-pointer"
              >
                {isArabic ? location.labelAr : location.labelEn}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
