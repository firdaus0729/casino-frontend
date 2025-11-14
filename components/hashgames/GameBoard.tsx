'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface GameBoardProps {
  board: (string | null)[][]
}

// Extract className constants
const CELL_BASE_CLASSES =
  'w-10 h-10 flex items-center justify-center border border-gray-700'

const CELL_CONTENT_BASE_CLASSES = [
  'flex items-center justify-center rounded-full',
  'text-[12px] font-bold',
  '[@media(max-width:850px)]:text-[10px]',
  '[@media(max-width:850px)]:w-4',
  '[@media(max-width:850px)]:h-4',
].join(' ')

const EVEN_CELL_CLASSES = cn(
  CELL_CONTENT_BASE_CLASSES,
  'w-5 h-5 bg-yellow-500 text-black'
)

const ODD_CELL_CLASSES = cn(
  CELL_CONTENT_BASE_CLASSES,
  'w-5 h-5 bg-red-600 text-white'
)

export const GameBoard: React.FC<GameBoardProps> = ({ board }) => {
  return (
    <div className="rounded-lg w-full mb-4">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 mb-1 bg-[#1b2430]">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className={CELL_BASE_CLASSES}>
              {cell === 'E' ? (
                <div className={EVEN_CELL_CLASSES}>E</div>
              ) : cell === 'O' ? (
                <div className={ODD_CELL_CLASSES}>O</div>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

