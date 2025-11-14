'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'
import { Button } from '../ui'
import { Wallet } from '../ui/icons'
import { useI18n } from '@/context/I18nProvider'

export const WalletSection: React.FC = () => {
  const router = useRouter()
  const { t } = useI18n()
  const { balances } = useAppSelector(state => state.wallet)
  const usdtBalance = balances.find(b => b.currency?.toUpperCase() === 'USDT')
    ?.amount
  const usdBalance = balances.find(b => b.currency?.toUpperCase() === 'USD')
    ?.amount
  const displayedBalanceRaw =
    typeof usdtBalance === 'number'
      ? usdtBalance
      : typeof usdBalance === 'number'
        ? usdBalance
        : 0
  const displayedBalance = Number.isFinite(displayedBalanceRaw)
    ? displayedBalanceRaw
    : 0

  return (
    <div
      className={
        'flex items-center gap-1 sm:gap-2 bg-gray-700 pl-2 rounded-lg'
      }
    >
      <div className="flex items-center gap-1 sm:gap-2">
        <img
          src="/icons/coin-icon/USDT.svg"
          alt="USDT"
          className="w-5 h-5 sm:w-6 sm:h-6"
        />
        <p className="text-white text-[0.75rem] sm:text-[0.875rem] font-bold">
          {displayedBalance.toFixed(2)}
        </p>
      </div>
      <Button
        onClick={() => router.push('/wallet')}
        variant="Wallet"
        className="!w-[2.0625rem] !h-[2.0625rem] sm:!w-[7.5rem]  md:!w-[9.125rem]"
      >
        <div className="flex items-center gap-1 sm:gap-2">
          <Wallet className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline text-[0.625rem] sm:text-[0.75rem]">
            {t('navigation.wallet')}
          </span>
        </div>
      </Button>
    </div>
  )
}

