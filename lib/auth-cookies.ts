/**
 * Utility functions for managing authentication cookies
 * These are used by middleware to check authentication status
 */

export const setAuthCookie = (token: string) => {
  if (typeof document !== 'undefined') {
    // Set cookie with 7 days expiration
    const expires = new Date()
    expires.setDate(expires.getDate() + 7)
    
    document.cookie = `auth_token=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
    console.log('Cookie set:', `auth_token=${token.substring(0, 10)}...`)
  }
}

export const clearAuthCookie = () => {
  if (typeof document !== 'undefined') {
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  }
}

export const getAuthCookie = (): string | null => {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';')
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth_token='))
    return authCookie ? authCookie.split('=')[1] : null
  }
  return null
}
