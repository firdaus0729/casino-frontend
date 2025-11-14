'use client'

import BetTemplate from '@/components/BetTemplate'
import BlackButton from '@/components/ui/Button/BlackButton'
import TabButton from '@/components/ui/Button/TabButton'
import TDButton from '@/components/ui/Button/TDButton'
import DailyRewardCard from '@/components/ui/cards/DailyRewardCard'
import TaskCard from '@/components/ui/cards/TaskCard'
import TXCard from '@/components/ui/cards/TXCard'
import { CopyBox } from '@/components/ui/CopyBox'
import AlertSquareIcon from '@/components/ui/icons/alert-square'
import CopyIcon from '@/components/ui/icons/copy'
import CurrencyNotes1Icon from '@/components/ui/icons/currency-notes-1'
import InfoCircleIcon from '@/components/ui/icons/info-circle'

const CheckinRewardPage = () => {
  const clickSubmit = () => {}

  const socials = [
    'Telegram',
    'Facebook',
    'X',
    'Instagram',
    'WhatsApp',
    'Line',
    'Youtube',
    'Discord',
    'Tiktok',
    'qr-scan',
  ] as const

  const clickButton = () => {
    return
  }
  const data = {
    heading: 'First Deposit Bonus for New Members',
    title: {
      line1: 'Refer &',
      line2: 'Rewards',
    },
    background: "bg-[url('/images/banner/Banner06-1.jpg')]",
    submit: 'Claim now',
    onClick: clickSubmit,
  }

  const rewards = ['1U', '2u', '5u', '5u', '5u', '5u', '24u + 18u']
  return (
    <BetTemplate {...data}>
      <div className="p-4 bg-white-4 rounded-[12px] flex flex-col gap-4">
        <div className="text-[18px] font-bold text-white flex justify-center items-center">
          <span>Activity Fund Application</span>
        </div>
        <div className=" grid grid-cols-10 justify-between items-center rounded-[12px]  gap-4">
          {rewards.map((reward, index) => (
            <DailyRewardCard
              className={index > 4 ? 'col-span-5' : 'col-span-2'}
              reward={reward}
              key={index}
              date={index + 1}
            />
          ))}
        </div>
      </div>

      <div className="p-4 bg-white-4 rounded-[12px] flex flex-col mt-4 gap-4">
        <div className="text-[14px]  text-casper flex justify-center items-center w-[70%] mx-auto">
          <span>
            Sign in The seventh day continuously, and you can unlock additional
            rewards. After signing out, it will be recalculated from the first
            day
          </span>
        </div>
        <div className=" grid grid-cols-1  2xl:grid-cols-3 justify-between items-center rounded-[12px]  gap-4">
          <div className="p-4 bg-white-4 rounded-[12px] flex flex-col items-center gap-4">
            <span className="text-white text-[14px] font-bold">
              <span>0Day</span>
            </span>
            <span className="text-dodger-blue text-[14px] font-bold">
              <span>Continuous sign-ins this round</span>
            </span>
          </div>
          <div className="p-4 bg-white-4 rounded-[12px] flex flex-col items-center gap-4">
            <span className="text-white text-[14px] font-bold">
              <span>0U</span>
            </span>
            <span className="text-dodger-blue text-[14px] font-bold">
              <span>Reward received</span>
            </span>
          </div>
          <div className="p-4 bg-white-4 rounded-[12px] flex flex-col 2xl:flex-row items-center gap-4">
            <div>
              <img src="/images/coins.svg" alt="coins" />
            </div>
            <div className="flex flex-col gap-4 items-center">
              <span className="text-white text-[14px] font-bold">65U</span>
              <span className="text-dodger-blue text-[14px] font-bold">
                Rewards to be collected this round
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[12px] p-4 mt-4 flex flex-col gap-2 bg-white-4 rounded-[12px]">
        <h2 className="text-[18px] text-gallery">Rules and Terms</h2>
        <div className="text-[14px] font-bold text-white">
          <p>Event Venue: Live Game </p>
          <p>Eligible: All </p>
          <p>Promotion Period: Long-term activity</p>
        </div>
        <div className="px-4 ">
          <ol className="text-casper text-[14px] list-decimal">
            <li className="pb-4">
              To receive the reward amount in this activity, you can withdraw
              money with only 3 times the turnover.
            </li>

            <li className="pb-4">
              You can participate in this event every day and you can claim 7
              rewards.
            </li>

            <li className="pb-4">
              Definition of valid turnover: Bets that result in a win or loss
              are considered valid betting turnover
            </li>

            <li className="pb-4">
              Each player can only register one account. Registering multiple
              accounts to participate in this event will be considered bonus
              abuse, and all profits and bonuses will be canceled. If any user
              or group uses abnormal methods to exploit offers, the platform
              reserves the right to freeze the account or cancel the bonus
              qualification without notice.
            </li>
          </ol>
          <div className="py-16 flex justify-center">
            <BlackButton>
              <CopyIcon className="w-4 g-4" />
            </BlackButton>
          </div>
        </div>
      </div>
    </BetTemplate>
  )
}

export default CheckinRewardPage
