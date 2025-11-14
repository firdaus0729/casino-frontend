import { useState } from 'react'
import { PokerChip } from './PokerChip'
import { cn } from '@/lib/utils'

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

export function ChipSelector() {
  const [selectedChip, setSelectedChip] = useState<string>('1')

  return (
    <div className="flex justify-center items-center w-full">
      <div
        className="flex items-end gap-4 p-8 w-full rounded-xl"
        style={{ background: 'rgba(255, 255, 255, 0.04)' }}
      >
        {/* Undo button section */}
        <div className="flex flex-col justify-center items-end gap-1 flex-1 min-w-0 px-4">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-montserrat font-bold text-xs text-chip-casper"
            style={{ background: 'rgba(0, 0, 0, 0.54)' }}
          >
            Undo
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 10H15C17.21 10 19 11.79 19 14C19 16.21 17.21 18 15 18H12V20H15C18.31 20 21 17.31 21 14C21 10.69 18.31 8 15 8H9V4L3 9L9 14V10Z"
                fill="#A7B5CA"
              />
            </svg>
          </div>
        </div>

        {/* Chips section */}
        <div className="flex items-center gap-4">
          {chips.map(chip => (
            <PokerChip
              key={chip.id}
              value={chip.value}
              color={chip.color}
              isSelected={selectedChip === chip.id}
              onClick={() => setSelectedChip(chip.id)}
            />
          ))}
        </div>

        {/* Confirm button section */}
        <div className="flex flex-col justify-center items-start gap-1 flex-1 min-w-0 px-4">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-montserrat font-bold text-xs text-chip-casper"
            style={{ background: 'rgba(0, 0, 0, 0.54)' }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.002 7.06018L9.36426 17.6979C9.25413 17.8023 9.12642 17.8502 8.99902 17.8502C8.86008 17.8502 8.74088 17.8049 8.64258 17.7067L3.99609 13.0602L4.69922 12.3571L8.78223 16.4401H9.21582L19.2988 6.35706L20.002 7.06018Z"
                fill="white"
                stroke="#A7B5CA"
              />
            </svg>
            Confirm
          </div>
        </div>
      </div>
    </div>
  )
}
