'use client'

import React, { ReactNode, useEffect } from 'react'

interface OverlayProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  backdropClassName?: string
  contentClassName?: string
  zIndex?: number
  preventScroll?: boolean
  closeOnEscape?: boolean
  closeOnBackdropClick?: boolean
}

const Overlay: React.FC<OverlayProps> = ({
  isOpen,
  onClose,
  children,
  className = 'fixed inset-0',
  backdropClassName = 'absolute inset-0 bg-black/40',
  contentClassName = '',
  zIndex = 100,
  preventScroll = true,
  closeOnEscape = true,
  closeOnBackdropClick = true,
}) => {
  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen && preventScroll) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [isOpen, preventScroll])

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, closeOnEscape, onClose])

  if (!isOpen) return null

  return (
    <div className={`${className} z-[${zIndex}]`} style={{ zIndex }}>
      {closeOnBackdropClick && (
        <div className={backdropClassName} onClick={onClose} />
      )}
      <div className={contentClassName}>{children}</div>
    </div>
  )
}

export default Overlay
