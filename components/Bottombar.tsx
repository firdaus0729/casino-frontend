'use client'

import { useState, Suspense } from 'react'
import { useSidebar } from '../context/SidebarProvider'
import { useBottomBar } from '../context/BottomBarProvider'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useSimpleKeyboardDetection } from '@/hooks/useSimpleKeyboardDetection'
import { useT } from '../context/I18nProvider'

interface TabBarButtonProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  onClick?: () => void
}

const TabBarButton = ({
  icon,
  label,
  isActive = false,
  onClick,
}: TabBarButtonProps) => (
  <div
    className={`
      flex h-12 px-0 py-2 flex-col justify-center items-center gap-2 flex-1 cursor-pointer
      ${isActive ? 'relative' : ''}
    `}
    style={
      isActive
        ? {
            background:
              'radial-gradient(53.45% 44.05% at 50% 105.16%, rgba(237, 29, 73, 0.33) 0%, rgba(237, 29, 73, 0.00) 100%)',
          }
        : {}
    }
    onClick={onClick}
  >
    <span className={isActive ? 'text-[#ED1D49]' : 'text-[#A7B5CA]'}>
      {icon}
    </span>
    <span
      className={`
        text-center text-[0.625rem] leading-none font-montserrat
        ${isActive ? 'text-white' : 'text-[#A7B5CA]'}
      `}
      style={
        isActive
          ? {
              fontStyle: 'bold',
              WebkitTextStrokeColor: '#ffffff',
            }
          : {}
      }
    >
      {label}
    </span>
  </div>
)

