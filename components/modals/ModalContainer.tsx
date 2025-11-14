'use client'

import { X } from 'lucide-react'
import { ReactNode, useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { createPortal } from 'react-dom'

interface ModalContainerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
  contentClassName?: string
  headerClassName?: string
  showHeader?: boolean
  showCloseButton?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  position?: 'center' | 'bottom' | 'top' | 'responsive'
  usePortal?: boolean
  zIndex?: number
  backdropClassName?: string
  onBackdropClick?: () => void
  disableBackdropClick?: boolean
  width?: string
  ariaLabel?: string
  ariaDescribedBy?: string
}

const sizeClasses = {
  sm: 'w-full max-w-sm md:max-w-md',
  md: 'w-full max-w-md md:max-w-lg',
  lg: 'w-full max-w-lg md:max-w-2xl',
  xl: 'w-full max-w-2xl md:max-w-4xl lg:max-w-[1024px]',
  '2xl': 'w-full max-w-4xl md:max-w-6xl lg:max-w-[1024px]',
  '3xl': 'w-full max-w-5xl md:max-w-6xl lg:max-w-[1024px]',
  full: 'w-full max-w-[1024px]',
}

const positionClasses = {
  center: 'items-center justify-center',
  bottom: 'items-end justify-center',
  top: 'items-start justify-center',
  responsive: 'items-end sm:items-center justify-center',
}

