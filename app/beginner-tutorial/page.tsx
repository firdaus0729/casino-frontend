'use client'

import { UnifiedButton } from '@/components/ui'
import FlatButton from '@/components/ui/Button/FlatButton'
import { CopyBox } from '@/components/ui/CopyBox'
import ArrowUpRightStrokeIcon from '@/components/ui/icons/arrow-up-right-stroke'
import DesktopIcon from '@/components/ui/icons/desktop'
import WalletIcon from '@/components/ui/icons/wallet'
import { cn } from '@/lib/utils'
import React, { useEffect, useRef, useState } from 'react'
import { FreeMode } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import ModalContainer from '@/components/modals/ModalContainer'
import CartIcon from '@/components/ui/icons/cart'
import VpnIcon from '@/components/ui/icons/vpn'
import HeadphoneMicIcon from '@/components/ui/icons/headphone-mic'
import Link from 'next/link'
import TelegramIcon from '@/components/ui/icons/TelegramIcon'
interface TabBarProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

const tabs1 = [
  { title: 'Hash size', id: 'hash' },
  { title: 'Even and odd hash', id: 'even' },
  { title: 'Happy hash', id: 'happy' },
  { title: 'Happy banker', id: 'banker' },
  { title: 'Default', id: 'default' },
]
const tabs = ['Use a wallet', 'Start the game', 'Refund']
const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    const index = tabs1.findIndex(t => t.id === activeTab)
    if (swiperRef.current && index >= 0) {
      swiperRef.current.slideTo(index, 300)
    }
  }, [activeTab])

  return (
    <div>
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        slidesPerView="auto"
        spaceBetween={6}
        onSwiper={inst => {
          swiperRef.current = inst
        }}
      >
        {tabs1.map((tab, idx) => (
          <SwiperSlide key={tab.id} className="!w-auto">
            <UnifiedButton
              onClick={() => {
                onTabChange(tab.id)
                swiperRef.current?.slideTo(idx, 250)
              }}
              variant={activeTab === tab.id ? 'primary' : 'secondary'}
              className="px-2 py-1 whitespace-nowrap min-w-fit"
            >
              <span className="text-[0.75rem] font-bold">{tab.title}</span>
            </UnifiedButton>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const BeginnerTutorialPage = () => {
  // const wallets = ["imtoken", "ownbit", "bitpie", "tw", "tp", "tl"];

  const [tab, setTab] = useState('Use a wallet')
  const [activeTab, setActiveTab] = useState('hash')
  const [walletModal, setWalletModal] = useState(false)
  const [softwareModal, setSoftwareModal] = useState(false)
  const [tutorialModal, setTutorialModal] = useState(false)

  // Enable smooth scrolling for the page
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Add a small delay for better UX
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        })
      }, 100)
    }
  }

  const toggleWalletModal = () => {
    setWalletModal(!walletModal)
  }
  const toggleSoftwareModal = () => {
    setSoftwareModal(!softwareModal)
  }

  const toggleTutorialModal = () => {
    setTutorialModal(!tutorialModal)
  }

  const tutorials = [
    {
      icon: '/images/wallets/htx.svg',
      website: 'huobi.com',
    },
    {
      icon: '/images/wallets/bin.svg',
      website: 'binance.com',
    },
    {
      icon: '/images/wallets/okex.svg',
      website: 'okx.com',
    },
    {
      icon: '/images/wallets/gate.svg',
      website: 'Gate.io',
    },
  ]

  const wallets = [
    {
      icon: '/images/wallets/imtoken.svg',
      website: 'token.im',
    },
    {
      icon: '/images/wallets/tp.svg',
      website: 'tokenpocket.pro',
    },
    {
      icon: '/images/wallets/bitpie.svg',
      website: 'bitpie.com',
    },
    {
      icon: '/images/wallets/ownbit.svg',
      website: 'ownbit.com',
    },
    {
      icon: '/images/wallets/tw.svg',
      website: 'trustwallet.com',
    },
    {
      icon: '/images/wallets/tl.svg',
      website: 'tronlink.org',
    },
  ]

  const vpns = ['Mango VPN', 'NordVPN']

  const others = [
    {
      icon: <TelegramIcon color="#A7B5CA" />,
      title: 'Telegram',
    },
  ]

  const hashCards = [
    {
      gameName: 'Big/Small',
      odds: '1.95X',
      betRange: '10USDT Starting/2TRX Starting',
      bettingAddress: 'TXS3PfAU9hemKkoBWRUfsUkGBSrZGagh6X',
    },
    {
      gameName: 'Big/Small',
      odds: '1.95X',
      betRange: '10USDT Starting/2TRX Starting',
      bettingAddress: 'TXS3PfAU9hemKkoBWRUfsUkGBSrZGagh6X',
    },
    {
      gameName: 'Big/Small',
      odds: '1.95X',
      betRange: '10USDT Starting/2TRX Starting',
      bettingAddress: 'TXS3PfAU9hemKkoBWRUfsUkGBSrZGagh6X',
    },
  ]

  return (
    <>
      <div className="flex flex-col max-w-6xl mx-auto gap-6">
        <div className="rounded-[0.75rem] h-[14.49375rem] overflow-hidden 2xl:mt-4 relative bg-center bg-cover">
          <img
            src="/images/block-coin.png"
            className="w-full absolute   h-full z-[1] object-cover grayscale"
            alt=""
          />
          <div className="w-full absolute bg-[radial-gradient(circle,_#f2f2f2_0.125rem,_transparent_0.125rem)] [background-size:1.875rem_1.875rem]  h-full z-[2] " />

          <div className="absolute bg-[linear-gradient(#2283f633,#111923)] w-full z-[2] h-full top-0 left-0" />

          <img
            src="/images/help-34344.png"
            className="absolute lg:hidden z-[3] top-1/3 left-1/2 transform -translate-y-1/2 w-[18.75rem] -translate-x-1/2"
            alt="image"
          />
          <div
            id="Use a wallet"
            className="relative w-full items-start h-full flex-col 2xl:p-8 p-4 gap-8 z-[3] flex justify-end"
          >
            <div className="flex flex-col gap-2 ">
              <span className="text-white font-bold text-[1.125rem]">
                Beginner&apos;s Tutorial
              </span>
              <div className="flex">
                {tabs.map((item, index) => (
                  <React.Fragment key={item}>
                    <div
                      onClick={() => {
                        setTab(item)
                        scrollToSection(item)
                      }}
                      className={cn(
                        'font-bold text-[0.75rem] h-9 w-[8.25rem] cursor-pointer rounded-[0.5rem] overflow-hidden flex items-center justify-center transition-all duration-300',
                        tab === item
                          ? 'text-white bg-dodger-blue'
                          : 'text-casper hover:bg-white-4'
                      )}
                    >
                      {index + 1}. {item}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-2 2xl:gap-16 gap-4">
          <div>
            <div className="grid grid-cols-3 gap-3">
              {wallets.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="bg-mirage-4 h-[3.5rem]  rounded-[0.5rem] overflow-hidden flex justify-center items-center">
                    <img src={item.icon} className="" alt={item.website} />
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="grid lg:grid-cols-3 gap-2 mt-4">
              <FlatButton
                onClick={toggleWalletModal}
                className="h-9 gap-2 text-[0.75rem]"
              >
                <WalletIcon className="w-4 h-4" />
                Wallet Install
              </FlatButton>
              <FlatButton
                onClick={toggleSoftwareModal}
                className="h-9 gap-2 text-[12px]"
              >
                <DesktopIcon className="w-4 h-4" />
                Useful Software
              </FlatButton>
              <FlatButton
                onClick={toggleTutorialModal}
                className="h-9 gap-2 text-[12px] truncate"
              >
                <CartIcon className="w-4 h-4" />
                Currency Purchase Tutorial
              </FlatButton>
              {/* <FlatButton onClick={toggleServiceModal} className="h-9 gap-2 text-[12px] truncate" >
                                <HeadphoneMicIcon className="w-4 h-4" />
                                Online service
                            </FlatButton> */}
            </div>
          </div>
          <div id="Start the game" className="flex flex-col gap-4 ">
            <h2 className="text-[14px] text-white">
              2.Transfer to the following address to start
            </h2>
            <div className="flex justify-end text-white items-center">
              <span className="font-medium text-[12px] text-dodger-blue">
                Graphic Tutorial
              </span>
              <ArrowUpRightStrokeIcon className="w-6 h-6" />
            </div>
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
              {hashCards.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="px-3 relative py-4 rounded-[12px] overflow-hidden  bg-[url('/images/games/dice-glass-1.png')] bg-cover bg-center"
                    style={{ backgroundColor: '#0D131C' }}
                  >
                    <div className="absolute w-full z-[1] h-full bg-[#0D131CC2] top-0 left-0" />
                    <div className="relative z-[2]">
                      <div className="flex justify-between items-center">
                        <span className="text-[14px] font-bold text-white">
                          Hash:{data.gameName}
                        </span>
                        <div className="flex justify-end text-white items-center">
                          <span className="font-medium text-[12px] text-dodger-blue">
                            Graphic Tutorial
                          </span>
                          <ArrowUpRightStrokeIcon className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-[14px] text-white block">
                          Odds:{data.odds}
                        </span>
                        <span className="text-[14px] text-white block">
                          Bet:{data.betRange}
                        </span>
                      </div>
                      <div className="bg-white-4 flex flex-col gap-4 mt-4 rounded-[12px] overflow-hidden w-full py-2">
                        <div className="indent-[20px]">
                          <span className="text-white text-[12px] font-medium mr-2">
                            Betting Address
                          </span>
                          <span className="text-casper text-[12px] font-medium">
                            Use a Decentralized Wallet
                          </span>
                        </div>
                        <CopyBox className="bg-white-8">
                          {data.bettingAddress}
                        </CopyBox>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4" id="Refund">
            <div>
              <h2 className="font-bold text-[14px] text-white">3.Payouts</h2>
              <h3 className="text-casper">
                Do not send bets from exchange accounts
              </h3>
            </div>
            <TabBar activeTab={activeTab} onTabChange={handleTabChange} />

            <p className="text-[14px] text-white">
              1. Result Determination: The last digit of the hash of the block
              created by your transaction is used to determine the winning
              result. Ignore any letters and decimal points in the hash.
            </p>
            <p className="text-[14px] text-white">
              2.Determination of small bets: If the last digit of the block hash
              is 0, 1, 2, 3 or 4, the result is considered &apos;small&apos;.
            </p>
            <p className="text-[14px] text-white">
              3.Determination of big bets: If the last digit is 5, 6, 7, 8 or 9,
              the result is considered &apos;big&apos;.
            </p>
            <p className="text-[14px] text-white">
              4. Determining the bet type: The type of your bet (small or large)
              is determined by the last digit of the amount you bet.
            </p>
            <p className="text-[14px] text-white">
              5.Small bet example: If you bet 1000 USDT, the last digit of your
              bet amount is 0. According to the rules, since 0 is in the range
              of 0 to 4, your bet is a &apos;small&apos; bet.
            </p>
            <p className="text-[14px] text-white">
              6. Example of a large bet: If you bet 1009 USDT, the last digit of
              your bet amount is 9. Since 9 is in the range of 5 to 9, your bet
              is a &apos;large&apos; bet.
            </p>
          </div>
        </div>
        <ModalContainer
          isOpen={walletModal}
          onClose={toggleWalletModal}
          title="Wallet registration"
        >
          <div className="flex flex-col gap-2 pt-2">
            <h2 className="text-casper font-bold text-[14px] indent-[20px]">
              Recommended wallet registration
            </h2>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-3 h-[56px] bg-mirage-8a font-bold text-[12px] items-center flex justify-center items-center text-casper rounded-[8px]">
                <span>Wallet</span>
                <span>Official website</span>
                <span>Link</span>
              </div>
              {wallets.map(wallet => (
                <div className="grid grid-cols-3 bg-white-4 rounded-[12px] justify-between items-center p-[6px] pl-6 gap-1">
                  <span className="text-left">
                    <img src={wallet.icon} alt="wallet" />
                  </span>
                  <span className="text-dodger-blue flex justify-center items-center text-[12px] font-medium">
                    {wallet.website}
                  </span>
                  <div className="text-right">
                    <FlatButton className="w-[97px] h-9 text-gallery text-[12px]">
                      Download
                    </FlatButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ModalContainer>
        <ModalContainer
          isOpen={softwareModal}
          onClose={toggleSoftwareModal}
          title="Software Downloads"
        >
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-4">
              <h2 className="text-casper font-bold text-[14px] indent-[20px]">
                VPN Recommendations
              </h2>
              {vpns.map(vpn => (
                <div
                  key={vpn}
                  className="flex  bg-white-4 rounded-[12px] justify-between items-center p-[6px] pl-6 gap-1"
                >
                  <span className="text-left text-white font-bold text-[14px]">
                    {vpn}
                  </span>
                  <div className="text-right">
                    <FlatButton className="w-[97px] h-9 text-gallery text-[12px]">
                      Download
                    </FlatButton>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-casper font-bold text-[14px] indent-[20px]">
                Recommended wallet registration
              </h2>
              <div className="flex flex-col gap-2">
                {wallets.map(wallet => (
                  <div className="grid grid-cols-3 bg-white-4 rounded-[12px] justify-between items-center p-[6px] pl-6 gap-1">
                    <span className="text-left">
                      <img src={wallet.icon} alt="wallet" />
                    </span>
                    <span className="text-dodger-blue flex justify-center items-center text-[12px] font-medium">
                      {wallet.website}
                    </span>
                    <div className="text-right">
                      <FlatButton className="w-[97px] h-9 text-gallery text-[12px]">
                        Download
                      </FlatButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-casper font-bold text-[14px] indent-[20px]">
                Other downloads
              </h2>
              {others.map(other => (
                <div
                  key={other.title}
                  className="flex  bg-white-4 rounded-[12px] justify-between items-center p-[6px] pl-6 gap-1"
                >
                  <span className="text-left flex gap-4 text-casper font-bold text-[14px]">
                    {other.icon}
                    {other.title}
                  </span>
                  <div className="text-right">
                    <FlatButton className="w-[97px] h-9 text-gallery text-[12px]">
                      Download
                    </FlatButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ModalContainer>
        <ModalContainer
          isOpen={tutorialModal}
          onClose={toggleTutorialModal}
          title="Currency Purchase Tutorial"
        >
          <div className="flex flex-col gap-2 pt-2">
            <h2 className="text-casper font-bold text-[14px] indent-[20px]">
              Recommended exchange
            </h2>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-3 h-[56px] bg-mirage-8a font-bold text-[12px] items-center flex justify-center items-center text-casper rounded-[8px]">
                <span>Wallet</span>
                <span>Official website</span>
                <span>Link</span>
              </div>
              {tutorials.map((tutorial, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 bg-white-4 rounded-[12px] justify-between items-center p-[6px] pl-6 gap-1"
                >
                  <span className="text-left">
                    <img src={tutorial.icon} alt="tutorial" />
                  </span>
                  <span className="text-dodger-blue flex justify-center items-center text-[12px] font-medium">
                    {tutorial.website}
                  </span>
                  <div className="text-right">
                    <FlatButton className="w-[97px] h-9 text-gallery text-[12px]">
                      Download
                    </FlatButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ModalContainer>
      </div>
    </>
  )
}

export default BeginnerTutorialPage
