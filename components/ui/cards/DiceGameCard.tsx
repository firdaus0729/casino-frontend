'use client'

import React from 'react'
import Link from 'next/link'

export interface DiceGameCardProps {
  id: string
  title: string
  subtitle: string
  color: 'white' | 'red' | 'blue' | 'black'
  link: string
}

const DiceGameCard: React.FC<DiceGameCardProps> = ({
  id,
  title,
  subtitle,
  color,
  link,
}) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'white':
        return 'bg-white text-black'
      case 'red':
        return 'bg-red-500 text-white'
      case 'blue':
        return 'bg-blue-500 text-white'
      case 'black':
        return 'bg-black text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  return (
    <Link href={link} className="block">
      <div
        className={`${getColorClasses(color)} rounded-lg p-4 h-24 flex flex-col justify-center items-center hover:scale-105 transition-transform duration-200 cursor-pointer`}
      >
        <div className="text-2xl font-bold mb-1">{title}</div>
        <div className="text-sm text-center leading-tight">{subtitle}</div>
      </div>
    </Link>
  )
}

export default DiceGameCard
