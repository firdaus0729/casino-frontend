/**
 * Utility functions for JWT token management
 */

/**
 * Decodes a JWT token without verification (for checking expiration)
 */
export const decodeToken = (token: string): any => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

/**
 * Checks if a JWT token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decodeToken(token)
    console.log('Token expiration check:', { 
      token: token.substring(0, 20) + '...', 
      decoded, 
      hasExp: !!decoded?.exp 
    })
    
    if (!decoded || !decoded.exp) {
      console.log('Token has no expiration field - treating as expired')
      return true
    }
    
    const currentTime = Math.floor(Date.now() / 1000)
    const isExpired = decoded.exp < currentTime
    console.log('Token expiration details:', { 
      exp: decoded.exp, 
      currentTime, 
      isExpired,
      timeUntilExpiry: decoded.exp - currentTime
    })
    
    return isExpired
  } catch (error) {
    console.error('Error checking token expiration:', error)
    return true
  }
}

/**
 * Gets the time until token expiration in seconds
 */
export const getTokenTimeUntilExpiry = (token: string): number => {
  try {
    const decoded = decodeToken(token)
    if (!decoded || !decoded.exp) {
      return 0
    }
    
    const currentTime = Math.floor(Date.now() / 1000)
    return Math.max(0, decoded.exp - currentTime)
  } catch (error) {
    console.error('Error getting token expiry time:', error)
    return 0
  }
}

/**
 * Checks if a token is close to expiration (within 5 minutes)
 */
export const isTokenNearExpiry = (token: string, thresholdMinutes: number = 5): boolean => {
  const timeUntilExpiry = getTokenTimeUntilExpiry(token)
  return timeUntilExpiry < (thresholdMinutes * 60)
}
