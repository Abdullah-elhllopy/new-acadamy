'use client'

import { UseFormReturn, FieldValues, Path } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>
  label: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'textarea'
  placeholder?: string
  methods: UseFormReturn<T>
  isArabic?: boolean
  required?: boolean
  rows?: number
}

export function FormField<T extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder,
  methods,
  isArabic,
  required,
  rows
}: FormFieldProps<T>) {
  const { register, formState: { errors } } = methods
  const error = errors[name]

  return (
    <div className="flex flex-col space-y-2">
      <Label className={isArabic ? 'text-right block' : ''}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {type === 'textarea' ? (
        <Textarea
          {...register(name)}
          placeholder={placeholder}
          rows={rows}
          className={isArabic ? 'text-right' : ''}
        />
      ) : (
        <Input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className={isArabic ? 'text-right' : ''}
        />
      )}
      {error && (
        <p className="text-sm text-red-500 mt-1">{error.message as string}</p>
      )}
    </div>
  )
}
