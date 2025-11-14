'use client'

import { useState } from 'react'
import ModalContainer from './ModalContainer'
import { PokerChip } from '@/components/ui/chipSelector/PokerChip'
import TDButton from '../ui/Button/TDButton'
import BlackButton from '../ui/Button/BlackButton'

interface ChipData {
  id: string
  value: string | number
  color:
    | 'blue'
    | 'purple'
    | 'green'
    | 'navy'
    | 'red'
    | 'orange'
    | 'gold'
    | 'brown'
    | 'lightblue'
}

const chipRows: ChipData[][] = [
  // Row 1
  [
    { id: '1', value: 1, color: 'blue' },
    { id: '5', value: 5, color: 'purple' },
    { id: '10', value: 10, color: 'green' },
    { id: '50', value: 50, color: 'navy' },
    { id: '100', value: 100, color: 'red' },
  ],
  // Row 2
  [
    { id: '200', value: 200, color: 'gold' },
    { id: '500', value: 500, color: 'brown' },
    { id: '1k', value: '1k', color: 'lightblue' },
    { id: '5k', value: '5K', color: 'navy' },
    { id: '10k', value: '10k', color: 'brown' },
  ],
  // Row 3
  [
    { id: '2a', value: 2, color: 'gold' },
    { id: '2b', value: 2, color: 'gold' },
    { id: 'customize1', value: 'Customize', color: 'gold' },
    { id: 'customize2', value: 'Customize', color: 'gold' },
    { id: 'customize3', value: 'Customize', color: 'gold' },
  ],
]

interface CustomizeChipModalProps {
  isOpen: boolean
  onClose: () => void
  onChipSelect?: (chipId: string, value: string | number) => void
}

export default function CustomizeChipModal({
  isOpen,
  onClose,
  onChipSelect,
}: CustomizeChipModalProps) {
  const [selectedChips, setSelectedChips] = useState<string[]>(['1']) // Default selection

  const handleChipClick = (chipId: string, value: string | number) => {
    if (chipId.startsWith('customize')) {
      // Handle customize chips - could open another modal or input
      console.log('Customize chip clicked:', chipId)
      return
    }

    // Toggle chip selection with max limit of 5
    setSelectedChips(prev => {
      if (prev.includes(chipId)) {
        // Remove chip if already selected
        return prev.filter(id => id !== chipId)
      } else {
        // Add chip only if under the limit of 5
        if (prev.length < 5) {
          return [...prev, chipId]
        } else {
          // If at limit, replace the first selected chip
          return [...prev.slice(1), chipId]
        }
      }
    })
  }

  const handleConfirm = () => {
    // Get selected chip values
    const selectedValues = selectedChips
      .map(chipId => {
        const chip = chipRows.flat().find(c => c.id === chipId)
        return chip?.value
      })
      .filter(Boolean)

    console.log('Selected chips:', selectedValues)
    onChipSelect?.(
      selectedChips[0],
      chipRows.flat().find(c => c.id === selectedChips[0])?.value || 1
    )
    onClose()
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title="Chip Settings"
      size="lg"
    >
      <div className="flex flex-col  gap-6 pb-6">
        {/* Selection Counter */}
        <div className="flex justify-between items-center px-2">
          <span className="text-white/70 text-sm font-montserrat">
            Selected: {selectedChips.length}/5 chips
          </span>
          {selectedChips.length === 5 && (
            <span className="text-orange-400 text-xs font-montserrat">
              Maximum reached
            </span>
          )}
        </div>

        {/* Chip Rows */}
        {chipRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-between gap-4">
            {row.map(chip => (
              <div key={chip.id} className="flex flex-col items-center gap-2">
                <div
                  onClick={() => handleChipClick(chip.id, chip.value)}
                  className={`cursor-pointer transition-transform hover:scale-105 ${
                    !selectedChips.includes(chip.id) &&
                    selectedChips.length >= 5
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  <PokerChip
                    value={chip.value}
                    color={chip.color}
                    isSelected={selectedChips.includes(chip.id)}
                  />
                </div>
                {/* Radio button indicator */}
                <BlackButton>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 flex items-center justify-center">
                    {selectedChips.includes(chip.id) && (
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                </BlackButton>
              </div>
            ))}
          </div>
        ))}

        {/* Confirm Button */}
        <TDButton
          type="blue"
          onClick={handleConfirm}
          className="w-full h-[41px]"
        >
          Confirm
        </TDButton>
      </div>
    </ModalContainer>
  )
}
