'use client'

import { cn } from '@/lib/utils'
import React, { useState } from 'react'

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
import { ResponsiveChipSelector } from '@/components/ui/chipSelector/ResponsiveChipSelector'
import Link from 'next/link'
import { useSidebar } from '@/context/SidebarProvider'

const NiuniuDefault: React.FC = () => {
  const { isCollapsed } = useSidebar()
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate'>(
    'Beginner'
  )
  const [trendTab, setTrendTab] = useState<'Block Trend' | 'My trend'>(
    'Block Trend'
  )

  const [isBeginnerMode, setIsBeginnerMode] = useState(false)
  const [selectedChip, setSelectedChip] = useState<number | null>(1)

  // Mock data for lottery trend

  const board: (string | null)[][] = [
    // Each row = array of cells: "E", "O", or null for empty
    [
      'E',
      'O',
      'E',
      'E',
      'O',
      'E',
      'O',
      'O',
      'E',
      'E',
      'O',
      'E',
      'O',
      'E',
      'E',
      'O',
      'E',
      'O',
      'O',
      'E',
      'E',
      'O',
      'E',
      'O',
      'E',
      'E',
      'O',
      'E',
      'O',
      'O',
    ],
    [
      'O',
      'E',
      'O',
      'O',
      'E',
      'O',
      'E',
      'E',
      'O',
      'O',
      'E',
      'O',
      'E',
      'O',
      'O',
      'E',
      'O',
      'E',
      'E',
      'O',
      'O',
      'E',
      'O',
      'E',
      'O',
      'O',
      'E',
      'O',
      'E',
      'E',
    ],
    [
      'E',
      'O',
      'E',
      'E',
      'O',
      'E',
      'O',
      'O',
      'E',
      'E',
      'O',
      'E',
      'O',
      'E',
      'E',
      'O',
      'E',
      'O',
      'O',
      'E',
      'E',
      'O',
      'E',
      'O',
      'E',
      'E',
      'O',
      'E',
      'O',
      'O',
    ],
    [
      'O',
      'E',
      'O',
      'O',
      'E',
      'O',
      'E',
      'E',
      'O',
      'O',
      'E',
      'O',
      'E',
      'O',
      'O',
      'E',
      'O',
      'E',
      'E',
      'O',
      'O',
      'E',
      'O',
      'E',
      'O',
      'O',
      'E',
      'O',
      'E',
      'E',
    ],
    [
      'E',
      null,
      'E',
      null,
      null,
      'E',
      null,
      'O',
      null,
      null,
      'E',
      null,
      null,
      'E',
      null,
      null,
      'O',
      null,
      null,
      'E',
      null,
      null,
      'O',
      null,
      null,
      'E',
      null,
      null,
      'O',
      null,
    ],
    [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  ]
  const GameBoard = ({ board }: { board: (string | null)[][] }) => {
    return (
      <div className=" rounded-lg w-full mb-4">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 mb-1 bg-[#1b2430]">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="w-10 h-10 flex items-center justify-center border border-gray-700"
              >
                {cell === 'E' ? (
                  <div className="w-5 h-5 flex items-center justify-center rounded-full bg-yellow-500 text-black text-[12px] font-bold [@media(max-width:850px)]:text-[10px] [@media(max-width:850px)]:w-4 [@media(max-width:850px)]:h-4">
                    E
                  </div>
                ) : cell === 'O' ? (
                  <div className="w-5 h-5 flex items-center justify-center rounded-full bg-red-600 text-white text-[12px] font-bold [@media(max-width:850px)]:text-[10px] [@media(max-width:850px)]:w-4 [@media(max-width:850px)]:h-4">
                    O
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  const bullItems = [
    { name: 'Bull1', ratio: '1:1' },
    { name: 'Bull2', ratio: '1:2' },
    { name: 'Bull3', ratio: '1:3' },
    { name: 'Bull4', ratio: '1:4' },
    { name: 'Bull5', ratio: '1:5' },
    { name: 'Bull6', ratio: '1:6' },
    { name: 'Bull7', ratio: '1:7' },
    { name: 'Bull8', ratio: '1:8' },
    { name: 'Bull9', ratio: '1:9' },
    { name: 'BullBull', ratio: '1:10' },
  ]

  const ChipSVG: React.FC<{
    value?: number
    label?: string
    color: string
    selected?: boolean
    onClick?: () => void
    sizePx?: number
  }> = ({ value, label, color, selected = false, onClick, sizePx = 64 }) => {
    const display = label ?? (value != null ? String(value) : '')
    const textLines = display.split('\n')
    const darkStroke = '#0B1220'
    return (
      <div
        onClick={onClick}
        aria-pressed={selected}
        className={`relative inline-flex items-center justify-center rounded-full transition-transform active:scale-95`}
        style={{ width: sizePx, height: sizePx }}
      >
        <svg
          width={sizePx}
          height={sizePx}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="baseGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="60%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="1" />
            </radialGradient>
            <linearGradient id="innerSheen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1A2640" stopOpacity="0.0" />
              <stop offset="100%" stopColor="#0F1722" stopOpacity="0.55" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="3"
                result="blur"
              />
            </filter>
          </defs>

          {/* Golden outer ring when selected */}
          {selected && (
            <>
              <circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke="#FFB636"
                strokeWidth="4"
              />
              <circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke="#FFB636"
                strokeWidth="4"
                opacity="0.5"
                filter="url(#glow)"
              />
            </>
          )}

          {/* Outer base */}
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="url(#baseGrad)"
            stroke={darkStroke}
            strokeWidth="2"
          />

          {/* Outer inner ring */}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke={darkStroke}
            strokeWidth="3"
            opacity="0.9"
          />

          {/* Inner disc */}
          <circle
            cx="50"
            cy="50"
            r="28"
            fill="url(#innerSheen)"
            stroke={darkStroke}
            strokeWidth="2.5"
          />

          {/* 8 markers: 4 squares (cardinal) and 4 diamonds (diagonals) */}
          {([0, 90, 180, 270] as number[]).map((deg, idx) => (
            <g key={`sq-${idx}`} transform={`rotate(${deg} 50 50)`}>
              <rect
                x="46"
                y="6"
                width="8"
                height="10"
                rx="2"
                fill="#F2F6FF"
                stroke="#DCE4F2"
                strokeWidth="1"
              />
            </g>
          ))}
          {([45, 135, 225, 315] as number[]).map((deg, idx) => (
            <g key={`dm-${idx}`} transform={`rotate(${deg} 50 50)`}>
              <rect
                x="48"
                y="8"
                width="6"
                height="6"
                rx="1.5"
                fill="#F2F6FF"
                stroke="#DCE4F2"
                strokeWidth="1"
                transform="rotate(45 51 11)"
              />
            </g>
          ))}

          {/* Label */}
          {textLines.length === 1 ? (
            <text
              x="50"
              y="58"
              textAnchor="middle"
              fontFamily="inherit"
              fontWeight="800"
              fontSize="28"
              fill="#FFFFFF"
            >
              {textLines[0]}
            </text>
          ) : (
            <>
              <text
                x="50"
                y="48"
                textAnchor="middle"
                fontFamily="inherit"
                fontWeight="800"
                fontSize="14"
                fill="#FFFFFF"
              >
                {textLines[0]}
              </text>
              <text
                x="50"
                y="64"
                textAnchor="middle"
                fontFamily="inherit"
                fontWeight="800"
                fontSize="14"
                fill="#FFFFFF"
              >
                {textLines[1]}
              </text>
            </>
          )}
        </svg>
      </div>
    )
  }

  return (
    <>
      <div
        className={`min-h-screen hash-game-container py-16 m-auto text-white ${isCollapsed ? 'sidebar-collapsed' : ''}`}
      >
        {/* Header Section */}
        <div className=" justify-between items-center mb-8 bg-[#222d3d] pr-4 rounded-lg flex  [@media(max-width:768px)]:hidden">
          <div className="flex bg-[#72707038] rounded-lg p-1 ">
            <div
              className={` px-8  py-1.5 rounded-lg font-bold transition-all duration-200 text-[14px] border-none flex items-center gap-2 bg-[rgba(255,255,255,0.13)] text-gray-300 hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)]`}
            >
              {' '}
              <img
                src="/icons/swap-horizontal.svg"
                alt="active"
                className="w-6 h-6"
              />
              Active
            </div>
            <Link
              href="/hashgames/lucky/default"
              className={`px-8 py-1.5 rounded-lg font-bold transition-all duration-200 text-[14px] border-none flex items-center gap-2 
                bg-color-[#FFFFFF] text-white shadow-lg hover:bg-[rgba(255,255,255,0.08)]`}
            >
              {' '}
              <img src="/icons/wallet.svg" alt="active" className="w-6 h-6" />
              Default
            </Link>
          </div>
          <div className="flex items-center gap-2 [@media(max-width:768px)]:hidden">
            <span className="text-sm text-gray-300">Beginner</span>
            <div className="relative">
              <input
                type="checkbox"
                id="difficulty-toggle"
                className="sr-only"
                checked={difficulty === 'Intermediate'}
                onChange={e =>
                  setDifficulty(e.target.checked ? 'Intermediate' : 'Beginner')
                }
              />
              <label
                htmlFor="difficulty-toggle"
                className={`block w-12 h-6 rounded-full cursor-pointer relative ${
                  difficulty === 'Intermediate'
                    ? 'bg-[#2283F6]'
                    : 'bg-[#a7b5ca73]'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    difficulty === 'Intermediate' ? 'translate-x-6' : ''
                  }`}
                />
              </label>
            </div>
            <span className="text-sm text-gray-300">Intermediate</span>
          </div>
        </div>
        {/* Mobile view Header Section*/}
        <div className="bg-[#72707038] rounded-lg p-1 hidden [@media(max-width:768px)]:flex ">
          <div
            className={` w-[50%] justify-center flex justify-center items-center  py-1.5 rounded-lg font-bold transition-all duration-200 text-[14px] border-none flex items-center gap-2 bg-[rgba(255,255,255,0.13)] text-gray-300 hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)]`}
          >
            {' '}
            <img
              src="/icons/swap-horizontal.svg"
              alt="active"
              className="w-6 h-6"
            />
            Active
          </div>
          <Link
            href="/hashgames/lucky/default"
            className={` w-[50%] justify-center flex justify-center items-center  py-1.5 rounded-lg font-bold transition-all duration-200 text-[14px] border-none flex items-center gap-2 hover:bg-[rgba(255,255,255,0.08)]`}
          >
            {' '}
            <img
              src="/icons/swap-horizontal.svg"
              alt="active"
              className="w-6 h-6"
            />
            Default
          </Link>
        </div>
        {/* Mobile view Header Section1s*/}
        <div className="items-center gap-2 mt-4 mb-4 justify-center [@media(max-width:768px)]:flex hidden">
          <span className="text-sm text-gray-300">Beginner</span>
          <div className="relative">
            <input
              type="checkbox"
              id="difficulty-toggle"
              className="sr-only"
              checked={difficulty === 'Intermediate'}
              onChange={e =>
                setDifficulty(e.target.checked ? 'Intermediate' : 'Beginner')
              }
            />
            <label
              htmlFor="difficulty-toggle"
              className="block w-12 h-6 bg-gray-600 rounded-full cursor-pointer relative"
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  difficulty === 'Intermediate' ? 'translate-x-6' : ''
                }`}
              />
            </label>
          </div>
          <span className="text-sm text-gray-300">Intermediate</span>
        </div>

        {/* Desktop view Bid address and Wallet Section*/}
        <div className="bg-[#111923] rounded-lg p-3 mb-6  border border-[rgba(12,96,255,0.1)] shadow-xl [@media(max-width:768px)]:block hidden">
          <h2 className="text-lg font-bold mb-4 text-[#FFFFFF] text-[14px] flex items-center gap-2">
            Bid address
            <span className="font-bold text-[12px] opacity-80">
              Use a decentralized wallet
            </span>
          </h2>
          <div className="flex opacity-80 justify-between bg-[#2a3546] p-3 border rounded-lg p-3Icon.svg border-[rgba(255,255,255,0.1)] mb-4">
            <div className="flex items-center">
              <span className="text-gray-300 text-[12px] font-bold">
                <span className="text-[#2283F6]">TXS3</span>
                <span className="text-[#FFFFFF]">PfAUShemKkoBWRUFsUkGBSrZ</span>
                <span className="text-[#2283F6]">gh..</span>
              </span>
            </div>
            <img src="/icons/copy.svg" alt="copy" className="w-6 h-6" />
          </div>
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-[#003a8a] rounded-[12px] translate-y-1"></div>
            <div className=" w-full relative rounded-[12px] bg-[linear-gradient(to_top,#0C60FF_70%,#2C9FFA_100%)] text-white px-8 py-3 text-[14px] font-bold hover:from-[#0a56e6] hover:to-[#2590e6] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg ">
              Activate wallet
            </div>
          </div>
          <div className="bg-[#FFFFFF0A] rounded-lg p-3 mb-6 border border-[rgba(12,96,255,0.1)] shadow-xl">
            <p className="text-white text-[14px] font-bold mb-2">
              Odds:<span className="text-[#2283F6]">1:1.95</span>
            </p>
            <p className="text-white text-[14px] font-bold">
              Limitation:
              <span className="text-[#2283F6]">10-15000 USDT 2-30000 </span>TRX
            </p>
            <div className="text-[#2283F6] text-[14px] font-normal mt-5 opacity-80">
              Note: Odds will fluctuate automatically and all rights to
              explanation belong to this platform.
            </div>

            <div className="mt-4 text-[#FFFFFF] text-[14px] font-normal opacity-80 ">
              Amounts below the limit are withdrawn by the platform; amounts
              above the limit are considered invalid. The platform charges a 1%
              commission and returns the balance. If you don't win, it's a loss.
            </div>
          </div>
          {/* Mobile view Desktop View Example Section */}
          <div className="bg-[url('/images/agloss.png')] bg-no-repeat bg-cover bg-center [@media(max-width:768px)]:block hidden">
            <div className=" rounded-lg p-4 mb-6   relative overflow-none shadow-xl bg-[linear-gradient(to_bottom,#253041_70%,#0C60FF_100%)] opacity-85">
              {/* Background cryptocurrency coin outlines - Exact match to image */}
              <div className="flex gap-8 relative z-10">
                {/* Left Column - Title, Hash Example, and Rules */}
                <div>
                  <p className="text-[14px] text-align-left font-bold mb-5 text-white leading-tight">
                    THE LAST DIGIT OF THE TRON BLOCKCHAIN HASH FROM A Active IS
                    USED AS THE GAME RESULT
                  </p>
                  <img
                    src="/icons/down-arrow.svg"
                    alt="down-arrow"
                    className="w-6 h-4 m-auto mb-2 opacity-40"
                  />
                  <div className="text-left">
                    <div className="flex items-center gap-6  px-8 rounded-xl justify-center  relative ">
                      <span className="text-white font-bold text-[14px] tracking-wider flex text-left">
                        EX:0000000 .... e
                        <span className="text-[#FFB636] text-[14px] font-bold">
                          5
                        </span>
                        s
                      </span>
                      {/* Enhanced Magnifying Glass Effect - Exact Match */}
                      <div className="relative flex-shrink-0">
                        <img
                          src="/images/magnifying.png"
                          alt="magnifying.png"
                          className="w-10 h-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6 bg-[#FFFFFF0A]  t-[14px] p-4 rounded-xl font-bold">
            <h3 className="text-lg font-normal mb-3 text-white flex items-center gap-2">
              Betting rules
            </h3>
            <p className="text-white font-normal  leading-relaxed text-[14px] opacity-80">
              The last digit of the Active amount, 1,3,5,7,9 are placed on{' '}
              <span className="font-normal text-[#64B5F6]">odd</span>, 0,2,4,6,8
              are placed on{' '}
              <span className="font-normal text-[#64B5F6]">even</span>.
            </p>
            <h3 className="text-lg font-normal mb-3 text-white flex items-center gap-2">
              Rules of the game
            </h3>
            <p className="text-white font-normal  leading-relaxed text-[14px] opacity-80">
              1,3,5,7,9 is{' '}
              <span className="font-normal text-[#64B5F6]">odd</span>, 0,2,4,6,8
              is <span className="font-normal text-[#64B5F6]">even</span>.
            </p>
          </div>
        </div>

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
        <div className="bg-[#111923] rounded-lg p-6 mb-6 shadow-xl [@media(max-width:768px)]:hidden">
          <h2 className="text-lg font-bold mb-4 text-[#FFFFFF] text-[14px] flex items-center gap-2">
            Bid address
            <span className="font-bold text-[12px]">
              Use a decentralized wallet
            </span>
          </h2>
          <div className="flex items-center gap-4  ">
            <div className="flex opacity-80 justify-between w-[80%] bg-[#2a3546] p-3 border rounded-lg p-3Icon.svg border-[rgba(255,255,255,0.1)]">
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
              <div className="absolute inset-0 bg-[#003a8a] rounded-[12px] translate-y-1"></div>
              <div className="relative rounded-[12px] bg-[linear-gradient(to_top,#0C60FF_70%,#2C9FFA_100%)] text-white px-8 py-3 text-[14px] font-bold hover:from-[#0a56e6] hover:to-[#2590e6] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg">
                Activate wallet
              </div>
            </div>
          </div>
          <h2 className="text-[14px] font-bold mt-5 mb-4 text-[#FFFFFF] flex items-center gap-2 [@media(max-width:768px)]:hidden">
            Lottery rules
          </h2>
          <div className="border-2 border-[#0C60FF] rounded-lg  bg-[#2283F621] flex shadow-inner [@media(max-width:768px)]:hidden">
            <div className="flex items-center gap-3 w-[50%] justify-center border-r border-[#0C60FF] p-10 ">
              <span className="text-white font-bold text-[14px]">Odds:</span>
              <div className="bg-[#111923] rounded-lg px-5 py-1.5">
                <span className="text-[#0C60FF] font-bold text-[14px]">
                  1:1.95
                </span>
              </div>
            </div>
            <div className="w-[50%] flex justify-center items-center gap-3">
              <span className="text-white font-bold text-[14px]">
                limitation:
              </span>
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
          <div className="text-[#2283F6] text-[14px] font-normal mt-5 opacity-80 [@media(max-width:768px)]:hidden">
            Note: Odds will fluctuate automatically and all rights to
            explanation belong to this platform.
          </div>
          <div className="mt-4 text-[#FFFFFF] text-[14px] font-normal opacity-80 [@media(max-width:768px)]:hidden">
            Amounts below the limit are withdrawn by the platform; amounts above
            the limit are considered invalid. The platform charges a 1%
            commission and returns the balance. If you don't win, it's a loss.
          </div>
        </div>

        {/* Lottery Trend Section */}
        <div className="bg-[#111923] rounded-lg py-4 px-6 mb-6 border border-[rgba(255,255,255,0.1)] shadow-xl [@media(max-width:768px)]:hidden">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex justify-between items-center mb-4 gap-4">
                <h2 className="text-[14px] font-bold text-white flex items-center gap-2">
                  Lottery trend
                </h2>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs font-bold">O</span>
                    </div>
                    <span className="text-sm text-white">91</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
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
                  className={`px-8 py-1.5 rounded-lg font-bold transition-all duration-200 text-[14px] border-none flex items-center gap-2 `}
                >
                  Block Trend
                </div>
                <div
                  className={`px-8 py-1.5 rounded-lg font-bold transition-all duration-200 text-[14px] border-none flex items-center gap-2 
                    bg-[rgba(255,255,255,0.13)] text-gray-300 hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)]
                `}
                >
                  My Trend
                </div>
              </div>
            </div>
          </div>
          <GameBoard board={board} />
          <div className="flex items-center gap-2 text-sm text-gray-300 bg-[#FFFFFF0A] rounded-lg p-4">
            <img src="/icons/Vector.svg" alt="info" className="w-5 h-5" />
            <p className="opacity-80">
              The road map is automatically updated every 3 seconds. This road
              order rule is composed of the TRON real-time block lottery
              results.
            </p>
          </div>
        </div>

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
        <div className="bg-[#111923] rounded-lg p-6 border border-[rgba(12,96,255,0.1)] shadow-xl [@media(max-width:768px)]:hidden">
          <div className="flex justify-between items-center mb-4 ">
            <h2 className="text-[18px] font-bold text-write flex items-center gap-2">
              Betting record
            </h2>
            <div className="text-[#0C60FF] text-[14px] font-bold hover:text-[#64B5F6] transition-colors">
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
            <span className="text-[#55657E] font-bold text-[12px] opacity-80 text-right">
              Today's win or loss...
            </span>
          </div>
          <div className="space-y-3">
            {/* USDT Row */}
            <div className="bg-[#1C2532] rounded-lg p-4 px-8 border border-[rgba(255,255,255,0.1)] shadow-md">
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="flex items-center gap-1 ">
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
                <div className="flex items-center gap-1 text-[#ED1D49] ml-6 justify-end">
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
            <div className="bg-[#1C2532] rounded-lg p-4 px-8 border border-[rgba(255,255,255,0.1)] shadow-md">
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
                <div className="flex items-center gap-1 text-[#ED1D49] justify-end">
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
    </>
  )
}

export default NiuniuDefault
