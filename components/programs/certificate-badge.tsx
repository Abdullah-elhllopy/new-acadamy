'use client'

import { useTranslate } from '@/locales/use-locales'
import { Award } from 'lucide-react'

type CertificateType = 'in-person' | 'completion' | 'professional'

interface CertificateBadgeProps {
  type: CertificateType
}

export function CertificateBadge({ type }: CertificateBadgeProps) {
  const { t } = useTranslate('programs')

  const certificateConfig = {
    'in-person': {
      label: t('inPerson'),
      color: 'bg-blue-100 text-blue-700'
    },
    'completion': {
      label: t('completion'),
      color: 'bg-green-100 text-green-700'
    },
    'professional': {
      label: t('professional'),
      color: 'bg-purple-100 text-purple-700'
    }
  }

  const config = certificateConfig[type]

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${config.color} w-fit`}>
      <Award className="w-4 h-4" />
      <span className="text-sm font-medium">{config.label}</span>
    </div>
  )
}
