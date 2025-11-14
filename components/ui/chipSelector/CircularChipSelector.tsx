import { useState, useEffect } from 'react'
import { PokerChip } from './PokerChip'
import CustomizeChipModal from '@/components/modals/CustomizeChipModal'

interface ChipData {
  id: string
  value: string | number
  color: 'blue' | 'purple' | 'green' | 'navy' | 'red' | 'orange'
}

const chips: ChipData[] = [
  { id: '1', value: 1, color: 'blue' },
  { id: '5', value: 5, color: 'purple' },
  { id: '10', value: 10, color: 'green' },
  { id: '50', value: 50, color: 'navy' },
  { id: '100', value: 100, color: 'red' },
  { id: 'customize', value: 'Customize', color: 'orange' },
]

interface CircularChipSelectorProps {
  onChipSelect?: (chipId: string, value?: string | number) => void
  selectedChip?: string
  onClose?: () => void
}

export function CircularChipSelector({
  onChipSelect,
  selectedChip = '',
  onClose,
}: CircularChipSelectorProps) {
  const [localSelectedChip, setLocalSelectedChip] = useState<string>('')
  const [isAnimating, setIsAnimating] = useState<boolean>(true)
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] =
    useState<boolean>(false)

  console.log('CircularChipSelector rendered')

  useEffect(() => {
    // Start animation when component mounts
    setIsAnimating(true)

    // Stop animation after a short delay to allow chips to spread out
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 100) // Quick animation duration for immediate spread

    return () => clearTimeout(timer)
  }, [])

  const handleChipClick = (chipId: string) => {
    console.log('Chip clicked in circular view:', chipId)

    if (chipId === 'customize') {
      // Open customize modal instead of selecting the chip
      setIsCustomizeModalOpen(true)
      return
    }

    setLocalSelectedChip(chipId)
    onChipSelect?.(chipId)
  }

  const getChipPosition = (index: number) => {
    // Position chips to match the Figma design exactly - 6 chips in a circle
    // These are relative positions within the 251x152 container
    const positions = [
      { left: 0, top: 116 }, // chip "1" (bottom left)
      { left: 11, top: 46 }, // chip "5" (left)
      { left: 65, top: 0 }, // chip "10" (top left)
      { left: 136, top: 0 }, // chip "50" (top right)
      { left: 190, top: 45 }, // chip "100" (right)
      { left: 203, top: 116 }, // chip "customize" (bottom right)
    ]

    return positions[index] || { left: 0, top: 0 }
  }

  const getCenterPosition = () => {
    // Center position within the 251x152 container
    return { left: 125.5, top: 76 } // Center of the container
  }

  const handleCustomizeSubmit = (chipId: string, value: string | number) => {
    console.log('Custom chip selected:', chipId, value)
    onChipSelect?.(chipId, value)
    setIsCustomizeModalOpen(false)
  }

  const handleCloseCustomizeModal = () => {
    setIsCustomizeModalOpen(false)
  }

  return (
    <div
      className="absolute  inset-0 flex justify-center items-center z-50 bg-black/[0.04] bg-opacity-20"
      onClick={onClose}
    >
      <div
        className="relative -top-11  flex justify-center items-center flex-shrink-0"
        style={{
          width: '402px',
          height: '402px',
          padding: '125px 75.5px',
          background:
            'radial-gradient(50% 50% at 50% 50%, #000000 0%, rgba(0, 0, 0, 0.00) 100%)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative w-[251px] h-[152px] flex-shrink-0">
          {/* Center chip "1" */}

          {/* Surrounding chips */}
          {chips.map((chip, index) => {
            const finalPosition = getChipPosition(index)
            const centerPosition = getCenterPosition()
            const currentPosition = isAnimating ? centerPosition : finalPosition

            // Stagger the animation delay for each chip - minimal delay for quick spread
            const animationDelay = isAnimating ? `${index * 30}ms` : '0ms'

            // Add slight rotation variation for each chip
            const rotationVariation = isAnimating
              ? index % 2 === 0
                ? 5
                : -3
              : 0

            return (
              <div
                key={chip.id}
                className="absolute transition-all duration-500 ease-out"
                style={{
                  left: `${currentPosition.left}px`,
                  top: `${currentPosition.top}px`,
                  transform: isAnimating
                    ? `scale(0.8) translateY(10px) rotate(${rotationVariation}deg)`
                    : 'scale(1) translateY(0px) rotate(0deg)',
                  opacity: isAnimating ? 0.7 : 1,
                  transitionDelay: animationDelay,
                  transitionTimingFunction:
                    'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  filter: isAnimating
                    ? 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
                    : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
                }}
              >
                <PokerChip
                  value={chip.value}
                  color={chip.color}
                  isSelected={localSelectedChip === chip.id}
                  onClick={() => handleChipClick(chip.id)}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Customize Chip Modal */}
      <CustomizeChipModal
        isOpen={isCustomizeModalOpen}
        onClose={handleCloseCustomizeModal}
        onChipSelect={handleCustomizeSubmit}
      />
    </div>
  )
}
