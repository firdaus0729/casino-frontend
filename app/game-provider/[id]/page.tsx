'use client'

import { useEffect } from 'react'

import Link from 'next/link'
import mainContentData from '../../../main-content-data.json'

import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui'
import SearchIcon from '@/components/ui/icons/search'
import SearchBar from '@/components/ui/SearchBar'
import CasinoCard from '@/components/ui/cards/CasinoCard'
import ChevronDownIcon from '@/components/ui/icons/chevron-down'
import { SearchInput } from '@/components/ui/SearchInput'
const GameProviderPage = () => {
  const pathname = usePathname()
  const id = pathname.split('/')[2].split('%20').join(' ')

  return (
    <div className="flex flex-col gap-8 w-full mx-auto pt-[26px] md:pt-4 mb-16 max-w-7xl p-2 m-auto">
      <h2 className="text-white text-[18px] font-bold hidden lg:block">{id}</h2>
      {/* Content */}
      {/* Search Field */}
      <SearchInput placeholder="Manufacturer search" />
      {/* Game Providers Grid */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 ">
        {mainContentData.card3.map((item, index) => (
          <CasinoCard key={index} image={item.image} badge={item.badge} />
        ))}
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-2.5">
        {/* Show More Button */}
        <div className="flex justify-center">
          <div className="h-9 bg-ebony-clay w-[157px] gap-2 text-casper font-montserrat text-[14px] flex items-center justify-center font-bold rounded-[8px] hover:bg-ebony-clay/80 transition-colors">
            Show 4 more
            <ChevronDownIcon className="text-casper" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-[158px] mx-auto">
          <div className="h-1.5 bg-oxford-blue rounded-lg overflow-hidden">
            <div className="h-full w-[73%] bg-dodger-blue rounded-lg"></div>
          </div>
        </div>

        {/* Progress Text */}
        <div className="flex justify-center items-center">
          <span className="text-polo-blue font-montserrat text-[10px] font-normal">
            Show 18 of 22 games
          </span>
        </div>
      </div>
    </div>
  )
}

export default GameProviderPage
