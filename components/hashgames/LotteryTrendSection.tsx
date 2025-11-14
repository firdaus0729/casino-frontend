'use client'

import React from 'react'
import { GameBoard } from './GameBoard'
import { board } from './mockboard'
import { cn } from '@/lib/utils'

interface LotteryTrendSectionProps {
  activeTab: 'Active' | 'Default'
  setActiveTab: (tab: 'Active' | 'Default') => void
}

export const LotteryTrendSection: React.FC<LotteryTrendSectionProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const isActive = activeTab === 'Active'

  const TAB_BUTTON_BASE_CLASSES = [
    'px-8 py-1.5 rounded-lg font-bold transition-all duration-200',
    'text-[14px] border-none flex items-center gap-2',
  ].join(' ')

  const ACTIVE_TAB_CLASSES =
    'bg-color-[#FFFFFF] text-white shadow-lg'

  const INACTIVE_TAB_CLASSES = [
    'bg-[rgba(255,255,255,0.13)] text-gray-300',
    'hover:bg-[rgba(255,255,255,0.08)]',
    'border border-[rgba(255,255,255,0.1)]',
  ].join(' ')

  return (
    <div
      className={
        'bg-[#111923] rounded-lg py-4 px-6 mb-6 ' +
        'border border-[rgba(255,255,255,0.1)] shadow-xl ' +
        '[@media(max-width:768px)]:hidden'
      }
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="flex justify-between items-center mb-4 gap-4">
            <h2
              className={
                'text-[14px] font-bold text-white flex items-center gap-2'
              }
            >
              Lottery trend
            </h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={
                    'w-4 h-4 bg-red-500 rounded-full ' +
                    'flex items-center justify-center shadow-lg'
                  }
                >
                  <span className="text-white text-xs font-bold">O</span>
                </div>
                <span className="text-sm text-white">91</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={
                    'w-4 h-4 bg-yellow-500 rounded-full ' +
                    'flex items-center justify-center shadow-lg'
                  }
                >
                  <span className="text-black text-xs font-bold">E</span>
                </div>
                <span className="text-sm text-white">112</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center mb-4 mt-2 rounded-lg">
          <div className="flex bg-[#FFFFFF0A] rounded-lg p-1">
            <div
              onClick={() => setActiveTab('Default')}
              className={cn(
                TAB_BUTTON_BASE_CLASSES,
                isActive ? INACTIVE_TAB_CLASSES : ACTIVE_TAB_CLASSES
              )}
            >
              Block Trend
            </div>
            <div
              onClick={() => setActiveTab('Active')}
              className={cn(
                TAB_BUTTON_BASE_CLASSES,
                !isActive ? INACTIVE_TAB_CLASSES : ACTIVE_TAB_CLASSES
              )}
            >
              My Trend
            </div>
          </div>
        </div>
      </div>
      <GameBoard board={board} />
      <div
        className={
          'flex items-center gap-2 text-sm text-gray-300 ' +
          'bg-[#FFFFFF0A] rounded-lg p-4'
        }
      >
        <img src="/icons/Vector.svg" alt="info" className="w-5 h-5" />
        <p className="opacity-80">
          The road map is automatically updated every 3 seconds. This road order
          rule is composed of the TRON real-time block lottery results.
        </p>
      </div>
    </div>
  )
}

