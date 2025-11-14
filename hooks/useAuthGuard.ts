'use client'

import { useEffect } from 'react'
import { useAppSelector } from '@/store/hooks'
import { useSidebar } from '@/context/SidebarProvider'
import { useRouter } from 'next/navigation'

/**
 * Custom hook to protect pages that require authentication
 * With middleware in place, this hook now serves as a fallback and for UI state management
 */
export const useAuthGuard = () => {
  const { isAuthenticated, user, token } = useAppSelector(state => state.auth)
  const { toggleAuthModal } = useSidebar()
  const router = useRouter()

  useEffect(() => {
    // If user is not authenticated and we have no token, redirect to home
    // This serves as a fallback in case middleware doesn't catch it
    if (!isAuthenticated && !token) {
      // Only redirect if we're not already on the home page
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        router.push('/')
      }
    }
  }, [isAuthenticated, token, router])

  return {
    isAuthenticated,
    isProtected: !isAuthenticated,
    user,
    token
  }
}

export default useAuthGuard


