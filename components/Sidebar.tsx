'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useSidebar } from '../context/SidebarProvider'
import { useOverlay } from '../context/OverlayProvider'
import { useHoverTimeout } from '../hooks/useHoverTimeout'
import { useLanguage } from '../context/LanguageProvider'
import { useT } from '../context/I18nProvider'
import { LanguageSelector } from './ui/Internationalization'
import SidebarTopSection from './SidebarTopSection'
import SidebarSections from './SidebarSections'
import SidebarBottomSection from './SidebarBottomSection'
import SidebarLanguageSection from './SidebarLanguageSection'
import { createSidebarData } from '../lib/sidebar-data-i18n'
import HeadphoneMicIcon from './ui/icons/headphone-mic'
import ModalContainer from './modals/ModalContainer'
import ArrowUpRightStrokeIcon from './ui/icons/arrow-up-right-stroke'
import TelegramIcon from './ui/icons/TelegramIcon'
import Overlay from './overlays/Overlay'
import Link from 'next/link'

const useOnlineService = () => {
  const [serviceModal, setServiceModal] = useState(false)
  const toggleServiceModal = () => {
    setServiceModal(!serviceModal)
  }
  return { serviceModal, toggleServiceModal }
}

const Sidebar: React.FC = () => {
  const {
    isCollapsed,
    toggleSidebar,
    openHashHover,
    scheduleCloseHashHover,
    setHashHoverTop,
  } = useSidebar()
  const { openHashHover: openOverlayHashHover, closeOverlay } = useOverlay()
  const t = useT()

  const { clearTimeout, setCloseTimeout } = useHoverTimeout()
  const { serviceModal, toggleServiceModal } = useOnlineService()

  // Get i18n sidebar data
  const sidebarData = createSidebarData(t)

  // Create service items with onClick handler
  const serviceItemsWithHandler = sidebarData.serviceItems.map(item =>
    item.id === 'online-service'
      ? { ...item, onClick: toggleServiceModal }
      : item
  )
  const handleHashHoverLeave = () => {
    setCloseTimeout(closeOverlay, 200)
  }

  const services = [
    {
      icon: (
        <HeadphoneMicIcon color="var(--yellow-orange)" className="w-4 h-4" />
      ),
      title: t('help.onlineService'),
      desc: t('help.serviceDescription'),
      color: 'var(--yellow-orange)',
    },
    {
      icon: <TelegramIcon color="var(--dodger-blue)" className="w-4 h-4" />,
      title: 'Telegram',
      desc: t('help.telegramDescription'),
      color: 'var(--dodger-blue)',
    },
  ]

  const handleHashHoverEnter = () => {
    // Clear any pending close timeout when re-entering
    clearTimeout()
  }
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false)
  const { currentLanguage, setCurrentLanguage } = useLanguage()

  const currentLanguageDisplay =
    sidebarData.languageData[
      currentLanguage.code as keyof typeof sidebarData.languageData
    ] || sidebarData.languageData.zh

  return (
    <>
      <aside
        ref={sidebarRef}
        className={`sidebar bg-[var(--mirage)]/54 backdrop-blur-[2rem] fixed lg:block transition-all duration-300 z-40 overflow-y-auto overflow-x-visible h-[calc(100dvh-9.9375rem)] lg:top-[3.5rem] top-[6.25rem] lg:h-[calc(100dvh-3.5rem)] ${
          isCollapsed ? 'close ' : 'open'
        }`}
        style={{
          borderRight: '1px solid var(--white-4)',
          backdropFilter: 'blur(2rem)',
          background: 'var(--mirage-54)',
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
        }}
        onWheel={e => {
          // Prevent scroll events from bubbling up to the parent
          e.stopPropagation()
        }}
        onTouchMove={e => {
          // Prevent touch scroll events from bubbling up to the parent
          e.stopPropagation()
        }}
      >
        <div className="flex flex-col h-full">
          {/* Top Section - Casino/Sport buttons */}
          <SidebarTopSection
            isCollapsed={isCollapsed}
            topButtons={sidebarData.topButtons}
          />

          {/* Main Content Sections */}
          <div
            className={`p-4 pt-0 ${isCollapsed ? 'px-0' : ''} space-y-1 flex-1`}
          >
            <div className=" ">
              <SidebarSections
                isCollapsed={isCollapsed}
                sidebarSections={sidebarData.sidebarSections}
                serviceItemsWithHandler={serviceItemsWithHandler}
                onHashHover={e => {
                  const rect = (
                    e.currentTarget as HTMLDivElement
                  ).getBoundingClientRect()
                  setHashHoverTop(rect.top)
                  handleHashHoverEnter()
                  openOverlayHashHover()
                }}
                onHashHoverLeave={handleHashHoverLeave}
              />
            </div>
            <Link
              href={'/install-app'}
              className="py-2 justify-center lg:hidden flex flex-col gap-2 rounded-[0.5rem] h-[5.1875rem] px-4 bg-[linear-gradient(45deg,#111923,#002554)]"
            >
              <span className="text-[0.875rem] text-white font-bold">
                {t('app.title')}
              </span>
              <span className="text-casper text-[0.625rem]">
                {t('app.subtitle')}
              </span>
            </Link>

            {/* Language Selection - Mobile */}
            <SidebarLanguageSection
              isCollapsed={isCollapsed}
              currentLanguage={currentLanguage}
              onLanguageClick={() => setIsLanguageModalOpen(true)}
            />
          </div>

          {/* Bottom Section - Payment Methods */}
          <SidebarBottomSection
            isCollapsed={isCollapsed}
            currentLanguage={currentLanguage}
            onLanguageClick={() => setIsLanguageModalOpen(true)}
            paymentMethods={sidebarData.paymentMethods}
            appDownloads={sidebarData.appDownloads}
            languageData={sidebarData.languageData}
          />
        </div>
      </aside>
      <Overlay
        isOpen={!isCollapsed}
        onClose={toggleSidebar}
        className="lg:hidden fixed left-0 right-0 z-[9]"
        backdropClassName="h-[calc(100dvh-7.1rem)] bg-[var(--mirage-73)] backdrop-blur-[0.1875rem]"
        contentClassName=""
        zIndex={9}
        closeOnBackdropClick={true}
        closeOnEscape={true}
        preventScroll={true}
      >
        {null}
      </Overlay>

      {/* Language Selection Modal */}
      <LanguageSelector
        open={isLanguageModalOpen}
        onOpenChange={setIsLanguageModalOpen}
        onLanguageChange={langCode =>
          setCurrentLanguage({
            code: langCode,
            name:
              sidebarData.languageData[
                langCode as keyof typeof sidebarData.languageData
              ]?.name || t('languages.chinese'),
          })
        }
        initialLanguage={currentLanguage.code}
      />

      <ModalContainer
        isOpen={serviceModal}
        width="95vw"
        onClose={toggleServiceModal}
        title={t('help.onlineService')}
        className="!w-[46.25rem]"
      >
        <div className="h-[14.875rem] w-[calc(100%+1.875rem)] overflow-hidden -mt-[0.9375rem] -ml-[0.9375rem] relative">
          <img
            src="/images/block-coin.png"
            alt="blockcoin"
            className="object-cover absolute grayscale z-[1] w-full h-full"
          />
          <div className="bg-[linear-gradient(#2283F6,#2283F600)] w-full h-full absolute top-0 left-0 z-[2]"></div>
          <img
            src="/images/calf/mascot14.png"
            className="absolute z-[3] w-[18.75rem] top-[20%] -right-[3.125rem] lg:right-[1.875rem]"
            alt="mascot"
          />
          <div className="relative z-[3] flex flex-col items-start justify-center pl-[1.875rem] lg:pl-[3.75rem] h-full gap-1">
            <img src="/images/logo.svg" className="h-9" alt="" />
            <span className="font-bold text-dodger-blue text-[1rem]">
              {t('help.onlineService')}
            </span>
            <span className="font-medium text-yellow-orange text-[0.875rem]">
              {t('help.hours24')}
            </span>
            <span className="font-medium text-white text-[0.875rem]">
              {t('help.dedicatedService')}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white-4 rounded-[0.75rem] p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <div className="font-bold text-white text-[0.875rem] flex gap-2">
                  <div
                    className="rounded-[0.5rem]  w-6 h-6 border flex justify-center items-center"
                    style={{ borderColor: service.color }}
                  >
                    {service.icon}
                  </div>
                  {service.title}
                </div>
                <ArrowUpRightStrokeIcon
                  className="w-6 h-6"
                  color="var(--casper)"
                />
              </div>
              <div className="text-casper text-[0.875rem]">{service.desc}</div>
            </div>
          ))}
        </div>
      </ModalContainer>
    </>
  )
}

export default Sidebar
