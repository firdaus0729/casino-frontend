'use client'

import { Check } from 'lucide-react'
import ModalContainer from './ModalContainer'

type SortOption = 'view-all' | 'new' | 'popular' | 'a-z' | 'z-a'

interface ChooseModalProps {
  isOpen: boolean
  onClose: () => void
  selectedOption: SortOption
  onOptionChange: (option: SortOption) => void
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'view-all', label: 'View All' },
  { value: 'new', label: 'New' },
  { value: 'popular', label: 'Popular' },
  { value: 'a-z', label: 'A-Z' },
  { value: 'z-a', label: 'Z-A' },
]

export default function ChooseModal({
  isOpen,
  onClose,
  selectedOption,
  onOptionChange,
}: ChooseModalProps) {
  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title="Choose"
      size="sm"
      position="responsive"
      className="lg:relative lg:w-[203px]"
      contentClassName="p-6 max-h-[60vh] lg:max-h-none overflow-y-auto"
    >
      {sortOptions.map(option => (
        <div
          key={option.value}
          className={`flex h-[50px] px-3 pl-2 items-center gap-2 rounded-xl ${selectedOption === option.value ? 'bg-white/[0.04]' : ''}`}
        >
          <div className="flex h-9 px-2 pl-3 items-center gap-2 flex-1 rounded-lg">
            <div className="text-white font-montserrat text-sm font-bold line-clamp-1">
              {option.label}
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div
              onClick={() => onOptionChange(option.value)}
              className="w-6 h-6 flex items-center justify-center"
            >
              {selectedOption === option.value ? (
                <div className="w-6 h-6 rounded-full bg-[#2283F6] border-2 border-[#2283F6] flex items-center justify-center">
                  <Check className="w-3 h-3 text-white stroke-[2]" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-[#55657E]" />
              )}
            </div>
          </div>
        </div>
      ))}
    </ModalContainer>
  )
}
