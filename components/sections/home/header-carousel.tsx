'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useSliders } from '@/hooks/api/use-common'
import { Loader2 } from 'lucide-react'
import { API_BASE_URL } from '@/services/api/config'

export function HeaderCarousel() {
  const { isArabic } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState('ar')
  const [selectedCurrency, setSelectedCurrency] = useState('sar')
  const { data: sliders, isLoading } = useSliders()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (sliders && sliders.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliders.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [sliders])
  // console.log(sliders)
  const nextSlide = () => setCurrentSlide((prev) => {
    return (prev + 1) % (sliders?.length || 1)
  })
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + (sliders?.length || 1)) % (sliders?.length || 1))
  
  if (isLoading) {
    return (
      <section className="relative h-125 md:h-150 bg-linear-to-br from-primary/20 to-secondary/20 overflow-hidden flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </section>
    )
  }

  if (!sliders || sliders.length === 0) {
    return (
      <section className="relative h-125 md:h-150 bg-linear-to-br from-primary/20 to-secondary/20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-20 h-full flex items-center">
          <div className="w-full">
            <div className="max-w-2xl ml-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {isArabic ? 'أكاديمية التنمية المتكاملة' : 'Integrated Development Academy'}
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8">
                {isArabic ? 'برامج تدريبية متميزة للشركات والحكومات' : 'Distinguished training programs for companies and governments'}
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="relative h-125 md:h-150 bg-linear-to-br from-primary/20 to-secondary/20 overflow-hidden">
        {sliders.map((slide, index) => (
          <div
            key={`slide_${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            style={{
              backgroundImage: slide.image ? `url('${API_BASE_URL}/${slide.image.replace(/\\/g, '/')}')` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="container mx-auto px-4 md:px-20 h-full flex items-center relative z-10">
              <div className="w-full">
                <div className="max-w-2xl ml-auto">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    {mounted ? slide.title : slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-white mb-8">
                    {mounted ? slide.description : slide.description}
                  </p>
                  <div className="max-w-xl">
                    <div
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center gap-3 bg-white rounded-full px-6 py-4 cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <Search className="w-5 h-5 text-[#8994ab]" />
                      <span className="text-[#8994ab] text-lg flex-1 text-right">
                        {mounted
                          ? isArabic
                            ? 'ابحث عن دورات او مدربين'
                            : 'Search for courses or trainers'
                          : 'Search for courses or trainers'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <button
            onClick={isArabic ? nextSlide : prevSlide}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            {isArabic ? <ChevronRight className="w-4 h-4 text-foreground" /> : <ChevronLeft className="w-4 h-4 text-foreground" />}
          </button>
          {sliders.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-foreground w-8' : 'bg-white/60'
                }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
          <button
            onClick={isArabic ? prevSlide : nextSlide}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            {!isArabic ? <ChevronRight className="w-4 h-4 text-foreground" /> : <ChevronLeft className="w-4 h-4 text-foreground" />}

          </button>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md p-0">
          <DialogTitle className="text-[28px] text-foreground text-center mb-6 font-bold pt-6">
            {mounted ? (isArabic ? 'اللغة و العملة' : 'Language & Currency') : 'Language & Currency'}
          </DialogTitle>
          <div className="p-6 pt-0">
            <div className="space-y-6">
              <RadioGroup value={selectedLang} onValueChange={setSelectedLang} className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="ar" id="ar" />
                  <Label htmlFor="ar" className="text-xl cursor-pointer">
                    العربية
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="en" id="en" />
                  <Label htmlFor="en" className="text-xl cursor-pointer">
                    English
                  </Label>
                </div>
              </RadioGroup>

              <hr className="border-border" />

              <RadioGroup
                value={selectedCurrency}
                onValueChange={setSelectedCurrency}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="egp" id="egp" />
                    <Label htmlFor="egp" className="text-xl cursor-pointer">
                      جنيه مصرى
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="sar" id="sar" />
                    <Label htmlFor="sar" className="text-xl cursor-pointer">
                      ريال سعودى
                    </Label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="usd" id="usd" />
                    <Label htmlFor="usd" className="text-xl cursor-pointer">
                      دولار أمريكى
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="eur" id="eur" />
                    <Label htmlFor="eur" className="text-xl cursor-pointer">
                      يورو
                    </Label>
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
