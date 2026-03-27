'use client'

import { Button } from '@/components/ui/button'
import { useTranslate } from '@/locales/use-locales'
import { MapPin, Navigation } from 'lucide-react'

interface LocationMapProps {
  address: string
  latitude?: number
  longitude?: number
}

export function LocationMap({ address, latitude, longitude }: LocationMapProps) {
  const { t } = useTranslate('programs')

  const handleGetDirections = () => {
    if (latitude && longitude) {
      window.open(`https://maps.google.com/?q=${latitude},${longitude}`, '_blank')
    } else {
      window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank')
    }
  }

  const mapEmbedUrl = latitude && longitude
    ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zLocation!5e0!3m2!1sen!2s!4v1234567890`
    : null

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">{t('location')}</h3>
      </div>

      {mapEmbedUrl && (
        <div className="w-full h-80 rounded-lg overflow-hidden border border-gray-200">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={mapEmbedUrl}
          ></iframe>
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-700 mb-4">{address}</p>
        <Button
          onClick={handleGetDirections}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <Navigation className="w-4 h-4" />
          {t('getDirections')}
        </Button>
      </div>
    </div>
  )
}
