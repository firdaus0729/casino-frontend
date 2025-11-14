'use client'

import React, { useEffect, useMemo, useState, Suspense } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import UserSquareIcon from '@/components/ui/icons/user-square'
import FingerprintIcon from '@/components/ui/icons/fingerprint'
import WalletIcon from '@/components/ui/icons/wallet'
import ChecklistIcon from '@/components/ui/icons/checklist'
import AccountInfo from '@/features/settings/components/AccountInfo'
import Security from '@/features/settings/components/Security'
import WalletAdd from '@/features/settings/components/WalletAdd'
import Barrier from '@/features/settings/components/Barrier'
import ChevronDownIcon from '@/components/ui/icons/chevron-down'
import SettingsTabModal from '@/components/modals/SettingsTabModal'
import MobileSettingsModal from '@/components/modals/MobileSettingsModal'
import useAuthGuard from '@/hooks/useAuthGuard'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchProfile } from '@/store/slices/authSlice'
import { useI18n } from '@/context/I18nProvider'

function SettingsPageContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useI18n()
  
  // Authentication guard and profile fetching
  const { isAuthenticated } = useAuthGuard()
  const dispatch = useAppDispatch()
  const { user, token, isLoading } = useAppSelector(state => state.auth)
  
  // Debug authentication state
  useEffect(() => {
    console.log('Settings page - Auth state:', {
      isAuthenticated,
      hasToken: !!token,
      token: token ? `${token.substring(0, 10)}...` : 'none',
      hasUser: !!user,
      user: user,
      isLoading
    })
  }, [isAuthenticated, token, user, isLoading])
  
  // Fetch user profile when page loads and user is authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      console.log('Settings page: Fetching user profile via API...', {
        isAuthenticated,
        hasToken: !!token,
        hasUser: !!user,
        userData: user
      })
      dispatch(fetchProfile())
    } else {
      console.log('Settings page: Profile fetch conditions not met', {
        isAuthenticated,
        hasToken: !!token,
        hasUser: !!user
      })
    }
  }, [isAuthenticated, token, dispatch]) // Removed user from dependencies to avoid infinite loop

  const tabSlugToName = useMemo(
    () =>
      ({
        accountinfo: t('settings.accountInfo'),
        security: t('settings.security'),
        wallet: t('settings.walletAddress'),
      }) as const,
    [t]
  )

  const tabNameToSlug = useMemo(
    () =>
      ({
        [t('settings.accountInfo')]: 'accountinfo',
        [t('settings.security')]: 'security',
        [t('settings.walletAddress')]: 'wallet',
      }) as const,
    [t]
  )

  const [activeTab, setActiveTab] = useState<string>(t('settings.accountInfo'))

  useEffect(() => {
    const fromQuery = searchParams.get('tab')
    if (fromQuery && tabSlugToName[fromQuery as keyof typeof tabSlugToName]) {
      setActiveTab(tabSlugToName[fromQuery as keyof typeof tabSlugToName])
    }
  }, [searchParams, tabSlugToName])

  useEffect(() => {
    console.log('Active tab changed to:', activeTab)
  }, [activeTab])

  const updateQuery = (nextTabName: string) => {
    const slug = tabNameToSlug[nextTabName as keyof typeof tabNameToSlug]
    if (slug) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('tab', slug)
      router.replace(`${pathname}?${params.toString()}`)
    }
  }

  const handleTabSelect = (tabName: string) => {
    console.log('Tab selected:', tabName)
    setActiveTab(tabName)
    updateQuery(tabName)
  }

  const navigationItems = [
    {
      name: t('settings.accountInfo'),
      icon: <UserSquareIcon className="w-6 h-6" />,
    },
    { name: t('settings.security'), icon: <FingerprintIcon className="w-6 h-6" /> },
    { name: t('settings.walletAddress'), icon: <WalletIcon className="w-6 h-6" /> },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case t('settings.accountInfo'):
        return <AccountInfo />
      case t('settings.security'):
        return <Security />
      case t('settings.walletAddress'):
        return <WalletAdd />
      default:
        return <AccountInfo />
    }
  }

  // Show loading state while profile is being fetched
  if (isLoading && !user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white text-lg">Loading profile...</div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col w-[70%] max-w-[120rem] [@media(max-width:1444px)]:w-[100%] gap-4 lg:gap-16 lg:py-6 mx-auto justify-between pb-20 lg:pb-8">
        {/* Left Sidebar Navigation */}
        <div className="md:bg-[#FFFFFF0A] rounded-lg h-full px-4 py-1 w-full ">
          <div className=" grid-cols-3 hidden md:grid p-3 gap-3">
            {navigationItems.map(item => (
              <div
                key={item.name}
                onClick={() => handleTabSelect(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3  rounded-lg transition-all duration-200 ${
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
          <div className="flex flex-col gap-4 md:hidden ">
            <div
              onClick={() => setIsModalOpen(true)}
              className="flex justify-between items-center text-casper bg-white-4 rounded-[0.5rem] text-[0.875rem] font-bold h-12 px-4 hover:bg-white-8 transition-colors"
            >
              <span>
                <span>{activeTab}</span>
              </span>
              <ChevronDownIcon />
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div
          key={activeTab}
          className="flex-1 lg:bg-white-4 p-4 pt-[1.375rem] rounded-[0.75rem]"
        >
          {renderContent()}
        </div>
      </div>

      {/* Settings Tab Modal - Use mobile-optimized version */}
      <MobileSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeTab={activeTab}
        onTabSelect={handleTabSelect}
      />
    </>
  )
}

// Wrapper component with Suspense boundary
export default function AllianceClient() {
  return (
    <Suspense fallback={<div>Loading settings...</div>}>
      <SettingsPageContent />
    </Suspense>
  )
}
