'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface HeaderSectionProps {
  difficulty: 'Beginner' | 'Intermediate'
  setDifficulty: (difficulty: 'Beginner' | 'Intermediate') => void
  defaultLink?: string
}

// Extract className constants
const TRANSFER_BUTTON_CLASSES = [
  'px-8 py-1.5 rounded-lg font-bold transition-all duration-200',
  'text-[14px] border-none flex items-center gap-2',
  'bg-[rgba(255,255,255,0.13)] text-gray-300',
  'hover:bg-[rgba(255,255,255,0.08)]',
  'border border-[rgba(255,255,255,0.1)]',
].join(' ')

const PAGE_BETTING_BUTTON_CLASSES = [
  'px-8 py-1.5 rounded-lg font-bold transition-all duration-200',
  'text-[14px] border-none flex items-center gap-2',
  'bg-color-[#FFFFFF] text-white shadow-lg',
  'hover:bg-[rgba(255,255,255,0.08)]',
].join(' ')

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  difficulty,
  setDifficulty,
  defaultLink = '/hashgames/oddeven/default',
}) => {
  return (
    <>
      {/* Desktop Header */}
      <div
        className={
          'justify-between items-center mb-8 bg-[#222d3d] pr-4 rounded-lg ' +
          'flex [@media(max-width:768px)]:hidden'
        }
      >
        <div className="flex bg-[#72707038] rounded-lg p-1">
          <div className={cn('px-8', TRANSFER_BUTTON_CLASSES)}>
            <img
              src="/icons/swap-horizontal.svg"
              alt="active"
              className="w-6 h-6"
            />
            Transfer betting
          </div>
          <Link href={defaultLink} className={PAGE_BETTING_BUTTON_CLASSES}>
            <img src="/icons/wallet.svg" alt="active" className="w-6 h-6" />
            Page betting
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
              className={cn(
                'block w-12 h-6 rounded-full cursor-pointer relative',
                difficulty === 'Intermediate'
                  ? 'bg-[#2283F6]'
                  : 'bg-[#a7b5ca73]'
              )}
            >
              <span
                className={cn(
                  'absolute top-1 left-1 w-4 h-4 bg-white rounded-full ' +
                    'transition-transform',
                  difficulty === 'Intermediate' ? 'translate-x-6' : ''
                )}
              />
            </label>
          </div>
          <span className="text-sm text-gray-300">Intermediate</span>
        </div>
      </div>

      {/* Mobile Header */}
      <div
        className={
          'bg-[#72707038] rounded-lg w-full p-1 ' +
          'hidden [@media(max-width:768px)]:flex'
        }
      >
        <div className={cn('w-[50%] justify-center flex items-center', TRANSFER_BUTTON_CLASSES)}>
          <img
            src="/icons/swap-horizontal.svg"
            alt="active"
            className="w-6 h-6"
          />
          Active
        </div>
        <Link
          href={defaultLink}
          className={cn(
            'w-[50%] justify-center flex items-center',
            'py-1.5 rounded-lg font-bold transition-all duration-200',
            'text-[14px] border-none flex items-center gap-2',
            'hover:bg-[rgba(255,255,255,0.08)]'
          )}
        >
          <img
            src="/icons/swap-horizontal.svg"
            alt="active"
            className="w-6 h-6"
          />
          Default
        </Link>
      </div>

      {/* Mobile Difficulty Toggle */}
      <div
        className={
          'items-center gap-2 mt-4 mb-4 justify-center ' +
          '[@media(max-width:768px)]:flex hidden'
        }
      >
        <span className="text-sm text-gray-300">Beginner</span>
        <div className="relative">
          <input
            type="checkbox"
            id="difficulty-toggle-mobile"
            className="sr-only"
            checked={difficulty === 'Intermediate'}
            onChange={e =>
              setDifficulty(e.target.checked ? 'Intermediate' : 'Beginner')
            }
          />
          <label
            htmlFor="difficulty-toggle-mobile"
            className="block w-12 h-6 bg-gray-600 rounded-full cursor-pointer relative"
          >
            <span
              className={cn(
                'absolute top-1 left-1 w-4 h-4 bg-white rounded-full ' +
                  'transition-transform',
                difficulty === 'Intermediate' ? 'translate-x-6' : ''
              )}
            />
          </label>
        </div>
        <span className="text-sm text-gray-300">Intermediate</span>
      </div>
    </>
  )
}

