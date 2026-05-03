'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/shared/hooks/useAuth'
import { Spinner } from '@/components/ui/spinner'

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export function AuthGuard({ children, redirectTo = '/login' }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const router = useRouter()
  const checkPermissions = useCallback(() => {
    if (isLoading) return

    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    setIsChecking(false)
  }, [isAuthenticated, isLoading, router, redirectTo])


  useEffect(() => {
    checkPermissions();
  }, [checkPermissions])

  if ( isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="w-8 h-8" />
      </div>
    )
  }

  return <>{children}</>
}
