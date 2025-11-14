'use client'

import React, { useState } from 'react'
import mainContentData from '../../main-content-data.json'
import { useModal } from '../../context/ModalProvider'
import { useI18n } from '../../context/I18nProvider'
import { Swiper as SwiperType } from 'swiper'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import {
  setMainBannerSlide,
  setLiveCasinoSlide,
} from '../../store/slices/carouselSlice'
import CasinoCard from '../../components/ui/cards/CasinoCard'
import RewardCard from '../../components/ui/cards/RewardCard'
import { SuccessForm } from '../../components/auth/SuccessForm'
import SwiperSlider from '../../components/ui/slider/SwiperSlider'
import { X } from 'lucide-react'

// Extract data from JSON
const {
  card2,
} = mainContentData

const bannerCards = [
  {
    button: 'CLAIM NOW',
    image: '/images/banner/Banner12.jpg',
    link: '#',
  },
  {
    button: 'JOIN NOW',
    image: '/images/banner/Banner10.jpg',
    link: '#',
  },
  {
    button: 'JOIN NOW',
    image: '/images/banner/Banner09.jpg',
    link: '#',
  },
  {
    button: 'CLAIM NOW',
    image: '/images/banner/Banner12.jpg',
    link: '#',
  },
  {
    button: 'JOIN NOW',
    image: '/images/banner/Banner10.jpg',
    link: '#',
  },
  {
    button: 'JOIN NOW',
    image: '/images/banner/Banner09.jpg',
    link: '#',
  },
  {
    button: 'CLAIM NOW',
    image: '/images/banner/Banner12.jpg',
    link: '#',
  },
  {
    button: 'JOIN NOW',
    image: '/images/banner/Banner10.jpg',
    link: '#',
  },
  {
    button: 'JOIN NOW',
    image: '/images/banner/Banner09.jpg',
    link: '#',
  },
] as const

// Game Grid Component
const GameGrid: React.FC<{
  data: any[]
  renderCard: (item: any, index: number) => React.ReactNode
}> = ({ data, renderCard }) => (
  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 pb-4">
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
          onClick={() => setIsOpenSearch(!isOpenSearch)}
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
            className="hidden lg:flex w-50 items-center justify-between h-12 px-3 bg-white-4 rounded-lg hover:bg-white-8 transition-colors cursor-pointer"
          >
            <span className="text-[#A7B5CA] text-sm">Game provider</span>
            <svg
              className="w-4 h-4 text-casper"
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
            className="hidden lg:flex w-50 items-center justify-between h-12 px-3 bg-white-4 rounded-lg hover:bg-white-8 transition-colors cursor-pointer"
          >
            <span className="text-casper text-sm">All</span>
            <svg
              className="w-4 h-4 text-casper"
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
            onClick={() => setIsOpenSearch(!isOpenSearch)}
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
                className="w-4 h-4 text-casper"
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
              <span className="text-casper text-sm">All</span>
              <svg
                className="w-4 h-4 text-casper"
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

// Section header component
const SectionHeader: React.FC<{
  icon: string
  title: string
  alt: string
}> = ({ icon, title, alt }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-4.5 font-bold flex items-center text-white gap-2">
      <img className="grayscale" src={icon} alt={alt} />
      {title}
    </h2>
    <span className="font-bold flex items-center text-[14px] text-dodger-blue">
      <span>all 13</span>
    </span>
  </div>
)

export default function CasinoPage() {
  const { t } = useI18n()
  const [isOpen] = useState(false)

  // Redux state and dispatch
  const dispatch = useAppDispatch()
  const carouselState = useAppSelector(state => state.carousel)

  // Carousel slide change handlers
  const handleMainBannerSlideChange = (swiper: SwiperType) => {
    dispatch(setMainBannerSlide(swiper.realIndex ?? swiper.activeIndex))
  }

  const handleLiveCasinoSlideChange = (swiper: SwiperType) => {
    dispatch(setLiveCasinoSlide(swiper.realIndex ?? swiper.activeIndex))
  }

  return (
    <div
      className="lg:px-6 w-full max-w-[1920px] mx-auto overflow-x-hidden"
      style={{ margin: 'auto' }}
    >
      <SuccessForm isOpen={isOpen} />

      {/* Main Banner Section */}
      <div className="lg:mb-16 mb-8 lg:mt-0 mt-[45px]">
        <SwiperSlider
          key="banner-swiper"
          data={bannerCards}
          renderSlide={(card) => <RewardCard {...card} />}
          slidesPerView="auto"
          autoplay={false}
          spaceBetween={12}
          slideClassName="!w-[min(486.76px,100%)]"
          showProgressBars={true}
          customPagination={true}
          initialSlide={carouselState.mainBannerCurrentSlide}
          onSlideChange={handleMainBannerSlideChange}
          carouselId="main-banner"
        />
      </div>

      {/* Mobile Filtered View */}
      <div className="">
        <FilteredPageHeader
          title="Live Casino"
          icon="/icons/Casino1.svg"
          count={104}
        />

        <GameGrid
          data={card2}
          renderCard={(card, index) => <CasinoCard key={index} {...card} />}
        />
      </div>

      {/* Desktop Slider View */}
      <div className="hidden lg:block">
        <div className="lg:mb-16 mb-8">
          <SectionHeader
            icon="/icons/Casino1.svg"
            title={t('games.live')}
            alt="lobby"
          />
          <SwiperSlider
            data={card2}
            autoplayDelay={1000000}
            grid={{ rows: 2, fill: 'row' }}
            renderSlide={(card) => <CasinoCard {...card} />}
            slidesPerView={7}
            spaceBetween={12}
            slideClassName="mb-1"
            breakpoints={{
              320: {
                slidesPerView: 3.3,
                grid: { rows: 2, fill: 'row' },
              },
              375: {
                slidesPerView: 3.5,
                grid: { rows: 2, fill: 'row' },
              },
              425: {
                slidesPerView: 4.1,
                grid: { rows: 2, fill: 'row' },
              },
              768: {
                slidesPerView: 4.3,
                grid: { rows: 2, fill: 'row' },
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
                grid: { rows: 2, fill: 'row' },
              },
              1440: {
                slidesPerView: 7,
                grid: { rows: 2, fill: 'row' },
              },
            }}
            initialSlide={carouselState.liveCasinoCurrentSlide}
            onSlideChange={handleLiveCasinoSlideChange}
            carouselId="live-casino"
          />
        </div>
      </div>
    </div>
  )
}
