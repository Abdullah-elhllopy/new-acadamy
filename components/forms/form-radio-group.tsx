// components/forms/form-radio-group.tsx
'use client'

import { useFormContext } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface RadioOption {
    value: string
    label: string
    labelAr?: string
}

interface FormRadioGroupProps {
    name: string
    label: string
    labelAr?: string
    options: RadioOption[]
    required?: boolean
}

export function FormRadioGroup({
    name,
    label,
    labelAr,
    options,
    required
}: FormRadioGroupProps) {
    const { register, formState: { errors }, watch } = useFormContext()
    const error = errors[name]?.message as string
    const selectedValue = watch(name)

    const displayLabel = labelAr || label

    return (
        <div className="space-y-3">
            <Label className="text-foreground font-bold">
                {displayLabel}
                {required && <span className="text-destructive mr-1">*</span>}
            </Label>

            <div className="flex flex-wrap gap-6">
                {options.map((option) => {
                    const isSelected = selectedValue === option.value

                    return (
                        <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer group"
                        >
                            <div className="relative">
                                <input
                                    type="radio"
                                    value={option.value}
                                    {...register(name)}
                                    className="peer sr-only"
                                />
                                <div className={cn(
                                    "w-5 h-5 rounded-full border-2 transition-all",
                                    "border-muted-foreground peer-checked:border-secondary",
                                    "peer-checked:bg-secondary peer-checked:ring-2 peer-checked:ring-secondary/20"
                                )}>
                                    <div className={cn(
                                        "w-2.5 h-2.5 rounded-full bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity",
                                        isSelected ? "opacity-100" : "opacity-0"
                                    )} />
                                </div>
                            </div>
                            <span className="text-foreground group-hover:text-primary transition-colors">
                                {option.labelAr || option.label}
                            </span>
                        </label>
                    )
                })}
            </div>

            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
        </div>
    )
}