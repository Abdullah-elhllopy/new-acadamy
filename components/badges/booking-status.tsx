import { Badge } from '@/components/ui/badge'
import { Booking } from '@/shared/types'
import { CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react'

interface BookingStatusBadgeProps {
  status: Booking['status']
  paymentStatus: Booking['paymentStatus']
  language: 'en' | 'ar'
  variant?: 'default' | 'outline' | 'secondary'
}

const STATUS_CONFIG: Record<
  Booking['status'],
  {
    labelEn: string
    labelAr: string
    variant: 'default' | 'secondary' | 'outline' | 'destructive'
    icon: React.ReactNode
  }
> = {
  pending: {
    labelEn: 'Pending',
    labelAr: 'قيد الانتظار',
    variant: 'secondary',
    icon: <Clock className="w-4 h-4" />,
  },
  confirmed: {
    labelEn: 'Confirmed',
    labelAr: 'مؤكد',
    variant: 'default',
    icon: <CheckCircle className="w-4 h-4" />,
  },
  completed: {
    labelEn: 'Completed',
    labelAr: 'مكتمل',
    variant: 'default',
    icon: <CheckCircle className="w-4 h-4" />,
  },
  cancelled: {
    labelEn: 'Cancelled',
    labelAr: 'ملغى',
    variant: 'destructive',
    icon: <XCircle className="w-4 h-4" />,
  },
}

const PAYMENT_STATUS_CONFIG: Record<
  Booking['paymentStatus'],
  {
    labelEn: string
    labelAr: string
  }
> = {
  pending: {
    labelEn: 'Payment Pending',
    labelAr: 'الدفع قيد الانتظار',
  },
  completed: {
    labelEn: 'Payment Complete',
    labelAr: 'الدفع مكتمل',
  },
  failed: {
    labelEn: 'Payment Failed',
    labelAr: 'فشل الدفع',
  },
}

export function BookingStatusBadge({
  status,
  paymentStatus,
  language,
  variant = 'default',
}: BookingStatusBadgeProps) {
  const isArabic = language === 'ar'
  const config = STATUS_CONFIG[status]
  const paymentLabel =
    PAYMENT_STATUS_CONFIG[paymentStatus][isArabic ? 'labelAr' : 'labelEn']

  return (
    <div className="flex items-center gap-2">
      <Badge variant={config.variant}>
        {config.icon}
        <span className="ml-1">
          {isArabic ? config.labelAr : config.labelEn}
        </span>
      </Badge>
      {paymentStatus !== 'completed' && (
        <Badge variant="outline">
          <span className="text-xs">{paymentLabel}</span>
        </Badge>
      )}
    </div>
  )
}
