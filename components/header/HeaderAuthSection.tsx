'use client'

import React from 'react'
import BlackButton from '../ui/Button/BlackButton'
import TDButton from '../ui/Button/TDButton'
import { WalletSection } from './HeaderWalletSection'
import { useI18n } from '@/context/I18nProvider'

interface HeaderAuthSectionProps {
  openAuthModalWithTab: (isLogin: boolean) => void
  isLoggedIn: boolean
}

export const AuthSection: React.FC<HeaderAuthSectionProps> = ({
  openAuthModalWithTab,
  isLoggedIn,
}) => {
  const { t } = useI18n()

  return (
    <div className="flex items-center gap-2">
      {isLoggedIn ? (
        <>
          <WalletSection />
        </>
      ) : (
        <>
          <div className="relative">
            <BlackButton
              className="w-[4.4375rem]"
              onClick={() => openAuthModalWithTab(true)}
            >
              <span className="text-white font-medium text-xs">
                {t('auth.login')}
              </span>
            </BlackButton>
          </div>
          <TDButton
            type="red"
            className="w-[5.3125rem] h-[2.0625rem] rounded-lg"
            onClick={() => openAuthModalWithTab(false)}
          >
            <span className="text-[0.75rem]">{t('auth.register')}</span>
          </TDButton>
        </>
      )}
    </div>
  )
}

