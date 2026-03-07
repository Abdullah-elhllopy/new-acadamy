import Link from 'next/link'
import { Star, Mail, LinkedinIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Trainer } from '@/shared/types'

interface TrainerCardProps {
  trainer: Trainer
  language: 'en' | 'ar'
  onContact?: () => void
}

export function TrainerCard({ trainer, language, onContact }: TrainerCardProps) {
  const isArabic = language === 'ar'
  const name = isArabic ? trainer.nameAr : trainer.nameEn

  return (
    <Card className="hover:border-primary/50 transition-all group">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Avatar */}
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
              {name.split(' ')[0][0]}{name.split(' ')[1]?.[0] || ''}
            </AvatarFallback>
          </Avatar>

          {/* Name and rating */}
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-foreground">{name}</h3>
            <div className="flex items-center justify-center gap-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(trainer.rating)
                        ? 'fill-accent text-accent'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {trainer.rating.toFixed(1)} ({trainer.reviewCount})
              </span>
            </div>
          </div>

          {/* Bio */}
          {trainer.qualifications && trainer.qualifications.length > 0 && (
            <div className="text-sm text-muted-foreground">
              <p className="text-xs font-medium text-foreground mb-2">
                {isArabic ? 'الشهادات' : 'Qualifications'}:
              </p>
              <ul className="space-y-1">
                {trainer.qualifications.slice(0, 2).map((qual, idx) => (
                  <li key={idx} className="text-xs">
                    • {qual}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 w-full pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={onContact}
              asChild
            >
              <Link href={`/trainers/${trainer.id}`}>
                {isArabic ? 'عرض الملف' : 'View Profile'}
              </Link>
            </Button>
            {trainer.linkedIn && (
              <Button
                variant="ghost"
                size="sm"
                className="flex-1"
                asChild
              >
                <a href={trainer.linkedIn} target="_blank" rel="noopener noreferrer">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
