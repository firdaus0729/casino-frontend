'use client'

import React, { useEffect, useRef } from 'react'
import BlackButton from '../ui/Button/BlackButton'
import UserProfileDropdown from '../ui/notification/Profile'
import { NotificationBadge } from './HeaderButtons'
import { useProfile } from '@/context/ProfileProvider'
import { useOverlay } from '@/context/OverlayProvider'
import { useAppSelector } from '@/store/hooks'

interface HeaderProfileButtonProps {
  onClick?: () => void
}

export const ProfileButton: React.FC<HeaderProfileButtonProps> = ({
  onClick,
}) => {
  const { isProfileOpen, setIsProfileOpen } = useProfile()
  const { openProfile } = useOverlay()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { user } = useAppSelector(state => state.auth)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return
      if (!containerRef.current.contains(event.target as Node)) {
        // Only close on click outside for desktop (lg and above)
        if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
          setIsProfileOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [setIsProfileOpen])

  const handleButtonClick = () => {
    // For mobile, use overlay system
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      openProfile()
    } else {
      // For desktop, use the existing profile system
      setIsProfileOpen(!isProfileOpen)
    }
    if (onClick) onClick()
  }

  return (
    <div className="relative" ref={containerRef}>
      <BlackButton
        className={
          'px-[0.125rem] ' +
          'bg-[conic-gradient(var(--malachite)_0_75%,transparent_75%_100%)] ' +
          'rounded-[0.625rem] ' +
          'hover:bg-[conic-gradient(var(--malachite)_0_75%,transparent_75%_100%)]'
        }
        onClick={handleButtonClick}
      >
        <img
          src={user?.avatar || '/images/Frame.png'}
          className="w-[2.1875rem] h-[1.875rem] rounded"
          alt="user avatar"
        />
      </BlackButton>
      <NotificationBadge />
      {isProfileOpen && (
        <div className="absolute -right-4 top-full mt-2 z-[1000] w-[98vw] lg:w-auto">
          <UserProfileDropdown onClose={() => setIsProfileOpen(false)} />
        </div>
      )}
    </div>
  )
}

