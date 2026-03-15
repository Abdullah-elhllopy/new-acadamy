'use client'

import {  FieldValues, Path, useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>
  label: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'textarea' | 'date'
  placeholder?: string
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
  required,
  rows,
  className,
  labelClassName,
  inputClassName
}: FormFieldProps<T>) {
  const { register, formState: { errors } } = useFormContext()
  const error = errors[name]?.message as string

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <Label className={cn(labelClassName)}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {type === 'textarea' ? (
        <Textarea
          {...register(name)}
          placeholder={placeholder}
          rows={rows}
          className={cn(
            "h-11 border-border focus:border-primary focus:ring-primary",
            error && "border-destructive focus:border-destructive",
            inputClassName
          )}
        />
      ) : (
        <Input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className={cn(
            "h-11 border-border focus:border-primary focus:ring-primary",
            error && "border-destructive focus:border-destructive",
            inputClassName
          )}
        />
      )}
      {error && (
        <p className="text-sm text-destructive">{error}</p>

      )}
    </div>
  )
}
