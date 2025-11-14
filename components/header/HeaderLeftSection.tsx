'use client'

import React from 'react'
import {
  MenuButton,
  Logo,
  BonusesButton,
  SearchButton,
} from './HeaderButtons'

interface HeaderLeftSectionProps {
  toggleSidebar: () => void
  isCollapsed: boolean
}

export const LeftSection: React.FC<HeaderLeftSectionProps> = ({
  toggleSidebar,
  isCollapsed,
}) => (
  <div className="flex items-center gap-2">
    <MenuButton onClick={toggleSidebar} isCollapsed={isCollapsed} />
    <Logo />
    <BonusesButton />
    <SearchButton />
  </div>
)

