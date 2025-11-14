'use client'

import React from 'react'
import DefaultPageLayout from '@/components/hashgames/DefaultPageLayout'
import NiuniuBettingSection from '@/components/hashgames/NiuniuBettingSection'

const NiuniuDefault: React.FC = () => {
  const bullRatios = [
    { name: 'Bull1', ratio: '1:1' },
    { name: 'Bull2', ratio: '1:2' },
    { name: 'Bull3', ratio: '1:3' },
    { name: 'Bull4', ratio: '1:4' },
    { name: 'Bull5', ratio: '1:5' },
    { name: 'Bull6', ratio: '1:6' },
    { name: 'Bull7', ratio: '1:7' },
    { name: 'Bull8', ratio: '1:8' },
    { name: 'Bull9', ratio: '1:9' },
    { name: 'BullBull', ratio: '1:10' },
  ]

  const customBettingSection = (
    <NiuniuBettingSection
      balance="10038"
      users={12}
      gameTitle="BULL PLAYER"
      odds="1 : 1.95"
    />
  )

  return (
    <DefaultPageLayout
      gameType="niuniu"
      bettingOptions={[]}
      customBettingSection={customBettingSection}
      showBullRatios={true}
      bullRatios={bullRatios}
    />
  )
}

export default NiuniuDefault
