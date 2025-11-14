'use client'

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import dynamic from 'next/dynamic'

// Overlay types
export type OverlayType = 'hash-hover' | 'notifications' | 'profile' | null

interface OverlayState {
  type: OverlayType
  isOpen: boolean
  data?: any // For passing additional data to overlays
}

interface OverlayContextType {
  // Overlay state
  overlayState: OverlayState

  // Overlay controls
  openOverlay: (type: OverlayType, data?: any) => void
  closeOverlay: () => void

  // Specific overlay helpers
  openHashHover: (data?: any) => void
  openNotifications: () => void
  openProfile: () => void

  // State getters
  isHashHoverOpen: boolean
  isNotificationsOpen: boolean
  isProfileOpen: boolean
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined)

export const useOverlay = () => {
  const context = useContext(OverlayContext)
  if (context === undefined) {
    // Return a fallback context instead of throwing an error
    return {
      overlayState: { type: null, isOpen: false, data: null },
      openOverlay: () => {},
      closeOverlay: () => {},
      openHashHover: () => {},
      openNotifications: () => {},
      openProfile: () => {},
      isHashHoverOpen: false,
      isNotificationsOpen: false,
      isProfileOpen: false,
    }
  }
  return context
}

interface OverlayProviderProps {
  children: ReactNode
}

export const OverlayProvider: React.FC<OverlayProviderProps> = ({
  children,
}) => {
  const [overlayState, setOverlayState] = useState<OverlayState>({
    type: null,
    isOpen: false,
    data: null,
  })

  const openOverlay = (type: OverlayType, data?: any) => {
    setOverlayState({
      type,
      isOpen: true,
      data,
    })
  }

  const closeOverlay = () => {
    setOverlayState({
      type: null,
      isOpen: false,
      data: null,
    })
  }

  // Specific overlay helpers
  const openHashHover = (data?: any) => openOverlay('hash-hover', data)
  const openNotifications = () => openOverlay('notifications')
  const openProfile = () => openOverlay('profile')

  // State getters
  const isHashHoverOpen =
    overlayState.type === 'hash-hover' && overlayState.isOpen
  const isNotificationsOpen =
    overlayState.type === 'notifications' && overlayState.isOpen
  const isProfileOpen = overlayState.type === 'profile' && overlayState.isOpen

  // Prevent body scroll when any overlay is open
  useEffect(() => {
    if (overlayState.isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [overlayState.isOpen])

  // Handle escape key to close overlays
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && overlayState.isOpen) {
        closeOverlay()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [overlayState.isOpen])

  const value: OverlayContextType = {
    overlayState,
    openOverlay,
    closeOverlay,
    openHashHover,
    openNotifications,
    openProfile,
    isHashHoverOpen,
    isNotificationsOpen,
    isProfileOpen,
  }

  // Dynamically import overlay components
  const HashHoverLayer = dynamic(
    () => import('@/components/overlays/HashHoverLayer'),
    { ssr: false }
  )
  const ProfileOverlay = dynamic(
    () => import('@/components/overlays/ProfileOverlay'),
    { ssr: false }
  )

  return (
    <OverlayContext.Provider value={value}>
      {children}

      {/* Render overlays based on current state */}
      {isHashHoverOpen && (
        <HashHoverLayer data={overlayState.data} onClose={closeOverlay} />
      )}
      {isProfileOpen && <ProfileOverlay onClose={closeOverlay} />}
    </OverlayContext.Provider>
  )
}
