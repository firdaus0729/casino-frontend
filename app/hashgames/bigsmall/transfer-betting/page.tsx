'use client'

import React from 'react'
import TransferBettingLayout from '@/components/hashgames/TransferBettingLayout'
import useAuthGuard from '@/hooks/useAuthGuard'

const TransferBettingPage: React.FC = () => {
  const { isAuthenticated } = useAuthGuard()
  return <TransferBettingLayout />
}
export default TransferBettingPage
