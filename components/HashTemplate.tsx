'use client'
import { cn } from '@/lib/utils'

import { ResponsiveChipSelector } from '@/components/ui/chipSelector/ResponsiveChipSelector'
import MenuModal from '@/components/modals/MenuModal'
import Link from 'next/link'
import { useSidebar } from '@/context/SidebarProvider'
import React, { useState } from 'react'
import { board } from './hashgames/mockboard'
import { ChipSVG } from './hashgames/ChipSVG'
import { HeaderSection } from './hashgames/HeaderSection'
import { BettingSection } from './hashgames/BettingSection'
import { LotteryTrendSection } from './hashgames/LotteryTrendSection'
import { BettingRecordSection } from './hashgames/BettingRecordSection'

import {
  Wallet,
  ArrowUpDown,
  Grid3X3,
  Menu,
  User,
  Copy,
  ArrowLeft,
  Check,
  ZoomIn,
} from 'lucide-react'

interface HashTemplateProps {
  type: 'active' | 'default'
}

const OddDefault: React.FC = () => {
  const { isCollapsed } = useSidebar()
  const [activeTab, setActiveTab] = useState<'Active' | 'Default'>('Active')
  const isActive = activeTab === 'Active'
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate'>(
    'Beginner'
  )
  const [trendTab, setTrendTab] = useState<'Block Trend' | 'My trend'>(
    'Block Trend'
  )

  const [isBeginnerMode, setIsBeginnerMode] = useState(false)
  const [selectedChip, setSelectedChip] = useState<number | null>(1)
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMenuModalOpen(true)
  }

  const handleCloseMenuModal = () => {
    setIsMenuModalOpen(false)
  }

  return (
    <>
      <div
        className={`min-h-screen  py-16 m-auto text-white ${
          isCollapsed ? 'sidebar-collapsed' : ''
        }`}
      >
        {/* Header Section */}
        <HeaderSection
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          defaultLink="/hashgames/oddeven/default"
        />

        {/* Desktop view Bid address and Wallet Section*/}
        <BettingSection isMobile={true} />

        {/* Game Description and Rules */}
        <div className="bg-[url('/images/agloss.png')] bg-no-repeat bg-cover bg-center [@media(max-width:768px)]:hidden">
          <div className=" rounded-lg p-8 mb-6 relative overflow-none shadow-xl bg-[linear-gradient(to_bottom,#253041_70%,#0C60FF_100%)] opacity-85">
            {/* Background cryptocurrency coin outlines - Exact match to image */}

            <div className="flex gap-8 relative z-10">
              {/* Left Column - Title, Hash Example, and Rules */}
              <div className="w-[60%]">
                <p className="text-2xl text-align-left font-bold mb-5 text-white leading-tight">
                  THE LAST DIGIT OF THE TRON BLOCKCHAIN HASH FROM A Active IS
                  USED AS THE GAME RESULT
                </p>

                <div className="text-left mb-6">
                  <div className="inline-flex items-center gap-6 bg-gradient-to-r from-[#2283F621] to-[#2283F621] px-12 py-4 rounded-xl border border-[rgba(12,96,255,0.3)] relative shadow-2xl">
                    <span className="text-white font-bold text-[20px] tracking-wider flex-1 text-left">
                      EX:0000000 .... e
                      <span className="text-[#FFB636] text-[20px] font-bold">
                        5
                      </span>
                      s
                    </span>
                    {/* Enhanced Magnifying Glass Effect - Exact Match */}
                    <div className="relative flex-shrink-0">
                      <img
                        src="/images/magnifying.png"
                        alt="magnifying.png"
                        className="w-20 h-12"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6 bg-[#1119238A]  t-[14px] p-4 rounded-xl font-bold none [@media(max-width:768px)]:block">
                  <h3 className="text-lg font-normal mb-3 text-white flex items-center gap-2">
                    Betting rules
                  </h3>
                  <p className="text-white font-normal  leading-relaxed text-[14px]">
                    The last digit of the Active amount, 1,3,5,7,9 are placed on{' '}
                    <span className="font-normal text-[#64B5F6]">odd</span>,
                    0,2,4,6,8 are placed on{' '}
                    <span className="font-normal text-[#64B5F6]">even</span>.
                  </p>
                  <h3 className="text-lg font-normal mb-3 text-white flex items-center gap-2">
                    Rules of the game
                  </h3>
                  <p className="text-white font-normal  leading-relaxed text-[14px]">
                    1,3,5,7,9 is{' '}
                    <span className="font-normal text-[#64B5F6]">odd</span>,
                    0,2,4,6,8 is{' '}
                    <span className="font-normal text-[#64B5F6]">even</span>.
                  </p>
                </div>
              </div>

              {/* Right Column - Examples */}
              <div className="w-[40%] space-y-2 t-[14px] bg-[#1119238A] p-6 rounded-xl h-min-content">
                <h3 className=" font-bold mb-3 text-white flex items-center gap-2">
                  Example 1
                </h3>
                <p className="text-white  font-normal text-[14px]">
                  Your Active amount is:{' '}
                  <span className="text-[#64B5F6] font-normal">100.22</span>,
                  recognized as{' '}
                  <span className="text-[#64B5F6] font-normal">a pair</span>,
                  Decimal point is an invalid amount, Block hash of this Active:
                  646rgd**d9f9{' '}
                  <span className="text-[#64B5F6] font-normal">2</span> The last
                  digit of block hash 2 is determined as{' '}
                  <span className="text-[#64B5F6] font-normal">a pair</span>,
                  the result is{' '}
                  <span className="text-[#64B5F6] font-normal">a win</span>.
                  System refund amount: 100*1.95=195.00
                </p>
                <h3 className="font-bold  text-white ">Example 2</h3>
                <p className="text-white  font-normal text-[14px]">
                  Your Active amount is:{' '}
                  <span className="text-[#64B5F6] font-normal">9</span>, limit:
                  10 - 900 USDT, No Active amount{' '}
                  <span className="text-[#64B5F6] font-normal">
                    Within the specified bet value
                  </span>
                  , the platform directly calculates the Active amount for
                  invalid bets.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bid Address and Wallet Section */}
        <BettingSection isMobile={false} />

        {/* Lottery Trend Section */}
        <LotteryTrendSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Tutorial Video Section */}
        <div className="bg-[url('/images/game-video.png')] bg-cover bg-center rounded-lg p-6 mb-6 ">
          <div className="rounded-lg p-8 relative overflow-none [@media(max-width:768px)]:p-2">
            {/* Left Side - Text and Button */}
            <div className="flex flex-col items-start justify-center h-full">
              <h2 className="text-[18px] font-bold text-white mb-6 text-left [@media(max-width:768px)]:text-[14px] ">
                Hash even and odd tutorial video
              </h2>
              <div className="relative">
                <div className=" text-[12px] relative bg-[#2283F6] text-white px-8 py-3 rounded-lg font-bold hover:bg-[linear-gradient(#0a56e6,#2590e6)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0">
                  Play
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Betting Record Section */}
        <BettingRecordSection />
        {/* Mobile View Example Section */}
        <div className="w-full space-y-2 t-[14px] bg-[#FFFFFF0A] p-6 rounded-xl h-min-content hidden [@media(max-width:768px)]:block">
          <h3 className=" font-bold mb-3 text-white flex items-center gap-2">
            Example 1
          </h3>
          <p className="text-white  font-normal text-[14px] opacity-80">
            Your Active amount is:{' '}
            <span className="text-[#64B5F6] font-normal">100.22</span>,
            recognized as{' '}
            <span className="text-[#64B5F6] font-normal">a pair</span>, Decimal
            point is an invalid amount, Block hash of this Active: 646rgd**d9f9{' '}
            <span className="text-[#64B5F6] font-normal">2</span> The last digit
            of block hash 2 is determined as{' '}
            <span className="text-[#64B5F6] font-normal">a pair</span>, the
            result is <span className="text-[#64B5F6] font-normal">a win</span>.
            System refund amount: 100*1.95=195.00
          </p>
          <h3 className="font-bold  text-white ">Example 2</h3>
          <p className="text-white  font-normal text-[14px] opacity-80">
            Your Active amount is:{' '}
            <span className="text-[#64B5F6] font-normal">9</span>, limit: 10 -
            900 USDT, No Active amount{' '}
            <span className="text-[#64B5F6] font-normal">
              Within the specified bet value
            </span>
            , the platform directly calculates the Active amount for invalid
            bets.
          </p>
        </div>
      </div>

      {/* Menu Modal */}
      <MenuModal isOpen={isMenuModalOpen} onClose={handleCloseMenuModal} />
    </>
  )
}

const HashTemplate = () => {
  return <div></div>
}

export default HashTemplate
