'use client'

import { useState } from 'react'
import { UnifiedButton } from '@/components/ui'
import { useAppSelector } from '@/store/hooks'
import { useAppDispatch } from '@/store/hooks'
import { logoutUser } from '@/store/slices/authSlice'
import { useLoadingState } from '@/hooks'
import { X, Loader } from 'lucide-react'
import { useLanguage } from '@/context/LanguageProvider'
import { useOverlay } from '@/context/OverlayProvider'
import WalletIcon from '../icons/wallet'
import NotificationIcon from '../icons/notification'
import MedalStarAlt2Icon from '../icons/medal-star-alt-2'
import ChartNetworkIcon from '../icons/chart-network'
import CrownIcon from '../icons/crown'
import LikeIcon from '../icons/like'
import DoughnutChartIcon from '../icons/doughnut-chart'
import SliderAltIcon from '../icons/slider-alt'
import EditIcon from '../icons/edit'
import PriceTagIcon from '../icons/price-tag'
import DockRightArrowIcon from '../icons/dock-right-arrow'
import FlatButton from '../Button/FlatButton'
import Link from 'next/link'
import { useModal } from '@/context/ModalProvider'

interface UserProfileDropdownProps {
  onClose?: () => void
}

const UserProfileDropdown = ({ onClose }: UserProfileDropdownProps) => {
  const [bonusCode, setBonusCode] = useState('')
  const { currentLanguage } = useLanguage()
  const { openNotifications } = useOverlay()
  const auth = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const { isLoading: isLogoutLoading, withLoading: withLogoutLoading } = useLoadingState()

  const menuItems = [
    {
      icon: <WalletIcon />,
      label: 'Wallet',
      count: null,
      href: '/wallet',
      event: onClose,
    },
    {
      icon: <NotificationIcon />,
      label: 'Notifications',
      count: 4,
      href: '#',
      event: () => {
        openNotifications()
        onClose
      },
    },
    {
      icon: <CrownIcon />,
      label: 'VIP Club',
      count: null,
      href: '/vip-club',
      event: onClose,
    },
    {
      icon: <LikeIcon />,
      label: 'Alliance Plan',
      count: null,
      href: '/alliance',
      event: onClose,
    },
    {
      icon: <MedalStarAlt2Icon />,
      label: 'Game records',
      count: null,
      href: '/wallet?tab=gamehistory',
      event: onClose,
    },
    {
      icon: <DoughnutChartIcon />,
      label: 'Data Statistics',
      count: null,
      href: '/wallet?tab=datastatistics',
      event: onClose,
    },
    {
      icon: <SliderAltIcon />,
      label: 'Settings',
      count: null,
      href: '/settings',
      event: onClose,
    },
    {
      label: `Default Lang: ${currentLanguage.name}`,
      count: null,
      flag: currentLanguage.code,
      href: '#',
      event: onClose,
    },
  ]

  return (
    <div className="lg:w-[282px] md:w-[282px] w-full h-screen lg:h-auto lg:rounded-[14px] glass-bg p-0 text-white font-montserrat backdrop-blur-[32px] overflow-y-auto">
      <div
        onClick={onClose}
        className="flex absolute right-4 top-4 h-9 w-9 items-center justify-center rounded-lg border border-white-4 bg-white-4 backdrop-blur-[32px] hover:bg-white-8 transition-colors lg:hidden z-10"
        style={{
          boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.16) inset',
        }}
      >
        <X size={16} className="text-[var(--casper)]" />
      </div>
      {/* User Profile Section */}
      <div className="p-4 lg:p-4 pt-5 lg:pt-4 flex flex-col items-center lg:justify-start lg:min-h-0">
        <div className="flex flex-col items-center gap-2 w-[88%] ">
          {/* Avatar with VIP Badge */}
          <div className="relative flex flex-col items-center gap-[-10px]">
            <div className="relative">
              <img
                src={auth.user?.avatar || '/images/Frame.png'}
                alt="User avatar"
                className="w-16 h-16 rounded-2xl shadow-[0_1px_0_0_rgba(255,255,255,0.16)_inset] backdrop-blur-[32px]"
              />
              {/* VIP Badge - positioned to overlap the bottom of the avatar */}
              <div className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 z-10">
                <div
                  className="h-5 px-2 flex items-center justify-center rounded-2xl border border-white shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset]"
                  style={{ backgroundColor: 'var(--malachite)' }}
                >
                  <span className="text-white text-xs font-bold whitespace-nowrap">
                    VIP 1
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Display name or fallback email */}
          <div className="flex items-center gap-1 mt-2">
            <span className="text-white text-sm font-bold">
              <span>{(auth.user?.name && auth.user.name.trim()) || auth.user?.email || 'User'}</span>
            </span>
            <EditIcon className="w-4 h-4" />
          </div>

          {/* VIP Progress */}
          <div className="w-full flex flex-col gap-0.5">
            <div className="flex justify-between items-center">
              <span className="text-white text-[10px] font-bold">
                <span>VIP 1</span>
              </span>
              <span className="text-white text-[10px] font-bold">
                <span>VIP 1</span>
              </span>
            </div>

            {/* Progress Bar */}
            <div className="glass-input rounded-lg p-0.5">
              <div className="relative w-full h-2 rounded-lg">
                <div
                  className="w-[116px] h-full border border-white-4 rounded-lg"
                  style={{ backgroundColor: 'var(--crimson)' }}
                ></div>
                <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/b06c41ce5f767b8fe02cc82d8bf934e68565f90a?width=24"
                    alt="Chest"
                    className="w-3 h-3"
                  />
                  <span className="text-white text-[10px]">50%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bonus Code Section */}
      <div className="px-4 pb-4 lg:pb-2">
        <div className="p-4 rounded-xl">
          {/* Bonus Code Header */}
          <div className="flex items-center gap-2 mb-4">
            <PriceTagIcon className="w-4 h-4" />
            <span
              className="text-sm font-bold"
              style={{ color: 'var(--casper)' }}
            >
              Bonus code
            </span>
          </div>

          {/* Input Field */}
          <div className="flex glass-input rounded-xl p-1.5 gap-1">
            <input
              type="text"
              value={bonusCode}
              onChange={e => setBonusCode(e.target.value)}
              placeholder="Enter bonus code"
              className="flex-1 text-gallery bg-transparent text-xs border-none outline-none px-3 w-[30px] placeholder:text-blue-bayoux"
              style={{ color: 'var(--blue-bayoux)' }}
            />
            <FlatButton className="text-xs font-bold h-9 px-4">
              <span>Send</span>
            </FlatButton>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 pb-4 lg:pb-2">
        <div className="flex flex-col gap-0.5">
          {menuItems.map((item, index) => {
            const isActive = (item as any).isActive
            return (
              <Link
                href={item.href}
                onClick={item.event}
                key={index}
                className={`flex items-center gap-2 h-12 px-4 rounded-lg text-casper transition-colors group backdrop-blur-[32px] ${
                  isActive
                    ? 'bg-[var(--chip-purple)]/20 border border-[var(--chip-purple)]/30'
                    : 'hover:bg-white/5'
                }`}
              >
                {item.icon}
                {/* Flag icon for language item */}
                {(item as any).flag && (
                  <img
                    src={`/icons/flag-icon/${(item as any).flag}.svg`}
                    className="w-5 h-5"
                    alt="language flag"
                  />
                )}
                <span
                  className={`flex items-center gap-2 text-left text-sm font-bold transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-[var(--casper)] group-hover:text-white'
                  }`}
                >
                  {item.label}
                  {item.count && (
                    <div
                      className=" rounded-md px-1.5 py-0.5 shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset]"
                      style={{
                        backgroundColor: 'var(--malachite)',
                      }}
                    >
                      <span className="text-white text-xs font-bold">
                        {item.count}
                      </span>
                    </div>
                  )}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Log Out */}
      <div className="px-4 pb-8 lg:pb-2">
        <div
          onClick={isLogoutLoading ? undefined : withLogoutLoading(async () => {
            try {
              await dispatch(logoutUser()).unwrap()
            } finally {
              onClose?.()
            }
          })}
          className={`flex items-center text-casper gap-2 h-12 px-4 rounded-lg transition-colors group w-full backdrop-blur-[32px] ${
            isLogoutLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-white/5'
          }`}
        >
          <DockRightArrowIcon />
          <span
            className="flex-1 text-left text-sm font-bold group-hover:text-white transition-colors flex items-center gap-2"
            style={{ color: 'var(--casper)' }}
          >
            {isLogoutLoading ? (
              <>
                <Loader className="animate-spin h-4 w-4" />
                Logging out...
              </>
            ) : (
              'Log out'
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default UserProfileDropdown
