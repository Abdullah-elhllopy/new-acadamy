'use client'

import { useState } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Upload, X, FileText } from 'lucide-react'
import { toast } from 'sonner'

export default function BeTrainerPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    jobTitle: '',
    country: '',
    courseName: '',
    educationField: ''
  })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [certificates, setCertificates] = useState<string[]>([])
  const [newCertificate, setNewCertificate] = useState('')

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
    if (file) {
      setCvFile(file)
    }
  }

  const addCertificate = () => {
    if (newCertificate.trim()) {
      setCertificates([...certificates, newCertificate.trim()])
      setNewCertificate('')
    }
  }

  const removeCertificate = (index: number) => {
    setCertificates(certificates.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      toast.success(isArabic ? 'تم إرسال طلبك بنجاح' : 'Application submitted successfully')
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        jobTitle: '',
        country: '',
        courseName: '',
        educationField: ''
      })
      setCvFile(null)
      setImageFile(null)
      setImagePreview(null)
      setCertificates([])
      setLoading(false)
    }, 1500)
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 md:py-24 border-b border-border">
        <div className="container px-4 md:px-6">
          <div className={`max-w-2xl ${isArabic ? 'text-right' : ''}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {isArabic ? 'كن مدرباً' : 'Become a Trainer'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isArabic
                ? 'انضم إلى فريقنا من المدربين المحترفين وشارك خبرتك'
                : 'Join our team of professional trainers and share your expertise'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className={isArabic ? 'text-right block' : ''}>
                      {isArabic ? 'الاسم بالكامل' : 'Full Name'} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                      className={isArabic ? 'text-right' : ''}
                    />
                  </div>
                  <div>
                    <Label className={isArabic ? 'text-right block' : ''}>
                      {isArabic ? 'البريد الإلكتروني' : 'Email'} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className={isArabic ? 'text-right' : ''}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className={isArabic ? 'text-right block' : ''}>
                      {isArabic ? 'رقم الهاتف' : 'Phone'} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className={isArabic ? 'text-right' : ''}
                    />
                  </div>
                  <div>
                    <Label className={isArabic ? 'text-right block' : ''}>
                      {isArabic ? 'المسمى الوظيفي' : 'Job Title'} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      required
                      className={isArabic ? 'text-right' : ''}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className={isArabic ? 'text-right block' : ''}>
                      {isArabic ? 'الدولة' : 'Country'} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      required
                      className={isArabic ? 'text-right' : ''}
                    />
                  </div>
                  <div>
                    <Label className={isArabic ? 'text-right block' : ''}>
                      {isArabic ? 'مجال التعليم' : 'Education Field'}
                    </Label>
                    <Input
                      value={formData.educationField}
                      onChange={(e) => setFormData({ ...formData, educationField: e.target.value })}
                      className={isArabic ? 'text-right' : ''}
                    />
                  </div>
                </div>

                <div>
                  <Label className={isArabic ? 'text-right block' : ''}>
                    {isArabic ? 'اسم الدورة التي تود تدريسها' : 'Course Name'}
                  </Label>
                  <Input
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    className={isArabic ? 'text-right' : ''}
                  />
                </div>

                <div>
                  <Label className={isArabic ? 'text-right block mb-2' : 'mb-2 block'}>
                    {isArabic ? 'صورتك الشخصية' : 'Your Photo'}
                  </Label>
                  <div className="flex items-center gap-4">
                    {imagePreview && (
                      <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-full object-cover" />
                    )}
                    <label className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent">
                        <Upload className="w-4 h-4" />
                        <span>{isArabic ? 'رفع صورة' : 'Upload Photo'}</span>
                      </div>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>
                </div>

                <div>
                  <Label className={isArabic ? 'text-right block mb-2' : 'mb-2 block'}>
                    {isArabic ? 'السيرة الذاتية (PDF)' : 'CV (PDF)'} <span className="text-red-500">*</span>
                  </Label>
                  <label className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-3 border border-input rounded-md hover:bg-accent">
                      <FileText className="w-5 h-5" />
                      <span>{cvFile ? cvFile.name : (isArabic ? 'رفع السيرة الذاتية' : 'Upload CV')}</span>
                    </div>
                    <input type="file" accept=".pdf" onChange={handleCvChange} required className="hidden" />
                  </label>
                </div>

                <div>
                  <Label className={isArabic ? 'text-right block mb-2' : 'mb-2 block'}>
                    {isArabic ? 'الشهادات العلمية' : 'Certificates'}
                  </Label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={newCertificate}
                      onChange={(e) => setNewCertificate(e.target.value)}
                      placeholder={isArabic ? 'اسم الشهادة' : 'Certificate name'}
                      className={isArabic ? 'text-right' : ''}
                    />
                    <Button type="button" onClick={addCertificate} variant="outline">
                      {isArabic ? 'إضافة' : 'Add'}
                    </Button>
                  </div>
                  {certificates.length > 0 && (
                    <div className="space-y-2">
                      {certificates.map((cert, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm">{cert}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCertificate(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (isArabic ? 'جاري الإرسال...' : 'Submitting...') : (isArabic ? 'إرسال الطلب' : 'Submit Application')}
                </Button>
              </form>
            </div>

            <div>
              <Card>
                <CardContent className="pt-6">
                  <h3 className={`font-bold text-lg mb-4 ${isArabic ? 'text-right' : ''}`}>
                    {isArabic ? 'لماذا تنضم إلينا؟' : 'Why Join Us?'}
                  </h3>
                  <ul className={`space-y-3 text-sm text-muted-foreground ${isArabic ? 'text-right' : ''}`}>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>{isArabic ? 'فرصة للعمل مع مؤسسات رائدة' : 'Work with leading organizations'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>{isArabic ? 'دخل تنافسي' : 'Competitive income'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>{isArabic ? 'مرونة في الجدول الزمني' : 'Flexible schedule'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>{isArabic ? 'دعم مهني مستمر' : 'Ongoing professional support'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>{isArabic ? 'منصة تعليمية متطورة' : 'Advanced learning platform'}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
