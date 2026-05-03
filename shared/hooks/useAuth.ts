'use client'

import { useState } from 'react'
import { UserRole, ROLE_PERMISSIONS } from '@/shared/constants/roles'
import { UserService } from '@/services/api/user.service'
import { useAuthContext } from '@/shared/contexts/auth-context'

export const useAuth = () => {
  const { user, token, isLoading, isAuthenticated, setAuthState, clearAuthState } = useAuthContext()
  const [error, setError] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    setError(null)
    try {
      const response = await UserService.login({
        emailAddress: email,
        password: password,
      })
      
      // Map API user to app user format
      const user = {
        userId: response.userId,
        email: response.email,
        name: response.name,
        role: UserRole.TRAINEE,
      }
      
      setAuthState(user, response.token)
      
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const register = async (data: {
    userFullName: string
    userEmail: string
    userPassword: string
    userConfirmPassword: string
    userPhone?: string
    type?: string
  }) => {
    setError(null)
    try {
      await UserService.register({
        userFullName: data.userFullName,
        userEmail: data.userEmail,
        userPassword: data.userPassword,
        userConfirmPassword: data.userConfirmPassword,
        userPhone: data.userPhone,
        type: data.type,
      })
      
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      await UserService.forgotPassword({ email })
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send reset code'
      return { success: false, error: errorMessage }
    }
  }

  const checkCode = async (email: string, code: string) => {
    try {
      const response = await UserService.checkCode({ email, code })
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
    clearAuthState()
    setError(null)
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    if (user.role === UserRole.ADMIN) return true // Admin has all permissions
    const rolePermissions = ROLE_PERMISSIONS[user.role] || []
    return rolePermissions.includes(permission)
  }

  const hasRole = (roles: UserRole[]): boolean => 
    user ? roles.includes(user.role) : false

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
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
