import { useState, useEffect } from 'react'
import { ChipSelector } from './ChipSelector'
import { MobileChipSelector } from './MobileChipSelector'
import MenuModal from '@/components/modals/MenuModal'
import ChangeGameModal from '@/components/modals/ChangeGameModal'

export function ResponsiveChipSelector() {
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)
  const [isChangeMenuModalOpen, setIsChangeMenuModalOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Mark as client-side to prevent hydration mismatch
    setIsClient(true)

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check on mount
    checkIsMobile()

    // Listen for resize events
    window.addEventListener('resize', checkIsMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const handleMenuClick = () => {
    setIsMenuModalOpen(true)
  }

  const handleCloseMenuModal = () => {
    setIsMenuModalOpen(false)
  }

  const toggleChangeGameModal = () => {
    setIsChangeMenuModalOpen(!isChangeMenuModalOpen)
  }

  // Prevent hydration mismatch by showing the same content on server and client initially
  if (!isClient) {
    return (
      <>
        <ChipSelector />
        <MenuModal isOpen={isMenuModalOpen} onClose={handleCloseMenuModal} />
        <ChangeGameModal
          isOpen={isChangeMenuModalOpen}
          onClose={toggleChangeGameModal}
        />
      </>
    )
  }

  return (
    <>
      {isMobile ? (
        <MobileChipSelector
          onMenuClick={handleMenuClick}
          onGridClick={toggleChangeGameModal}
        />
      ) : (
        <ChipSelector />
      )}

      {/* Menu Modal - Rendered at higher level to avoid bottom bar conflicts */}
      <MenuModal isOpen={isMenuModalOpen} onClose={handleCloseMenuModal} />
      <ChangeGameModal
        isOpen={isChangeMenuModalOpen}
        onClose={toggleChangeGameModal}
      />
    </>
  )
}