export default function ModalContainer({
  isOpen,
  title,
  onClose,
  className = '',
  contentClassName = '',
  headerClassName = '',
  children,
  showHeader = true,
  showCloseButton = true,
  size = 'xl',
  position = 'responsive',
  usePortal = true,
  zIndex = 10000,
  backdropClassName = '',
  onBackdropClick,
  disableBackdropClick = false,
  width,
  ariaLabel,
  ariaDescribedBy,
}: ModalContainerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const scrollPositionRef = useRef(0)
  const mouseDownRef = useRef<boolean>(false)
  const mouseDownTargetRef = useRef<EventTarget | null>(null)

  // Body scroll lock mechanism
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop
      
      // Lock body scroll
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollPositionRef.current}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      // Focus management for accessibility
      if (modalRef.current) {
        modalRef.current.focus()
      }
    } else {
      // Restore body scroll
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      
      // Restore scroll position
      window.scrollTo(0, scrollPositionRef.current)
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      // Small delay to ensure the element is rendered before animation
      const timer = setTimeout(() => setIsVisible(true), 10)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => setShouldRender(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Track text selection to prevent modal closure during text selection
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection()
      if (selection && selection.toString().length > 0) {
        // Text is being selected, prevent modal closure
        mouseDownRef.current = true
      }
    }

    const handleSelectionEnd = () => {
      // Reset after a short delay to allow for text selection operations
      setTimeout(() => {
        mouseDownRef.current = false
      }, 100)
    }

    if (isOpen) {
      document.addEventListener('selectionchange', handleSelectionChange)
      document.addEventListener('mouseup', handleSelectionEnd)
      
      return () => {
        document.removeEventListener('selectionchange', handleSelectionChange)
        document.removeEventListener('mouseup', handleSelectionEnd)
      }
    }
  }, [isOpen])

  const handleBackdropMouseDown = (e: React.MouseEvent) => {
    // Track mouse down events to detect text selection operations
    mouseDownRef.current = true
    mouseDownTargetRef.current = e.target
  }

  const handleBackdropMouseUp = (e: React.MouseEvent) => {
    // Reset mouse tracking
    mouseDownRef.current = false
    mouseDownTargetRef.current = null
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Don't close if backdrop click is disabled
    if (disableBackdropClick) return
    
    // Only close if clicking directly on the backdrop element itself
    if (e.target === e.currentTarget) {
      // Check if there's active text selection
      const selection = window.getSelection()
      const hasTextSelection = selection && selection.toString().length > 0
      
      // Don't close if there's active text selection
      if (hasTextSelection) return
      
      // Don't close if we're in a text selection operation
      if (mouseDownRef.current) return
      
      // Don't close if the mouse was pressed down on a different element
      // This indicates a drag/select operation
      if (mouseDownTargetRef.current && mouseDownTargetRef.current !== e.currentTarget) {
        return
      }
      
      if (onBackdropClick) {
        onBackdropClick()
      } else {
        onClose()
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!shouldRender) return null

  const modalContent = (
    <>
      {/* Mobile-specific styles */}
      <style jsx global>{`
        @supports (height: 100dvh) {
          .modal-container {
            height: 100dvh;
          }
        }
        
        @supports not (height: 100dvh) {
          .modal-container {
            height: 100vh;
          }
        }
        
        /* iOS Safari viewport fix */
        @media screen and (max-width: 768px) {
          .modal-container {
            height: -webkit-fill-available;
          }
        }
        
        /* Prevent zoom on iOS when focusing inputs */
        @media screen and (max-width: 768px) {
          input, textarea, select {
            font-size: 16px !important;
          }
        }
      `}</style>
    <div
      className={cn(
        'modal-container fixed inset-0 flex p-2 sm:p-4 backdrop-blur-[0.3125rem] justify-center bg-black/60',
        'transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0',
        positionClasses[position],
        backdropClassName
      )}
      style={{ 
        zIndex,
        // Use modern viewport units with fallback
        ...(typeof window !== 'undefined' && 'CSS' in window && 'supports' in window.CSS && window.CSS.supports('height', '100dvh') 
          ? { height: '100dvh' } 
          : { height: '100vh' }
        )
      }}
      onClick={handleBackdropClick}
      onMouseDown={handleBackdropMouseDown}
      onMouseUp={handleBackdropMouseUp}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || title}
      aria-describedby={ariaDescribedBy}
    >
      <div
        ref={modalRef}
        className={cn(
          'relative z-[10001] mx-auto',
          'transform transition-all duration-300 ease-out',
          // Animation states
          isVisible
            ? 'translate-y-0'
            : position === 'bottom' || position === 'responsive'
              ? 'translate-y-full sm:translate-y-8'
              : position === 'top'
                ? '-translate-y-full'
                : 'translate-y-8',
          // Width handling - use custom width if provided, otherwise use size classes
          width || sizeClasses[size],
          // Desktop margins for better spacing
          'mx-4 md:mx-6 lg:mx-8',
          className
        )}
        style={{
          // Use modern viewport units with fallback for mobile responsiveness
          maxHeight: 'calc(100vh - 2rem)', // Fallback for older browsers
          ...(typeof window !== 'undefined' && 'CSS' in window && 'supports' in window.CSS && window.CSS.supports('height', '100dvh') 
            ? { maxHeight: 'calc(100dvh - 2rem)' } 
            : {}
          )
        }}
        onClick={e => e.stopPropagation()}
        onKeyDown={e => e.stopPropagation()}
        onFocus={e => e.stopPropagation()}
        onBlur={e => e.stopPropagation()}
      >
        <div
          className={cn(
            'flex flex-col items-start w-full mx-auto',
            // Mobile: rounded top corners, Desktop: rounded all corners
            position === 'responsive' || position === 'bottom'
              ? 'rounded-t-3xl sm:rounded-xl'
              : 'rounded-xl',
            // Mobile optimization classes
            'mobile-optimized-modal'
          )}
        >
          {/* Header */}
          {showHeader && (
            <div
              className={cn(
                'flex items-center gap-4 w-full px-4 py-4 sm:px-6',
                // Mobile: rounded top corners, Desktop: rounded top corners
                position === 'responsive' || position === 'bottom'
                  ? 'rounded-t-3xl sm:rounded-t-xl'
                  : 'rounded-t-xl',
                'bg-gradient-to-b from-mirage-54 to-navy-dark border-t border-white-16 backdrop-blur-[2rem]',
                headerClassName
              )}
            >
              {title && (
                <h2 
                  className="flex-1 text-white font-montserrat text-lg font-bold"
                  id={ariaDescribedBy}
                >
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <div
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white-4 bg-white-4 shadow-[inset_0_0.0625rem_0_0_rgba(255,255,255,0.16)] backdrop-blur-[2rem] hover:bg-white-8 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4 text-[white]" />
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div
            className={cn(
              'flex flex-col gap-4 p-3 w-full overflow-y-auto',
              // Mobile: rounded bottom corners, Desktop: rounded bottom corners
              position === 'responsive' || position === 'bottom'
                ? 'rounded-b-3xl sm:rounded-b-xl'
                : 'rounded-b-xl',
              'bg-mirage-54 backdrop-blur-[2rem] min-h-0',
              // Ensure content is scrollable on mobile with proper height calculation
              'max-h-[calc(100dvh-8rem)] sm:max-h-none',
              contentClassName
            )}
            style={{
              // Modern viewport units with fallback for content scrolling
              maxHeight: position === 'responsive' || position === 'bottom' 
                ? 'calc(100vh - 8rem)' // Fallback for older browsers
                : undefined,
              ...(typeof window !== 'undefined' && 'CSS' in window && 'supports' in window.CSS && window.CSS.supports('height', '100dvh') 
                ? { 
                    maxHeight: position === 'responsive' || position === 'bottom' 
                      ? 'calc(100dvh - 8rem)' // Modern browsers with dvh support
                      : undefined
                  } 
                : {}
              )
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
    </>
  )

  // Use portal to render at document root level if specified
  if (usePortal && typeof document !== 'undefined') {
    return createPortal(modalContent, document.body)
  }

  return modalContent
}
