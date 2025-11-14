'use client'

import { useAuthInit } from '@/hooks/useAuthInit'

/**
 * Client component to initialize authentication state
 * This runs on the client side to fetch user profile when token exists
 */
export default function AuthInitializer() {
  useAuthInit()
  return null // This component doesn't render anything
}
