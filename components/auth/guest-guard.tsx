'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/shared/hooks/useAuth'
import { Spinner } from '@/components/ui/spinner'

interface GuestGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export function GuestGuard({ children, redirectTo = '/dashboard' }: GuestGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState<boolean>(true)



  const checkPermissions = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (isAuthenticated) {
      router.replace(redirectTo);
      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions()
  }, [isAuthenticated, isLoading])

  // Show loading while checking auth state
  if (isLoading || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="w-8 h-8" />
      </div>
    )
  }

  // Return null while redirecting
  return <>{children}</>
}
