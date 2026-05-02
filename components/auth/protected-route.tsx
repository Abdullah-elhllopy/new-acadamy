'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/shared/hooks/useAuth'
import { UserRole } from '@/shared/constants/roles'
import { Spinner } from '@/components/ui/spinner'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRoles?: UserRole[]
}

export function ProtectedRoute({
  children,
  requiredRoles,
}: ProtectedRouteProps) {
  const router = useRouter()
  const { isAuthenticated, isLoading, hasRole } = useAuth()

  useEffect(() => {
    // Wait for hydration before checking auth
    if ( isLoading) return

    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (requiredRoles && !hasRole(requiredRoles)) {
      router.push('/unauthorized')
    }
  }, [isLoading, isAuthenticated, requiredRoles, router, hasRole])

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="w-8 h-8" />
      </div>
    )
  }

  // Not authenticated - will redirect in useEffect
  if (!isAuthenticated) {
    return null
  }

  // Wrong role - will redirect in useEffect
  if (requiredRoles && !hasRole(requiredRoles)) {
    return null
  }

  // All checks passed
  return <>{children}</>
}
