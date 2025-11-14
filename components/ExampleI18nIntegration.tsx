'use client'

import React from 'react'
import { useT } from '@/context/I18nProvider'
import { useLanguage } from '@/context/LanguageProvider'

export default function ExampleI18nIntegration() {
  const t = useT()
  const { currentLanguage } = useLanguage()

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {t('app.title')} - {t('settings.language')}
        </h2>
        <div className="text-sm text-gray-600">
          {t('settings.language')}: {currentLanguage.name}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-blue-600">
            {t('navigation.games')}
          </h3>
          <div className="space-y-2">
            <div className="w-full text-left px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              {t('games.slots')}
            </div>
            <div className="w-full text-left px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              {t('games.live')}
            </div>
            <div className="w-full text-left px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              {t('games.table')}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-600">
            {t('wallet.title')}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">{t('wallet.balance')}:</span>
              <span className="font-bold text-green-600">$1,234.56</span>
            </div>
            <div className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              {t('wallet.deposit')}
            </div>
            <div className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              {t('wallet.withdraw')}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-purple-600">
            {t('promotions.title')}
          </h3>
          <div className="space-y-2">
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{t('promotions.welcome')}</span>
                <span className="text-sm text-purple-600">
                  {t('status.active')}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {t('messages.bonusClaimed')}
              </p>
              <div className="w-full px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors">
                {t('promotions.claim')}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-orange-600">
            {t('help.title')}
          </h3>
          <div className="space-y-2">
            <div className="w-full text-left px-4 py-2 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              {t('help.faq')}
            </div>
            <div className="w-full text-left px-4 py-2 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              {t('help.liveChat')}
            </div>
            <div className="w-full text-left px-4 py-2 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              {t('help.contact')}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">{t('messages.info')}</h4>
        <p className="text-sm text-gray-600">
          {t('messages.jackpotWon', { amount: '$1,000,000' })}
        </p>
      </div>
    </div>
  )
}
