'use client'

import React from 'react'
import clsx from 'clsx'

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'gradient' | 'custom'

interface UnifiedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: ButtonVariant
  style?: React.CSSProperties
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const UnifiedButton: React.FC<UnifiedButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'default',
  style,
  disabled = false,
  type = 'button',
}) => {
  const baseClasses =
    'flex items-center justify-center transition-colors cursor-pointer rounded-lg'

  const variantClasses = {
    default:
      'h-9 bg-[var(--white-4)] border-b-[1px] border-[var(--ebony-clay)] border-t-[3px] border-[var(--white-29)] hover:bg-[var(--white-8)]',
    primary:
      'h-9 bg-[var(--dodger-blue)] text-white hover:bg-[var(--dodger-blue)]',
    secondary:
      'h-9 bg-[var(--white-8)] text-[var(--casper)] hover:bg-[var(--white-13)]',
    gradient:
      'h-9 bg-gradient-to-r from-[var(--navy-dark)] to-[var(--blue-500)] text-white hover:brightness-110',
    custom: '',
  }

  const defaultStyle =
    variant === 'default' ? { borderTop: '1px solid var(--light-gray)' } : {}

  return (
    <div
      onClick={onClick}
      className={clsx(baseClasses, variantClasses[variant], className)}
      style={{
        ...(style || defaultStyle),
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span className="flex gap-2 items-center">{children}</span>
    </div>
  )
}

export default UnifiedButton
