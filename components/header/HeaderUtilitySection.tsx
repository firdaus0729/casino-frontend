'use client'

import React, { useEffect, useRef, useState } from 'react'
import BlackButton from '../ui/Button/BlackButton'
import LanguageSelect from '../ui/LanguageSelect'
import { NotificationButton, MessageButton } from './HeaderButtons'
import { ProfileButton } from './HeaderProfileButton'
import { useLanguage } from '@/context/LanguageProvider'
import { useOverlay } from '@/context/OverlayProvider'

interface HeaderUtilitySectionProps {
  isLoggedIn: boolean
}

export const UtilitySection: React.FC<HeaderUtilitySectionProps> = ({
  isLoggedIn,
}) => {
  const [showLang, setShowLang] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const { currentLanguage, setCurrentLanguage } = useLanguage()
  const { openNotifications } = useOverlay()

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return
      if (!wrapperRef.current.contains(e.target as Node)) setShowLang(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  // Prevent scroll penetration when dropdown is open
  useEffect(() => {
    if (showLang) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [showLang])

  const handleToggleLang = () => {
    setShowLang(s => !s)
  }

  return (
    <div className="flex items-center gap-2" ref={wrapperRef}>
      <div className="relative lg:block hidden">
        <BlackButton onClick={handleToggleLang}>
          <img
            src={`/icons/flag-icon/${
              currentLanguage.code === 'en' ? 'uk' : currentLanguage.code
            }.svg`}
            className="h-4"
            alt="flag"
          />
        </BlackButton>
        {showLang && (
          <div className="absolute right-0 top-full mt-2 z-[1000]">
            <LanguageSelect
              open
              triggerless
              onRequestClose={() => setShowLang(false)}
              onChange={lang =>
                setCurrentLanguage({
                  code: lang.code,
                  name: lang.name,
                })
              }
            />
          </div>
        )}
      </div>
      {isLoggedIn && <NotificationButton onClick={openNotifications} />}
      <MessageButton />
      {isLoggedIn && <ProfileButton />}
    </div>
  )
}

