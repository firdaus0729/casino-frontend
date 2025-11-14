'use client'

import mainContentData from '../../main-content-data.json'
import Link from 'next/link'
import ModalContainer from './ModalContainer'

interface ChangeGameModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChangeGameModal({
  isOpen,
  onClose,
}: ChangeGameModalProps) {
  const handleGameSelect = (gameId: string) => {
    console.log(`Selected game: ${gameId}`)
    // Here you can add navigation logic to the selected game
    onClose()
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title="Change game"
      size="lg"
      position="responsive"
      contentClassName="p-6"
    >
      {/* Game Grid */}
      <div className="grid grid-cols-3 gap-4">
        {mainContentData.card10.map((item, index) => (
          <div className="rounded-lg overflow-hidden" key={index}>
            <Link href={item.link} onClick={onClose} className="cursor-pointer">
              <img
                src={item.image}
                alt="game"
                className="w-full object-cover transition-transform duration-200"
              />
            </Link>
          </div>
        ))}
      </div>
    </ModalContainer>
  )
}
