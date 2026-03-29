'use client'

import { Session } from '@/shared/types'
import { useTranslate } from '@/locales/use-locales'
import { SessionCard } from '../cards/session-card'

interface SessionsSectionProps {
  sessions: Session[]
}

export function SessionsSection({ sessions }: SessionsSectionProps) {
  const { t } = useTranslate('programs')

  if (!sessions || sessions.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('sessions')}</h2>
        <p className="text-gray-600">{sessions.length} {t('sessions')} {t('availableSeats')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <SessionCard key={`session_${session.id}`} session={session} language='ar' />
        ))}
      </div>
    </div>
  )
}
