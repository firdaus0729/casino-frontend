/**
 * Utility functions for localStorage management
 * This file helps maintain only essential data in localStorage
 */

// Keys that should be kept in localStorage (essential for authentication)
const ESSENTIAL_KEYS = ['auth_token']

/**
 * Clean up localStorage by removing all non-essential keys
 * Only keeps auth_token for authentication purposes
 */
export const cleanupLocalStorage = (): void => {
  if (typeof window === 'undefined') return

  try {
    const allKeys = Object.keys(localStorage)
    const keysToRemove = allKeys.filter(key => !ESSENTIAL_KEYS.includes(key))
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key)
      console.log(`Removed non-essential localStorage key: ${key}`)
    })
    
    console.log(`LocalStorage cleanup completed. Removed ${keysToRemove.length} non-essential keys.`)
  } catch (error) {
    console.error('Error during localStorage cleanup:', error)
  }
}

/**
 * Get all localStorage keys that are not essential
 * Useful for debugging and monitoring
 */
export const getNonEssentialLocalStorageKeys = (): string[] => {
  if (typeof window === 'undefined') return []

  try {
    const allKeys = Object.keys(localStorage)
    return allKeys.filter(key => !ESSENTIAL_KEYS.includes(key))
  } catch (error) {
    console.error('Error getting non-essential localStorage keys:', error)
    return []
  }
}

/**
 * Check if localStorage contains non-essential data
 */
export const hasNonEssentialData = (): boolean => {
  return getNonEssentialLocalStorageKeys().length > 0
}

/**
 * Migrate specific localStorage data to Redux (if needed)
 * This can be called during app initialization
 */
export const migrateLocalStorageToRedux = (): void => {
  if (typeof window === 'undefined') return

  try {
    // List of keys that have been migrated to Redux
    const migratedKeys = [
      'carouselState',
      'i18n_translations', 
      'selectedLanguage',
      'withdraw_password_set_99',
      'email_verified_99',
      'auth_user' // User data now managed by Redux
    ]

    migratedKeys.forEach(key => {
      if (localStorage.getItem(key)) {
        console.log(`Migrated localStorage key to Redux: ${key}`)
        localStorage.removeItem(key)
      }
    })

    console.log('LocalStorage to Redux migration completed.')
  } catch (error) {
    console.error('Error during localStorage to Redux migration:', error)
  }
}
