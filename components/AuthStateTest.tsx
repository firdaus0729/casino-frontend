'use client'

import { useEffect } from 'react'
import { useAppSelector } from '@/store/hooks'

/**
 * Test component to verify authentication flow without localStorage user data
 * This component can be temporarily added to any page to test the auth state
 */
export const AuthStateTest: React.FC = () => {
  const { user, token, isAuthenticated } = useAppSelector(state => state.auth)

  useEffect(() => {
    console.log('AuthStateTest - Current auth state:', {
      hasUser: !!user,
      hasToken: !!token,
      isAuthenticated,
      userData: user,
      tokenPreview: token ? token.substring(0, 20) + '...' : null,
      localStorageAuthToken: typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null,
      localStorageAuthUser: typeof window !== 'undefined' ? localStorage.getItem('auth_user') : null,
    })
  }, [user, token, isAuthenticated])

  if (process.env.NODE_ENV !== 'development') {
    return null // Only show in development
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Auth State Test</h3>
      <div className="space-y-1">
        <div>User: {user ? `${user.email} (ID: ${user.id})` : 'None'}</div>
        <div>Token: {token ? 'Present' : 'None'}</div>
        <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
        <div>localStorage auth_token: {typeof window !== 'undefined' && localStorage.getItem('auth_token') ? 'Present' : 'None'}</div>
        <div>localStorage auth_user: {typeof window !== 'undefined' && localStorage.getItem('auth_user') ? 'Present' : 'None'}</div>
      </div>
    </div>
  )
}

export default AuthStateTest
