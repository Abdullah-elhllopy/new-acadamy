// 'use client'

// import { useForm, UseFormReturn, FieldValues, SubmitHandler, DefaultValues } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { ZodSchema } from 'zod'

// interface FormProps<T extends FieldValues> {
//   schema: ZodSchema<T>
//   onSubmit: SubmitHandler<T>
//   defaultValues?: DefaultValues<T>
//   children: (methods: UseFormReturn<T>) => React.ReactNode
//   className?: string
// }

// export function Form<T extends FieldValues>({
//   schema,
//   onSubmit,
//   defaultValues,
//   children,
//   className
// }: FormProps<T>) {
//   const methods = useForm<T>({
//     resolver: zodResolver(schema),
//     defaultValues
//   })

//   return (
//     <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
//       {children(methods)}
//     </form>
//   )
// }
import type { UseFormReturn } from 'react-hook-form';

import { FormProvider as RHFForm } from 'react-hook-form';

// ----------------------------------------------------------------------

export type FormProps = {
  onSubmit?: () => void;
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  className?: string;
};

export function Form({ children, onSubmit, methods, className }: FormProps) {
  return (
    <RHFForm {...methods}>
      <form onSubmit={onSubmit} noValidate autoComplete="off" className={className}>
        {children}
      </form>
    </RHFForm>
  );
}
