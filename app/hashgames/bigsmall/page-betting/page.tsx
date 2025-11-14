'use client'

import React from 'react'
import DefaultPageLayout from '@/components/hashgames/PageBettingLayout'
import { User } from '@/components/ui/icons'
import useAuthGuard from '@/hooks/useAuthGuard'
const BigSmallDefault: React.FC = () => {
  const { isAuthenticated } = useAuthGuard()
  const bettingOptions = [
    {
      id: 'small',
      label: 'SMALL',
      color: '#ED1D49',
      progress: 57,
      amount: '10038',
      users: 12,
      odds: '1 : 1.95',
    },
    {
      id: 'big',
      label: 'BIG',
      color: '#FFB636',
      progress: 43,
      amount: '7592',
      users: 11,
      odds: '1 : 1.95',
    },
  ]

  return (
    <DefaultPageLayout>
      <div className="flex p-2 md:p-8 items-start gap-2 md:gap-4 w-full rounded-xl bg-white/[0.04]">
        {/* ODD Section */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="flex pb-4 justify-between items-center w-full">
            <div className="flex flex-col items-start">
              <div className="text-base font-bold">
                <span className="text-casper">$</span>
                <span className="text-white">10038</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4 text-casper" />
                <span className="text-sm font-bold text-casper">12</span>
              </div>
            </div>
            {/* Progress Circle for ODD */}
            <div className="relative w-10 h-10">
              <svg
                className="w-10 h-10 transform -rotate-90"
                viewBox="0 0 40 40"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  stroke="rgba(255,255,255,0.13)"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  stroke="#ED1D49"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${57 * 1.13} ${(100 - 57) * 1.13}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-crimson">57%</span>
              </div>
            </div>
          </div>
          <div className="flex h-9 px-4 justify-center items-center gap-2 rounded-lg border border-white/[0.08] bg-mirage shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-[32px]">
            <span className="text-sm font-bold text-white">$0</span>
          </div>
          <div className="text-2xl font-bold text-crimson">SMALL</div>
          <div className="flex h-9 px-4 justify-center items-center gap-2 rounded-lg border border-white/[0.08] bg-mirage shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-[32px]">
            <span className="text-sm font-bold text-white">1 : 1.95</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-[188px]  bg-white/[0.04]"></div>

        {/* EVEN Section */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="flex pb-4 justify-between items-center w-full">
            {/* Progress Circle for EVEN */}
            <div className="relative w-10 h-10">
              <svg
                className="w-10 h-10 transform -rotate-90"
                viewBox="0 0 40 40"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  stroke="rgba(255,255,255,0.13)"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  stroke="#FFB636"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${43 * 1.13} ${(100 - 43) * 1.13}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-yellow-orange">
                  43%
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-base font-bold text-right">
                <span className="text-casper">$</span>
                <span className="text-white">7592</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-casper">11</span>
                <User className="w-4 h-4 text-casper" />
              </div>
            </div>
          </div>
          <div className="flex h-9 px-4 justify-center items-center gap-2 rounded-lg border border-white/[0.08] bg-mirage shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-[32px]">
            <span className="text-sm font-bold text-white">$0</span>
          </div>
          <div className="text-2xl font-bold text-yellow-orange">BIG</div>
          <div className="flex h-9 px-4 justify-center items-center gap-2 rounded-lg border border-white/[0.08] bg-mirage shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-[32px]">
            <span className="text-sm font-bold text-white">1 : 1.95</span>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  )
}

export default BigSmallDefault
