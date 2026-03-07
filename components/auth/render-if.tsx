'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/shared/hooks/useAuth'
import { UserRole } from '@/shared/constants/roles'

interface RenderIfProps {
  condition: boolean
  children: ReactNode
  fallback?: ReactNode
}

interface RenderIfAuthProps {
  children: ReactNode
  fallback?: ReactNode
}

interface RenderIfPermissionProps {
  permission: string | string[]
  children: ReactNode
  fallback?: ReactNode
}

interface RenderIfRoleProps {
  roles: UserRole | UserRole[]
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Conditionally render children based on boolean condition
 * Usage: <RenderIf condition={isAdmin}>Admin content</RenderIf>
 */
export function RenderIf({ condition, children, fallback = null }: RenderIfProps) {
  return condition ? <>{children}</> : <>{fallback}</>
}

/**
 * Render only if user is authenticated
 * Usage: <RenderIfAuth>Protected content</RenderIfAuth>
 */
export function RenderIfAuth({ children, fallback = null }: RenderIfAuthProps) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <>{fallback}</>
}

/**
 * Render only if user has permission
 * Usage: <RenderIfPermission permission="book_programs">Book Now</RenderIfPermission>
 */
export function RenderIfPermission({
  permission,
  children,
  fallback = null,
}: RenderIfPermissionProps) {
  const { hasPermission } = useAuth()
  const permissions = Array.isArray(permission) ? permission : [permission]
  const hasAccess = permissions.some((p) => hasPermission(p))

  return hasAccess ? <>{children}</> : <>{fallback}</>
}

/**
 * Render only if user has one of the specified roles
 * Usage: <RenderIfRole roles={[UserRole.ADMIN, UserRole.STAFF]}>Admin Panel</RenderIfRole>
 */
export function RenderIfRole({
  roles,
  children,
  fallback = null,
}: RenderIfRoleProps) {
  const { hasRole } = useAuth()
  const roleArray = Array.isArray(roles) ? roles : [roles]

  return hasRole(roleArray) ? <>{children}</> : <>{fallback}</>
}
