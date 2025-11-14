// JWT Token Validation Utilities

export interface JWTValidationResult {
  isValid: boolean
  isExpired: boolean
  payload?: any
  error?: string
  expiresAt?: Date
  issuedAt?: Date
  userId?: string | number
}

/**
 * Validates a JWT token format and expiration
 * @param token - The JWT token to validate
 * @returns JWTValidationResult with validation details
 */
export function validateJWT(token: string | null): JWTValidationResult {
  if (!token) {
    return {
      isValid: false,
      isExpired: false,
      error: 'No token provided'
    }
  }

  try {
    // Check if token has 3 parts separated by dots
    const parts = token.split('.')
    if (parts.length !== 3) {
      return {
        isValid: false,
        isExpired: false,
        error: 'Invalid JWT format - must have 3 parts separated by dots'
      }
    }

    // Decode header
    const header = JSON.parse(atob(parts[0]))
    
    // Decode payload
    const payload = JSON.parse(atob(parts[1]))
    
    // Check if token has required fields
    if (!payload.exp) {
      return {
        isValid: false,
        isExpired: false,
        error: 'Token missing expiration (exp) field'
      }
    }

    // Check expiration
    const now = Math.floor(Date.now() / 1000)
    const isExpired = payload.exp < now

    return {
      isValid: true,
      isExpired,
      payload,
      expiresAt: new Date(payload.exp * 1000),
      issuedAt: payload.iat ? new Date(payload.iat * 1000) : undefined,
      userId: payload.sub || payload.userId || payload.id,
      error: isExpired ? 'Token has expired' : undefined
    }
  } catch (error) {
    return {
      isValid: false,
      isExpired: false,
      error: `Failed to decode token: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

/**
 * Gets token from localStorage and validates it
 * @returns JWTValidationResult
 */
export function validateStoredToken(): JWTValidationResult {
  if (typeof window === 'undefined') {
    return {
      isValid: false,
      isExpired: false,
      error: 'Not in browser environment'
    }
  }

  const token = localStorage.getItem('auth_token')
  return validateJWT(token)
}

/**
 * Checks if the stored token is valid and not expired
 * @returns boolean indicating if token is valid and not expired
 */
export function isTokenValid(): boolean {
  const validation = validateStoredToken()
  return validation.isValid && !validation.isExpired
}

/**
 * Gets token expiration time as a readable string
 * @param token - Optional token, if not provided uses stored token
 * @returns string with expiration info
 */
export function getTokenExpirationInfo(token?: string): string {
  const validation = token ? validateJWT(token) : validateStoredToken()
  
  if (!validation.isValid) {
    return `Invalid token: ${validation.error}`
  }
  
  if (validation.isExpired) {
    return `Token expired at: ${validation.expiresAt?.toLocaleString()}`
  }
  
  return `Token expires at: ${validation.expiresAt?.toLocaleString()}`
}

/**
 * Gets time until token expires in minutes
 * @param token - Optional token, if not provided uses stored token
 * @returns number of minutes until expiration (negative if expired)
 */
export function getMinutesUntilExpiration(token?: string): number {
  const validation = token ? validateJWT(token) : validateStoredToken()
  
  if (!validation.isValid || !validation.expiresAt) {
    return 0
  }
  
  const now = new Date()
  const diffMs = validation.expiresAt.getTime() - now.getTime()
  return Math.floor(diffMs / (1000 * 60))
}

