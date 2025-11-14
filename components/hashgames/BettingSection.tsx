'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface BettingSectionProps {
  isMobile?: boolean
}

export const BettingSection: React.FC<BettingSectionProps> = ({
  isMobile = false,
}) => {
  if (isMobile) {
    return (
      <div
        className={
          'bg-[#111923] rounded-lg p-3 mb-6 border ' +
          'border-[rgba(12,96,255,0.1)] shadow-xl ' +
          '[@media(max-width:768px)]:block hidden'
        }
      >
        <h2
          className={
            'text-lg font-bold mb-4 text-[#FFFFFF] text-[14px] ' +
            'flex items-center gap-2'
          }
        >
          Bid address
          <span className="font-bold text-[12px] opacity-80">
            Use a decentralized wallet
          </span>
        </h2>
        <div
          className={
            'flex opacity-80 justify-between bg-[#2a3546] p-3 ' +
            'border rounded-lg border-[rgba(255,255,255,0.1)] mb-4'
          }
        >
          <div className="flex items-center">
            <span className="text-gray-300 text-[12px] font-bold">
              <span className="text-[#2283F6]">TXS3</span>
              <span className="text-[#FFFFFF]">
                PfAUShemKkoBWRUFsUkGBSrZ
              </span>
              <span className="text-[#2283F6]">gh..</span>
            </span>
          </div>
          <img src="/icons/copy.svg" alt="copy" className="w-6 h-6" />
        </div>
        <div className="relative mb-4">
          <div
            className={
              'absolute inset-0 bg-[#003a8a] rounded-[12px] translate-y-1'
            }
          ></div>
          <div
            className={
              'w-full relative rounded-[12px] ' +
              'bg-[linear-gradient(to_top,#0C60FF_70%,#2C9FFA_100%)] ' +
              'text-white px-8 py-3 text-[14px] font-bold ' +
              'hover:from-[#0a56e6] hover:to-[#2590e6] ' +
              'transition-all duration-200 transform ' +
              'hover:-translate-y-0.5 active:translate-y-0 shadow-lg'
            }
          >
            Activate wallet
          </div>
        </div>
        <div
          className={
            'bg-[#FFFFFF0A] rounded-lg p-3 mb-6 border ' +
            'border-[rgba(12,96,255,0.1)] shadow-xl'
          }
        >
          <p className="text-white text-[14px] font-bold mb-2">
            Odds:<span className="text-[#2283F6]">1:1.95</span>
          </p>
          <p className="text-white text-[14px] font-bold">
            Limitation:
            <span className="text-[#2283F6]">10-15000 USDT 2-30000 </span>
            TRX
          </p>
          <div className="text-[#2283F6] text-[14px] font-normal mt-5 opacity-80">
            Note: Odds will fluctuate automatically and all rights to
            explanation belong to this platform.
          </div>
          <div
            className={
              'mt-4 text-[#FFFFFF] text-[14px] font-normal opacity-80'
            }
          >
            Amounts below the limit are withdrawn by the platform; amounts above
            the limit are considered invalid. The platform charges a 1%
            commission and returns the balance. If you don't win, it's a loss.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={
        'bg-[#111923] rounded-lg p-6 mb-6 shadow-xl ' +
        '[@media(max-width:768px)]:hidden'
      }
    >
      <h2
        className={
          'text-lg font-bold mb-4 text-[#FFFFFF] text-[14px] ' +
          'flex items-center gap-2'
        }
      >
        Bid address
        <span className="font-bold text-[12px]">
          Use a decentralized wallet
        </span>
      </h2>
      <div className="flex items-center gap-4">
        <div
          className={
            'flex opacity-80 justify-between w-[80%] bg-[#2a3546] p-3 ' +
            'border rounded-lg border-[rgba(255,255,255,0.1)]'
          }
        >
          <div className="flex items-center">
            <span className="text-gray-300 text-[12px] font-bold">
              <span className="text-[#2283F6]">TXS3</span>
              <span className="text-[#FFFFFF]">
                PfAUShemKkoBWRUFsUkGBSrZGagh6X
              </span>
              <span className="text-[#2283F6]">gh6X</span>
            </span>
          </div>
          <img src="/icons/copy.svg" alt="copy" className="w-6 h-6" />
        </div>
        <div className="relative">
          <div
            className={
              'absolute inset-0 bg-[#003a8a] rounded-[12px] translate-y-1'
            }
          ></div>
          <div
            className={
              'relative rounded-[12px] ' +
              'bg-[linear-gradient(to_top,#0C60FF_70%,#2C9FFA_100%)] ' +
              'text-white px-8 py-3 text-[14px] font-bold ' +
              'hover:from-[#0a56e6] hover:to-[#2590e6] ' +
              'transition-all duration-200 transform ' +
              'hover:-translate-y-0.5 active:translate-y-0 shadow-lg'
            }
          >
            Activate wallet
          </div>
        </div>
      </div>
      <h2
        className={
          'text-[14px] font-bold mt-5 mb-4 text-[#FFFFFF] ' +
          'flex items-center gap-2 [@media(max-width:768px)]:hidden'
        }
      >
        Lottery rules
      </h2>
      <div
        className={
          'border-2 border-[#0C60FF] rounded-lg bg-[#2283F621] ' +
          'flex shadow-inner [@media(max-width:768px)]:hidden'
        }
      >
        <div
          className={
            'flex items-center gap-3 w-[50%] justify-center ' +
            'border-r border-[#0C60FF] p-10'
          }
        >
          <span className="text-white font-bold text-[14px]">Odds:</span>
          <div className="bg-[#111923] rounded-lg px-5 py-1.5">
            <span className="text-[#0C60FF] font-bold text-[14px]">
              1:1.95
            </span>
          </div>
        </div>
        <div className="w-[50%] flex justify-center items-center gap-3">
          <span className="text-white font-bold text-[14px]">limitation:</span>
          <div className="bg-[#111923] rounded-lg px-3 py-2 mt-2">
            <p className="text-[#2283F6] text-[14px] font-medium">
              10-15000 <span className="text-white">USDT</span>
            </p>
            <p className="text-[#2283F6] text-[14px] font-medium">
              2-30000 <span className="text-white">TRX</span>
            </p>
          </div>
        </div>
      </div>
      <div
        className={
          'text-[#2283F6] text-[14px] font-normal mt-5 opacity-80 ' +
          '[@media(max-width:768px)]:hidden'
        }
      >
        Note: Odds will fluctuate automatically and all rights to explanation
        belong to this platform.
      </div>
      <div
        className={
          'mt-4 text-[#FFFFFF] text-[14px] font-normal opacity-80 ' +
          '[@media(max-width:768px)]:hidden'
        }
      >
        Amounts below the limit are withdrawn by the platform; amounts above the
        limit are considered invalid. The platform charges a 1% commission and
        returns the balance. If you don't win, it's a loss.
      </div>
    </div>
  )
}

