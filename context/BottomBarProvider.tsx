'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface BottomBarContextType {
  isHidden: boolean
  hideBottomBar: () => void
  showBottomBar: () => void
}

const BottomBarContext = createContext<BottomBarContextType | undefined>(
  undefined
)

export const useBottomBar = () => {
  const context = useContext(BottomBarContext)
  if (context === undefined) {
    throw new Error('useBottomBar must be used within a BottomBarProvider')
  }
  return context
}

interface BottomBarProviderProps {
  children: ReactNode
}

export const BottomBarProvider: React.FC<BottomBarProviderProps> = ({
  children,
}) => {
  const [isHidden, setIsHidden] = useState(false)

  const hideBottomBar = () => setIsHidden(true)
  const showBottomBar = () => setIsHidden(false)

  return (
    <BottomBarContext.Provider
      value={{ isHidden, hideBottomBar, showBottomBar }}
    >
      {children}
    </BottomBarContext.Provider>
  )
}
