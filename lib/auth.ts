import { validateJWT, validateStoredToken, isTokenValid, JWTValidationResult } from './jwt'

export const AUTH_CHANGED_EVENT = 'auth-changed'

// Backward-compatible helpers that now use localStorage instead of sessionStorage
// We keep the same function names to avoid refactors elsewhere.

export function getIsLoggedIn(): boolean {
  if (typeof window === 'undefined') return false
  const isValid = isTokenValid()
  console.log('Auth: getIsLoggedIn called, returning:', isValid)
  return isValid
}

// New explicit token helpers
export function setAuthToken(token: string | null): void {
  if (typeof window === 'undefined') return
  if (token) {
    localStorage.setItem('auth_token', token)
  } else {
    localStorage.removeItem('auth_token')
  }
  console.log('Auth: Dispatching AUTH_CHANGED_EVENT with token:', token ? 'present' : 'null')
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT))
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

// Enhanced auth validation functions
export function validateAuthToken(): JWTValidationResult {
  return validateStoredToken()
}

export function isAuthTokenExpired(): boolean {
  const validation = validateStoredToken()
  return validation.isExpired
}

export function getTokenExpirationInfo(): string {
  const validation = validateStoredToken()
  
  if (!validation.isValid) {
    return `Invalid token: ${validation.error}`
  }
  
  if (validation.isExpired) {
    return `Token expired at: ${validation.expiresAt?.toLocaleString()}`
  }
  
  return `Token expires at: ${validation.expiresAt?.toLocaleString()}`
}
