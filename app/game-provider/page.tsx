'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import SearchBar from '@/components/ui/SearchBar'
import ChevronDownIcon from '@/components/ui/icons/chevron-down'
import { Input } from '@/components/ui'
import { SearchInput } from '@/components/ui/SearchInput'
import Image from 'next/image'
const gameProviders = [
  {
    id: 1,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/ed61008add9887cdf9fd37371165641f0c24b70a?width=135',
    alt: 'GFG Gaming',
  },
  {
    id: 2,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/5e9afab1ed7019ffbc519a5dcaaa4fa7615e8b4b?width=135',
    alt: 'Provider',
  },
  {
    id: 3,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/281a740be5fb7cd2d9bb39ded75b2565106bc2fd?width=135',
    alt: 'Provider',
  },
  {
    id: 4,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/047554da985769c5ee1698f401501c544a6d48a0?width=135',
    alt: 'JILI',
  },
  {
    id: 5,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/2f561bbca160b8ac0450d236c61bda3a0995c409?width=135',
    alt: 'Provider',
  },
  {
    id: 6,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/998aad486be7b6a8353f09d546e61de365eab21a?width=135',
    alt: 'CQ9',
  },
  {
    id: 7,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/3d27077b25e812b82af50f280e4684b23cdf41cc?width=135',
    alt: 'Funky Games',
  },
  {
    id: 8,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/3a5a444a974275c908a194befaa4f84ca607fedf?width=135',
    alt: 'Provider',
  },
  {
    id: 9,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/86d84b0159c09830fd5104536e21969798bc2309?width=135',
    alt: 'JDB',
  },
  {
    id: 10,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/fa83fcaa5f332d8de53245f2b3a41977fba5690d?width=135',
    alt: 'PlaynGO',
  },
  {
    id: 11,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/2f4b8d7d6a6ffd13733b3cfab5075927e619cad0?width=135',
    alt: 'Provider',
  },
  {
    id: 12,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/5d539aa98318f6f92ab4bd1c04c69237f2a26a5b?width=135',
    alt: 'Royal',
  },
  {
    id: 13,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/9568ccd1df1dd83f1c6fa1998875464af4e04505?width=135',
    alt: 'Provider',
  },
  {
    id: 14,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/d37255092ff4a9ba6252acabfd9fef1f3bf31ab6?width=135',
    alt: 'OnlyPlay',
  },
  {
    id: 15,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/85c206d3db52840e6ab76bb2c44afa601a244905?width=135',
    alt: 'BFAU',
  },
  {
    id: 16,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/72036f7b2eb0bb0b118d852def87dbcdf6ffe5dd?width=135',
    alt: 'Blue',
  },
  {
    id: 17,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/ae3e191fb27ea09b0c1089cd8a723c5ba454b088?width=135',
    alt: 'Booming',
  },
  {
    id: 18,
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/209a6b8d2585dfec789d2ab46e662285792c9cad?width=135',
    alt: 'Provider',
  },
]

const GameProviderPage = () => {
  return (
    <div className="flex flex-col gap-8 pt-[26px] md:pt-4 mb-16 max-w-6xl p-2 m-auto">
      {/* <h2 className="text-white text-[18px] font-bold hidden lg:block">
        <span>Game Providers</span>
      </h2> */}
      {/* Content */}
      {/* Search Field */}
      <SearchInput placeholder="Manufacturer search" />

      {/* Game Providers Grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 ">
        {gameProviders.map(provider => (
          <Link
            href={`/game-provider/${provider.alt}`}
            key={provider.id}
            className="flex flex-col items-center overflow-hidden justify-center bg-white-4 rounded-xl aspect-[3/2] hover:bg-white-4/60 transition-colors cursor-pointer"
          >
            <div className="h-[60%] rounded-lg lg:rounded-t-lg overflow-hidden md:p-2">
              <Image
                src={provider.image}
                alt={provider.alt}
                width={69}
                height={45}
                className="object-contain rounded-lg lg:rounded-t-lg"
                loading="lazy"
              />
            </div>
            <div className="h-[40%] w-full hidden lg:flex text-white bg-white-14 font-bold text-[14px] justify-center items-center">
              {provider.alt}
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-2.5">
        {/* Show More Button */}
        <div className="flex justify-center">
          <div className="cursor-pointer h-9 bg-ebony-clay w-[157px] gap-2 text-casper font-montserrat text-[14px] flex items-center justify-center font-bold rounded-[8px] hover:bg-ebony-clay/80 transition-colors">
            Show 4 more
            <ChevronDownIcon className=" text-casper" />
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
