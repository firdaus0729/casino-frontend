'use client'

import React from 'react'
import Link from 'next/link'

export interface CoinGameCardProps {
  id: string
  title: string
  subtitle: string
  coinColor: 'gold' | 'silver'
  link: string
}

const CoinGameCard: React.FC<CoinGameCardProps> = ({
  id,
  title,
  subtitle,
  coinColor,
  link,
}) => {
  const getCoinColorClasses = (color: string) => {
    switch (color) {
      case 'gold':
        return 'bg-yellow-400 text-yellow-800'
      case 'silver':
        return 'bg-gray-300 text-gray-700'
      default:
        return 'bg-gray-500 text-gray-800'
    }
  }

  return (
    <Link href={link} className="block">
      <div
        className={`${getCoinColorClasses(coinColor)} rounded-lg p-4 h-24 flex flex-col justify-center items-center hover:scale-105 transition-transform duration-200 cursor-pointer`}
      >
        {/* Coin Icon with Bull */}
        <div className="flex items-center justify-center mb-2">
          <div
            className={`w-8 h-8 ${getCoinColorClasses(coinColor)} rounded-full flex items-center justify-center border-2 border-gray-400`}
          >
            <span className="text-lg">🐂</span>
          </div>
        </div>
        <div className="text-sm font-bold text-center">{title}</div>
        <div className="text-xs text-center leading-tight">{subtitle}</div>
      </div>
    </Link>
  )
}

export default CoinGameCard
