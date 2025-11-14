import { useState } from 'react'
import { Check } from 'lucide-react'
import Overlay from '../overlays/Overlay'

interface DropdownOption {
  id: string
  label: string
}

interface DropdownSelectionProps {
  options?: DropdownOption[]
  selectedId?: string
  onSelectionChange?: (optionId: string) => void
  isOpen?: boolean
  onClose?: () => void
}

const defaultOptions: DropdownOption[] = [
  { id: 'common-problem', label: 'Common problem' },
  { id: 'responsible-gambling', label: 'Responsible gambling' },
  { id: 'honestly-fairly', label: 'Honestly and fairly' },
  { id: 'terms-of-use', label: 'Terms of use' },
  { id: 'privacy-policy', label: 'Privacy Policy' },
  { id: 'about-us', label: 'About us' },
]

export default function DropdownSelection({
  options = defaultOptions,
  selectedId = 'Responsible gambling',
  onSelectionChange,
  isOpen = false,
  onClose,
}: DropdownSelectionProps) {
  const [selected, setSelected] = useState(selectedId)

  const handleOptionClick = (optionId: string) => {
    setSelected(optionId)
    onSelectionChange?.(optionId)
    onClose?.()
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose?.()
    }
  }

  const handleOverlayClose = () => {
    onClose?.()
  }

  return (
    <>
      <Overlay
        isOpen={isOpen}
        onClose={handleOverlayClose}
        className="fixed inset-0 z-50 flex items-start w-full justify-center p-4 pt-[142px]"
        backdropClassName="bg-black-20"
        contentClassName="w-full p-6 border border-white-33 rounded-xl bg-mirage-8a backdrop-blur-[32px] shadow-xl"
        zIndex={50}
        closeOnBackdropClick={true}
        closeOnEscape={true}
        preventScroll={true}
      >
        <div className="space-y-0">
          {options.map(option => {
            const isSelected = selected === option.label

            return (
              <div
                key={option.label}
                onClick={() => handleOptionClick(option.label)}
                className={`
                  w-full flex group items-center justify-between h-12 px-4 rounded-lg font-montserrat text-sm font-bold transition-all duration-200 hover:bg-white-4/60
                  ${isSelected ? 'bg-white-4 text-white' : 'text-casper'}
                `}
              >
                <span className="flex-1 group-hover:text-white text-left truncate">
                  {option.label}
                </span>

                <div className="flex items-center">
                  {isSelected ? (
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#2283F6"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
                          fill="#2283F6"
                          stroke="#2283F6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 10L11 14L9 12"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Overlay>
    </>
  )
}
