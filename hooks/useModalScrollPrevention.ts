import { useEffect } from 'react'

/**
 * Custom hook to prevent background scrolling when a modal is open
 * @param isOpen - Whether the modal is currently open
 */
export function useModalScrollPrevention(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY

      // Add modal-open class to body
      document.body.classList.add('modal-open')

      // Prevent background scrolling
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top

      // Remove modal-open class from body
      document.body.classList.remove('modal-open')

      // Restore body styles
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''

      // Restore scroll position
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }

    // Cleanup function to restore body styles if component unmounts
    return () => {
      document.body.classList.remove('modal-open')
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
    }
  }, [isOpen])
}
