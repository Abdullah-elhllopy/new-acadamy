'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/shared/hooks/useAuth'

interface PermissionGuardProps {
  permission: string | string[]
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Render children only if user has the specified permission(s)
 * Usage: <PermissionGuard permission="book_programs">Book Now</PermissionGuard>
 */
export function PermissionGuard({
  permission,
  children,
  fallback = null,
}: PermissionGuardProps) {
  const { hasPermission } = useAuth()

  const permissions = Array.isArray(permission) ? permission : [permission]
  const hasAccess = permissions.some((p) => hasPermission(p))

  if (!hasAccess) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
