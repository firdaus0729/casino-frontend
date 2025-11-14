import { useRef, useCallback } from 'react'

// Global timeout reference to share between sidebar and overlay
let globalHoverTimeout: NodeJS.Timeout | null = null

export const useHoverTimeout = () => {
  const clearHoverTimeout = useCallback(() => {
    if (globalHoverTimeout) {
      clearTimeout(globalHoverTimeout)
      globalHoverTimeout = null
    }
  }, [])

  const setCloseTimeout = useCallback(
    (callback: () => void, delay: number = 200) => {
      clearHoverTimeout() // Clear any existing timeout
      globalHoverTimeout = setTimeout(callback, delay)
    },
    [clearHoverTimeout]
  )

  return {
    clearTimeout: clearHoverTimeout,
    setCloseTimeout,
  }
}
