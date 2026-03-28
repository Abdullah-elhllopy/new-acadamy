'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PageHeader } from '@/components/shared/page-header'
import { Form, FormField } from '@/components/forms'
import { Mail, Phone, MapPin, Clock, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react'
import { toast } from 'sonner'
import { contactSchema, ContactFormData } from '@/lib/validations'

const MOCK_CONTACT_DATA = {
  email: 'info@id-academy.com',
  phone: '+966 12 345 6789',
  address: 'Riyadh, Saudi Arabia - Business District',
  workingHours: 'Sun - Thu: 9:00 AM - 5:00 PM',
  social: {
    facebook: 'https://facebook.com/idacademy',
    linkedin: 'https://linkedin.com/company/idacademy',
    twitter: 'https://twitter.com/idacademy',
    instagram: 'https://instagram.com/idacademy'
  }
}

export default function ContactPage() {
  const { isArabic } = useLanguage();
  const [loading, setLoading] = useState(false)
  const methods = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const handleSubmit = async (data: ContactFormData) => {
    setLoading(true)
    setTimeout(() => {
      toast.success(isArabic ? 'تم إرسال رسالتك بنجاح' : 'Message sent successfully')
      methods.reset()
      setLoading(false)
    }, 1000)
  }

  return (
    <>
      <PageHeader
        title={isArabic ? 'اتصل بنا' : 'Contact Us'}
        description={isArabic ? 'نحن هنا للإجابة على استفساراتك ومساعدتك' : 'We are here to answer your questions and help you'}
        isArabic={isArabic}
      />

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className={`text-2xl font-bold mb-6 `}>
                {isArabic ? 'أرسل لنا رسالة' : 'Send us a message'}
              </h2>
              <Form methods={methods} onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  name="name"
                  label={isArabic ? 'الاسم بالكامل' : 'Full Name'}
                  required
                />
                <FormField
                  name="email"
                  label={isArabic ? 'البريد الإلكتروني' : 'Email'}
                  type="email"
                  required
                />
                <FormField
                  name="phone"
                  label={isArabic ? 'رقم الهاتف' : 'Phone Number'}
                  type="tel"
                  required
                />
                <FormField
                  name="subject"
                  label={isArabic ? 'الموضوع' : 'Subject'}
                  required
                />
                <FormField
                  name="message"
                  label={isArabic ? 'رسالتك' : 'Your Message'}
                  type="textarea"
                  rows={6}
                  required
                />
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (isArabic ? 'جاري الإرسال...' : 'Sending...') : (isArabic ? 'إرسال' : 'Send')}
                </Button>
              </Form>
            </div>

            <div className="space-y-6">
              <h2 className={`text-2xl font-bold mb-6 `}>
                {isArabic ? 'معلومات الاتصال' : 'Contact Information'}
              </h2>

              <Card>
                <CardContent className="pt-6">
                  <div className={`flex items-start gap-4  `}>
                    <Mail className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div >
                      <p className="font-semibold mb-1">{isArabic ? 'البريد الإلكتروني' : 'Email'}</p>
                      <a href={`mailto:${MOCK_CONTACT_DATA.email}`} className="text-muted-foreground hover:text-primary">
                        {MOCK_CONTACT_DATA.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className={`flex items-start gap-4  `}>
                    <Phone className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div >
                      <p className="font-semibold mb-1">{isArabic ? 'الهاتف' : 'Phone'}</p>
                      <a href={`tel:${MOCK_CONTACT_DATA.phone}`} className="text-muted-foreground hover:text-primary">
                        {MOCK_CONTACT_DATA.phone}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className={`flex items-start gap-4  `}>
                    <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div >
                      <p className="font-semibold mb-1">{isArabic ? 'العنوان' : 'Address'}</p>
                      <p className="text-muted-foreground">{MOCK_CONTACT_DATA.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className={`flex items-start gap-4  `}>
                    <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div >
                      <p className="font-semibold mb-1">{isArabic ? 'ساعات العمل' : 'Working Hours'}</p>
                      <p className="text-muted-foreground">{MOCK_CONTACT_DATA.workingHours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h3 className="font-semibold mb-4">{isArabic ? 'تابعنا على' : 'Follow Us'}</h3>
                <div className="flex gap-4">
                  <a href={MOCK_CONTACT_DATA.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href={MOCK_CONTACT_DATA.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={MOCK_CONTACT_DATA.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href={MOCK_CONTACT_DATA.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-96 w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.9!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sen!2ssa!4v1234567890"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
        />
      </section>
    </>
  )
}
