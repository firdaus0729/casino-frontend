'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import { UnifiedButton } from '../ui'
import { useI18n } from '@/context/I18nProvider'

interface MobileGameNavProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

export const MobileGameNav: React.FC<MobileGameNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const swiperRef = useRef<SwiperType | null>(null)
  const { t } = useI18n()

  // Game navigation tabs for mobile with translations
  const gameNavTabs = useMemo(
    () => [
      {
        id: 'lobby',
        label: t('games.lobby'),
        icon: '/icons/Home.svg',
        active: false,
      },
      {
        id: 'hash',
        label: t('games.hashgames'),
        icon: '/icons/Hash.svg',
        active: false,
      },
      {
        id: 'slots',
        label: t('games.slots'),
        icon: '/icons/Slots.svg',
        active: false,
      },
      {
        id: 'casino',
        label: t('games.live'),
        icon: '/icons/Casino1.svg',
        active: false,
      },
      {
        id: 'futures',
        label: t('games.futures'),
        icon: '/icons/Futures1.svg',
        active: false,
      },
      {
        id: 'crypto',
        label: t('games.crypto'),
        icon: '/icons/Cryptogra1.svg',
        active: false,
      },
      {
        id: 'sport',
        label: t('games.sports'),
        icon: '/icons/Sport.svg',
        active: false,
      },
      {
        id: 'table',
        label: t('games.table'),
        icon: '/icons/tablegame.svg',
        active: false,
      },
    ],
    [t]
  )

  useEffect(() => {
    const index = gameNavTabs.findIndex(t => t.id === activeTab)
    if (swiperRef.current && index >= 0) {
      swiperRef.current.slideTo(index, 300)
    }
  }, [activeTab, gameNavTabs])

  return (
    <div className="lg:hidden px-2 py-1">
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        slidesPerView="auto"
        spaceBetween={6}
        onSwiper={inst => {
          swiperRef.current = inst
        }}
      >
        {gameNavTabs.map((tab, idx) => (
          <SwiperSlide key={tab.id} className="!w-auto">
            <UnifiedButton
              onClick={() => {
                onTabChange(tab.id)
                swiperRef.current?.slideTo(idx, 250)
              }}
              variant={activeTab === tab.id ? 'primary' : 'secondary'}
              className="!h-8 py-4 px-2 whitespace-nowrap min-w-fit"
            >
              <img src={tab.icon} alt={tab.label} className="w-5 h-5" />
              <span className="text-[0.8rem] font-bold">{tab.label}</span>
            </UnifiedButton>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

