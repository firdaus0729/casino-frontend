'use client'

import React from 'react'
import clsx from 'clsx'

type ButtonVariant =
  | 'blue'
  | 'black'
  | 'red'
  | 'green'
  | 'blueOne'
  | 'Wallet'
  | 'outline'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: ButtonVariant
}

// Extract className constants for better maintainability
const PUSHABLE_BASE_CLASSES =
  'pushable group relative border-none bg-transparent cursor-pointer ' +
  'outline-offset-1 focus:outline-none focus-visible:outline'

const EDGE_BASE_CLASSES =
  'edge absolute translate-y-[3px] top-0 left-0 w-full h-full rounded-[8px]'

const FRONT_BASE_CLASSES = [
  'front relative w-full h-full rounded-[8px]',
  'text-white font-bold flex items-center justify-center text-[12px]',
  'will-change-transform transform transition-transform',
  'duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)]',
  'group-hover:-translate-y-[3px] group-hover:duration-[250ms]',
  'group-hover:ease-[cubic-bezier(0.3,0.7,0.4,1.5)]',
  'group-active:translate-y-[1px] group-active:duration-[34ms]',
  'hover:shadow-[0_3px_16px_transparent,inset_0_4px_3px_var(--white-25)]',
].join(' ')

const SIMPLE_BUTTON_CLASSES =
  'flex items-center justify-center transition-colors cursor-pointer'

const styles: Record<
  ButtonVariant,
  { base: string; edge?: string; width?: string }
> = {
  blue: {
    base: 'bg-[linear-gradient(#0C60FF,#2C9FFA)] border border-[#55657E]',
    edge: 'bg-[#003a8a]',
    width: 'w-[146px]',
  },
  black: {
    base:
      'flex h-9 w-9 items-center justify-center rounded-lg border ' +
      'border-white-4 bg-white-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16)] ' +
      'backdrop-blur-[32px] hover:bg-white-8 transition-colors',
  },
  red: {
    base: 'bg-[linear-gradient(to_bottom,#F9476E_0%,#BD0139_24%)]',
    edge: 'bg-[#61001d]',
    width: 'w-[85px]',
  },
  green: {
    base: 'bg-[linear-gradient(1turn,#31FF5E_0.8%,#1BB83D)]',
    edge: 'bg-[#1BB83D80]',
    width: 'w-[146px]',
  },
  blueOne: {
    base: 'bg-[linear-gradient(#0C60FF,#2C9FFA)] border border-[#55657E]',
    edge: 'bg-[#003a8a]',
    width: 'w-[173px]',
  },
  Wallet: {
    base: 'bg-[linear-gradient(1turn,#0C60FF_0.8%,#2C9FFA)]',
    edge: 'bg-[#003a8a]',
    width: 'w-[146px]',
  },
  outline: {
    base: 'bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-700',
    width: 'w-auto',
  },
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = ' h-[33px]',
  type = 'button',
  disabled = false,
  variant = 'blue',
}) => {
  const { base, edge, width } = styles[variant]

  const disabledStyle = {
    pointerEvents: disabled ? ('none' as const) : ('auto' as const),
    opacity: disabled ? 0.5 : 1,
  }

  if (!edge) {
    // Simple (black) style
    return (
      <div
        onClick={onClick}
        className={clsx(SIMPLE_BUTTON_CLASSES, base, className)}
        style={disabledStyle}
      >
        <span>{children}</span>
      </div>
    )
  }

  // Pushable style (blue, red, green)
  return (
    <div
      onClick={onClick}
      className={clsx(PUSHABLE_BASE_CLASSES, width, className)}
      style={disabledStyle}
    >
      <span className={clsx(EDGE_BASE_CLASSES, edge)}></span>
      <span className={clsx(FRONT_BASE_CLASSES, base)}>
        <span>{children}</span>
      </span>
    </div>
  )
}

interface BlueButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

// Extract BlueButton className constants
const BLUE_BUTTON_PUSHABLE_CLASSES = [
  'pushable group relative border-none bg-transparent p-0',
  'cursor-pointer outline-offset-1 hover:brightness-110',
  'transition-filter duration-250 focus:outline-none focus-visible:outline',
].join(' ')

const BLUE_BUTTON_EDGE_CLASSES =
  'edge absolute translate-y-[3px] top-0 left-0 w-full ' +
  'px-[25.2px] h-full rounded-[12.6px] bg-[#003a8a]'

const BLUE_BUTTON_FRONT_CLASSES = [
  'front relative lg:h-[51.97px] h-[37.73px] flex rounded-[12.6px]',
  'px-[25.2px] text-xl text-white',
  'bg-[linear-gradient(#0C60FF,#2C9FFA)] will-change-transform',
  'shadow-inner shadow-gray-400',
  'transform transition-transform duration-[600ms]',
  'ease-[cubic-bezier(0.3,0.7,0.4,1)]',
  'group-hover:-translate-y-[3px] group-hover:duration-[250ms]',
  'group-hover:ease-[cubic-bezier(0.3,0.7,0.4,1.5)]',
  'border-[1px] border-[#55657E]',
  'group-active:translate-y-[1px] hover:shadow-[0_3px_28px_#2283f666]',
  'group-active:duration-[34ms] text-[12px] font-bold',
  'items-center justify-center lg:text-[18.9px]',
].join(' ')

const BLUE_BUTTON_BOX_SHADOW =
  '0 3px 28px #2283f666, inset 0 3px 3px rgba(255,255,255,0.21)'

const BlueButton: React.FC<BlueButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const disabledStyle = {
    pointerEvents: disabled ? ('none' as const) : ('auto' as const),
    opacity: disabled ? 0.5 : 1,
  }

  return (
    <div
      className={clsx(BLUE_BUTTON_PUSHABLE_CLASSES, className)}
      onClick={onClick}
      style={disabledStyle}
    >
      <span className={BLUE_BUTTON_EDGE_CLASSES}></span>
      <span
        className={BLUE_BUTTON_FRONT_CLASSES}
        style={{
          boxShadow: BLUE_BUTTON_BOX_SHADOW,
        }}
      >
        <span>{children}</span>
      </span>
    </div>
  )
}

export { BlueButton }
export default Button
