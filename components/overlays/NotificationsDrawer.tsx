'use client'

import React from 'react'
import Overlay from './Overlay'
import NotificationsPanel from '@/components/ui/notification/Panel'

interface Props {
  onClose: () => void
}

const NotificationsDrawer: React.FC<Props> = ({ onClose }) => {
  return (
    <Overlay
      isOpen={true}
      onClose={onClose}
      className="lg:hidden fixed inset-0"
      backdropClassName="absolute z-[999] inset-0 bg-black/60"
      contentClassName="absolute inset-0 w-full z-[9999] h-full bg-[#0f141c] transition-transform duration-300"
      zIndex={1100}
      closeOnBackdropClick={true}
      closeOnEscape={true}
    >
      <NotificationsPanel onClose={onClose} />
    </Overlay>
  )
}

export default NotificationsDrawer