function BottombarContent() {
  const [activeTab, setActiveTab] = useState('Menu')
  const { toggleSidebar, isCollapsed } = useSidebar()
  const { isHidden } = useBottomBar()
  const { getBottomBarClasses } = useSimpleKeyboardDetection()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useT()

  const isAlliance = pathname === '/alliance'

  const defaultTabs = [
    {
      id: 'Menu',
      label: t('navigation.menu'),
      icon: (
        <svg
          width="17"
          height="19"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[1.05rem] h-[1.2rem] flex-shrink-0"
          onClick={toggleSidebar}
        >
          <g clipPath="url(#clip0_menu)">
            <path
              opacity="0.4"
              d="M0.400024 10.3997C0.400024 9.73596 0.936274 9.19971 1.60002 9.19971H16C16.6638 9.19971 17.2 9.73596 17.2 10.3997C17.2 11.0635 16.6638 11.5997 16 11.5997H1.60002C0.936274 11.5997 0.400024 11.0635 0.400024 10.3997Z"
              fill="currentColor"
            />
            <path
              d="M17.2 4.39971C17.2 3.73596 16.6638 3.19971 16 3.19971H1.60002C0.936274 3.19971 0.400024 3.73596 0.400024 4.39971C0.400024 5.06346 0.936274 5.59971 1.60002 5.59971H16C16.6638 5.59971 17.2 5.06346 17.2 4.39971ZM17.2 16.3997C17.2 15.736 16.6638 15.1997 16 15.1997H1.60002C0.936274 15.1997 0.400024 15.736 0.400024 16.3997C0.400024 17.0635 0.936274 17.5997 1.60002 17.5997H16C16.6638 17.5997 17.2 17.0635 17.2 16.3997Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_menu">
              <rect
                width="16.8"
                height="19.2"
                fill="white"
                transform="translate(0.400024 0.799805)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: 'Sport',
      label: t('games.sports'),
      icon: (
        <svg
          width="19"
          height="19"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[1.2rem] h-[1.2rem] flex-shrink-0"
        >
          <g clipPath="url(#clip0_sport)">
            <path
              opacity="0.4"
              d="M0.837524 11.2585C0.968774 12.736 1.43377 14.1198 2.15752 15.3273C3.50377 15.2373 4.85002 15.1473 6.19252 15.0573C6.43252 15.0423 6.67252 15.1098 6.87127 15.2523C7.07002 15.3948 7.20877 15.601 7.26502 15.8373C7.59502 17.146 7.92502 18.451 8.25877 19.7598C8.94502 19.9173 9.66127 19.9998 10.3963 19.9998C11.1313 19.9998 11.8475 19.9173 12.5338 19.7598C12.8638 18.451 13.1938 17.146 13.5275 15.8373C13.5875 15.601 13.7263 15.3948 13.9213 15.2523C14.1163 15.1098 14.3563 15.0423 14.6 15.0573L18.635 15.3273C19.3588 14.1198 19.8275 12.736 19.955 11.2585C18.815 10.5385 17.6713 9.82227 16.5313 9.10227C16.325 8.97477 16.1713 8.77602 16.0963 8.54727C16.0213 8.31852 16.0288 8.06727 16.1188 7.84227C16.6213 6.58977 17.12 5.33727 17.6225 4.08852C16.6813 3.00852 15.5 2.14227 14.1613 1.57227C13.1263 2.43477 12.0875 3.30102 11.0525 4.16352C10.865 4.31727 10.6325 4.40352 10.3888 4.40352C10.145 4.40352 9.91253 4.31727 9.72503 4.16352C8.69002 3.30102 7.65128 2.43477 6.61627 1.57227C5.29252 2.14227 4.11127 3.00852 3.16627 4.08477C3.66877 5.33727 4.16752 6.58977 4.67002 7.83852C4.76002 8.06352 4.76752 8.31102 4.69252 8.54352C4.61752 8.77602 4.46377 8.97102 4.25752 9.09852C3.11752 9.82227 1.97752 10.5385 0.837524 11.2585ZM7.03627 9.86352C6.91627 9.49227 7.04752 9.08727 7.36252 8.85852L9.87127 7.03602C10.1863 6.80727 10.6138 6.80727 10.9288 7.03602C11.765 7.64352 12.6013 8.25102 13.4375 8.85852C13.7525 9.08727 13.8838 9.49227 13.7638 9.86352C13.445 10.846 13.1263 11.8285 12.8038 12.811C12.6838 13.1823 12.3388 13.4335 11.9488 13.4335H8.84752C8.45752 13.4335 8.11252 13.1823 7.99252 12.811C7.67377 11.8285 7.35502 10.846 7.03627 9.86352Z"
              fill="currentColor"
            />
            <path
              d="M0.837549 11.2586C0.811299 10.9773 0.800049 10.6886 0.800049 10.3998C0.800049 7.98105 1.69255 5.77231 3.1663 4.0848L4.67005 7.83855C4.76005 8.06355 4.76755 8.31106 4.69255 8.54355C4.61755 8.77605 4.4638 8.97106 4.25755 9.09856L0.837549 11.2586ZM8.26255 19.7598C5.67505 19.1711 3.48505 17.5398 2.15755 15.3273L6.19255 15.0573C6.43255 15.0423 6.67255 15.1098 6.8713 15.2523C7.07005 15.3948 7.2088 15.6011 7.26505 15.8373L8.26255 19.7598ZM18.6425 15.3273C17.315 17.5398 15.125 19.1711 12.5375 19.7598L13.5313 15.8373C13.5913 15.6011 13.73 15.3948 13.925 15.2523C14.12 15.1098 14.36 15.0423 14.6038 15.0573L18.6388 15.3273H18.6425ZM17.6338 4.0848C19.1075 5.77231 20 7.98105 20 10.3998C20 10.6886 19.9888 10.9736 19.9625 11.2586L16.5388 9.1023C16.3326 8.9748 16.1788 8.77606 16.1038 8.54731C16.0288 8.31856 16.0363 8.06731 16.1263 7.84231L17.6338 4.0848ZM14.1725 1.56855L11.0638 4.1598C10.8763 4.31355 10.6438 4.3998 10.4 4.3998C10.1563 4.3998 9.9238 4.31355 9.7363 4.1598L6.62755 1.56855C7.7863 1.07355 9.0613 0.799805 10.4 0.799805C11.7388 0.799805 13.0138 1.07355 14.1725 1.56855ZM9.8713 7.03606C10.1863 6.8073 10.6138 6.8073 10.9288 7.03606L13.4375 8.8548C13.7525 9.08356 13.8838 9.48855 13.7638 9.85981L12.8075 12.8073C12.6875 13.1786 12.3425 13.4298 11.9525 13.4298H8.8513C8.4613 13.4298 8.1163 13.1786 7.9963 12.8073L7.0363 9.85981C6.9163 9.48855 7.04755 9.08356 7.36255 8.8548L9.8713 7.0323V7.03606Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_sport">
              <rect
                width="19.2"
                height="19.2"
                fill="white"
                transform="translate(0.800049 0.799805)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: 'Referrals',
      label: t('promotions.referral'),
      icon: (
        <svg
          width="19"
          height="19"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[1.2rem] h-[1.2rem] flex-shrink-0"
        >
          <g clipPath="url(#clip0_referrals)">
            <path
              opacity="0.4"
              d="M6.40002 10.066V10.9998V12.7998V14.236C6.40002 15.4398 7.00002 16.5648 8.00127 17.2323L9.44502 18.196C10.0375 18.5898 10.7313 18.7998 11.4438 18.7998H15.1C16.0938 18.7998 16.9 17.9935 16.9 16.9998C16.9 16.8648 16.885 16.7373 16.8588 16.6098C17.5788 16.3735 18.1 15.6985 18.1 14.8998C18.1 14.5585 18.0063 14.2398 17.8413 13.966C18.6738 13.8085 19.3 13.0773 19.3 12.1998C19.3 11.6335 19.0375 11.1273 18.6288 10.7973C19.2063 10.4973 19.6 9.89351 19.6 9.19976C19.6 8.20601 18.7938 7.39976 17.8 7.39976H12.4C12.9138 6.53351 13.2813 5.58101 13.48 4.57976L13.5663 4.15226C13.7613 3.17726 13.1275 2.22851 12.1525 2.03351C12.0325 2.01101 11.9163 1.99976 11.7963 1.99976C10.9563 1.99976 10.2025 2.59226 10.0338 3.44726L9.94752 3.87476C9.70002 5.11976 9.01752 6.23726 8.02752 7.03226L7.75002 7.25351C6.89502 7.93601 6.40002 8.97101 6.40002 10.066Z"
              fill="currentColor"
            />
            <path
              d="M0.400024 9.19976C0.400024 8.53601 0.936274 7.99976 1.60002 7.99976H4.00002C4.66377 7.99976 5.20002 8.53601 5.20002 9.19976V17.5998C5.20002 18.2635 4.66377 18.7998 4.00002 18.7998H1.60002C0.936274 18.7998 0.400024 18.2635 0.400024 17.5998V9.19976Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_referrals">
              <rect
                width="19.2"
                height="19.2"
                fill="white"
                transform="translate(0.400024 0.799805)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: 'Activity',
      label: t('navigation.promotions'),
      icon: (
        <svg
          width="19"
          height="19"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[1.2rem] h-[1.2rem] flex-shrink-0"
        >
          <g clipPath="url(#clip0_activity)">
            <path
              opacity="0.4"
              d="M6.10352e-05 6.79985C6.10352e-05 6.1361 0.536311 5.59985 1.20006 5.59985H2.76006C3.03381 6.13235 3.44631 6.58235 3.95256 6.9011C4.20756 7.0586 4.48131 7.18235 4.77381 7.2686C4.92006 7.30985 5.07006 7.3436 5.22381 7.3661C5.30256 7.37735 5.37756 7.38485 5.45631 7.39235C5.49381 7.3961 5.53506 7.3961 5.57631 7.39985C5.61756 7.4036 5.65506 7.4036 5.69631 7.4036H8.09631H8.39631V10.4036L1.20006 10.3999C0.536311 10.3999 6.10352e-05 9.8636 6.10352e-05 9.19985V6.79985ZM1.20006 11.5999H8.40006V19.9999H3.00006C2.00631 19.9999 1.20006 19.1936 1.20006 18.1999V11.5999ZM10.8001 7.39985H13.5001C14.7826 7.39985 15.8926 6.6686 16.4401 5.59985H18.0001C18.6638 5.59985 19.2001 6.1361 19.2001 6.79985V9.19985C19.2001 9.8636 18.6638 10.3999 18.0001 10.3999H10.8001V7.39985ZM10.8001 11.5999H18.0001V18.1999C18.0001 19.1936 17.1938 19.9999 16.2001 19.9999H10.8001V11.5999Z"
              fill="currentColor"
            />
            <path
              d="M7.14384 3.3798L8.44884 5.5998H8.40009H8.10009H5.70009C4.87134 5.5998 4.20009 4.92856 4.20009 4.0998C4.20009 3.27105 4.87134 2.5998 5.70009 2.5998H5.78259C6.34134 2.5998 6.86259 2.89605 7.14384 3.3798ZM9.60009 4.00605L8.69634 2.46855C8.08884 1.43355 6.97884 0.799805 5.78259 0.799805H5.70009C3.87759 0.799805 2.40009 2.2773 2.40009 4.0998C2.40009 5.9223 3.87759 7.39981 5.70009 7.39981H8.10009H8.40009V10.3998H10.8001V7.39981H13.5001C15.3226 7.39981 16.8001 5.9223 16.8001 4.0998C16.8001 2.2773 15.3226 0.799805 13.5001 0.799805H13.4176C12.2213 0.799805 11.1113 1.43355 10.5038 2.4648L9.60009 4.00605ZM12.0563 3.3798C12.3413 2.89605 12.8588 2.5998 13.4176 2.5998H13.5001C14.3288 2.5998 15.0001 3.27105 15.0001 4.0998C15.0001 4.92856 14.3288 5.5998 13.5001 5.5998H10.7513L12.0563 3.3798ZM10.8001 19.9998V11.5998H8.40009V19.9998H10.8001Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_activity">
              <rect
                width="19.2"
                height="19.2"
                fill="white"
                transform="translate(6.10352e-05 0.799805)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: 'Chat',
      label: 'Chat',
      icon: (
        <svg
          width="24"
          height="19"
          viewBox="0 0 25 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-[1.2rem] flex-shrink-0"
        >
          <g clipPath="url(#clip0_chat)">
            <path
              opacity="0.4"
              d="M9.79999 13.9999H13.4C15.3875 13.9999 17 12.3874 17 10.3999V5.59985H21.8C23.1237 5.59985 24.2 6.6761 24.2 7.99985V15.1999C24.2 16.5236 23.1237 17.5999 21.8 17.5999H20.6V19.3999C20.6 19.6286 20.4725 19.8349 20.27 19.9361C20.0675 20.0374 19.8237 20.0149 19.64 19.8799L16.5987 17.5999H12.2C10.8762 17.5999 9.79999 16.5236 9.79999 15.1999V13.9999Z"
              fill="currentColor"
            />
            <path
              d="M0.200012 3.1998C0.200012 1.87605 1.27626 0.799805 2.60001 0.799805H13.4C14.7238 0.799805 15.8 1.87605 15.8 3.1998V10.3998C15.8 11.7236 14.7238 12.7998 13.4 12.7998H7.80126L4.76001 15.0798C4.58001 15.2148 4.33626 15.2373 4.13001 15.1361C3.92376 15.0348 3.80001 14.8286 3.80001 14.5998V12.7998H2.60001C1.27626 12.7998 0.200012 11.7236 0.200012 10.3998V3.1998Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_chat">
              <rect
                width="24"
                height="19.2"
                fill="white"
                transform="translate(0.200012 0.799805)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ]

  const allianceTabs = [
    {
      id: 'invite',
      label: t('alliance.inviteFriends'),
      icon: (
        <img
          src="/icons/user-plus.svg"
          alt={t('alliance.inviteFriends')}
          className="w-[1.2rem] h-[1.2rem]"
        />
      ),
    },
    {
      id: 'management',
      label: t('alliance.management'),
      icon: (
        <img
          src="/icons/group.svg"
          alt={t('alliance.management')}
          className="w-[1.2rem] h-[1.2rem]"
        />
      ),
    },
    {
      id: 'performance',
      label: t('alliance.performance'),
      icon: (
        <img
          src="/icons/chart-network.svg"
          alt={t('alliance.performance')}
          className="w-[1.2rem] h-[1.2rem]"
        />
      ),
    },
    {
      id: 'report',
      label: t('alliance.report'),
      icon: (
        <img
          src="/icons/file-report.svg"
          alt={t('alliance.report')}
          className="w-[1.2rem] h-[1.2rem]"
        />
      ),
    },
    {
      id: 'introduction',
      label: t('alliance.introduction'),
      icon: (
        <img
          src="/icons/form.png"
          alt={t('alliance.introduction')}
          className="w-[1.2rem] h-[1.2rem]"
        />
      ),
    },
  ]

  const currentAllianceTab = searchParams.get('tab') || 'invite'

  const handleAllianceTabClick = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', slug)
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)

    // Handle navigation for specific tabs
    if (tabId === 'Referrals') {
      router.push('/alliance')
    } else if (tabId === 'Activity') {
      router.push('/promotions')
    } else if (tabId === 'Menu') {
      toggleSidebar()
    }
  }

  const baseClasses = `fixed block lg:hidden left-0 right-0 bottom-0 z-50 bottom-bar transition-transform duration-300 ${
    isHidden ? 'translate-y-full' : 'translate-y-0'
  }`
  const bottomBarClasses = getBottomBarClasses(baseClasses)

  return (
    <div
      className={bottomBarClasses}
      style={{
        zIndex: 9999,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <div
        className="flex w-full px-4 pt-2 pb-0 flex-col items-center rounded-t-2xl border-t border-white-8"
        style={{
          background: 'rgba(17, 25, 35, 0.54)',
          backdropFilter: 'blur(2rem)',
          height: '3.6875rem',
        }}
      >
        <div className="flex justify-center items-start gap-2 w-full rounded-lg">
          {isAlliance
            ? allianceTabs.map(tab => (
                <TabBarButton
                  key={tab.id}
                  icon={tab.icon}
                  label={tab.label}
                  isActive={currentAllianceTab === tab.id}
                  onClick={() => handleAllianceTabClick(tab.id)}
                />
              ))
            : defaultTabs.map(tab => (
                <TabBarButton
                  key={tab.id}
                  icon={tab.icon}
                  label={tab.label}
                  isActive={
                    tab.id === 'Menu' ? !isCollapsed : activeTab === tab.id
                  }
                  onClick={() => handleTabClick(tab.id)}
                />
              ))}
        </div>
      </div>
    </div>
  )
}

// Wrapper component with Suspense boundary
export default function Bottombar() {
  return (
    <Suspense
      fallback={
        <div>
          <span>Loading bottom bar...</span>
        </div>
      }
    >
      <BottombarContent />
    </Suspense>
  )
}
