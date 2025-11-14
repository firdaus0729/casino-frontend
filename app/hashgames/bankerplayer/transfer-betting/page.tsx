'use client'

import TransferBettingLayout from '@/components/hashgames/TransferBettingLayout'
import React from 'react'
import useAuthGuard from '@/hooks/useAuthGuard'

const TransferBettingPage: React.FC = () => {
  const { isAuthenticated } = useAuthGuard()
  return <TransferBettingLayout />
}
export default TransferBettingPage
