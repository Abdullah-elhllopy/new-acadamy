'use client'

import { useEffect, useState } from 'react'
import { User } from '@/shared/types'
import { UserRole, ROLE_PERMISSIONS } from '@/shared/constants/roles'
import { UserService } from '@/services/api/user.service'
import { AUTH_TOKEN, AUTH_USER } from '../constants/constant'

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

  // useEffect(() => {
  //   // Restore auth from localStorage on client-side mount
  //   const storedToken = localStorage.getItem(AUTH_TOKEN)
  //   const storedUser = localStorage.getItem(AUTH_USER)
    
  //   if (storedToken && storedUser) {
  //     try {
  //       const userData = JSON.parse(storedUser)
  //       setAuth({
  //         user: userData,
  //         token: storedToken,
  //         isLoading: false,
  //         error: null,
  //       })
  //     } catch (err) {
  //       console.log('[Auth] Failed to parse stored user data')
  //       localStorage.removeItem(AUTH_TOKEN)
  //       localStorage.removeItem(AUTH_USER)
  //       setAuth((prev) => ({ ...prev, isLoading: false }))
  //     }
  //   } else {
  //     setAuth((prev) => ({ ...prev, isLoading: false }))
  //   }
    
  //   setIsHydrated(true)
  // }, [])

  const login = async (email: string, password: string) => {
    setAuth((prev) => ({ ...prev, isLoading: true, error: null }))
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
      
      localStorage.setItem(AUTH_TOKEN, response.token)
      localStorage.setItem(AUTH_USER, JSON.stringify(user))
      
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
    userFullName: string
    userEmail: string
    userPassword: string
    userConfirmPassword: string
    userPhone?: string
    type?: string
  }) => {
    setAuth((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      await UserService.register({
        userFullName: data.userFullName,
        userEmail: data.userEmail,
        userPassword: data.userPassword,
        userConfirmPassword: data.userConfirmPassword,
        userPhone: data.userPhone,
        type: data.type,
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
    localStorage.removeItem(AUTH_TOKEN)
    localStorage.removeItem(AUTH_USER)
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

  const isAuthenticated = !!auth.user

  return {
    ...auth,
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
