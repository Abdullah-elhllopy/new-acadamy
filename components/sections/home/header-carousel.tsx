'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export function HeaderCarousel() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const isArabic = language === 'ar'
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState('ar')
  const [selectedCurrency, setSelectedCurrency] = useState('sar')

  useEffect(() => {
    setMounted(true)
  }, [])

  const slides = [
    {
      id: 1,
      titleAr: 'أكاديمية التنمية المتكاملة',
      titleEn: 'Integrated Development Academy',
      descriptionAr: 'برامج تدريبية متميزة للشركات والحكومات',
      descriptionEn: 'Distinguished training programs for companies and governments',
      image: '/placeholder.jpg',
    },
    {
      id: 2,
      titleAr: 'تطوير المهارات القيادية',
      titleEn: 'Leadership Skills Development',
      descriptionAr: 'نساعدك على تطوير مهاراتك القيادية',
      descriptionEn: 'We help you develop your leadership skills',
      image: '/placeholder.jpg',
    },
    {
      id: 3,
      titleAr: 'برامج تدريبية عالمية',
      titleEn: 'World-Class Training Programs',
      descriptionAr: 'احصل على شهادات معتمدة دولياً',
      descriptionEn: 'Get internationally accredited certificates',
      image: '/placeholder.jpg',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <>
      <section className="relative h-125 md:h-150 bg-linear-to-br from-primary/20 to-secondary/20 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="container mx-auto px-4 md:px-20 h-full flex items-center">
              <div className={`w-full `}>
                <div className="max-w-2xl ml-auto">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    {mounted ? (isArabic ? slide.titleAr : slide.titleEn) : slide.titleEn}
                  </h1>
                  <p className="text-xl md:text-2xl text-white mb-8">
                    {mounted ? (isArabic ? slide.descriptionAr : slide.descriptionEn) : slide.descriptionEn}
                  </p>
                  <div className="max-w-xl">
                    <div 
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center gap-3 bg-white rounded-full px-6 py-4 cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <Search className="w-5 h-5 text-[#8994ab]" />
                      <span className="text-[#8994ab] text-lg flex-1 text-right">
                        {mounted ? (isArabic ? 'ابحث عن دورات او مدربين' : 'Search for courses or trainers') : 'Search for courses or trainers'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className={ `absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`} >
          <button
            onClick={prevSlide}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-foreground w-8' : 'bg-white/60'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
          <button
            onClick={nextSlide}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md p-0">
          <DialogTitle className="text-[28px] text-foreground text-center mb-6 font-bold pt-6">
            {mounted ? (isArabic ? 'اللغة و العملة' : 'Language & Currency') : 'Language & Currency'}
          </DialogTitle>
          {/* <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 z-10"
          >
            <X className="h-5 w-5" />
          </button> */}
          <div className="p-6 pt-0">
            <div className="space-y-6">
              <RadioGroup value={selectedLang} onValueChange={setSelectedLang} className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="ar" id="ar" />
                  <Label htmlFor="ar" className="text-xl cursor-pointer">العربية</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="en" id="en" />
                  <Label htmlFor="en" className="text-xl cursor-pointer">English</Label>
                </div>
              </RadioGroup>
              
              <hr className="border-border" />
              
              <RadioGroup value={selectedCurrency} onValueChange={setSelectedCurrency} className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="egp" id="egp" />
                    <Label htmlFor="egp" className="text-xl cursor-pointer">جنيه مصرى</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="sar" id="sar" />
                    <Label htmlFor="sar" className="text-xl cursor-pointer">ريال سعودى</Label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="usd" id="usd" />
                    <Label htmlFor="usd" className="text-xl cursor-pointer">دولار أمريكى</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="eur" id="eur" />
                    <Label htmlFor="eur" className="text-xl cursor-pointer">يورو</Label>
                  </div>
                </div>
              </RadioGroup>
              
              <Button 
                onClick={() => setIsModalOpen(false)}
                className="w-full h-14 rounded-full bg-success hover:bg-secondary-hover text-white text-xl font-medium mt-2"
              >
                {mounted ? (isArabic ? 'تأكيد' : 'Confirm') : 'Confirm'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
