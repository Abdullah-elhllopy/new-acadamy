// components/forms/form-select.tsx
'use client'

import { useFormContext } from 'react-hook-form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface SelectOption {
    value: string
    label: string
    labelAr?: string
}

interface FormSelectProps {
    name: string
    label: string
    labelAr?: string
    options: SelectOption[]
    required?: boolean
    placeholder?: string
}

export function FormSelect({
    name,
    label,
    labelAr,
    options,
    required,
    placeholder = 'اختر...'
}: FormSelectProps) {
    const { register, formState: { errors }, setValue, watch } = useFormContext()
    const error = errors[name]?.message as string
    const value = watch(name)

    const displayLabel = labelAr || label

    return (
        <div className="space-y-2 w-full">
            <Label className="text-foreground w-full font-bold">
                {displayLabel}
                {required && <span className="text-destructive mr-1">*</span>}
            </Label>
            <Select
                
                value={value}
                onValueChange={(val) => setValue(name, val, { shouldValidate: true })}
            >
                <SelectTrigger className={cn(
                    "h-11 border-border w-full",
                    error && "border-destructive"
                )}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.labelAr || option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
        </div>
    )
}