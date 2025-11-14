'use client'

import React, { useEffect, useMemo, useState, Suspense } from 'react'
import InviteFriends from '@/features/alliance/components/InviteFriends'
import Management from '@/features/alliance/components/Management'
import Performance from '@/features/alliance/components/Performance'
import Report from '@/features/alliance/components/Report'
import Introduction from '@/features/alliance/components/Introduction'
import AllianceBottomBar from '@/features/alliance/components/AllianceBottomBar'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useI18n } from '@/context/I18nProvider'
import useAuthGuard from '@/hooks/useAuthGuard'

function AlliancePageContent() {
  const { t } = useI18n()
  const { } = useAuthGuard()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const tabSlugToName = useMemo(
    () =>
      ({
        invite: 'Invite Friends',
        management: 'Management',
        performance: 'Performance',
        report: 'Report',
        introduction: 'Introduction',
      }) as const,
    []
  )

  const tabNameToSlug = useMemo(
    () =>
      ({
        'Invite Friends': 'invite',
        Management: 'management',
        Performance: 'performance',
        Report: 'report',
        Introduction: 'introduction',
      }) as const,
    []
  )

  const [activeTab, setActiveTab] = useState<string>('Invite Friends')

  useEffect(() => {
    const fromQuery = searchParams.get('tab')
    if (fromQuery && tabSlugToName[fromQuery as keyof typeof tabSlugToName]) {
      setActiveTab(tabSlugToName[fromQuery as keyof typeof tabSlugToName])
    }
  }, [searchParams, tabSlugToName])

  const updateQuery = (nextTabName: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', tabNameToSlug[nextTabName as keyof typeof tabNameToSlug])
    router.replace(`${pathname}?${params.toString()}`)
  }

  const navigationItems = [
    {
      name: t('alliance.inviteFriends'),
      key: 'Invite Friends',
      icon: '/icons/user-plus.svg',
    },
    {
      name: t('alliance.management'),
      key: 'Management',
      icon: '/icons/group.svg',
    },
    {
      name: t('alliance.performance'),
      key: 'Performance',
      icon: '/icons/chart-network.svg',
    },
    {
      name: t('alliance.report'),
      key: 'Report',
      icon: '/icons/file-report.svg',
    },
    {
      name: t('alliance.introduction'),
      key: 'Introduction',
      icon: '/icons/form.png',
    },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'Invite Friends':
        return <InviteFriends />
      case 'Management':
        return <Management />
      case 'Performance':
        return <Performance />
      case 'Report':
        return <Report />
      case 'Introduction':
        return <Introduction />
      default:
        return <InviteFriends />
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4 justify-between pb-16 md:pb-0 max-w-6xl p-2 m-auto">
        {/* Left Sidebar Navigation */}
        <div className="bg-[#FFFFFF0A] rounded-lg h-full hidden lg:block w-full ">
          <div className="grid grid-cols-5 p-3 gap-3">
            {navigationItems.map(item => (
              <div
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key)
                  updateQuery(item.key)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === item.key
                    ? 'bg-[#FFFFFF14] text-white shadow-lg'
                    : 'text-gray-300 hover:bg-[rgba(255,255,255,0.08)]'
                }`}
              >
                <img src={item.icon} alt={item.key} />
                <span className="font-medium text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1">{renderContent()}</div>
      </div>

      {/* Mobile Bottom Navigation */}
      <AllianceBottomBar />
    </>
  )
}

// Wrapper component with Suspense boundary
export default function AllianceClient() {
  const { t } = useI18n()
  return (
    <Suspense fallback={<div>{t('app.loading')}</div>}>
      <AlliancePageContent />
    </Suspense>
  )
}
