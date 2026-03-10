'use client'

import { useForm, UseFormReturn, FieldValues, SubmitHandler, DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodSchema } from 'zod'

interface FormProps<T extends FieldValues> {
  schema: ZodSchema<T>
  onSubmit: SubmitHandler<T>
  defaultValues?: DefaultValues<T>
  children: (methods: UseFormReturn<T>) => React.ReactNode
  className?: string
}

export function Form<T extends FieldValues>({
  schema,
  onSubmit,
  defaultValues,
  children,
  className
}: FormProps<T>) {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues
  })

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
      {children(methods)}
    </form>
  )
}
