'use client'

import React from 'react'
import Link from 'next/link'
import BlackButton from '../ui/Button/BlackButton'
import ArrowToRightStrokeIcon from '../ui/icons/arrow-to-right-stroke'
import { cn } from '@/lib/utils'
import SearchIcon from '../ui/icons/search'
import NotificationIcon from '../ui/icons/notification'
import MessageDots2Icon from '../ui/icons/message-dots-2'
import { UnifiedButton } from '../ui'
import { useModal } from '@/context/ModalProvider'

export const MenuButton: React.FC<{
  onClick: () => void
  isCollapsed: boolean
}> = ({ onClick, isCollapsed }) => (
  <div className="relative lg:flex hidden">
    <BlackButton onClick={onClick}>
      <ArrowToRightStrokeIcon
        className={cn('w-4 h-4', isCollapsed ? 'rotate-180' : '')}
      />
    </BlackButton>
  </div>
)

export const Logo: React.FC = () => (
  <div className="flex items-center">
    <Link href="/">
      <img src="/images/logo.svg" alt="777 Gaming Logo" />
    </Link>
  </div>
)

export const BonusesButton: React.FC = () => (
  <div className="relative sm:block hidden">
    <UnifiedButton
      variant="gradient"
      className="px-3 py-2"
      style={{
        border: '0.0625rem solid var(--gray-600)',
      }}
    >
      <div className="flex items-center gap-2">
        <img
          src="/images/awards/Chest-box.svg"
          className="h-8"
          alt="bonuses"
        />
        <span className="text-white font-medium text-xs lg:block hidden">
          Bonuses
        </span>
      </div>
    </UnifiedButton>
    {/* Notification badge overlapping the button */}
    <div
      className={
        'absolute -top-1 -right-1 bg-green-500 text-white ' +
        'text-xs rounded w-5 flex items-center justify-center'
      }
    >
      4
    </div>
  </div>
)

export const SearchButton: React.FC = () => {
  const { openGameSearchModal } = useModal()

  return (
    <BlackButton className="sm:flex hidden" onClick={openGameSearchModal}>
      <SearchIcon className="w-4 h-4" />
    </BlackButton>
  )
}

export const NotificationBadge: React.FC = () => (
  <div
    className={
      'absolute -top-1 -right-1 bg-green-500 text-white ' +
      'text-xs rounded w-5 flex items-center justify-center'
    }
  >
    4
  </div>
)

export const NotificationButton: React.FC<{ onClick?: () => void }> = ({
  onClick,
}) => (
  <div className="relative">
    <BlackButton className="lg:flex hidden" onClick={onClick}>
      <NotificationIcon className="w-4 h-4" />
    </BlackButton>
  </div>
)

export const MessageButton: React.FC = () => (
  <BlackButton className="lg:flex hidden">
    <MessageDots2Icon className="w-4 h-4" />
  </BlackButton>
)

