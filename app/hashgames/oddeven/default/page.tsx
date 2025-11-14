'use client'

import React, { useState, useEffect } from 'react'
import DefaultPageLayout from '@/components/hashgames/DefaultPageLayout'
import { getCurrentRound } from '@/lib/api'

const OddEvenDefault: React.FC = () => {
  const [roundInfo, setRoundInfo] = useState<{
    round: number
    betClosesAtBlock: number
    timestamp: number
  } | null>(null)
  const [currentBlock, setCurrentBlock] = useState<number | null>(null)

  useEffect(() => {
    const fetchRoundInfo = async () => {
      try {
        const info = await getCurrentRound()
        setRoundInfo(info)
        setCurrentBlock(info.round - 1)
      } catch (err) {
        console.error('Error fetching round info:', err)
      }
    }

    fetchRoundInfo()
    // Poll every 3 seconds for new round info
    const interval = setInterval(fetchRoundInfo, 3000)
    return () => clearInterval(interval)
  }, [])

  const bettingOptions = [
    {
      id: 'odd',
      label: 'ODD',
      color: '#ED1D49',
      progress: 50,
      amount: '0',
      users: 0,
      odds: '1 : 1.95',
    },
    {
      id: 'even',
      label: 'EVEN',
      color: '#FFB636',
      progress: 50,
      amount: '0',
      users: 0,
      odds: '1 : 1.95',
    },
  ]

  return (
    <DefaultPageLayout
      gameType="oddeven"
      bettingOptions={bettingOptions}
      customBettingSection={
        <div className="flex p-4 md:p-8 items-start gap-4 w-full rounded-xl bg-white/[0.04]">
          {/* Display current and next block numbers if available */}
          {roundInfo && (
            <div className="w-full text-center text-white/60 text-sm mb-4">
              Current Block: {currentBlock || 'Loading...'} | Next Block: {roundInfo.round}
            </div>
          )}
        </div>
      }
    />
  )
}

export default OddEvenDefault
