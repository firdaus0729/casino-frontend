'use client'

import React from 'react'
import Link from 'next/link'
import XIcon from './ui/icons/XIcon'
import InstagramIcon from './ui/icons/InstagramIcon'
import YouTubeIcon from './ui/icons/YouTubeIcon'
import DiscordIcon from './ui/icons/DiscordIcon'
import TikTokIcon from './ui/icons/TikTokIcon'
import BlackButton from './ui/Button/BlackButton'
import FacebookIcon from './ui/icons/FacebookIcon'
import TelegramIcon from './ui/icons/TelegramIcon'
import { useI18n } from '../context/I18nProvider'
import TDButton from '@/components/ui/Button/TDButton'

const coins = ['USDT', 'SOL', 'BNB', 'LTC', 'ETC', 'TRX', 'BTC', 'TON'] as const

const Footer: React.FC = () => {
  const { t } = useI18n()
  return (
    <footer className="lg:bg-[#1C2532] w-full text-gray-300 py-8 pb-[5rem] lg:mb-[2rem] px-4">
      <div className="max-w-7xl mx-auto ">
        <div className="hidden lg:flex gap-8">
          {/* Left Section - Company Info */}
          <div className="w-[50%] md:col-span-2">
            {/* Logo */}
            <div className="flex items-center mb-4">
              <img src="/images/logo.svg" alt="777 Gaming Logo" />
            </div>

            {/* Company Description */}
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {t('licence.company')}
            </p>

            {/* Supported Currencies */}
            <div className="lg:block mb-6 hidden">
              <h4 className="text-white font-medium mb-3">
                {t('app.supportedCurrencies')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {coins.map((item, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <img
                      src={'/icons/coin-icon/' + item + '.svg'}
                      className="w-8 h-8"
                      alt="coin"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Section - General Information */}
          <div className="w-[25%]">
            <h3 className="text-white font-semibold mb-4">
              {t('generalInformation.generalInformation')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {t('generalInformation.commonProblem')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {t('generalInformation.responsibleGambling')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {t('generalInformation.honestlyAndFairly')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {t('generalInformation.termsOfService')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {t('generalInformation.privacyPolicy')}
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section - About Us */}
          <div className="w-[25%]">
            <h3 className="text-white font-semibold mb-4">
              <span>{t('aboutUs.aboutUs')}</span>
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {t('help.onlineService')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Skype
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full lg:hidden block">
          <h4 className="text-white font-medium mb-3">
            <span>Support/Legal support</span>
          </h4>
          <div className="rounded-[0.5rem] flex gap-1 flex-col overflow-hidden">
            <div className=" flex items-center h-[3rem] justify-between px-4 bg-[#2a3546]">
              <span className="text-[#A7B5CA] text-[0.875rem] font-bold">
                Common Problem
              </span>
              <Link href="">
                <img src="/icons/arrow-up-right-stroke.svg" alt="arrow" />
              </Link>
            </div>
            <div className=" flex items-center h-[3rem] justify-between px-4 bg-[#2a3546]">
              <span className="text-[#A7B5CA] text-[0.875rem] font-bold">
                Responsible gambling
              </span>
              <Link href="">
                <img src="/icons/arrow-up-right-stroke.svg" alt="arrow" />
              </Link>
            </div>
            <div className=" flex items-center h-[3rem] justify-between px-4 bg-[#2a3546]">
              <span className="text-[#A7B5CA] text-[0.875rem] font-bold">
                Honestly and fairly
              </span>
              <Link href="">
                <img src="/icons/arrow-up-right-stroke.svg" alt="arrow" />
              </Link>
            </div>
            <div className=" flex items-center h-[3rem] justify-between px-4 bg-[#2a3546]">
              <span className="text-[#A7B5CA] text-[0.875rem] font-bold">
                Terms of Service
              </span>
              <Link href="">
                <img src="/icons/arrow-up-right-stroke.svg" alt="arrow" />
              </Link>
            </div>
            <div className=" flex items-center h-[3rem] justify-between px-4 bg-[#2a3546]">
              <span className="text-[#A7B5CA] text-[0.875rem] font-bold">
                Private Policy
              </span>
              <Link href="">
                <img src="/icons/arrow-up-right-stroke.svg" alt="arrow" />
              </Link>
            </div>
            <div className=" flex items-center h-[3rem] justify-between px-4 bg-[#2a3546]">
              <span className="text-[#A7B5CA] text-[0.875rem] font-bold">
                About Us
              </span>
              <Link href="">
                <img src="/icons/arrow-up-right-stroke.svg" alt="arrow" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col-reverse justify-between items-center">
          {/* Partners and Industry Associations */}
          <div className="lg:w-[50%] w-full">
            <h4 className="text-white font-medium my-4">
              {t('app.gamblingLicense')}
            </h4>
            <div className="flex gap-3">
              <div>
                <img
                  className="h-8"
                  alt="brand"
                  src="/images/brand/brand.svg"
                />
              </div>
              <div>
                <img src="/images/brand/18.svg" className="h-8" alt="18+" />
              </div>
            </div>
          </div>
          <div className="lg:hidden w-full block ">
            <h4 className="text-white w-full font-medium my-3">
              {t('app.supportedCurrencies')}
            </h4>
            <div className="flex justify-between items-center lg:gap-2 ">
              {coins.map((item, index) => (
                <div key={index} className="flex items-center justify-center">
                  <img
                    src={'/icons/coin-icon/' + item + '.svg'}
                    className="w-8 h-8"
                    alt="coin"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Social Media Links */}
          <div className="lg:w-[50%] w-full">
            <h4 className="text-white font-medium my-3 text-left">
              {t('app.communityEntrance')}
            </h4>
            <div className="flex justify-between lg:justify-start lg:gap-4">
              <BlackButton>
                <TelegramIcon className="w-4 h-4" />
              </BlackButton>
              <BlackButton>
                <FacebookIcon className="w-4 h-4" />
              </BlackButton>
              <BlackButton>
                <XIcon className="w-4 h-4" />
              </BlackButton>
              <BlackButton>
                <InstagramIcon className="w-4 h-4" />
              </BlackButton>
              <BlackButton>
                <YouTubeIcon className="w-4 h-4" />
              </BlackButton>
              <BlackButton>
                <DiscordIcon className="w-4 h-4" />
              </BlackButton>
              <BlackButton>
                <TikTokIcon className="w-4 h-4" />
              </BlackButton>
            </div>
          </div>
        </div>
        <div className="w-full block lg:hidden md:col-span-2 ">
          {/* Logo */}
          <div className="flex items-center my-4">
            <img src="/images/logo.svg" alt="777 Gaming Logo" />
          </div>

          {/* Company Description */}
          <p className="text-sm text-gray-400 leading-relaxed">
            {t('licence.company')}
          </p>

          {/* Supported Currencies */}
          <div className="lg:block mb-6 hidden pl-[12px]">
            <h4 className="text-white font-medium mb-3">
              {t('app.supportedCurrencies')}
            </h4>
            <div className="flex justify-between">
              {coins.map((item, index) => (
                <div key={index} className="flex items-center justify-center">
                  <img
                    src={'/icons/coin-icon/' + item + '.svg'}
                    className="w-8 h-8"
                    alt="coin"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Section - Social Media & Install App */}
      <div className="hidden lg:block fixed right-0 bottom-0 bg-[rgb(15,23,32)] z-10 w-full pl-[248px]">
        {/* Install App Banner */}
        <div className=" px-4 py-2 flex items-center justify-center gap-3">
          <div className="text-2xl">
            <img src="/images/brand/cookie.svg" alt="cookie" />
          </div>
          <div>
            <div className="flex text-[#A7B5CA] text-sm font-medium">
              <span>{t('install.install')}</span>
              <div>
                <img
                  src="/images/logo.svg"
                  className="h-[1.2rem] px-[.5rem]"
                  alt="logo"
                />
              </div>
              <span>{t('install.onTheDesktop')}</span>
            </div>
          </div>
          {/* <div className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
            {t('install.accept')}
          </div> */}
          <TDButton
            type="blue"
            className="w-[5.3125rem] h-[2.0625rem] rounded-lg"
          >
            <span className="text-[0.85rem]">{t('install.accept')}</span>
          </TDButton>
          {/* <BlackButton>
            <span className="px-2.5">
              <span>X</span>
            </span>
          </BlackButton> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer
