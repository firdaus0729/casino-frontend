'use client'

import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

interface AllianceTabButtonProps {
  icon: string
  label: string
  isActive: boolean
  onClick: () => void
}

const AllianceTabButton = ({
  icon,
  label,
  isActive,
  onClick,
}: AllianceTabButtonProps) => (
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
    <div className={isActive ? 'text-[#ED1D49]' : 'text-[#A7B5CA]'}>
      <img src={icon} alt={label} className="w-[19.2px] h-[19.2px]" />
    </div>
    <div
      className={`
        flex justify-center items-center text-[10px] leading-none font-montserrat
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
    </div>
  </div>
)

export default function AllianceBottomBar() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentTab = searchParams.get('tab') || 'invite'

  const allianceTabs = [
    {
      id: 'invite',
      label: 'Invite Friends',
      icon: '/icons/user-plus.svg',
    },
    {
      id: 'management',
      label: 'Management',
      icon: '/icons/group.svg',
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: '/icons/chart-network.svg',
    },
    {
      id: 'report',
      label: 'Report',
      icon: '/icons/file-report.svg',
    },
    {
      id: 'introduction',
      label: 'Introduction',
      icon: '/icons/form.png',
    },
  ]

  const handleTabClick = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', tabId)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="fixed block lg:hidden bottom-0 left-0 right-0 z-50 bottom-bar">
      <div
        className="flex w-full px-4 pt-2 pb-0 flex-col items-center rounded-t-2xl border-t border-white-8"
        style={{
          background: 'rgba(17, 25, 35, 0.54)',
          backdropFilter: 'blur(32px)',
          height: '59px',
        }}
      >
        <div className="flex justify-center items-start gap-2 w-full rounded-lg">
          {allianceTabs.map(tab => (
            <AllianceTabButton
              key={tab.id}
              icon={tab.icon}
              label={tab.label}
              isActive={currentTab === tab.id}
              onClick={() => handleTabClick(tab.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
