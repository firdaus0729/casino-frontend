'use client'

import React, { useRef, useState } from 'react'
import mainContentData from '../../main-content-data.json'
import { useModal } from '../../context/ModalProvider'
import { useI18n } from '../../context/I18nProvider'
import { Swiper as SwiperType } from 'swiper'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import {
  setLiveCasinoSlide,
  setLatestEarningsSlide,
  setGameManufacturersSlide,
} from '../../store/slices/carouselSlice'
import CasinoCard from '../../components/ui/cards/CasinoCard'
import GameCard from '../../components/ui/cards/GameCard'
import EarningCard from '../../components/ui/cards/EarningCard'
import { Icon } from '@iconify/react'
import { SuccessForm } from '../../components/auth/SuccessForm'
import SwiperSlider from '../../components/ui/slider/SwiperSlider'
import { X } from 'lucide-react'
import {
  StatusDropdown,
  StatusDropdownTrigger,
  StatusDropdownContent,
  StatusDropdownItem,
} from '@/components/ui/StatusDropdown'

// Extract data from JSON
const {
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  card7,
  card9,
  card10,
  brand,
  latestBets,
  gameManufacturers,
  footerContent,
} = mainContentData

const statusOptions = [
  'Up to date',
  'Daily',
  'Checking for updates...',
  'Installing updates',
  'Update failed',
  'Connected',
  'Disconnected',
]

// Latest bets table component
const LatestBetsTable: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('Up to date')
  return (
    <>
      <div className="text-4.5 font-bold flex items-center w-full justify-between text-white mb-4  gap-2">
        <span>Latest Bets</span>
        <StatusDropdown>
          <StatusDropdownTrigger className="bg-[#2A3546] border-none ring-0 focus:ring-0 outline-none">
            {selectedStatus}
          </StatusDropdownTrigger>
          <StatusDropdownContent
            className="bg-[#2A3546] border-none"
            align="center"
          >
            {statusOptions.map(status => (
              <StatusDropdownItem
                key={status}
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </StatusDropdownItem>
            ))}
          </StatusDropdownContent>
        </StatusDropdown>
      </div>
      <div
        className={` grid lg:md:grid-cols-[15%_15%_20%_15%_25%_10%] grid-cols-[20%_20%_20%_40%] gap-[6px] lg:px-8 px-[6px] ${
          selectedStatus !== 'Daily'
            ? 'grid-cols-[20%_20%_20%_40%]'
            : 'grid-cols-[30%_30%_40%]'
        } `}
      >
        <div className="text-left text-[12px] font-bold py-2 text-white">
          Game
        </div>
        <div className="text-left text-[12px] font-bold py-2 text-white">
          Player
        </div>
        <div className="text-left text-[12px] hidden md:lg:block font-bold py-2 text-white">
          Time
        </div>
        <div className="text-left text-[12px] hidden md:lg:block font-bold py-2 truncate text-white">
          Bet Amount
        </div>
        <div className="text-left text-[12px] font-bold py-2 text-white">
          Multiplier
        </div>
        {selectedStatus !== 'Daily' && (
          <div className="text-left text-[12px] font-bold py-2 text-white">
            Payout
          </div>
        )}
      </div>
      <div className="w-full relative h-[462px] z-[-1] lg:mb-16 mb-8">
        <SwiperSlider
          data={latestBets}
          allowTouchMove={false}
          renderSlide={(bet, index) => (
            <div
              className={`bg-[#1C2532] lg:px-8 gap-[6px] px-[6px] w-full grid lg:md:grid-cols-[15%_15%_20%_15%_25%_10%] grid-cols-[20%_20%_20%_40%] rounded-[16px] h-[48px] overflow-hidden mb-[6px] ${
                selectedStatus !== 'Daily'
                  ? 'grid-cols-[20%_20%_20%_40%]'
                  : 'grid-cols-[30%_30%_40%]'
              } items-center`}
              key={index}
            >
              <div className="text-white flex text-[12px] font-bold truncate items-center gap-2">
                <img
                  src="/images/gameLogo.png"
                  alt="game"
                  className="w-6 h-6"
                />
                {bet.game}
              </div>
              <div className="text-gray-300 text-[12px] font-bold truncate flex items-center gap-2">
                <img
                  src="/images/avatar(1).png"
                  alt="avatar"
                  className="w-6 h-6 hidden md:lg:block"
                />
                {bet.player}
              </div>
              <div className="text-gray-300 text-[12px] hidden md:lg:flex items-center font-bold truncate">
                {bet.time}
              </div>
              <div className="text-gray-300 text-[12px] hidden md:lg:flex font-bold truncate items-center gap-2">
                <img
                  src="/icons/coin-icon/BTC.svg"
                  alt="coin"
                  className="w-6 h-6"
                />
                {bet.bet}
              </div>
              {selectedStatus !== 'Daily' && (
                <div className="text-[#2283F6] text-[12px] font-bold truncate flex items-center">
                  {bet.multiplier}
                </div>
              )}
              <div className="text-green-400 text-[12px] font-bold truncate flex items-center gap-2">
                {bet.payout}
                <div className="rounded-[8px] overflow-hidden !w-6 !h-6">
                  <img
                    src="/icons/coin-icon/BTC.svg"
                    alt="coin"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          )}
          direction="vertical"
          slidesPerView={9.1}
          spaceBetween={6}
          autoplayDelay={1000}
          className="h-full"
        />
        <div className="absolute bottom-0 left-0 w-full h-[254px] bg-gradient-to-b z-[30] from-transparent to-[#111923] pointer-events-none"></div>
      </div>
    </>
  )
}

