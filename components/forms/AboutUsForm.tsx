'use client'

import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Trash2, Plus } from 'lucide-react'
import Link from 'next/link'
import { AboutUs, OurValue } from '@/services/api'


interface AboutUsFormProps {
  form: UseFormReturn<AboutUs>
  onSubmit: (data: AboutUs, ourValues: OurValue[]) => void
  isSubmitting: boolean
  submitText: string
  currentImage?: string
  currentPdf?: string
  initialOurValues?: OurValue[]
}

export function AboutUsForm({ form, onSubmit, isSubmitting, submitText, currentImage, currentPdf, initialOurValues = [] }: AboutUsFormProps) {
  const [ourValues, setOurValues] = useState<OurValue[]>(initialOurValues)
  const [currentValue, setCurrentValue] = useState({ title: '', description: '' })
  const [ourValuesError, setOurValuesError] = useState('')

  const addOurValue = () => {
    if (!currentValue.title || !currentValue.description) return
    const newValue: OurValue = {
      id: Date.now() + Math.random(),
      title: currentValue.title,
      description: currentValue.description
    }
    setOurValues([...ourValues, newValue])
    setCurrentValue({ title: '', description: '' })
    setOurValuesError('')
  }

  const deleteOurValue = (id: number) => {
    setOurValues(ourValues.filter(value => value.id !== id))
  }

  const handleFormSubmit = (data: AboutUs) => {
    if (ourValues.length === 0) {
      setOurValuesError('من فضلك أضف قيمة واحدة على الأقل')
      return
    }
    setOurValuesError('')
    onSubmit(data, ourValues)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">بيانات الشركة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم الشركة</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم التليفون</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>البريد الإلكترونى</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ourVision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الرؤية</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ourMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الرسالة</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workingHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ساعات العمل</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="aboutUs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عن الشركة</FormLabel>
                <FormControl>
                  <Textarea rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">روابط السوشيال ميديا</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>فيسبوك</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>لينكد ان</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تويتر</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instgram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>انستجرام</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">ملحقات الشركة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentImage && (
              <div>
                <p className="text-sm font-medium mb-2">لوجو الشركة الحالي</p>
                <img src={currentImage} alt="لوجو" className="h-20 object-contain mb-2" />
              </div>
            )}
            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>{currentImage ? 'تغيير لوجو الشركة' : 'لوجو الشركة'}</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files)} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {currentPdf && (
              <div>
                <p className="text-sm font-medium mb-2">الملف الحالي</p>
                <a href={currentPdf} className="text-blue-600 hover:underline">
                  الملف التعريفيى الخاص بالشركة <i className="ri-download-2-line"></i>
                </a>
              </div>
            )}
            <FormField
              control={form.control}
              name="pdf"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>{currentPdf ? 'تغيير الملف التعريفى' : 'الملف التعريفى بالشركة PDF'}</FormLabel>
                  <FormControl>
                    <Input type="file" accept=".pdf" onChange={(e) => onChange(e.target.files)} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">قيم الشركة</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium">القيمة <span className="text-red-500">*</span></label>
                <Input
                  type="text"
                  value={currentValue.title}
                  onChange={(e) => setCurrentValue({ ...currentValue, title: e.target.value })}
                  placeholder="أدخل القيمة"
                />
              </div>
              <div>
                <label className="text-sm font-medium">الشرح <span className="text-red-500">*</span></label>
                <Textarea
                  rows={3}
                  value={currentValue.description}
                  onChange={(e) => setCurrentValue({ ...currentValue, description: e.target.value })}
                  placeholder="أدخل الشرح"
                />
              </div>
              <Button
                type="button"
                onClick={addOurValue}
                variant="secondary"
                className="w-fit"
              >
                <Plus className="w-4 h-4 mr-2" />
                اضافة
              </Button>
            </div>

            {ourValuesError && (
              <p className="text-sm text-destructive">{ourValuesError}</p>
            )}

            {ourValues.length > 0 && (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {ourValues.map((value) => (
                      <tr key={value.id} className="border-b last:border-b-0 hover:bg-muted/50">
                        <td className="p-4">
                          <p className="font-medium mb-1">{value.title}</p>
                          <p className="text-sm text-muted-foreground">{value.description}</p>
                        </td>
                        <td className="p-4 w-20">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteOurValue(value.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-start gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/dashboard/about-us">إلغاء</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'جارى الحفظ...' : submitText}
          </Button>
        </div>
      </form>
    </Form>
  )
}
