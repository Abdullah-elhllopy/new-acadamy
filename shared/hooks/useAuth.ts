'use client'

import { useEffect, useState } from 'react'
import { User } from '@/shared/types'
import { UserRole, ROLE_PERMISSIONS } from '@/shared/constants/roles'
import { UserService } from '@/services/api/user.service'

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
        console.log('[Auth] Failed to parse stored user data')
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
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
      const response = await UserService.login({
        userEmail: email,
        userPassword: password,
      })
      
      // Map API user to app user format
      const user: User = {
        id: response.user.id,
        email: response.user.userEmail,
        name: response.user.userFullName,
        role: (response.user.type as UserRole) || UserRole.TRAINEE,
        phone: response.user.userPhone,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      
      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('auth_user', JSON.stringify(user))
      
      setAuth({
        user,
        token: response.token,
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

  const register = async (data: {
    name: string
    email: string
    password: string
    confirmPassword: string
    phone?: string
    role?: string
  }) => {
    setAuth((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      await UserService.register({
        userFullName: data.name,
        userEmail: data.email,
        userPassword: data.password,
        userConfirmPassword: data.confirmPassword,
        userPhone: data.phone,
        type: data.role,
      })
      
      setAuth((prev) => ({ ...prev, isLoading: false }))
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed'
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      return { success: false, error: errorMessage }
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      await UserService.forgotPassword({ userEmail: email })
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send reset code'
      return { success: false, error: errorMessage }
    }
  }

  const checkCode = async (email: string, code: string) => {
    try {
      const response = await UserService.checkCode({ userEmail: email, code })
      return { success: response.isValid }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid code'
      return { success: false, error: errorMessage }
    }
  }

  const resetPassword = async (email: string, code: string, newPassword: string, confirmPassword: string) => {
    try {
      await UserService.resetPassword({
        userEmail: email,
        code,
        newPassword,
        confirmPassword,
      })
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reset password'
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
    register,
    forgotPassword,
    checkCode,
    resetPassword,
    logout,
  }
}
