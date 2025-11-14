'use client'

import React from 'react'
import { User } from 'lucide-react'

interface NiuniuBettingSectionProps {
  balance: string
  users: number
  gameTitle: string
  odds: string
}

const NiuniuBettingSection: React.FC<NiuniuBettingSectionProps> = ({
  balance,
  users,
  gameTitle,
  odds,
}) => {
  return (
    <div className="w-full">
      <div className="bg-white-4 rounded-xl p-4 md:p-8 space-y-4">
        {/* Main Content */}
        <div className="px-4 space-y-4">
          {/* Balance and User Info */}
          <div className="space-y-2">
            <div className="text-left">
              <span className="text-casper text-base font-montserrat font-bold">
                $
              </span>
              <span className="text-white text-base font-montserrat font-bold">
                {balance}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  d="M8 1.83334C7.11595 1.83334 6.2681 2.18453 5.64298 2.80965C5.01786 3.43478 4.66667 4.28262 4.66667 5.16668C4.66667 6.05073 5.01786 6.89858 5.64298 7.5237C6.2681 8.14882 7.11595 8.50001 8 8.50001C8.88406 8.50001 9.7319 8.14882 10.357 7.5237C10.9821 6.89858 11.3333 6.05073 11.3333 5.16668C11.3333 4.28262 10.9821 3.43478 10.357 2.80965C9.7319 2.18453 8.88406 1.83334 8 1.83334ZM2.66667 15.1667H13.3333C13.7 15.1667 14 14.8667 14 14.5V13.8333C14 11.26 11.9067 9.16668 9.33333 9.16668H6.66667C4.09333 9.16668 2 11.26 2 13.8333V14.5C2 14.8667 2.3 15.1667 2.66667 15.1667Z"
                  fill="#A7B5CA"
                />
              </svg>
              <span className="text-casper text-sm font-montserrat font-bold leading-none">
                {users}
              </span>
            </div>
          </div>
        </div>

        {/* $0 Button */}
        <div className="flex justify-center">
          <div className="h-9 px-4 bg-mirage border border-white-8 rounded-lg shadow-[0_1px_0_0_rgba(255,255,255,0.16)_inset] backdrop-blur-[32px] flex items-center justify-center">
            <span className="text-white text-sm font-montserrat font-bold">
              $0
            </span>
          </div>
        </div>

        {/* Game Title */}
        <div className="flex justify-center items-center">
          <h1 className="text-yellow-orange text-2xl font-montserrat font-bold">
            {gameTitle}
          </h1>
        </div>

        {/* Odds Button */}
        <div className="flex justify-center">
          <div className="h-9 px-4 bg-mirage border border-white-8 rounded-lg shadow-[0_1px_0_0_rgba(255,255,255,0.16)_inset] backdrop-blur-[32px] flex items-center justify-center">
            <span className="text-white text-sm font-montserrat font-bold">
              {odds}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NiuniuBettingSection
