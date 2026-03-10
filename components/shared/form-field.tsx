'use client'

import { UseFormReturn, FieldValues, Path } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>
  label: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'textarea'
  placeholder?: string
  methods: UseFormReturn<T>
  isArabic?: boolean
  required?: boolean
  rows?: number
  className?: string
  labelClassName?: string
  inputClassName?: string
}

export function FormField<T extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder,
  methods,
  isArabic,
  required,
  rows,
  className,
  labelClassName,
  inputClassName
}: FormFieldProps<T>) {
  const { register, formState: { errors } } = methods
  const error = errors[name]

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <Label className={cn(isArabic ? 'block' : '', labelClassName)}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {type === 'textarea' ? (
        <Textarea
          {...register(name)}
          placeholder={placeholder}
          rows={rows}
          className={inputClassName}
        />
      ) : (
        <Input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className={inputClassName}
        />
      )}
      {error && (
        <p className="text-sm text-red-500 mt-1">{error.message as string}</p>
      )}
    </div>
  )
}