// Game manufacturers section component
const GameManufacturersSection: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null)
  const dispatch = useAppDispatch()
  const carouselState = useAppSelector(state => state.carousel)

  const handleGameManufacturersSlideChange = (swiper: SwiperType) => {
    dispatch(setGameManufacturersSlide(swiper.realIndex ?? swiper.activeIndex))
  }

  return (
    <div className="lg:mb-16 mb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-4.5 font-bold text-white mb-4 flex gap-2">
          Game Manufacturers
        </h2>
        <div className="flex justify-end mb-4">
          <div
            className=" hover:bg-gray-600 active:bg-gray-600 w-9 h-9 flex items-center justify-center rounded-l-lg transition-colors cursor-pointer"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <Icon icon="mdi:chevron-left" className="text-white text-[24px] " />
          </div>
          <div
            className="hover:bg-gray-600 active:bg-gray-600 w-9 h-9 flex items-center justify-center rounded-r-lg transition-colors cursor-pointer"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <Icon
              icon="mdi:chevron-right"
              className="text-white text-[24px] "
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto">
        <SwiperSlider
          data={gameManufacturers}
          renderSlide={(manufacturer, index) => (
            <GameCard {...manufacturer} gameCount={manufacturer.gamesCount} />
          )}
          slidesPerView={4.4}
          spaceBetween={12}
          breakpoints={{
            320: { slidesPerView: 1.2 },
            375: { slidesPerView: 1.4 },
            425: { slidesPerView: 1.8 },
            768: { slidesPerView: 3.6 },
            1024: { slidesPerView: 4.2, spaceBetween: 20 },
            1440: { slidesPerView: 4.8 },
          }}
          navigationRef={swiperRef}
          initialSlide={carouselState.gameManufacturersCurrentSlide}
          onSlideChange={handleGameManufacturersSlideChange}
          carouselId="game-manufacturers"
        />
      </div>
    </div>
  )
}

// Game Grid Component
const GameGrid: React.FC<{
  data: any[]
  renderCard: (item: any, index: number) => React.ReactNode
}> = ({ data, renderCard }) => (
  <div className="grid grid-cols-3 md:grid-cols-4 p-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
    {data.map((item, index) => renderCard(item, index))}
  </div>
)

