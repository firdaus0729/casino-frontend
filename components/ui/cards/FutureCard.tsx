'use client'

// this is cryptocurrency card

import React from 'react'

export interface TypeFourProps {
  symbol: string
  name: string
  price: string
  change: string
  isPositive: boolean
}

const FutureCard: React.FC<TypeFourProps> = ({
  symbol,
  name,
  price,
  change,
  isPositive,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-2 border-t-2 border-[#FFFFFF29]">
      <div className="flex items-center space-x-2 mb-3">
        <img
          src={`/icons/coin-icon/${symbol}.svg`}
          className="w-10 h-10"
          alt={`${symbol} icon`}
        />
        <div>
          <div className="text-white font-semibold">{symbol}</div>
          {/* <div className="text-gray-400 text-xs">{name}</div> */}
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-white font-medium">{price}</div>
        <div
          className={`text-sm font-medium ${
            isPositive ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {isPositive ? '+' : ''}
          {change}
        </div>
      </div>
    </div>
  )
}

export default FutureCard
