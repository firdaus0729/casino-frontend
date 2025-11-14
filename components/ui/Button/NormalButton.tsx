'use client'

import React from 'react'

interface NormalButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

const NormalButton: React.FC<NormalButtonProps> = ({
  children,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={
        'flex text-casper active:text-white h-[2.25rem] bg-transparent ' +
        'hover:bg-ebony-clay hover:text-white items-center justify-center ' +
        'rounded-[0.5rem] gap-[0.5rem] font-bold cursor-pointer ' +
        className
      }
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default NormalButton
