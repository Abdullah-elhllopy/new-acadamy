'use client'

import  QRCodeSVG  from 'react-qr-code'
import { Card, CardContent } from '@/components/ui/card'

interface CertificateQRCodeProps {
  certificateId: string
  size?: number
  showLabel?: boolean
  label?: string
  labelAr?: string
  className?: string
}

export function CertificateQRCode({
  certificateId,
  size = 200,
  showLabel = true,
  label = 'Scan to Verify',
  labelAr = 'امسح للتحقق',
  className = '',
}: CertificateQRCodeProps) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/verify-certificate/${certificateId}`

  return (
    <Card className={className}>
      <CardContent className="p-4 flex flex-col items-center gap-3">
        <QRCodeSVG value={verificationUrl} size={size} level="H" />
        {showLabel && (
          <div className="text-center">
            <p className="text-sm font-medium">{label}</p>
            <p className="text-sm text-muted-foreground">{labelAr}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
