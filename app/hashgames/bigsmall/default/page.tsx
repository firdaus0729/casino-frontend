'use client'

import React from 'react'
import DefaultPageLayout from '@/components/hashgames/DefaultPageLayout'

const BigSmallDefault: React.FC = () => {
  const bettingOptions = [
    {
      id: 'small',
      label: 'SMALL',
      color: '#ED1D49',
      progress: 57,
      amount: '10038',
      users: 12,
      odds: '1 : 1.95',
    },
    {
      id: 'big',
      label: 'BIG',
      color: '#FFB636',
      progress: 43,
      amount: '7592',
      users: 11,
      odds: '1 : 1.95',
    },
  ]

  return (
    <DefaultPageLayout gameType="bigsmall" bettingOptions={bettingOptions} />
  )
}

export default BigSmallDefault
