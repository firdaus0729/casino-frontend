'use client'

import BetTemplate from '@/components/BetTemplate'
import BlackButton from '@/components/ui/Button/BlackButton'
import TDButton from '@/components/ui/Button/TDButton'
import TaskCard from '@/components/ui/cards/TaskCard'
import AlertSquareIcon from '@/components/ui/icons/alert-square'
import CopyIcon from '@/components/ui/icons/copy'

const LiveCasinoPage = () => {
  const clickSubmit = () => {}

  const clickButton = () => {}
  const data = {
    heading: 'Live Casino · Hero’s Journey',
    title: {
      line1: 'Live Casino · Hero’s Journey',
      line2: '588U Waiting for you',
    },
    background: "bg-[url('/images/banner/Banner10-1.jpg')]",
    submit: 'Experience now',
    onClick: clickSubmit,
    button: 'Go to bet',
    onButtonClick: clickButton,
  }

  const tasks = [2500, 3000, 400, 345300, 23400, 5670, 345300, 23400, 5670]
  return (
    <BetTemplate {...data}>
      <div className="p-4 grid grid-cols-1  2xl:grid-cols-2 rounded-[12px] mb-8 bg-white-4 gap-4">
        {tasks.map((task, index) => (
          <TaskCard key={index} n={index + 1} price={task} />
        ))}
      </div>
      <div className="rounded-[12px] p-4 flex flex-col gap-2 bg-white-4 rounded-[12px]">
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

export default LiveCasinoPage
