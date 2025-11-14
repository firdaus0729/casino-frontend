'use client'

import React from 'react'
import Overlay from './Overlay'
import UserProfileDropdown from '@/components/ui/notification/Profile'

interface ProfileOverlayProps {
  onClose: () => void
}

const ProfileOverlay: React.FC<ProfileOverlayProps> = ({ onClose }) => {
  return (
    <Overlay
      isOpen={true}
      onClose={onClose}
      className="fixed inset-0"
      backdropClassName="absolute inset-0 bg-black/50 backdrop-blur-sm"
      contentClassName="fixed inset-0 z-[1001] flex items-end sm:items-center justify-center p-0 sm:p-4"
      zIndex={1000}
      closeOnBackdropClick={true}
      closeOnEscape={true}
    >
      <div className="lg:hidden w-full h-full">
        <UserProfileDropdown onClose={onClose} />
      </div>
    </Overlay>
  )
}

export default ProfileOverlay
