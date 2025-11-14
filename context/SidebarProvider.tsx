'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

interface SidebarContextType {
  isCollapsed: boolean
  toggleSidebar: () => void
  isAuthModalOpen: boolean
  toggleAuthModal: () => void
  openAuthModalWithTab: (isLogin: boolean) => void
  authModalInitialTab: boolean
  setAuthModalInitialTab: (isLogin: boolean) => void
  activeGameCategory: string
  setActiveGameCategory: (category: string) => void
  // Hover panel state for Hash Games
  isHashHoverOpen: boolean
  openHashHover: () => void
  scheduleCloseHashHover: () => void
  hashHoverTop: number
  setHashHoverTop: (top: number) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  // Collapsed by default on mobile; open on desktop
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    return window.innerWidth < 1024 // lg breakpoint
  })
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalInitialTab, setAuthModalInitialTab] = useState(true) // true = login, false = register
  const [activeGameCategory, setActiveGameCategory] = useState('home')
  const [isHashHoverOpen, setIsHashHoverOpen] = useState(false)
  const [hashHoverTop, setHashHoverTop] = useState(0)
  const hoverCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleResize = () => {
      const shouldCollapse = window.innerWidth < 1024
      setIsCollapsed(prev => (shouldCollapse !== prev ? shouldCollapse : prev))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleAuthModal = () => {
    setIsAuthModalOpen(!isAuthModalOpen)
  }

  const openAuthModalWithTab = (isLogin: boolean) => {
    setAuthModalInitialTab(isLogin)
    setIsAuthModalOpen(true)
  }

  const openHashHover = () => {
    if (hoverCloseTimerRef.current) {
      clearTimeout(hoverCloseTimerRef.current)
      hoverCloseTimerRef.current = null
    }
    setIsHashHoverOpen(true)
  }

  const scheduleCloseHashHover = () => {
    if (hoverCloseTimerRef.current) {
      clearTimeout(hoverCloseTimerRef.current)
    }
    hoverCloseTimerRef.current = setTimeout(() => {
      setIsHashHoverOpen(false)
    }, 200)
  }

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebar,
        isAuthModalOpen,
        toggleAuthModal,
        openAuthModalWithTab,
        authModalInitialTab,
        setAuthModalInitialTab,
        activeGameCategory,
        setActiveGameCategory,
        isHashHoverOpen,
        openHashHover,
        scheduleCloseHashHover,
        hashHoverTop,
        setHashHoverTop,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
