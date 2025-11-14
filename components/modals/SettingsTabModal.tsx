'use client'

import React from 'react'
import ModalContainer from './ModalContainer'
import UserSquareIcon from '@/components/ui/icons/user-square'
import FingerprintIcon from '@/components/ui/icons/fingerprint'
import WalletIcon from '@/components/ui/icons/wallet'
import { useI18n } from '../../context/I18nProvider'

interface SettingsTab {
  id: string
  name: string
  icon: React.ReactNode
}

interface SettingsTabModalProps {
  isOpen: boolean
  onClose: () => void
  activeTab: string
  onTabSelect: (tabName: string) => void
}

export default function SettingsTabModal({
  isOpen,
  onClose,
  activeTab,
  onTabSelect,
}: SettingsTabModalProps) {
  const { t } = useI18n()

  const settingsTabs: SettingsTab[] = [
    {
      id: 'accountinfo',
      name: t('settings.accountInfo'),
      icon: <UserSquareIcon className="w-6 h-6" />,
    },
    {
      id: 'security',
      name: t('settings.security'),
      icon: <FingerprintIcon className="w-6 h-6" />,
    },
    {
      id: 'wallet',
      name: t('settings.walletAddress'),
      icon: <WalletIcon className="w-6 h-6" />,
    },
  ]
  const handleTabSelect = (tabName: string) => {
    console.log('Modal: Tab selected:', tabName)
    onTabSelect(tabName)
    onClose()
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title="Select Setting"
      size="md"
      position="responsive"
      showHeader={true}
      showCloseButton={true}
    >
      <div className="space-y-2">
        {settingsTabs.map(tab => {
          const isSelected = activeTab === tab.name

          return (
            <div
              key={tab.id}
              onClick={() => handleTabSelect(tab.name)}
              className={`
                w-full flex items-center gap-4 px-4 py-4 rounded-lg font-montserrat text-sm font-bold transition-all duration-200 hover:bg-white-4/60
                ${isSelected ? 'bg-white-4 text-white' : 'text-casper hover:text-white'}
              `}
            >
              <div className="flex-shrink-0">{tab.icon}</div>

              <span className="flex-1 text-left">
                <span>{tab.name}</span>
              </span>

              <div className="flex items-center">
                {isSelected ? (
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#2283F6"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
                        fill="#2283F6"
                        stroke="#2283F6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 10L11 14L9 12"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </ModalContainer>
  )
}
