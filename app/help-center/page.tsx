'use client'

import React, { useEffect, useMemo, useState, Suspense } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import CommonProblem from '@/features/helpcenter/components/CommonProblem'
import ResponsibleGambling from '@/features/helpcenter/components/ResponsibleGambling'
import Honestly from '@/features/helpcenter/components/Honestly'
import TermsOfUse from '@/features/helpcenter/components/TermsUse'
import PrivatePolicy from '@/features/helpcenter/components/PrivatePolicy'
import AboutUs from '@/features/helpcenter/components/AboutUs'
import SearchIcon from '@/components/ui/icons/search'
import ChevronDownIcon from '@/components/ui/icons/chevron-down'
import { Input } from '@/components/ui'
import DropdownSelection from '@/components/ui/DropdownOption'

function HelpCenterPageContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const tabSlugToName = useMemo(
    () =>
      ({
        problem: 'Common problem',
        gambling: 'Responsible gambling',
        honest: 'Honestly and fairely',
        termsuse: 'Terms of use',
        policy: 'Privacy Policy',
        aboutus: 'About us',
      }) as const,
    []
  )

  const tabNameToSlug = useMemo(
    () =>
      ({
        'Common problem': 'problem',
        'Responsible gambling': 'gambling',
        'Honestly and fairely': 'honest',
        'Terms of use': 'termsuse',
        'Privacy Policy': 'policy',
        'About us': 'aboutus',
      }) as const,
    []
  )

  const [activeTab, setActiveTab] = useState<string>('Common problem')

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
    'Common problem',
    'Responsible gambling',
    'Honestly and fairly',
    'Terms of use',
    'Privacy Policy',
    'About us',
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'Common problem':
        return <CommonProblem />
      case 'Responsible gambling':
        return <ResponsibleGambling />
      case 'Honestly and fairly':
        return <Honestly />
      case 'Terms of use':
        return <TermsOfUse />
      case 'Privacy Policy':
        return <PrivatePolicy />
      case 'About us':
        return <AboutUs />
      default:
        return <CommonProblem />
    }
  }

  return (
    <>
      <div className="flex flex-col max-w-6xl p-2 m-auto">
        {/* Top Tab Navigation */}
        <div className="bg-[#FFFFFF0A] rounded-lg w-full mb-6 [@media(max-width:1024px)]:hidden">
          <div className="flex p-3 gap-1 justify-between overflow-x-auto">
            {navigationItems.map(item => (
              <div
                key={item}
                onClick={() => {
                  setActiveTab(item)
                  updateQuery(item)
                }}
                className={`flex-shrink-0 flex items-center gap-1 p-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === item
                    ? 'bg-[#FFFFFF14] text-white shadow-lg'
                    : 'text-gray-300 hover:bg-[rgba(255,255,255,0.08)]'
                }`}
              >
                <span className="font-bold text-[0.875rem] whitespace-nowrap">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Search and Dropdown */}
        <div className="flex flex-col gap-4 lg:hidden mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <SearchIcon className="h-6 w-6 text-blue-bayoux" />
            </div>
            <Input
              type="text"
              placeholder="Manufacturer search"
              className="w-full pl-12 pr-4 py-3 bg-transparent border border-blue-bayoux rounded-lg text-blue-bayoux placeholder:text-blue-bayoux font-montserrat text-sm focus:ring-2 focus:ring-dodger-blue focus:border-dodger-blue"
            />
          </div>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex justify-between items-center text-casper bg-white-4 rounded-[8px] text-[14px] font-bold h-12 px-4"
          >
            <span>{activeTab}</span>
            <ChevronDownIcon />
            <DropdownSelection
              selectedId={activeTab}
              isOpen={isDropdownOpen}
              onClose={() => setIsDropdownOpen(false)}
              onSelectionChange={optionId => {
                setActiveTab(optionId)
                updateQuery(optionId)
                setIsDropdownOpen(false)
              }}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 lg:bg-white-4 rounded-[12px] min-h-0">
          {renderContent()}
        </div>
      </div>
    </>
  )
}

// Wrapper component with Suspense boundary
export default function HelpCenterPage() {
  return (
    <Suspense
      fallback={
        <div>
          <span>Loading help center...</span>
        </div>
      }
    >
      <HelpCenterPageContent />
    </Suspense>
  )
}
