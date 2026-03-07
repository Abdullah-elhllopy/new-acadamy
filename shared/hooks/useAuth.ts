'use client'

import { useEffect, useState } from 'react'
import { User } from '@/shared/types'
import { UserRole, ROLE_PERMISSIONS } from '@/shared/constants/roles'

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
}

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    error: null,
  })
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Restore auth from localStorage on client-side mount
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')
    
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setAuth({
          user: userData,
          token: storedToken,
          isLoading: false,
          error: null,
        })
      } catch (err) {
        console.log('[v0] Failed to parse stored user data')
        setAuth((prev) => ({ ...prev, isLoading: false }))
      }
    } else {
      setAuth((prev) => ({ ...prev, isLoading: false }))
    }
    
    setIsHydrated(true)
  }, [])

  const login = async (email: string, password: string) => {
    setAuth((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      // Mock login - replace with actual API call
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: UserRole.TRAINEE,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      const mockToken = 'mock-token-' + Date.now()
      
      localStorage.setItem('auth_token', mockToken)
      localStorage.setItem('auth_user', JSON.stringify(mockUser))
      
      setAuth({
        user: mockUser,
        token: mockToken,
        isLoading: false,
        error: null,
      })
      
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      return { success: false, error: errorMessage }
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    setAuth({
      user: null,
      token: null,
      isLoading: false,
      error: null,
    })
  }

  const hasPermission = (permission: string): boolean => {
    if (!auth.user) return false
    if (auth.user.role === UserRole.ADMIN) return true // Admin has all permissions
    const rolePermissions = ROLE_PERMISSIONS[auth.user.role] || []
    return rolePermissions.includes(permission)
  }

  const hasRole = (roles: UserRole[]): boolean => 
    auth.user ? roles.includes(auth.user.role) : false

  const isAuthenticated = !!auth.user && isHydrated

  return {
    ...auth,
    isAuthenticated,
    isHydrated,
    hasRole,
    hasPermission,
    login,
    logout,
  }
}
