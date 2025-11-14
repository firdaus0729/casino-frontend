'use client'

import React from 'react'

export const BettingRecordSection: React.FC = () => {
  return (
    <div
      className={
        'bg-[#111923] rounded-lg p-6 border ' +
        'border-[rgba(12,96,255,0.1)] shadow-xl ' +
        '[@media(max-width:768px)]:hidden'
      }
    >
      <div className="flex justify-between items-center mb-4">
        <h2
          className={
            'text-[18px] font-bold text-write flex items-center gap-2'
          }
        >
          Betting record
        </h2>
        <div
          className={
            'text-[#0C60FF] text-[14px] font-bold ' +
            'hover:text-[#64B5F6] transition-colors'
          }
        >
          More
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 items-center p-2 px-8">
        <span className="text-[#55657E] font-bold text-[12px] opacity-80">
          Currency
        </span>
        <span className="text-[#55657E] font-bold text-[12px] opacity-80">
          Bets
        </span>
        <span className="text-[#55657E] font-bold text-[12px] opacity-80">
          Bets Amount
        </span>
        <span
          className={
            'text-[#55657E] font-bold text-[12px] opacity-80 text-right'
          }
        >
          Today's win or loss...
        </span>
      </div>
      <div className="space-y-3">
        {/* USDT Row */}
        <div
          className={
            'bg-[#1C2532] rounded-lg p-4 px-8 ' +
            'border border-[rgba(255,255,255,0.1)] shadow-md'
          }
        >
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="flex items-center gap-1">
              <img
                src="/icons/coin-icon/USDT.svg"
                alt="usdt"
                className="w-5 h-5"
              />
              <span className="text-white font-bold text-[12px] mt-1">
                USDT
              </span>
            </div>
            <div className="text-white">0</div>
            <div className="flex items-center gap-1">
              <img
                src="/icons/coin-icon/USDT.svg"
                alt="tron"
                className="w-5 h-5"
              />
              <span className="text-white">4.77000000</span>
            </div>
            <div
              className={
                'flex items-center gap-1 text-[#ED1D49] ml-6 justify-end'
              }
            >
              <span>0</span>
              <img
                src="/icons/coin-icon/USDT.svg"
                alt="tron"
                className="w-5 h-5"
              />
            </div>
          </div>
        </div>

        {/* TRX Row */}
        <div
          className={
            'bg-[#1C2532] rounded-lg p-4 px-8 ' +
            'border border-[rgba(255,255,255,0.1)] shadow-md'
          }
        >
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="flex items-center gap-1">
              <img
                src="/icons/coin-icon/TRX.svg"
                alt="tron"
                className="w-5 h-5"
              />
              <span className="text-white font-bold text-[12px] mt-1">
                TRX
              </span>
            </div>
            <div className="text-white">0</div>
            <div className="flex items-center gap-2">
              <img
                src="/icons/coin-icon/BTC.svg"
                alt="tron"
                className="w-5 h-5"
              />
              <span className="text-white">7.60300000</span>
            </div>
            <div
              className={
                'flex items-center gap-1 text-[#ED1D49] justify-end'
              }
            >
              <span>0.00</span>
              <img
                src="/icons/coin-icon/TRX.svg"
                alt="tron"
                className="w-5 h-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

