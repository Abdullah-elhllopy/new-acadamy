'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { SimpleAvatar } from '@/components/shared/simple-avatar'
import { useLanguage } from '@/shared/hooks/useLanguage'


interface ArticleAuthor {
  id: string
  name: string
  nameAr: string
  role: string
  roleAr: string
  avatar?: string
}

export interface ArticleCardProps {
  id: string
  title: string
  titleAr: string
  category: string
  categoryAr: string
  description: string
  descriptionAr: string
  image: string
  author: ArticleAuthor
  href?: string
  language?: 'en' | 'ar'
}

export function ArticleCard({
  id,
  title,
  titleAr,
  category,
  categoryAr,
  description,
  descriptionAr,
  image,
  author,
  href = '#',
}: ArticleCardProps) {
  const { isArabic } = useLanguage()
  const displayAuthorName = isArabic ? author.nameAr : author.name
  const displayAuthorRole = isArabic ? author.roleAr : author.role

  return (
    <Card className="overflow-hidden py-0 pb-3 shadow-card rounded-lg">
      <div className="relative h-52 bg-muted">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <CardContent className="px-8 text-right">
        <h3 className="text-xl font-bold text-primary mb-5">
          <Link href={href} className="hover:underline">
            <span className="text-primary">{category} -</span>
            {title}
          </Link>
        </h3>
        <p className="text-hero-bg mb-10">{description}</p>
        <hr className="mb-4" />
        <div className="flex items-center gap-4">
          <SimpleAvatar
            src={author.avatar}
            alt={displayAuthorName}
            className="w-16 h-16  bg-muted"
          />
          <div className="text-right">
            <h4 className="font-bold text-hero-bg">{displayAuthorName}</h4>
            <p className="text-sm text-hero-bg">{displayAuthorRole}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
