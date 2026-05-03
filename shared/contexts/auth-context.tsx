'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@/shared/types'
import { AUTH_TOKEN, AUTH_USER } from '@/shared/constants/constant'
import { apiClient } from '@/services/api'

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  setAuthState: (user: User | null, token: string | null) => void
  clearAuthState: () => void
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)


  const isAuthenticated = !!user && !!token

  const setAuthState = (newUser: User | null, newToken: string | null) => {
    setUser(newUser)
    setToken(newToken)
    
    if (newUser && newToken) {
      localStorage.setItem(AUTH_TOKEN, newToken)
      localStorage.setItem(AUTH_USER, JSON.stringify(newUser))
    }
    
    // Update apiClient headers
    apiClient.updateAuthHeaders(newToken)
  }

  const clearAuthState = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem(AUTH_TOKEN)
    localStorage.removeItem(AUTH_USER)
    
    // Clear apiClient headers
    apiClient.updateAuthHeaders(null)
  }

  useEffect(() => {
    // Restore auth from localStorage on client-side mount
    const storedToken = localStorage.getItem(AUTH_TOKEN)
    const storedUser = localStorage.getItem(AUTH_USER)
    
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setToken(storedToken)
        
        // Set apiClient headers
        apiClient.updateAuthHeaders(storedToken)
      } catch (err) {
        console.log('[Auth] Failed to parse stored user data')
        clearAuthState()
      }
    }
    
    setIsLoading(false)
  }, [])

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    setAuthState,
    clearAuthState,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
