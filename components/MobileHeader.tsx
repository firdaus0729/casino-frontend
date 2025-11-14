'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import BlackButton from './ui/Button/BlackButton'
import ArrowLeftStrokeIcon from './ui/icons/arrow-left-stroke'
import HeadphoneMicIcon from './ui/icons/headphone-mic'
import { useI18n } from '../context/I18nProvider'

interface MobileHeaderProps {
  title?: string
  onBackClick?: () => void
  onSupportClick?: () => void
  className?: string
  showBackButton?: boolean
  isHeadSet: boolean
}

export function MobileHeader({
  title,
  onBackClick,
  onSupportClick,
  className,
  showBackButton = true,
  isHeadSet,
}: MobileHeaderProps) {
  const { t } = useI18n()
  const displayTitle = title || t('help.support')
  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'flex w-full justify-between items-center p-3 gap-3 sm:gap-4 sm:p4',
        'bg-[rgba(17,25,35,0.54)] backdrop-blur-[32px]',
        'h-[56px]',
        className
      )}
      style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}
    >
      <div className="flex gap-4 items-center">
        {/* Back Button */}
        {showBackButton && (
          <BlackButton onClick={onBackClick}>
            <ArrowLeftStrokeIcon className="w-4 h-4" />
          </BlackButton>
        )}

        {/* Title */}
        <h1
          className={cn(
            'flex-1 text-white font-montserrat text-base sm:text-lg font-bold',
            showBackButton
              ? 'flex justify-center items-center sm:text-left'
              : 'flex justify-center items-center',
            'truncate px-2 sm:px-0' // Handle long titles on small screens
          )}
        >
          {displayTitle}
        </h1>
      </div>

      {/* Support Button */}
      {isHeadSet && (
        <BlackButton onClick={onSupportClick}>
          <HeadphoneMicIcon className="w-4 h-4" />
        </BlackButton>
      )}
    </div>
  )
}
