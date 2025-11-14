'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Header from './Header'
import { MobileHeader } from './MobileHeader'
import { useI18n } from '@/context/I18nProvider'

interface ResponsiveHeaderProps {
  onHeaderTypeChange?: (isMobile: boolean) => void
}

// Component that uses useSearchParams - needs to be wrapped in Suspense
const ResponsiveHeaderContent: React.FC<ResponsiveHeaderProps> = ({
  onHeaderTypeChange,
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Check if current page should use mobile header
  const shouldUseMobileHeader = () => {
    // Don't use mobile header on lobbypage (/) and hashgame pages (/hashgames/*)
    if (pathname === '/') {
      return false
    }
    // Only use mobile header after client-side hydration
    return isClient && isMobile
  }

  // Check if back button should be shown
  const shouldShowBackButton = () => {
    // Don't show back button on View All pages
    const viewAllPages = [
      '/slots',
      '/hash-games',
      '/live-casino',
      '/futures',
      '/crypto-games',
      '/sports',
      '/table-games',
    ]
    if (viewAllPages.includes(pathname)) {
      return false
    }
    return true
  }

  // Handle client-side detection
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Handle mobile detection
  useEffect(() => {
    if (!isClient) return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [isClient])

  // Handle back navigation for mobile header
  const handleBackClick = () => {
    router.back()
  }

  // Handle support click for mobile header
  const handleSupportClick = () => {
    // You can implement support functionality here
    console.log('Support clicked')
  }

  // Get title based on current path
  const getPageTitle = () => {
    if (pathname.startsWith('/alliance')) {
      console.log('pathname', pathname)
      if (searchParams.get('tab') === 'invite') {
        return 'Invite Friends'
      }
      if (searchParams.get('tab') === 'management') {
        return 'Management'
      }
      if (searchParams.get('tab') === 'performance') {
        return 'Performance'
      }
      if (searchParams.get('tab') === 'report') {
        return 'Report'
      }
      if (searchParams.get('tab') === 'introduction') {
        return 'Introduction'
      }
      return 'Invite Friends'
    }
    if (pathname.startsWith('/profile')) {
      return 'Profile'
    }
    if (pathname.startsWith('/settings')) {
      return 'Settings'
    }
    if (pathname.startsWith('/support')) {
      return 'Support'
    }
    if (pathname.startsWith('/legal')) {
      return 'Legal'
    }
    if (pathname.startsWith('/terms')) {
      return 'Terms & Conditions'
    }
    if (pathname.startsWith('/privacy')) {
      return 'Privacy Policy'
    }
    if (pathname.startsWith('/about')) {
      return 'About Us'
    }
    if (pathname.startsWith('/contact')) {
      return 'Contact Us'
    }
    if (pathname.startsWith('/promotions')) {
      return 'Promotions'
    }
    // Add more path-based titles as needed
    return 'Support/Legal support'
  }

  // Notify parent about header type change
  useEffect(() => {
    if (onHeaderTypeChange) {
      onHeaderTypeChange(shouldUseMobileHeader())
    }
  }, [pathname, isMobile, onHeaderTypeChange])

  // During hydration, always render Header to prevent mismatch
  if (!isClient) {
    return <Header />
  }

  if (shouldUseMobileHeader()) {
    return (
      <MobileHeader
        title={getPageTitle()}
        onBackClick={handleBackClick}
        onSupportClick={handleSupportClick}
        isHeadSet={pathname.startsWith('/promotions') ? false : true}
        showBackButton={shouldShowBackButton()}
      />
    )
  }

  return <Header />
}

// Wrapper component with Suspense boundary
const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = props => {
  return (
    <Suspense fallback={<div>Loading header...</div>}>
      <ResponsiveHeaderContent {...props} />
    </Suspense>
  )
}

export default ResponsiveHeader
