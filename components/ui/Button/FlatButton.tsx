'use client'

import { cn } from '@/lib/utils'

// @ts-ignore - React types issue workaround
import * as React from 'react'

// Global JSX declaration workaround
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

interface FlatButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

// Extract className constants for better maintainability
const BUTTON_BASE_CLASSES =
  'pushable group relative border-none bg-transparent p-0 ' +
  'outline-offset-1 transition-filter duration-250 ' +
  'focus:outline-none focus-visible:outline'

const EDGE_CLASSES =
  'edge absolute top-[0.1875rem] left-0 w-full h-full ' +
  'rounded-[0.5rem] !bg-[#2283F680] opacity-80'

const getFrontClasses = (disabled: boolean) => {
  const baseClasses = [
    'front relative rounded-[0.5rem]',
    'text-white will-change-transform',
    'flex items-center justify-center',
    'bg-dodger-blue',
  ]

  if (!disabled) {
    baseClasses.push(
      'group-hover:-translate-y-[0.1875rem]',
      'group-active:translate-y-[0.0625rem]',
      'hover:bg-cornflower-blue'
    )
  } else {
    baseClasses.push('opacity-50')
  }

  return baseClasses.join(' ')
}

const FlatButton = ({
  children,
  onClick,
  className = '',
  disabled = false,
}: FlatButtonProps) => {
  const cursorClass = disabled ? 'cursor-not-allowed' : 'cursor-pointer'
  const buttonClasses = cn(BUTTON_BASE_CLASSES, cursorClass)

  return (
    <div onClick={disabled ? undefined : onClick} className={buttonClasses}>
      <span className={cn(EDGE_CLASSES, className)}></span>
      <span className={cn(getFrontClasses(disabled), className)}>
        {children}
      </span>
    </div>
  )
}

export default FlatButton
