'use client'

import  QRCodeSVG  from 'react-qr-code'
import { Card, CardContent } from '@/components/ui/card'

interface QRCodeDisplayProps {
  value: string
  size?: number
  showLabel?: boolean
  label?: string
  className?: string
}

export function QRCodeDisplay({
  value,
  size = 200,
  showLabel = false,
  label,
  className = '',
}: QRCodeDisplayProps) {
  return (
    <Card className={className}>
      <CardContent className="p-4 flex flex-col items-center gap-3">
        <QRCodeSVG value={value} size={size} level="H" />
        {showLabel && label && (
          <p className="text-sm font-medium text-center">{label}</p>
        )}
      </CardContent>
    </Card>
  )
}
