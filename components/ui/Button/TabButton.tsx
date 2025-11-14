'use client'

import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

interface TabButtonProps {
  title: string
  icon?: ReactNode
  badge?: string
  type: 'one' | 'two' | 'three' | 'four' | 'five' | 'six'
  onClick?: () => void
  className?: string
}

const TabButton: React.FC<TabButtonProps> = ({
  title,
  type,
  badge,
  icon,
  onClick,
  className = '',
}) => {
  const shape =
    type === 'one'
      ? 'rounded-full hover:border hover:border-[#FFFFFF21]'
      : 'rounded-lg'
  const height =
    type === 'one' ? 'h-[1.4375rem]' : type === 'five' ? 'h-12' : 'h-9'
  const badgeStyle =
    type === 'four'
      ? 'group-active:bg-[#111923] text-dodger-blue'
      : 'group-active:bg-white text-dodger-blue'
  const bgFour = 'bg-mirage-4 hover:bg-[#2A3546]  '
  const bgTwo = 'hover:bg-[#FFFFFF14] active:bg-[#2283F6] '
  const bgThree = 'active:bg-[#FFFFFF14]'
  const bgFive =
    'bg-mirage-4 hover:bg-transparent hover:bg-[#2A3546] active:bg-[#2A3546]  '
  const bgOne =
    'hover:bg-[#FFFFFF21] bg-transparent active:bg-[#2283f6] ' +
    'hover:shadow-[inset_0_0.0625rem_0_0_rgba(255,255,255,0.16)]'
  const background =
    type === 'four'
      ? bgFour
      : type === 'five'
        ? bgFive
        : type === 'one'
          ? bgOne
          : type === 'two'
            ? bgTwo
            : type === 'three'
              ? bgThree
              : 'hover:bg-[#FFFFFF14] active:bg-[#2283F6] ' +
                  'active:text-[#ffffff]'
  const iconStyle = type === 'three' ? 'group-active:text-[#2283F6]' : ''
  return (
    <div
      className={cn(
        'flex group gap-2 text-casper active:text-white px-4 ' +
          'cursor-pointer hover:text-white items-center justify-center ' +
          'rounded-[0.5rem]',
        background,
        className,
        shape,
        height
      )}
      onClick={onClick}
    >
      {icon && <span className={iconStyle}>{icon}</span>}
      <span>{title}</span>
      {badge && (
        <span
          className={cn(
            'px-2 py-0.5 rounded-[0.375rem] text-[0.75rem] font-bold',
            badgeStyle
          )}
        >
          {badge}
        </span>
      )}
    </div>
  )
}

export default TabButton
