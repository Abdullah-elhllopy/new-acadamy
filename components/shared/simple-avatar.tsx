import { Avatar as AvatarRoot, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface SimpleAvatarProps {
  src?: string
  alt: string
  className?: string
}

export function SimpleAvatar({ src, alt, className }: SimpleAvatarProps) {
  const initials = alt
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <AvatarRoot className={cn('bg-primary/10', className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
        {initials}
      </AvatarFallback>
    </AvatarRoot>
  )
}
