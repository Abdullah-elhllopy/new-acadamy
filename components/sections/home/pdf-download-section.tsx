// components/sections/pdf-download-section.tsx
'use client'

import { useState } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Download, FileText, CheckCircle, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FormData {
    name: string
    email: string
}

export function PDFDownloadSection() {
    const { isArabic } = useLanguage()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState<FormData>({ name: '', email: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Store in state (no actual API)
        console.log('PDF Request:', formData)
        setIsSubmitting(false)
        setIsSuccess(true)

        // Reset after 3 seconds
        setTimeout(() => {
            setIsSuccess(false)
            setFormData({ name: '', email: '' })
            setIsModalOpen(false)
        }, 3000)
    }

    return (
        <section className="py-16 bg-linear-to-br from-primary/5 to-secondary/5 border-y border-border">
            <div className="container mx-auto px-4 md:px-20">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center gap-6"
                    >
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-2">
                            <FileText className="w-8 h-8 text-primary" />
                        </div>

                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                                {isArabic ? 'ملف تعريفي بالأكاديمية' : 'Academy Profile'}
                            </h3>
                            <p className="text-muted-foreground max-w-xl mx-auto">
                                {isArabic
                                    ? 'حمّل الملف التعريفي الشامل للأكاديمية واكتشف برامجنا وخدماتنا التدريبية'
                                    : 'Download our comprehensive academy profile and discover our training programs and services'}
                            </p>
                        </div>

                        <Button
                            size="lg"
                            className="rounded-full h-14 px-8 bg-primary hover:bg-secondary text-lg gap-2"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Download className="w-5 h-5" />
                            {isArabic ? 'تحميل الملف التعريفي' : 'Download Academy File'}
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className={`text-2xl `}>
                            {isArabic ? 'تحميل الملف التعريفي' : 'Download Academy Profile'}
                        </DialogTitle>
                        <DialogDescription >
                            {isArabic
                                ? 'أدخل بياناتك وسنرسل الملف إلى بريدك الإلكتروني'
                                : 'Enter your details and we will send the file to your email'}
                        </DialogDescription>
                    </DialogHeader>

                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="py-12 text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                                    className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4"
                                >
                                    <CheckCircle className="w-10 h-10 text-success" />
                                </motion.div>
                                <h4 className="text-xl font-bold text-foreground mb-2">
                                    {isArabic ? 'تم الإرسال بنجاح!' : 'Sent Successfully!'}
                                </h4>
                                <p className="text-muted-foreground">
                                    {isArabic
                                        ? 'سيتم إرسال الملف إلى بريدك الإلكتروني قريباً'
                                        : 'The file will be sent to your email shortly'}
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-4 mt-4"
                            >
                                <div className="space-y-2">
                                    <label className={`text-sm font-medium`}>
                                        {isArabic ? 'الاسم الكامل' : 'Full Name'}
                                    </label>
                                    <Input
                                        required
                                        type="text"
                                        placeholder={isArabic ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="h-12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className={`text-sm font-medium`}>
                                        {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                                    </label>
                                    <Input
                                        required
                                        type="email"
                                        placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="h-12"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-full bg-primary hover:bg-secondary mt-6"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            {isArabic ? 'جاري الإرسال...' : 'Sending...'}
                                        </>
                                    ) : (
                                        isArabic ? 'إرسال الملف' : 'Send File'
                                    )}
                                </Button>

                                <p className={`text-xs text-muted-foreground mt-4`}>
                                    {isArabic
                                        ? 'بالضغط على الإرسال، أنت توافق على سياسة الخصوصية الخاصة بنا'
                                        : 'By clicking send, you agree to our privacy policy'}
                                </p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </DialogContent>
            </Dialog>
        </section>
    )
}