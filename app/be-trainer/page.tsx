'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/shared/breadcrumb'
import { Form, FormField } from '@/components/forms'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { beTrainerSchema, BeTrainerData } from '@/lib/validations'
import { Layout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { Title } from '@/components/shared/title'

export default function BeTrainerPage() {
  useEffect(() => {
    document.title = 'كن مدربا'
  }, [])

  const [cvFile, setCvFile] = useState<File | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [coursesAndFields, setCoursesAndFields] = useState<Array<{ courseName: string; fieldName: string }>>([])
  const [loading, setLoading] = useState(false)
  
  const methods = useForm<BeTrainerData>({
    resolver: zodResolver(beTrainerSchema)
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setCvFile(file)
    }
  }

  const onSubmit = async (data: BeTrainerData) => {
    if (!cvFile) {
      toast.error('يرجى رفع السيرة الذاتية')
      return
    }
    setLoading(true)
    setTimeout(() => {
      toast.success('تم إرسال طلبك بنجاح')
      setCvFile(null)
      setImageFile(null)
      setImagePreview(null)
      setCoursesAndFields([])
      methods.reset()
      setLoading(false)
    }, 1500)
  }

  return (
    <Layout>
      <Hero 
        breadcrumbItems={[
          { label: 'الصفحة الرئيسية', href: '/' },
          { label: 'كن مدربا' }
        ]}
      >
        <Title title="كن مدربا" />
      </Hero>


      <div className="grid grid-cols-1 lg:grid-cols-[45%_45%] gap-27.75 px-10 py-10 md:px-20 max-sm:px-5 max-sm:gap-12.5 sm:max-md:gap-17.5 md:max-lg:gap-17.5">
        <div>
          <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)} className="space-y-0">
            <FormField
              name="fullName"
              label="الاسم بالكامل"
              required
              className="mb-4"
              labelClassName="text-primary font-sans font-bold"
              inputClassName="h-11 border-border focus:border-primary"
            />

            <FormField
              name="email"
              label="البريد الالكتروني"
              type="email"
              required
              className="mb-4"
              labelClassName="text-primary font-sans font-bold"
              inputClassName="h-11 border-border focus:border-primary"
            />

            <FormField
              name="phone"
              label="رقم الهاتف"
              type="tel"
              required
              className="mb-4"
              labelClassName="text-primary font-sans font-bold"
              inputClassName="h-11 border-border focus:border-primary"
            />

            <div className="bg-muted p-5 my-5">
              <p className="text-primary font-sans font-bold mb-4">المجال والدورة</p>
              <FormField
                name="fieldName"
                label="اسم المجال"
                className="mb-3"
                labelClassName="text-primary font-sans font-bold"
                inputClassName="h-11 border-border focus:border-primary"
              />
              <FormField
                name="courseName"
                label="اسم الدورة"
                className="mb-3"
                labelClassName="text-primary font-sans font-bold"
                inputClassName="h-11 border-border focus:border-primary"
              />
              <button
                type="button"
                onClick={() => {
                  const fieldName = methods.getValues('fieldName')
                  const courseName = methods.getValues('courseName')
                  if (fieldName?.trim() && courseName?.trim()) {
                    setCoursesAndFields([...coursesAndFields, { fieldName, courseName }])
                    methods.setValue('fieldName', '')
                    methods.setValue('courseName', '')
                  }
                }}
                className="border-2 border-primary text-primary px-4 py-2 font-sans font-bold rounded-[23px] hover:bg-primary hover:text-white cursor-pointer"
              >
                اضافة
              </button>
              {coursesAndFields.length > 0 && (
                <table className="w-full mt-4">
                  <tbody>
                    {coursesAndFields.map((item, index) => (
                      <tr key={index} className="border-b border-border">
                        <td className="py-2.5">
                          <p className="text-primary font-sans font-bold text-sm mb-1 w-[70%]">
                            {item.fieldName} - {item.courseName}
                          </p>
                        </td>
                        <td className="relative">
                          <button
                            type="button"
                            onClick={() => setCoursesAndFields(coursesAndFields.filter((_, i) => i !== index))}
                            className="absolute left-0 -mt-4 bg-transparent border-0 text-muted-foreground text-xl hover:text-destructive"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="mb-4">
              <p className="text-primary font-sans font-bold mb-4">صورتك الشخصية</p>
              <div className="flex items-center gap-4">
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="w-15 h-15 rounded-full object-cover" />
                )}
                <label className="cursor-pointer">
                  {imagePreview ? (
                    <span className="border-2 border-primary text-primary px-4 py-2 font-sans font-bold rounded-[23px] hover:bg-primary hover:text-white inline-block">
                      رفع صورة جديدة
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <i className="ri-user-line bg-muted-foreground text-xl p-5 text-white rounded-full"></i>
                      <span className="border-2 border-primary text-primary px-4 py-2 font-sans font-bold rounded-[23px] hover:bg-primary hover:text-white inline-block">
                        رفع صورة شخصية
                      </span>
                    </span>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
            </div>

            <FormField
              name="jobTitle"
              label="المسمي الوظيفي"
              required
              className="mb-4"
              labelClassName="text-primary font-sans font-bold"
              inputClassName="h-11 border-border focus:border-primary"
            />

            <FormField
              name="country"
              label="الدولة"
              required
              className="mb-4"
              labelClassName="text-primary font-sans font-bold"
              inputClassName="h-11 border-border focus:border-primary"
            />

            <div className="bg-muted p-5 my-5">
              <p className="text-primary font-sans font-bold mb-4">الملف الشخصي الخاص بك</p>
              <label className="cursor-pointer">
                {cvFile ? (
                  <p className="flex items-center gap-3">
                    <i className="ri-file-fill text-primary text-2xl"></i>
                    <span className="text-hero-bg relative -top-1.5">{cvFile.name}</span>
                  </p>
                ) : (
                  <span className="border-2 border-primary text-primary px-4 py-2 font-sans font-bold rounded-[23px] hover:bg-primary hover:text-white inline-block mt-2.5">
                    رفع الملف الشخصي
                  </span>
                )}
                <input type="file" accept="application/pdf" onChange={handleCvChange} className="hidden" />
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-14 bg-primary border-primary rounded-[30px] hover:bg-primary-hover disabled:bg-disabled disabled:border-disabled w-full"
            >
              {loading ? 'جارى ارسال الطلب ...' : 'ارسال الطلب'}
            </Button>
          </Form>
        </div>

        <div className="relative">
          <img src="/placeholder.jpg" alt="كن مدربا" className="w-full" />
          <p className="absolute bottom-20 text-white px-10 text-[28px] max-sm:bottom-26.25 max-sm:px-5 max-sm:text-xl sm:max-md:bottom-20 sm:max-md:px-5 sm:max-md:text-base md:max-lg:bottom-20 md:max-lg:px-5 md:max-lg:text-xl lg:max-xl:bottom-25 lg:max-xl:text-2xl">
            انضم الينا الان و أنشئ الكورس الخاص بك و انشر الفائدة بين الكثير من الطلاب
          </p>
        </div>
      </div>
    </Layout>
  )
}
