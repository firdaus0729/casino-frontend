import { useState, useEffect } from 'react'

/**
 * Simple hook to detect virtual keyboard and adjust bottom bar positioning
 * This prevents the bottom bar from appearing on top of the virtual keyboard
 */
export function useSimpleKeyboardDetection() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

  useEffect(() => {
    // Only run on mobile devices
    if (typeof window === 'undefined' || window.innerWidth > 1024) return

    let initialHeight = window.innerHeight
    let timeoutId: NodeJS.Timeout
    let isScrolling = false
    let scrollTimeoutId: NodeJS.Timeout

    const handleScroll = () => {
      isScrolling = true

      // Clear existing scroll timeout
      if (scrollTimeoutId) clearTimeout(scrollTimeoutId)

      // Set scrolling to false after scroll ends
      scrollTimeoutId = setTimeout(() => {
        isScrolling = false
      }, 150)
    }

    const handleResize = () => {
      // Don't detect keyboard during scrolling
      if (isScrolling) return

      const currentHeight = window.innerHeight
      const heightDifference = initialHeight - currentHeight

      // Consider keyboard open if height decreased significantly
      // Increased threshold to avoid false positives from scrolling
      const keyboardOpen = heightDifference > 200

      // Clear existing timeout
      if (timeoutId) clearTimeout(timeoutId)

      // Add delay to ensure keyboard is stable
      timeoutId = setTimeout(() => {
        setIsKeyboardOpen(keyboardOpen)
      }, 500)
    }

    // Update initial height after a delay to ensure proper measurement
    const updateInitialHeight = () => {
      initialHeight = window.innerHeight
    }

    const initialTimer = setTimeout(updateInitialHeight, 500)

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) clearTimeout(timeoutId)
      if (scrollTimeoutId) clearTimeout(scrollTimeoutId)
      if (initialTimer) clearTimeout(initialTimer)
    }
  }, [])

  return {
    isKeyboardOpen,
    getBottomBarClasses: (baseClasses: string) => {
      if (isKeyboardOpen) {
        // When keyboard is open, use top positioning to avoid overlap
        return `${baseClasses} bottom-bar-top-position`
      }
      // When keyboard is closed, use normal bottom positioning
      return baseClasses
    },
  }
}
