'use client'

import React, { useEffect } from 'react'
import CasinoGames from '@/components/ui/CasinoGames'
import { useSidebar } from '@/context/SidebarProvider'
import { useSidebarPosition } from '@/hooks/useSidebarPosition'
import { useHoverTimeout } from '@/hooks/useHoverTimeout'

interface HashHoverLayerProps {
  data?: any
  onClose?: () => void
}

const HashHoverLayer: React.FC<HashHoverLayerProps> = ({ data, onClose }) => {
  const { hashHoverTop } = useSidebar()
  const { leftPosition } = useSidebarPosition()
  const { clearTimeout, setCloseTimeout } = useHoverTimeout()

  const handleMouseEnter = () => {
    // Clear any pending close timeout when entering overlay
    clearTimeout()
  }

  const handleMouseLeave = () => {
    // Add a small delay before closing to allow smooth transition
    setCloseTimeout(onClose || (() => {}), 200)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      clearTimeout()
    }
  }, [clearTimeout])

  return (
    <div
      className="fixed top-0 z-[120] transition-all duration-300"
      style={{
        left: `calc(${leftPosition} + 8px)`, // Position closer to sidebar
        top: hashHoverTop,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CasinoGames />
    </div>
  )
}

export default HashHoverLayer
