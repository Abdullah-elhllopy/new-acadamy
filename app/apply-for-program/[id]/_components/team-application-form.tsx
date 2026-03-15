// components/application/team-application-form.tsx
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { teamApplicationSchema, TeamApplicationFormData } from '@/types/team-application'
import { FormSelect } from '@/components/forms/form-select'
import { FormRadioGroup } from '@/components/forms/form-radio-group'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useTeamApplication } from '../_hooks/use-team-application'
import { cn } from '@/lib/utils'
import {  Send } from 'lucide-react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Form, FormField } from '@/components/forms'

interface TeamApplicationFormProps {
    courseId: string
    courseName: string
    discountCode?: string
}

const traineesOptions = [
    { value: '1-6', label: '1 - 6', labelAr: '1 - 6' },
    { value: '6-12', label: '6 - 12', labelAr: '6 - 12' },
    { value: '12-20', label: '12 - 20', labelAr: '12 - 20' },
    { value: '20+', label: 'More than 20', labelAr: 'أكثر من 20' }
]

const languageOptions = [
    { value: 'ar', label: 'العربية', labelAr: 'العربية' },
    { value: 'en', label: 'English', labelAr: 'English' }
]

export function TeamApplicationForm({
    courseId,
    courseName,
    discountCode
}: TeamApplicationFormProps) {
    const router = useRouter()
    const { language, isRTL } = useLanguage()
    const isArabic = language === 'ar'
    const mutation = useTeamApplication()

    const methods = useForm<TeamApplicationFormData>({
        resolver: zodResolver(teamApplicationSchema),
        defaultValues: {
            courseId,
            courseName,
            discountCode,
            traineesCount: '1-6',
            language: 'ar'
        }
    })

    const { handleSubmit, register, formState: { errors } } = methods

    const onSubmit = async (data: TeamApplicationFormData) => {
        try {
            // await mutation.mutateAsync(data)
            router.push('/order-confirmation')
        } catch (error) {

        }
    }

    const inputVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.05 }
        })
    }

    return (
        <div className="apply-as-team-form">
            <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                    "text-2xl md:text-3xl font-bold text-foreground mb-8 font-sans",
                    isArabic && "text-right"
                )}
            >
                {isArabic ? 'تفاصيل الطلب' : 'Application Details'}
            </motion.h3>

            <Form onSubmit={handleSubmit(onSubmit)} methods={methods} className="space-y-6">

                    <p className="text-sm text-muted-foreground mb-6">
                        <span className="text-destructive">*</span>{' '}
                        {isArabic ? 'الحقل مطلوب' : 'Required field'}
                    </p>

                    <motion.div
                        custom={0}
                        variants={inputVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <FormField
                            name="fullName"
                            label="Full Name"
                            required
                        />
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={inputVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <FormField
                            name="email"
                            type="email"
                            label="Email"
                            required
                        />
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={inputVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <FormField
                            name="phone"
                            type="tel"
                            label="Phone Number"
                            placeholder="01xxxxxxxxx"
                            required
                        />
                    </motion.div>

                    <motion.div
                        custom={3}
                        variants={inputVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <FormField
                            name="employer"
                            label="Employer"
                            required
                        />
                    </motion.div>

                    <motion.div
                        custom={4}
                        variants={inputVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <FormField
                            name="jobTitle"
                            label="Job Title"
                            required
                        />
                    </motion.div>

                    <motion.div
                        custom={5}
                        variants={inputVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <FormField
                            name="suggestedDate"
                            type="date"
                            label="Suggested Date"
                            required
                        />
                    </motion.div>

                    <motion.div
                        custom={6}
                        variants={inputVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <FormRadioGroup
                            name="language"
                            label="Training Language"
                            labelAr="لغة التدريب"
                            options={languageOptions}
                            required
                        />
                    </motion.div>

                    <motion.div
                        custom={7}
                        variants={inputVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <FormSelect
                            name="traineesCount"
                            label="Number of Trainees"
                            labelAr="عدد المتدربين"
                            options={traineesOptions}
                            required
                        />
                    </motion.div>

                    <motion.div
                        custom={8}
                        variants={inputVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-2"
                    >
                        <Label className="font-bold text-foreground">
                            {isArabic ? 'تفاصيل إضافية' : 'Additional Details'}
                        </Label>
                        <Textarea
                            {...register('additionalDetails')}
                            rows={5}
                            className="resize-none border-border focus:border-primary"
                            placeholder={isArabic ? 'أي متطلبات خاصة أو ملاحظات...' : 'Any special requirements or notes...'}
                        />
                    </motion.div>

                    <motion.div
                        custom={9}
                        variants={inputVariants}
                        initial="hidden"
                        animate="visible"
                        className="pt-4"
                    >
                        <Button
                            type="submit"
                            // disabled={mutation.isPending}
                            className={cn(
                                "w-full h-14 rounded-full text-lg font-medium",
                                "bg-secondary hover:bg-secondary-hover text-secondary-foreground",
                                "transition-all duration-300",
                                // mutation.isPending && "opacity-70 cursor-not-allowed"
                            )}
                        >
                            {/* {mutation.isPending ? (
                                <>
                                    <Loader2 className={cn("w-5 h-5 animate-spin", isRTL ? "ml-2" : "mr-2")} />
                                    {isArabic ? 'جاري إرسال الطلب...' : 'Submitting...'}
                                </>
                            ) : ( */}
                                <>
                                    <Send className={cn("w-5 h-5", isRTL ? "ml-2" : "mr-2")} />
                                    {isArabic ? 'إرسال الطلب' : 'Submit Application'}
                                </>
                            {/* )} */}
                        </Button>
                    </motion.div>

                    {/* {mutation.isError && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-destructive mt-4"
                        >
                            {isArabic
                                ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.'
                                : 'Sorry, an error occurred. Please try again.'}
                        </motion.p>
                    )} */}
            </Form>
        </div>
    )
}