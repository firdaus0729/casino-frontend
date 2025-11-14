'use client'

import React, { useEffect, useMemo, useState, Suspense } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Deposit from '@/features/wallet/components/Deposit'
import Withdraw from '@/features/wallet/components/Withdraw'
import Swap from '@/features/wallet/components/Swap'
import Transaction from '@/features/wallet/components/Transaction'
import GameHistory from '@/features/wallet/components/GameHistory'
import DataStatistics from '@/features/wallet/components/DataStatistics'
import CurrencyNotesIcon from '@/components/ui/icons/currency-notes'
import PrintDollarIcon from '@/components/ui/icons/print-dollar'
import SwapDiagonalIcon from '@/components/ui/icons/swap-diagonal'
import ReceiptIcon from '@/components/ui/icons/receipt'
import MedalStarAlt2Icon from '@/components/ui/icons/medal-star-alt-2'
import DoughnutChartIcon from '@/components/ui/icons/doughnut-chart'
import WalletBottomBar from '@/features/wallet/components/WalletBottomBar'
import { useI18n } from '@/context/I18nProvider'
import { useAppSelector } from '@/store/hooks'
import { useSidebar } from '@/context/SidebarProvider'
import useAuthGuard from '@/hooks/useAuthGuard'

function WalletPageContent() {
  const { t } = useI18n()
  const { isAuthenticated } = useAuthGuard()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const tabSlugToName = useMemo(
    () =>
      ({
        deposit: 'Deposit',
        withdraw: 'Withdraw',
        swap: 'Swap',
        transaction: 'Transaction',
        gamehistory: 'GameHistory',
        datastatistics: 'DataStatistics',
      }) as const,
    []
  )

  const tabNameToSlug = useMemo(
    () =>
      ({
        Deposit: 'deposit',
        Withdraw: 'withdraw',
        Swap: 'swap',
        Transaction: 'transaction',
        GameHistory: 'gamehistory',
        DataStatistics: 'datastatistics',
      }) as const,
    []
  )

  const [activeTab, setActiveTab] = useState<string>('Deposit')

  useEffect(() => {
    const fromQuery = searchParams.get('tab')
    if (fromQuery && tabSlugToName[fromQuery as keyof typeof tabSlugToName]) {
      setActiveTab(tabSlugToName[fromQuery as keyof typeof tabSlugToName])
    }
  }, [searchParams, tabSlugToName])

  const updateQuery = (nextTabName: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', tabNameToSlug[nextTabName as keyof typeof tabNameToSlug])
    router.replace(`${pathname}?${params.toString()}`)
  }

  const navigationItems = [
    { name: 'Deposit', icon: <CurrencyNotesIcon className="w-6 h-6" /> },
    { name: 'Withdraw', icon: <PrintDollarIcon className="w-6 h-6" /> },
    { name: 'Swap', icon: <SwapDiagonalIcon className="w-6 h-6" /> },
    { name: 'Transaction', icon: <ReceiptIcon className="w-6 h-6" /> },
    {
      name: 'GameHistory',
      icon: <MedalStarAlt2Icon className="w-6 h-6" />,
    },
    {
      name: 'DataStatistics',
      icon: <DoughnutChartIcon className="w-6 h-6" />,
    },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'Deposit':
        return <Deposit />
      case 'Withdraw':
        return <Withdraw />
      case 'Swap':
        return <Swap />
      case 'Transaction':
        return <Transaction />
      case 'GameHistory':
        return <GameHistory />
      case 'DataStatistics':
        return <DataStatistics />
      default:
        return <Deposit />
    }
  }

  return (
    <>
      <div className="flex flex-col w-full justify-between max-w-7xl p-2 gap-8 lg:py-6 mx-auto pb-4 lg:pb-8">
        {/* Left Sidebar Navigation */}
        <div className="bg-[#FFFFFF0A] rounded-lg h-full [@media(max-width:1024px)]:hidden w-full ">
          <div className="flex p-3 gap-1 justify-between">
            {navigationItems.map(item => (
              <div
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name)
                  console.log("activeTab================>",item.name)
                  updateQuery(item.name)
                }}
                className={`w-fit flex items-center gap-1 p-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === item.name
                    ? 'bg-[#FFFFFF14] text-white shadow-lg'
                    : 'text-gray-300 hover:bg-[rgba(255,255,255,0.08)]'
                }`}
              >
                {item.icon}
                <span className="font-bold text-[0.875rem]">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 lg:bg-white-4 p-2 rounded-[12px]">
          {renderContent()}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <WalletBottomBar />
    </>
  )
}

// Wrapper component with Suspense boundary
export default function WalletPage() {
  const { t } = useI18n()

  return (
    <Suspense fallback={<div>{t('app.loading')}</div>}>
      <WalletPageContent />
    </Suspense>
  )
}
