'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Breadcrumb } from '@/components/shared/breadcrumb'
import { motion } from 'framer-motion'
import { Facebook, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import TeamMember from '@/components/shared/TeamMember'

const MOCK_TRAINERS = [
  {
    instructorid: 1,
    name: 'د. أحمد السعود',
    job: 'القيادة والإدارة',
    image: '/placeholder.jpg',
    facbook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  {
    instructorid: 2,
    name: 'سارة جونسون',
    job: 'التسويق الرقمي',
    image: '/placeholder.jpg',
    facbook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  {
    instructorid: 3,
    name: 'محمد الراشد',
    job: 'إدارة المشاريع',
    image: '/placeholder.jpg',
    facbook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  {
    instructorid: 4,
    name: 'فاطمة الزهراني',
    job: 'الموارد البشرية',
    image: '/placeholder.jpg',
    facbook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  {
    instructorid: 5,
    name: 'عمر عبدالله',
    job: 'علم البيانات',
    image: '/placeholder.jpg',
    facbook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  }
]

export default function TrainersPage() {
  useEffect(() => {
    document.title = 'مدربينا'
  }, [])

  return (
    <div className="text-start">
      <motion.div
        className="h-50 bg-muted px-10 py-10 md:px-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Breadcrumb
          items={[
            { label: 'الصفحة الرئيسية', href: '/' },
            { label: 'المدربين' }
          ]}
          isArabic={true}
        />
        <h1 className="text-[48px] font-sans font-bold text-primary mb-7.5 mt-7.5 max-md:text-4xl max-sm:text-4xl">المدربين</h1>
      </motion.div>

      <div className="px-10 py-20 md:px-20 max-sm:px-2.5">
        <motion.section
          className="grid gap-10 max-sm:gap-10 max-sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] sm:max-md:gap-5 sm:max-md:grid-cols-[repeat(auto-fill,minmax(225px,1fr))] md:max-lg:gap-5 md:max-lg:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] lg:max-xl:grid-cols-[repeat(auto-fill,minmax(225px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(20%,1fr))]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {MOCK_TRAINERS.map((trainer) => (
            <TeamMember key={`${trainer.instructorid}-trainer`} trainer={trainer} />
          ))}
        </motion.section>
      </div>
    </div>
  )
}
