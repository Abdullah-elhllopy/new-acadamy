'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useTranslate } from '@/locales/use-locales'
import { Share2, MessageCircle, Linkedin, Facebook, Twitter, Copy, Check } from 'lucide-react'

interface SocialShareBarProps {
  title: string
  url?: string
}

export function SocialShareBar({ title, url = typeof window !== 'undefined' ? window.location.href : '' }: SocialShareBarProps) {
  const { t } = useTranslate('programs')
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <Share2 className="w-4 h-4" />
        {t('shareProgram')}
      </span>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open(shareLinks.whatsapp, '_blank')}
          title="WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open(shareLinks.linkedin, '_blank')}
          title="LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open(shareLinks.facebook, '_blank')}
          title="Facebook"
        >
          <Facebook className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open(shareLinks.twitter, '_blank')}
          title="Twitter/X"
        >
          <Twitter className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopyLink}
          title={copied ? t('copied') : t('copyLink')}
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  )
}
