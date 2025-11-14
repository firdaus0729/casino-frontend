import React from 'react'
import FAQ from './FAQ'
import FlatButton from '@/components/ui/Button/FlatButton'
import { CopyBox } from '@/components/ui/CopyBox'
import { XIcon } from 'lucide-react'
import BlackButton from '@/components/ui/Button/BlackButton'
import FacebookIcon from '@/components/ui/icons/FacebookIcon'
import InstagramIcon from '@/components/ui/icons/InstagramIcon'
import YouTubeIcon from '@/components/ui/icons/YouTubeIcon'
import DiscordIcon from '@/components/ui/icons/DiscordIcon'
import TikTokIcon from '@/components/ui/icons/TikTokIcon'
import TelegramIcon from '@/components/ui/icons/TelegramIcon'
import { useI18n } from '@/context/I18nProvider'

const InviteFriends: React.FC = () => {
  const { t } = useI18n()
  const faqs = [
    {
      question: 'How to activate a wallet address?',
      answer:
        'Upgrade bonuses can be applied on the VIP Activity page on a self-service basis after members reach a membership level. Each member can only receive one upgrade bonus for each level.',
    },
    {
      question: 'Why do I need to activate the wallet address?',
      answer:
        'Upgrade bonuses can be applied on the VIP Activity page on a self-service basis after members reach a membership level. Each member can only receive one upgrade bonus for each level.',
    },
    {
      question: 'Will not activating the wallet address affect withdrawals?',
      answer:
        'Upgrade bonuses can be applied on the VIP Activity page on a self-service basis after members reach a membership level. Each member can only receive one upgrade bonus for each level.',
    },
  ]

  return (
    <div className="flex-1">
      {/* Header Section */}
      <div className="mb-8 hidden lg:block">
        <div className=" bg-[linear-gradient(170deg,#ED1D49_5%,#111923_90%)] rounded-md text-left h-[20rem] relative overflow-hidden">
          <img
            src="/images/banner/invite-banner.png"
            className="w-[81%] h-full center absolute top-0 left-1/2 transform -translate-x-1/2  "
            alt=""
          />
          {/* <span className="text-white text-[1.125rem] font-bold relative z-10">
            Invite friends
          </span> */}
        </div>
      </div>

      {/* Referral Section */}
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
        <div className="bg-[#FFFFFF0A] rounded-lg p-3 ">
          <label className="block text-white text-md font-medium leading-8">
            {t('alliance.referralLink')}
          </label>
          <div className="flex items-center gap-3">
            <CopyBox className="w-full bg-white-8 h-12 text-sm">
              https://ok777.io/?AgentCode=330395
            </CopyBox>
          </div>
        </div>

        <div className="bg-[#FFFFFF0A] rounded-lg p-3 ">
          <label className="block text-white text-md font-medium leading-8">
            {t('alliance.referralCode')}
          </label>
          <div className="flex items-center gap-3">
            <CopyBox className="w-full bg-white-8 h-12 text-sm">330395</CopyBox>
          </div>
        </div>
      </div>

      {/* Share via Social Media and Statistics Section */}
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
        {/* Left Card: Share via Social Media */}
        <div className="flex flex-col md:justify-around bg-white-4 rounded-lg p-3">
          <h3 className="text-white text-md font-medium leading-8">
            {t('alliance.shareMedia')}
          </h3>
          <div className=" flex justify-around">
            <BlackButton>
              <TelegramIcon color="#A7B5CA" className="w-4 h-4" />
            </BlackButton>
            <BlackButton>
              <FacebookIcon color="#A7B5CA" className="w-4 h-4" />
            </BlackButton>
            <BlackButton>
              <XIcon color="#A7B5CA" className="w-4 h-4" />
            </BlackButton>
            <BlackButton>
              <InstagramIcon color="#A7B5CA" className="w-4 h-4" />
            </BlackButton>
            <BlackButton>
              <YouTubeIcon color="#A7B5CA" className="w-4 h-4" />
            </BlackButton>
            <BlackButton>
              <DiscordIcon color="#A7B5CA" className="w-4 h-4" />
            </BlackButton>
            <BlackButton>
              <TikTokIcon color="#A7B5CA" className="w-4 h-4" />
            </BlackButton>
          </div>
        </div>

        {/* Right Card: Statistics */}
        <div className="bg-white-4 rounded-lg p-3 ">
          <div className="grid grid-cols-2 gap-4">
            {/* Top Left */}
            <div className=" block text-center m-t items-center">
              <div className="text-sm font-bold text-dodger-blue mb-1">
                <span>12</span>
              </div>
              <div className="text-gray-300 text-sm">
                {t('alliance.newSibordinates')}
              </div>
            </div>
            {/* Top Right */}
            <div className=" block text-center m-t items-center">
              <div className="text-sm font-bold text-white mb-1">
                <span>22</span>
              </div>
              <div className="text-gray-300 text-sm">
                {t('alliance.directSibordinates')}
              </div>
            </div>
            {/* Bottom Left */}
            <div className="block text-center m-t items-center">
              <div className="text-sm font-bold text-dodger-blue mb-1">
                <span>465</span>
              </div>
              <div className="text-gray-300 text-sm">
                {t('alliance.newTotalTeamMember')}
              </div>
            </div>
            {/* Bottom Right */}
            <div className=" block text-center m-t items-center">
              <div className="text-sm font-bold text-white mb-1">
                <span>1652</span>
              </div>
              <div className="text-gray-300 text-sm">
                {t('alliance.totalTeamMember')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Commission Rewards Section */}
      <div className="mb-8 bg-white-4 rounded-lg p-3 ">
        <div className="flex justify-between items-center font-medium leading-8">
          <h3 className="text-white">{t('alliance.commissionRewards')}</h3>
          <a
            href="#"
            className="text-[#2283F6] hover:underline font-bold text-sm"
          >
            {t('alliance.details')}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex justify-between w-full bg-[#FFFFFF14] rounded-[12px] p-2 pr-4 pl-4 ">
            <div className="flex items-center gap-3">
              <img src="/icons/coin-icon/USDT.svg" alt="coin w-6 h-6" />
              <span className="text-[12px] text-dodger-blue font-bold">0</span>
            </div>
            <FlatButton className="px-6 py-3 text-[12px] font-bold">
              {t('alliance.inviteFriends')}
            </FlatButton>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <FAQ faqs={faqs} />
    </div>
  )
}

export default InviteFriends
