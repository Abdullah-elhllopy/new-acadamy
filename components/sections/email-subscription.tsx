'use client'

import { useState } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'

export function EmailSubscription() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscription
    console.log('Subscribe:', email)
    setEmail('')
  }

  return (
    <section className="bg-muted py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {isArabic ? 'اشترك في نشرتنا البريدية' : 'Subscribe to Our Newsletter'}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {isArabic
              ? 'احصل على آخر الأخبار والعروض الخاصة'
              : 'Get the latest news and special offers'}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 flex-1"
              required
            />
            <Button type="submit" className="h-12 px-8 rounded-full bg-primary hover:bg-secondary">
              {isArabic ? 'اشترك' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
