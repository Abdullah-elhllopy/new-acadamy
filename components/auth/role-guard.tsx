'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/shared/hooks/useAuth'
import { UserRole } from '@/shared/constants/roles'

interface RoleGuardProps {
  roles: UserRole | UserRole[]
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Render children only if user has one of the specified roles
 * Usage: <RoleGuard roles={[UserRole.ADMIN, UserRole.STAFF]}>Admin Panel</RoleGuard>
 */
export function RoleGuard({ roles, children, fallback = null }: RoleGuardProps) {
  const { hasRole } = useAuth()
  const roleArray = Array.isArray(roles) ? roles : [roles]

  if (!hasRole(roleArray)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
