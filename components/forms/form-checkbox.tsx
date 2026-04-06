'use client'

import { FieldValues, Path, useFormContext } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>
  label: string
  className?: string
}

export function FormCheckbox<T extends FieldValues>({
  name,
  label,
  className
}: FormCheckboxProps<T>) {
  const { setValue, watch } = useFormContext<T>()
  const value = watch(name)

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Checkbox
        id={name}
        checked={!!value}
        onCheckedChange={(checked) => setValue(name, checked as any)}
      />
      <Label htmlFor={name} className="cursor-pointer">
        {label}
      </Label>
    </div>
  )
}
