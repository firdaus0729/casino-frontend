'use client'

import { useEffect } from 'react'

import Link from 'next/link'

import { useState } from 'react'

import ChevronDownIcon from '@/components/ui/icons/chevron-down'
import FootballIcon from '@/components/ui/icons/football'
import GiftIcon from '@/components/ui/icons/gift'
import SpadeIcon from '@/components/ui/icons/spade'
import ChevronsDownIcon from '@/components/ui/icons/chevrons-down'
import CasinoPromotionCard from '@/components/ui/cards/PromotionCard'
import NormalButton from '@/components/ui/Button/NormalButton'

interface Tab {
  id: string
  label: string
  icon: React.ReactNode
  count?: number
}

const bannerCards = [
  {
    button: 'join now',
    image: '/images/banner/Banner01.jpg',
    link: '/joincommunity',
  },
  {
    button: 'get $588',
    image: '/images/banner/Banner10.jpg',
    link: '/livecasino',
  },
  {
    button: 'claim now',
    image: '/images/banner/Banner03.jpg',
    link: '/firstdeposit',
  },
  {
    button: 'claim now',
    image: '/images/banner/Banner12.jpg',
    link: '/first-deposit',
  },
  {
    button: 'get $588',
    image: '/images/banner/Banner02.jpg',
    link: '/hashchallenge ',
  },
  {
    button: 'get $1588',
    image: '/images/banner/Banner08.jpg',
    link: '/electronicsubmit',
  },
  {
    button: 'claim now',
    image: '/images/banner/Banner03.jpg',
    link: '/firstdeposit',
  },
  {
    button: 'claim now',
    image: '/images/banner/Banner06.jpg',
    link: '/checkinrewards',
  },
  {
    button: 'get $588',
    image: '/images/banner/Banner05.jpg',
    link: '/roadtochampion ',
  },
  {
    button: 'get $1588',
    image: '/images/banner/Banner04.jpg',
    link: '/minigame',
  },
  {
    button: 'claim now',
    image: '/images/banner/Banner09.jpg',
    link: '/nonstop',
  },
  {
    button: 'get $588',
    image: '/images/banner/Banner11.jpg',
    link: '/depositbonus ',
  },
  {
    button: 'get $1588',
    image: '/images/banner/Banner07.jpg',
    link: '/energybank',
  },
] as const

const tabs: Tab[] = [
  {
    id: 'all',
    label: 'All',
    icon: <GiftIcon className="w-6 h-6" />,
    count: 4,
  },
  {
    id: 'casino',
    label: 'Casino',
    icon: <SpadeIcon className="w-6 h-6" />,
  },
  {
    id: 'sport',
    label: 'Sport',
    icon: <FootballIcon />,
  },
]

const PromotionsPage = () => {
  const [activeTab, setActiveTab] = useState('all')

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
  }

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto p-4 pt-[1.625rem] md:pt-4 mb-16">
      <div className="grid grid-cols-3 items-start w-full md:w-[28.125rem]  p-1 bg-white-4 rounded-xl">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id

          return (
            <NormalButton
              key={tab.id}
              className={isActive ? 'bg-ebony-clay text-gallery' : ''}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.icon}
              {tab.label}
              {tab.count && (
                <div className="flex items-start justify-start h-5 px-1.5 bg-malachite  rounded-md shadow-[0_0.0625rem_0_0_var(--white-08)_inset]">
                  <span className="text-white font-montserrat text-xs font-bold">
                    {tab.count}
                  </span>
                </div>
              )}
            </NormalButton>
          )
        })}
      </div>

      {/* Game Providers Grid */}
      <div className="flex gap-4 flex-wrap justify-center md:justify-start">
        {bannerCards.map((card, index) => (
          <CasinoPromotionCard key={index} {...card} />
        ))}
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-2.5">
        {/* Show More Button */}
        <div className="flex justify-center">
          <div className="h-9 bg-ebony-clay w-[9.8125rem] gap-2 text-casper font-montserrat text-[0.875rem] flex items-center justify-center font-bold rounded-[0.5rem] hover:bg-ebony-clay/80 transition-colors">
            Show 4 more
            <ChevronDownIcon className=" text-casper" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-[9.875rem] mx-auto">
          <div className="h-1.5 bg-oxford-blue rounded-lg overflow-hidden">
            <div className="h-full w-[73%] bg-dodger-blue rounded-lg"></div>
          </div>
        </div>

        {/* Progress Text */}
        <div className="text-center">
          <span className="text-polo-blue font-montserrat text-[0.625rem] font-normal">
            Show 18 of 22 games
          </span>
        </div>
      </div>
    </div>
  )
}

export default PromotionsPage
