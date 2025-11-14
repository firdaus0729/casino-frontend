'use client'

import ChevronLeftIcon from '@/components/ui/icons/chevron-left'
import ChevronRightIcon from '@/components/ui/icons/chevron-right'
import SwiperSlider from '@/components/ui/slider/SwiperSlider'
import { Swiper as SwiperType } from 'swiper'
import { useRef, useState } from 'react'
import InfoCircleIcon from '@/components/ui/icons/info-circle'
import HeadphoneMicIcon from '@/components/ui/icons/headphone-mic'
import ArrowUpRightStrokeIcon from '@/components/ui/icons/arrow-up-right-stroke'
import WhatsAppIcon from '@/components/ui/icons/WhatsAppIcon'
import { FAQ } from '@/features/alliance/components'
import ModalContainer from '@/components/modals/ModalContainer'
import TelegramIcon from '@/components/ui/icons/TelegramIcon'
import { useI18n } from '@/context/I18nProvider'
import useAuthGuard from '@/hooks/useAuthGuard'

const data = [1, 2, 3, 4, 5]
const faq = [
  {
    question: 'What can I do to improve my VIP level?',
    answer:
      'Upgrade bonuses can be applied on the VIP Activity page on a self-service basis after members reach a membership level. Each member can only receive one upgrade bonus for each level.',
  },
  {
    question: 'What are the rules for upgrading to VIP level?',
    answer:
      'Upgrade bonuses can be applied on the VIP Activity page on a self-service basis after members reach a membership level. Each member can only receive one upgrade bonus for each level.',
  },
  {
    question: 'How can I claim the free VIP beauty bonus?',
    answer:
      'Upgrade bonuses can be applied on the VIP Activity page on a self-service basis after members reach a membership level. Each member can only receive one upgrade bonus for each level.',
  },
  {
    question: 'When is the monthly VIP bonus available and how can I claim it?',
    answer:
      'Upgrade bonuses can be applied on the VIP Activity page on a self-service basis after members reach a membership level. Each member can only receive one upgrade bonus for each level.',
  },
]

const faq1 = [
  {
    question: 'Explain the VIP bonus.',
    answer:
      'Upgrade bonuses can be applied on the VIP Activity page on a self-service basis after members reach a membership level. Each member can only receive one upgrade bonus for each level.',
  },
  {
    question: 'What are the conditions for withdrawing bonuses?',
    answer:
      'Upgrade bonuses can be applied on the VIP Activity page on a self-service basis after members reach a membership level. Each member can only receive one upgrade bonus for each level.',
  },
  {
    question: 'Why did my VIP level drop?',
    answer:
      'Upgrade bonuses can be applied on the VIP Activity page on a self-service basis after members reach a membership level. Each member can only receive one upgrade bonus for each level.',
  },
  {
    question: 'How can I ensure that my VIP level does not decrease?',
    answer:
      'Upgrade bonuses can be applied on the VIP Activity page on a self-service basis after members reach a membership level. Each member can only receive one upgrade bonus for each level.',
  },
]

const vips = {
  1: [
    {
      level: 'v1',
      promotion: '0',
      moonthly: '0',
      change: '0.20%',
    },
    {
      level: 'v1',
      promotion: '2',
      moonthly: '2',
      change: '0.30%',
    },
    {
      level: 'v3',
      promotion: '5',
      moonthly: '5',
      change: '0.40%',
    },
  ],
  2: [
    {
      level: 'v1',
      deposit: '0',
      income: '0',
      change: '0',
    },
    {
      level: 'v2',
      deposit: '100',
      income: '800',
      change: '200',
    },
    {
      level: 'v3',
      deposit: '500',
      income: '4k',
      change: '1k',
    },
  ],
}

