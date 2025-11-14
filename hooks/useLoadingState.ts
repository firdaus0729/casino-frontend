import { useState, useCallback } from 'react'

interface UseLoadingStateReturn {
  isLoading: boolean
  setLoading: (loading: boolean) => void
  withLoading: <T extends any[], R>(
    asyncFn: (...args: T) => Promise<R>
  ) => (...args: T) => Promise<R>
}

/**
 * Custom hook for managing loading states in components
 * Provides utilities to wrap async functions with loading state management
 */
export const useLoadingState = (): UseLoadingStateReturn => {
  const [isLoading, setIsLoading] = useState(false)

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading)
  }, [])

  const withLoading = useCallback(
    <T extends any[], R>(asyncFn: (...args: T) => Promise<R>) => {
      return async (...args: T): Promise<R> => {
        try {
          setIsLoading(true)
          return await asyncFn(...args)
        } finally {
          setIsLoading(false)
        }
      }
    },
    []
  )

  return {
    isLoading,
    setLoading,
    withLoading,
  }
}

export default useLoadingState
