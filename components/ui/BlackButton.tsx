'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface BlackButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}

// Extract className constants for better maintainability
const BLACK_BUTTON_BASE_CLASSES = [
  'flex h-9 w-9 items-center justify-center rounded-lg',
  'border border-white-4 bg-white-4',
  'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16)]',
  'backdrop-blur-[32px] hover:bg-white-8 transition-colors cursor-pointer',
].join(' ')

const DEFAULT_BUTTON_STYLE: React.CSSProperties = {
  borderTop: '1px solid #9b9292bd',
}

const BlackButton: React.FC<BlackButtonProps> = ({
  children,
  onClick,
  className = '',
  style,
}) => {
  return (
    <div
      className={cn(BLACK_BUTTON_BASE_CLASSES, className)}
      onClick={onClick}
      style={style || DEFAULT_BUTTON_STYLE}
    >
      <span>{children}</span>
    </div>
  )
}

export default BlackButton
