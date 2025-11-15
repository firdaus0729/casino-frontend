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
      
    </div>
  )
}
