'use client'

import React, { useEffect, useState } from 'react'
import { AUTH_CHANGED_EVENT, getIsLoggedIn } from '@/lib/auth'
import { useSidebar } from '../context/SidebarProvider'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchWalletInfo } from '@/store/slices/walletSlice'
import { LeftSection } from './header/HeaderLeftSection'
import { AuthSection } from './header/HeaderAuthSection'
import { UtilitySection } from './header/HeaderUtilitySection'
import { MobileGameNav } from './header/HeaderMobileGameNav'

const Header: React.FC = () => {
  const { toggleSidebar, openAuthModalWithTab, isCollapsed } = useSidebar()
  const [activeGameTab, setActiveGameTab] = useState('lobby')
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  
  // Use Redux state directly for authentication
  const { isAuthenticated } = useAppSelector(state => state.auth)
  const isLoggedIn = isAuthenticated

  // Also listen to localStorage events as a fallback
  useEffect(() => {
    if (typeof window === 'undefined') return
    const updateLoginState = () => {
      const loggedIn = getIsLoggedIn()
      console.log('Header: Auth state changed, isLoggedIn:', loggedIn)
    }
    updateLoginState()
    window.addEventListener(AUTH_CHANGED_EVENT, updateLoginState)
    return () => {
      window.removeEventListener(AUTH_CHANGED_EVENT, updateLoginState)
    }
  }, [])

  // Fetch wallet balances for header when logged in
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchWalletInfo())
    }
  }, [isLoggedIn, dispatch])

  // Update active tab based on URL query parameters
  useEffect(() => {
    if (typeof window === 'undefined') return

    const tabFromQuery = searchParams.get('tab')
    if (tabFromQuery) {
      // Validate the tab parameter
      const validTabs = [
        'lobby',
        'hash',
        'slots',
        'casino',
        'sport',
        'futures',
        'crypto',
        'table',
      ]
      if (validTabs.includes(tabFromQuery)) {
        setActiveGameTab(tabFromQuery)
      } else {
        setActiveGameTab('lobby')
      }
    } else {
      // Fallback to pathname-based detection if no query parameter
      const path = window.location.pathname
      switch (path) {
        case '/':
          setActiveGameTab('lobby')
          break
        case '/hash-games':
          setActiveGameTab('hash')
          break
        case '/slots':
          setActiveGameTab('slots')
          break
        case '/casino':
          setActiveGameTab('casino')
          break
        case '/futures':
          setActiveGameTab('futures')
          break
        case '/crypto-games':
          setActiveGameTab('crypto')
          break
        case '/sports':
          setActiveGameTab('sport')
          break
        case '/table-games':
          setActiveGameTab('table')
          break
        default:
          setActiveGameTab('lobby')
      }
    }
  }, [searchParams])

  const handleTabChange = (tabId: string) => {
    try {
      setActiveGameTab(tabId)

      // Handle home tab navigation
      if (tabId === 'lobby') {
        router.push('/')
      } else {
        // Always navigate to root path with query parameter for other tabs
        const newUrl = `/?tab=${tabId}`
        router.push(newUrl)
      }
    } catch (error) {
      console.error('Navigation error:', error)
      // Fallback to window.location if router fails
      if (tabId === 'lobby') {
        window.location.href = '/'
      } else {
        window.location.href = `/?tab=${tabId}`
      }
    }
  }

  return (
    <>
      <header
        id="app-header"
        className="fixed top-0 left-0 right-0 z-50 flex flex-col"
        style={{
          backdropFilter: 'blur(2rem)',
          background: 'var(--mirage-54)',
          borderBottom: '1px solid var(--white-4)',
        }}
      >
        {/* Main Header Row */}
        <div className="flex items-center justify-between p-2">
          {/* Left side */}
          <LeftSection
            toggleSidebar={toggleSidebar}
            isCollapsed={isCollapsed}
          />

          {/* Center - empty space */}
          <div className="flex-1"></div>

          {/* Right side */}
          <div className="flex items-center sm:gap-2">
            <AuthSection
              openAuthModalWithTab={openAuthModalWithTab}
              isLoggedIn={isLoggedIn}
            />
            <UtilitySection isLoggedIn={isLoggedIn} />
          </div>
        </div>

        {/* Mobile Game Navigation */}
        <MobileGameNav
          activeTab={activeGameTab}
          onTabChange={handleTabChange}
        />
      </header>
    </>
  )
}

export default Header
