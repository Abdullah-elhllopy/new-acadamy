import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type Status = 'pending' | 'approved' | 'rejected' | 'active' | 'inactive' | 'completed'

interface StatusBadgeProps {
  status: Status
  label?: string
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  },
  approved: {
    label: 'Approved',
    className: 'bg-green-100 text-green-800 hover:bg-green-100',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-100 text-red-800 hover:bg-red-100',
  },
  active: {
    label: 'Active',
    className: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  },
  inactive: {
    label: 'Inactive',
    className: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
  },
  completed: {
    label: 'Completed',
    className: 'bg-green-100 text-green-800 hover:bg-green-100',
  },
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge className={cn('font-medium', config.className)}>
      {label || config.label}
    </Badge>
  )
}
