'use client'

import React from 'react'
import Link from 'next/link'

export interface CardGameCardProps {
  id: string
  title: string
  subtitle: string
  cardColor: 'white' | 'red' | 'blue'
  symbolColor: 'black' | 'white'
  link: string
}

const CardGameCard: React.FC<CardGameCardProps> = ({
  id,
  title,
  subtitle,
  cardColor,
  symbolColor,
  link,
}) => {
  const getCardColorClasses = (color: string) => {
    switch (color) {
      case 'white':
        return 'bg-white'
      case 'red':
        return 'bg-red-500'
      case 'blue':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getSymbolColorClasses = (color: string) => {
    switch (color) {
      case 'black':
        return 'text-black'
      case 'white':
        return 'text-white'
      default:
        return 'text-gray-800'
    }
  }

  return (
    <Link href={link} className="block">
      <div
        className={`${getCardColorClasses(cardColor)} rounded-lg p-4 h-24 flex flex-col justify-center items-center hover:scale-105 transition-transform duration-200 cursor-pointer`}
      >
        {/* Card Icon */}
        <div className="flex items-center justify-center mb-2">
          <div className="flex">
            <div
              className={`w-6 h-8 ${getCardColorClasses(cardColor)} border-2 border-gray-300 rounded-sm flex items-center justify-center mr-1`}
            >
              <span
                className={`text-lg font-bold ${getSymbolColorClasses(symbolColor)}`}
              >
                ♠
              </span>
            </div>
            <div
              className={`w-6 h-8 ${getCardColorClasses(cardColor)} border-2 border-gray-300 rounded-sm flex items-center justify-center`}
            >
              <span
                className={`text-lg font-bold ${getSymbolColorClasses(symbolColor)}`}
              >
                ♠
              </span>
            </div>
          </div>
        </div>
        <div className="text-sm font-bold text-center">{title}</div>
        <div className="text-xs text-center leading-tight">{subtitle}</div>
      </div>
    </Link>
  )
}

export default CardGameCard
