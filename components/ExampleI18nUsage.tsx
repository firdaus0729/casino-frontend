'use client'

import React from 'react'
import { useT } from '@/context/I18nProvider'

export default function ExampleI18nUsage() {
  const t = useT()

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">{t('app.title')}</h2>

      <div className="space-y-2">
        <p>
          <strong>Navigation:</strong>
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>{t('navigation.lobby')}</li>
          <li>{t('navigation.games')}</li>
          <li>{t('navigation.wallet')}</li>
          <li>{t('navigation.settings')}</li>
        </ul>

        <p>
          <strong>Games:</strong>
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>{t('games.play')}</li>
          <li>{t('games.bet')}</li>
          <li>{t('games.balance')}</li>
        </ul>

        <p>
          <strong>Messages with parameters:</strong>
        </p>
        <p>{t('messages.jackpotWon', { amount: '$1,000,000' })}</p>

        <p>
          <strong>Status:</strong>
        </p>
        <p>
          {t('status.active')} - {t('status.completed')}
        </p>
      </div>
    </div>
  )
}
