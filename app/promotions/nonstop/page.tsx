'use client'

import BetTemplate from '@/components/BetTemplate'
import BlackButton from '@/components/ui/Button/BlackButton'
import TDButton from '@/components/ui/Button/TDButton'
import TaskCard from '@/components/ui/cards/TaskCard'
import AlertSquareIcon from '@/components/ui/icons/alert-square'
import CopyIcon from '@/components/ui/icons/copy'

const NonStopPage = () => {
  const clickSubmit = () => {}

  const clickButton = () => {}
  const data = {
    heading: 'NON-Stop Cashback',
    title: {
      line1: 'non-stop',
      line2: 'cashback',
    },
    background: "bg-[url('/images/banner/Banner09-1.jpg')]",
    submit: 'get $1588',
    onClick: clickSubmit,
    button: 'Go to bet',
    onButtonClick: clickButton,
  }

  const tasks = [2500, 3000, 400, 345300, 23400, 5670, 345300, 23400, 5670]

  const performanceData = [
    { gameType: 'Hash Game', total: '1.1%', direct: '1.1%', agent: 0 },
    { gameType: 'Crypto Games', total: '1.1%', direct: '1.1%', agent: 0 },
    { gameType: 'Hash Lottery', total: '1.1%', direct: '1.1%', agent: 0 },
    { gameType: 'Table Games', total: '1.1%', direct: '1.1%', agent: 0 },
    { gameType: 'Slots', total: '1.1%', direct: '1.1%', agent: 0 },
    { gameType: 'Live Casino', total: '0.8%', direct: '0.8%', agent: 0 },
    { gameType: 'Sports', total: '0.8%', direct: '0.8%', agent: 0 },
    {
      gameType: 'Low Frequency Lottery',
      total: '1.1%',
      direct: '1.1%',
      agent: 0,
    },
    { gameType: 'HASH Roulette', total: '1.1%', direct: '1.1%', agent: 0 },
  ]

  return (
    <BetTemplate {...data}>
      <div className="overflow-x-auto rounded-[8px] mb-[32px]">
        <table className="w-full text-white ">
          <thead>
            <tr className="bg-mirage-8a">
              <th className="py-4 px-2 [@media(max-width:500px)]:px-0 font-bold text-[12px] text-[#FFFFFFCC]">
                Game Type
              </th>
              <th className="py-4 px-2 [@media(max-width:500px)]:px-0 font-bold text-[12px] text-[#FFFFFFCC]">
                Current Rebate Ratio
              </th>
              <th className="py-4 px-2 [@media(max-width:500px)]:px-0 font-bold text-[12px] text-[#FFFFFFCC]">
                Maximum rebate
              </th>
              <th className="py-4 px-2 [@media(max-width:500px)]:px-0 font-bold text-[12px] text-[#FFFFFFCC]">
                Yesterday's Rebate Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {performanceData.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-white-8' : 'bg-white-4'}
              >
                <td className="py-3 px-4 text-[10px] font-bold flex justify-center items-center text-[#A7B5CA]">
                  {row.gameType}
                </td>
                <td className="py-3 px-4 text-[12px] font-bold flex justify-center items-center text-white">
                  {row.total}
                </td>
                <td className="py-3 px-4 text-[12px] font-bold  text-white">
                  <div className="flex items-center justify-center gap-2">
                    {row.direct}
                  </div>
                </td>
                <td className="py-3 px-4 text-[12px] font-bold text-white">
                  <div className="flex items-center justify-center gap-2">
                    {row.agent}
                  </div>
                </td>
              </tr>
            ))}
            {/* Total Row */}
            <tr className="bg-ebony-clay">
              <td className="py-3 px-4 font-bold text-[12px] flex justify-center items-center text-[#A7B5CA]">
                Yesterday's Total Rebate Amount
              </td>
              <td className="py-3 px-4 font-bold text-[12px] flex justify-center items-center text-[#60A5FA]"></td>
              <td className="py-3 px-4 font-bold text-[12px] flex justify-center items-center text-[#60A5FA]"></td>
              <td className="py-3 px-4 font-bold text-[12px] flex justify-center items-center text-[#60A5FA]">
                0
              </td>
            </tr>
          </tbody>
        </table>
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

export default NonStopPage