// Filtered Page Header Component
const FilteredPageHeader: React.FC<{
  title: string
  count: number
  icon: string
}> = ({ title, count, icon }) => {
  const { openGameProviderModal, openChooseModal } = useModal()
  const { t } = useI18n()
  const [isOpenSearch, setIsOpenSearch] = useState(true)

  const toggleOpenSearch = () => {
    setIsOpenSearch(!isOpenSearch)
  }

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-4 [@media(max-width:1024px)]:mt-[-4px]">
        <div className="bg-[rgba(255,255,255,0.08)] rounded-lg p-[7px]">
          <h1 className="text-white text-[14px] font-bold flex items-center gap-2">
            <img src={icon} className="w-6 hidden lg:block h-6" alt="game" />
            {title}{' '}
            <span className="text-[#2283F6] text-[12px] bg-[#111923] px-2 py-0.5 rounded-[4px]">
              {count}
            </span>
          </h1>
        </div>
        <div
          onClick={toggleOpenSearch}
          className="p-[10px] bg-[#111923] lg:hidden lg:bg-[rgba(255,255,255,0.04)] flex gap-1 items-center lg:w-50 rounded-lg hover:bg-[rgba(255,255,255,0.08)] transition-colors"
        >
          {!isOpenSearch ? (
            <X className="w-[18px] h-[18px] text-white" />
          ) : (
            <img
              src="/icons/search.svg"
              alt="search"
              className="w-[18px] h-[18px]"
            />
          )}
          <span className="text-[#A7B5CA] hidden lg:block text-sm">Search</span>
        </div>
        <div className="flex gap-4 [@media(max-width:1024px)]:hidden">
          <div
            onClick={openGameProviderModal}
            className="hidden lg:flex w-50 items-center justify-between h-12 px-3 bg-[rgba(255,255,255,0.04)] rounded-lg hover:bg-[rgba(255,255,255,0.08)] transition-colors cursor-pointer"
          >
            <span className="text-[#A7B5CA] text-sm">Game provider</span>
            <svg
              className="w-4 h-4 text-[#A7B5CA]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>

          <div
            onClick={openChooseModal}
            className="hidden lg:flex w-50 items-center justify-between h-12 px-3 bg-[rgba(255,255,255,0.04)] rounded-lg hover:bg-[rgba(255,255,255,0.08)] transition-colors cursor-pointer"
          >
            <span className="text-[#A7B5CA] text-sm">All</span>
            <svg
              className="w-4 h-4 text-[#A7B5CA]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <div
            onClick={toggleOpenSearch}
            className="p-[10px] bg-[#111923] lg:bg-[rgba(255,255,255,0.04)] flex gap-1 items-center lg:w-50 rounded-lg hover:bg-[rgba(255,255,255,0.08)] transition-colors"
          >
            <img
              src="/icons/search.svg"
              alt="search"
              className="w-[18px] h-[18px]"
            />
            <span className="text-[#A7B5CA] hidden lg:block text-sm">
              {t('app.search')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex xl:hidden items-center gap-3">
        {isOpenSearch ? (
          <>
            <div
              onClick={openGameProviderModal}
              className="flex w-[50%] items-center justify-between h-10 px-3 bg-[rgba(255,255,255,0.04)] rounded-lg hover:bg-[rgba(255,255,255,0.08)] transition-colors cursor-pointer"
            >
              <span className="text-[#A7B5CA] text-sm">
                {t('games.providers')}
              </span>
              <svg
                className="w-4 h-4 text-[#A7B5CA]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>

            <div
              onClick={openChooseModal}
              className="flex w-[50%] items-center justify-between h-10 px-3 bg-[rgba(255,255,255,0.04)] rounded-lg hover:bg-[rgba(255,255,255,0.08)] transition-colors cursor-pointer"
            >
              <span className="text-[#A7B5CA] text-sm">All</span>
              <svg
                className="w-4 h-4 text-[#A7B5CA]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </>
        ) : (
          <>
            <div className="flex w-full items-center gap-2 h-10 px-3 bg-[rgba(255,255,255,0.04)] rounded-lg hover:bg-[rgba(255,255,255,0.08)] transition-colors">
              <img
                src="/icons/search.svg"
                alt="search"
                className="w-[18px] h-[18px] flex-shrink-0"
              />
              <input
                type="text"
                placeholder={t('app.search')}
                className="flex-1 bg-transparent text-[#A7B5CA] text-sm placeholder:text-[#A7B5CA] border-none outline-none min-w-0"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function LiveCasinoPage() {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  // Redux state and dispatch
  const dispatch = useAppDispatch()
  const carouselState = useAppSelector(state => state.carousel)

  // Carousel slide change handlers

  const handleLiveCasinoSlideChange = (swiper: SwiperType) => {
    dispatch(setLiveCasinoSlide(swiper.realIndex ?? swiper.activeIndex))
  }

  const handleLatestEarningsSlideChange = (swiper: SwiperType) => {
    dispatch(setLatestEarningsSlide(swiper.realIndex ?? swiper.activeIndex))
  }

  return (
    <div
      className="lg:px-6 w-full max-w-[1920px] mx-auto overflow-x-hidden"
      style={{ margin: 'auto' }}
    >
      <SuccessForm isOpen={isOpen} />

      {/* Mobile Filtered View */}
      <div className="">
        <FilteredPageHeader
          title="Live Casino"
          icon="/icons/Casino1.svg"
          count={card2.length}
        />

        <GameGrid
          data={card2}
          renderCard={(card, index) => <CasinoCard key={index} {...card} />}
        />
      </div>

      {/* Latest Bets Section */}
      <div className="lg:mb-16 mb-8">
        <LatestBetsTable />
      </div>

      {/* Game Manufacturers Section */}
      <GameManufacturersSection />

      {/* Latest Earnings Section */}
      <div className="lg:mb-16 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-4.5 font-bold flex items-center text-white ">
            Latest earnings
          </h2>
          <span className="font-bold flex items-center text-[14px] text-[#2283F6]">
            <span>online users 36</span>
          </span>
        </div>
        <SwiperSlider
          data={card7}
          autoplayDelay={1000000}
          renderSlide={(card, index) => <EarningCard {...card} />}
          slidesPerView={7}
          spaceBetween={12}
          breakpoints={{
            320: { slidesPerView: 3.3 },
            375: { slidesPerView: 3.5 },
            425: { slidesPerView: 4.1 },
            768: { slidesPerView: 4.3 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
            1440: { slidesPerView: 7.3 },
          }}
          initialSlide={carouselState.latestEarningsCurrentSlide}
          onSlideChange={handleLatestEarningsSlideChange}
          carouselId="latest-earnings"
        />
      </div>
    </div>
  )
}
