'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

interface FilterSidebarProps {
  language: string
  categories: string[]
  selectedCategories: string[]
  onCategoryChange: (category: string) => void
  priceRange: number[]
  onPriceChange: (value: number[]) => void
}

export function FilterSidebar({
  language,
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange
}: FilterSidebarProps) {
  const isArabic = language === 'ar'

  return (
    <Card>
      <CardHeader>
        <CardTitle className={isArabic ? 'text-right' : ''}>
          {isArabic ? 'التصنيفات' : 'Categories'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.map((category) => (
          <div key={category} className="flex items-center gap-2">
            <Checkbox
              id={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => onCategoryChange(category)}
            />
            <Label htmlFor={category} className="cursor-pointer">
              {category}
            </Label>
          </div>
        ))}
        <div className="pt-4 border-t">
          <Label className={`block mb-4 ${isArabic ? 'text-right' : ''}`}>
            {isArabic ? 'السعر' : 'Price'}: {priceRange[0]} - {priceRange[1]} {isArabic ? 'ر.س' : 'SAR'}
          </Label>
          <Slider
            value={priceRange}
            onValueChange={onPriceChange}
            max={10000}
            step={100}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  )
}
