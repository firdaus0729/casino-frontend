'use client'

import React from 'react'
import DefaultPageLayout from '@/components/hashgames/DefaultPageLayout'

const BankerPlayerDefault: React.FC = () => {
  const bettingOptions = [
    {
      id: 'banker',
      label: 'BANKER',
      color: '#ED1D49',
      progress: 100,
      amount: '7592',
      users: 11,
      odds: '1 : 1.95',
    },
    {
      id: 'tie',
      label: 'TIE',
      color: '#1BB83D',
      progress: 0,
      amount: '7592',
      users: 11,
      odds: '1 : 1.95',
    },
    {
      id: 'player',
      label: 'PLAYER',
      color: '#FFB636',
      progress: 0,
      amount: '7592',
      users: 11,
      odds: '1 : 1.95',
    },
  ]

  return (
    <DefaultPageLayout
      gameType="bankerplayer"
      bettingOptions={bettingOptions}
    />
  )
}

export default BankerPlayerDefault
