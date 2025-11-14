'use client'
import React from 'react'

export interface GameCardProps {
  name: string
  icon: string
  gameCount: string
  sampleGames?: string[]
}

const GameCard: React.FC<GameCardProps> = ({
  name,
  icon,
  gameCount,
  sampleGames,
}) => {
  return (
    <div
      className={
        'bg-gray-800 rounded-lg p-2 hover:bg-gray-700 transition-colors ' +
        'gap-2 cursor-pointer flex flex-col'
      }
    >
      <div className="flex items-center">
        <div>
          <img
            src={icon}
            alt={`${name} manufacturer icon`}
            className="h-8 object-contain"
          />
        </div>
        <div className="">
          <p className="text-base font-semibold text-white leading-tight">
            {name}
          </p>
          <p className="text-base text-[#A7B5CA] leading-tight">
            {gameCount}
          </p>
        </div>
      </div>

      {sampleGames && sampleGames.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {sampleGames.map((game, gameIndex) => (
            <img
              key={gameIndex}
              src={`/images/brand/${game}`}
              alt={`${name} game sample ${gameIndex + 1}`}
              className={
                'w-full h-12 object-cover rounded hover:opacity-80 ' +
                'transition-opacity'
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default GameCard
