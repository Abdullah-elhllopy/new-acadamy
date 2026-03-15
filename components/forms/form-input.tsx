// components/forms/form-input.tsx
'use client'

import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string
    label: string
    labelAr?: string
    required?: boolean
}

export function FormInput({
    name,
    label,
    labelAr,
    required,
    className,
    ...props
}: FormInputProps) {
    const { register, formState: { errors } } = useFormContext()
    const error = errors[name]?.message as string

    // Get current language from your hook
    const displayLabel = labelAr || label

    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="text-foreground font-bold">
                {displayLabel}
                {required && <span className="text-destructive mr-1">*</span>}
            </Label>
            <Input
                id={name}
                {...register(name)}
                {...props}
                className={cn(
                    "h-11 border-border focus:border-primary focus:ring-primary",
                    error && "border-destructive focus:border-destructive",
                    className
                )}
            />
            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
        </div>
    )
}