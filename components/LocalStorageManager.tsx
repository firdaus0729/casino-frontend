'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { migrateLocalStorageToRedux, cleanupLocalStorage } from '@/lib/localStorage-utils'

/**
 * Component that handles localStorage cleanup and migration on app initialization
 * This should be placed high in the component tree to run early
 */
export const LocalStorageManager: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Migrate any remaining localStorage data to Redux
    migrateLocalStorageToRedux()
    
    // Clean up any non-essential localStorage data
    cleanupLocalStorage()
    
    console.log('LocalStorage management completed on app initialization')
  }, [dispatch])

  // This component doesn't render anything
  return null
}

export default LocalStorageManager