const VipClubPage = () => {
  const { t } = useI18n()
  const { isAuthenticated } = useAuthGuard()
  const swiperRef = useRef<SwiperType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className="flex flex-col gap-8 max-w-6xl p-2 m-auto">
      <div className="bg-[linear-gradient(#003F70,#0078D6)] relative overflow-hidden rounded-[0.75rem] border-[0.0625rem] border-white-13 gap-6 py-8 px-6 flex items-center">
        <img
          src="/images/awards/Silver.svg"
          className="h-[7.25rem] lg:block hidden"
          alt="Silver"
        />
        <div className="flex flex-col gap-6 w-full">
          <div className="flex items-between gap-4">
            <div className="lg:hidden w-full justify-center flex">
              <img
                src="/images/awards/Silver.svg"
                className="h-[7.25rem] "
                alt="Silver"
              />
            </div>

            <div className="w-full flex flex-col justify-center ">
              <span className="text-casper text-[0.75rem] font-medium block">
                {t('vip.silver')}
              </span>
              <span className="bg-[linear-gradient(#686150,#CFC8B5,#696150)] block text-[1.5rem] font-bold bg-clip-text text-transparent">
                {t('vip.vip4')}
              </span>
              <span
                className="font-medium text-[0.75rem] text-white flex items-center cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <span>{t('vip.upgradeDetails')} </span>
                <span>
                  <ChevronRightIcon className="w-6 h-6" />
                </span>
              </span>
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <span className="font-bold text-[0.875rem] text-white">
                {t('vip.currentDeposits')}
              </span>
              <div className="bg-white-4 rounded-full h-[0.375rem]">
                <div className="w-[10%] bg-french-rose h-full rounded-full" />
              </div>
              <span className="text-white text-[0.875rem] font-bold">
                <span className="text-yellow-orange">25$</span> / 100$
              </span>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="font-bold text-[14px] text-white">
                {t('vip.currentIncomes')}
              </span>
              <div className="bg-white-4 rounded-full h-[6px]">
                <div className="w-[10%] bg-french-rose h-full rounded-full" />
              </div>
              <span className="text-white text-[14px] font-bold">
                <span className="text-yellow-orange">25$</span> / 800$
              </span>
            </div>
          </div>
        </div>
        <img
          src="/images/awards/badge.png"
          className="absolute opacity-20  -right-5 -top-8 h-[105%] lg:h-[140%]"
          alt="badge"
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-4.5 font-bold text-white mb-4 flex gap-2">
            {t('vip.levelSystem')}
          </h2>
          <div className="flex justify-end mb-4">
            <div
              className=" hover:bg-gray-600 active:bg-gray-600 w-9 h-9 flex items-center justify-center rounded-l-lg transition-colors cursor-pointer"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeftIcon className="text-white" />
            </div>
            <div
              className="hover:bg-gray-600 active:bg-gray-600 w-9 h-9 flex items-center justify-center rounded-r-lg transition-colors cursor-pointer"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRightIcon className="text-white" />
            </div>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto">
          <SwiperSlider
            data={data}
            renderSlide={(manufacturer, index) => (
              <div
                key={index}
                className="rounded-[12px] overflow-hidden p-4 bg-white-4 hover:bg-white-8 flex flex-col gap-3"
              >
                <div
                  className="flex gap-4 items-start justify-center"
                  onClick={() => setIsModalOpen(true)}
                >
                  <img
                    src="/images/awards/Bronze.svg"
                    className="h-10"
                    alt="bronze"
                  />
                  <div>
                    <div className="flex gap-2">
                      <span className="uppercase font-bold text-[14px] text-white">
                        {t('vip.vip')}
                      </span>
                      <span className="font-bold text-[14px] text-dodger-blue">
                        1-3
                      </span>
                    </div>
                    <span className="text-casper font-medium text-[14px]">
                      {t('vip.bronze')}
                    </span>
                  </div>
                  <div className="flex items-start h-full">
                    <InfoCircleIcon className="w-6 h-6 text-blue-bayoux hover:text-polo-blue" />
                  </div>
                </div>
                <div className="rounded-[12px] hover:bg-white-8 p-4 bg-white-4 relative flex gap-4">
                  <img src="/images/awards/image.svg" className="h-10" alt="" />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-white">
                      {t('vip.rebateRatio')}
                    </span>
                    <span className="text-[14px] text-casper">0.20%-0.40%</span>
                  </div>
                  <InfoCircleIcon className="w-6 h-6 text-blue-bayoux hover:text-polo-blue absolute top-1 right-1" />
                </div>
                <div className="rounded-[12px] hover:bg-white-8 p-4 bg-white-4 relative flex gap-4">
                  <img
                    src="/images/awards/image-1.svg"
                    className="h-10"
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-white">
                      {t('vip.upgradeBonus')}
                    </span>
                    <span className="text-[14px] text-casper">0.20%-0.40%</span>
                  </div>
                  <InfoCircleIcon className="w-6 h-6 text-blue-bayoux hover:text-polo-blue absolute top-1 right-1" />
                </div>
                <div className="rounded-[12px] hover:bg-white-8 p-4 bg-white-4 relative flex gap-4">
                  <img
                    src="/images/awards/image-2.svg"
                    className="h-10"
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-white">
                      {t('vip.monthlyGiftMoney')}
                    </span>
                    <span className="text-[14px] text-casper">0.20%-0.40%</span>
                  </div>
                  <InfoCircleIcon className="w-6 h-6 text-blue-bayoux hover:text-polo-blue absolute top-1 right-1" />
                </div>
                <div className="rounded-[12px] hover:bg-white-8 p-4 bg-white-4 relative flex gap-4">
                  <img
                    src="/images/awards/image-3.svg"
                    className="h-10"
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-white">
                      {t('vip.freeWithdrawal')}
                    </span>
                    <span className="text-[14px] text-casper">
                      {t('vip.theFirst')}
                      <b className="text-malachite">3</b>
                      {t('vip.timesFree')}
                    </span>
                  </div>
                  <InfoCircleIcon className="w-6 h-6 text-blue-bayoux hover:text-polo-blue absolute top-1 right-1" />
                </div>
              </div>
            )}
            slidesPerView={4.4}
            spaceBetween={12}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              375: { slidesPerView: 1.4 },
              425: { slidesPerView: 1.5 },
              768: { slidesPerView: 2.3 },
              1024: { slidesPerView: 3.3 },
              1440: { slidesPerView: 4.3 },
            }}
            navigationRef={swiperRef}
            autoplay={false}
          />
        </div>
      </div>
      <div className="rounded-[12px] 2xl:h-[292.9px] 2xl:overflow-hidden  relative bg-center bg-cover">
        <img
          alt=""
          src="/images/block-coin.png"
          className="w-full absolute 2xl:block hidden h-full z-[9] object-cover grayscale"
        />
        <div className="absolute bg-[linear-gradient(#2283f633,#111923)] 2xl:block hidden w-full z-[10] h-full top-0 left-0" />

        <div className="relative w-full h-full flex-col lg:flex-row 2xl:p-8 gap-8 z-[99] items-center flex justify-between">
          <div className="flex flex-col 2xl:w-[250px] gap-2 2xl:bg-mirage bg-white-4 p-4 rounded-[12px]">
            <span className="text-[14px] font-bold text-white">
              {t('vip.stayConnected')}
            </span>
            <p className="text-casper text-[14px]">
              {t('vip.stayConnectedDescription')}
            </p>
          </div>
          <img
            src="/images/headset.png"
            alt="headset"
            className="hidden 2xl:block w-[246px]"
          />
          <div className="flex flex-col gap-px rounded-[8px] w-full 2xl:w-[330px] overflow-hidden">
            <div className=" h-12 2xl:bg-mirage bg-white-4 flex items-center p-3 justify-between">
              <div className="flex gap-2">
                <div className="border-[1px] border-yellow-orange w-6 h-6 rounded-[8px] flex items-center justify-center text-yellow-orange">
                  <HeadphoneMicIcon className="w-4 h-4" />
                </div>
                <span className="text-casper font-bold text-[14px]">
                  24/7 {t('help.onlineService')}
                </span>
              </div>
              <ArrowUpRightStrokeIcon className="w-6 h-6 text-casper" />
            </div>
            <div className=" h-12 2xl:bg-mirage bg-white-4 flex items-center p-3 justify-between">
              <div className="flex gap-2">
                <div className="border-[1px] border-dodger-blue w-6 h-6 rounded-[8px] flex items-center justify-center text-yellow-orange">
                  <TelegramIcon className="w-4 h-4" color="#2283F6" />
                </div>
                <span className="text-casper font-bold text-[14px]">
                  Telegram
                </span>
              </div>
              <ArrowUpRightStrokeIcon className="w-6 h-6 text-casper" />
            </div>
            <div className=" h-12 2xl:bg-mirage bg-white-4 flex items-center p-3 justify-between">
              <div className="flex gap-2">
                <div className="border-[1px] border-malachite w-6 h-6 rounded-[8px] flex items-center justify-center text-yellow-orange">
                  <WhatsAppIcon className="w-4 h-4" color="#1BB83D" />
                </div>
                <span className="text-casper font-bold text-[14px]">
                  WhatsApp
                </span>
              </div>
              <ArrowUpRightStrokeIcon className="w-6 h-6 text-casper" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-white font-bold text-[18px]">
          Questions to be answered
        </span>
        <div className="flex flex-col 2xl:flex-row gap-4">
          <FAQ faqs={faq} title={false} />
          <FAQ faqs={faq1} title={false} />
        </div>
      </div>
      <ModalContainer
        title="VIP system level"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex gap-4 flex-col">
          <div className="flex w-full flex-col gap-[6px]">
            <div className="flex justify-center px-4 items-center bg-mirage-8a   font-bold text-[12px] rounded-t-[8px] h-10 text-blue-bayoux grid-cols-[auto_100px_90px_80px] gap-2">
              <span>VIP level</span>
              <span>Promotional bonus</span>
              <span>Monthly bonus</span>
              <span>Change of cutoff</span>
            </div>
            {vips[1].map((vip, index) => (
              <div
                key={index}
                className="flex px-4 items-center bg-white-4 justify-center font-bold text-[14px] rounded-[8px] h-10 text-white grid-cols-[auto_100px_90px_80px] gap-2"
              >
                <span className="flex gap-2 items-center">
                  <img
                    src="/images/awards/Bronze.svg"
                    alt="bronze"
                    className="w-6 h-6"
                  />
                  <span className="text-dodger-blue">{vip.level}</span>
                </span>
                <span>{vip.promotion}</span>
                <span>{vip.moonthly}</span>
                <span>{vip.change}</span>
              </div>
            ))}
          </div>
          <div className="py-4 flex flex-col gap-2  text-[14px]">
            <span className="font-bold text-white">
              VIP promotion requirements
            </span>
            <span className="text-casper">
              For users betting with TRX, the system will convert it at the rate
              of <span className="text-dodger-blue font-bold">1U=25TRX.</span>
            </span>
          </div>
          <div className="flex w-full flex-col gap-[6px]">
            <div className="flex justify-center items-center px-4 bg-mirage-8a font-bold text-[12px] rounded-t-[8px] h-10 text-blue-bayoux grid-cols-[auto_100px_90px_80px] gap-2">
              <span>VIP level</span>
              <span>Accumulated deposits</span>
              <span>Accumu-lated income</span>
              <span>Change of cutoff</span>
            </div>
            {vips[2].map((vip, index) => (
              <div
                key={index}
                className="flex px-4 items-center bg-white-4 justify-center font-bold text-[14px] rounded-[8px] h-10 text-white grid-cols-[auto_100px_90px_80px] gap-2"
              >
                <span className="flex gap-2 items-center">
                  <img
                    src="/images/awards/Bronze.svg"
                    alt="bronze"
                    className="w-6 h-6"
                  />
                  <span className="text-dodger-blue">{vip.level}</span>
                </span>
                <span>{vip.deposit}</span>
                <span>{vip.income}</span>
                <span>{vip.change}</span>
              </div>
            ))}
          </div>
        </div>
      </ModalContainer>
    </div>
  )
}

export default VipClubPage
