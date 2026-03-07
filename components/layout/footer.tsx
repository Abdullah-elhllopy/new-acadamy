'use client'

import Link from 'next/link'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Separator } from '@/components/ui/separator'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export function Footer() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <footer className="bg-[#f5f7fa]">
      {/* Main footer content */}
      <div className="px-4 md:px-20 pt-20 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          {/* Company info */}
          <div className={isArabic ? 'text-right' : 'text-left'}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                ID
              </div>
              <span className="font-bold text-2xl text-primary">Academy</span>
            </div>
          </div>

          {/* روابط سريعة */}
          <div className={isArabic ? 'text-right' : 'text-left'}>
            <h2 className="font-bold text-[28px] mb-5 text-[#001645]">
              {isArabic ? 'روابط سريعة' : 'Quick Links'}
            </h2>
            <ul className="space-y-2.5 text-xl">
              <li className="h-[43px]">
                <Link href="/" className="text-[#39465e] hover:text-primary transition-colors">
                  {isArabic ? 'الرئيسية' : 'Home'}
                </Link>
              </li>
              <li className="h-[43px]">
                <Link href="/about" className="text-[#39465e] hover:text-primary transition-colors">
                  {isArabic ? 'من نحن' : 'About Us'}
                </Link>
              </li>
              <li className="h-[43px]">
                <Link href="/be-trainer" className="text-[#39465e] hover:text-primary transition-colors">
                  {isArabic ? 'كن مدربا' : 'Be a Trainer'}
                </Link>
              </li>
              <li className="h-[43px]">
                <Link href="/contact" className="text-[#39465e] hover:text-primary transition-colors">
                  {isArabic ? 'اتصل بنا' : 'Contact Us'}
                </Link>
              </li>
              <li className="h-[43px]">
                <Link href="/privacy" className="text-[#39465e] hover:text-primary transition-colors">
                  {isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
                </Link>
              </li>
            </ul>
          </div>

          {/* مركز المعرفة */}
          <div className={isArabic ? 'text-right' : 'text-left'}>
            <h2 className="font-bold text-[28px] mb-5 text-[#001645]">
              {isArabic ? 'مركز المعرفة' : 'Knowledge Center'}
            </h2>
            <ul className="space-y-2.5 text-xl">
              <li className="h-[43px]">
                <Link href="/news" className="text-[#39465e] hover:text-primary transition-colors">
                  {isArabic ? 'أخبارنا' : 'Our News'}
                </Link>
              </li>
              <li className="h-[43px]">
                <Link href="/articles" className="text-[#39465e] hover:text-primary transition-colors">
                  {isArabic ? 'مقالات' : 'Articles'}
                </Link>
              </li>
              <li className="h-[43px]">
                <Link href="/reports" className="text-[#39465e] hover:text-primary transition-colors">
                  {isArabic ? 'تقارير' : 'Reports'}
                </Link>
              </li>
              <li className="h-[43px]">
                <Link href="/images-center" className="text-[#39465e] hover:text-primary transition-colors">
                  {isArabic ? 'مركز الصور' : 'Images Center'}
                </Link>
              </li>
              <li className="h-[43px]">
                <Link href="/trainers" className="text-[#39465e] hover:text-primary transition-colors">
                  {isArabic ? 'مركز المدربين' : 'Trainers Center'}
                </Link>
              </li>
            </ul>
          </div>

          {/* اتصل بنا */}
          <div className={isArabic ? 'text-right' : 'text-left'}>
            <h2 className="font-bold text-[28px] mb-5 text-[#001645]">
              {isArabic ? 'اتصل بنا' : 'Contact Us'}
            </h2>
            <ul className="space-y-4 text-xl">
              <li className="flex items-start gap-3">
                <MapPin className="w-6 h-6 mt-0.5 flex-shrink-0 text-[#39465e]" />
                <span className="text-[#39465e]">{isArabic ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</span>
              </li>
              <li className="flex items-start gap-3 mb-4">
                <Mail className="w-6 h-6 mt-0.5 flex-shrink-0 text-[#39465e]" />
                <a href="mailto:info@id-academy.com" className="text-[#39465e] hover:text-primary transition-colors">
                  info@id-academy.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-6 h-6 mt-0.5 flex-shrink-0 text-[#39465e]" />
                <a href="tel:+966114567890" className="text-[#39465e] hover:text-primary transition-colors">
                  +966 11 4567 890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-[#8994ab] my-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8">
          <p className="text-xl text-[#39465e]">
            {isArabic
              ? 'جميع الحقوق محفوظة 2021 © Integrated Development Academy'
              : '© 2021 Integrated Development Academy. All rights reserved.'}
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-[#39465e] hover:text-[#001645] transition-colors">
              <Instagram className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-[#39465e] hover:text-[#001645] transition-colors">
              <Facebook className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-[#39465e] hover:text-[#001645] transition-colors">
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-[#39465e] hover:text-[#001645] transition-colors">
              <Twitter className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
