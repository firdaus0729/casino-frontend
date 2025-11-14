'use client'

import BetTemplate from '@/components/BetTemplate'
import BlackButton from '@/components/ui/Button/BlackButton'
import TabButton from '@/components/ui/Button/TabButton'
import TDButton from '@/components/ui/Button/TDButton'
import TaskCard from '@/components/ui/cards/TaskCard'
import TXCard from '@/components/ui/cards/TXCard'
import { CopyBox } from '@/components/ui/CopyBox'
import AlertSquareIcon from '@/components/ui/icons/alert-square'
import CopyIcon from '@/components/ui/icons/copy'
import CurrencyNotes1Icon from '@/components/ui/icons/currency-notes-1'
import InfoCircleIcon from '@/components/ui/icons/info-circle'

const FirstDeposit1Page = () => {
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
    background: "bg-[url('/images/banner/Banner12-1.jpg')]",
    submit: 'Claim now',
    onClick: clickSubmit,
    button: 'Recommend Friends',
    onButtonClick: clickButton,
  }

  const tasks = [2500, 3000, 400, 345300, 23400, 5670, 345300, 23400, 5670]
  return (
    <BetTemplate {...data}>
      <div className="p-4 bg-white-4 rounded-[12px] flex flex-col gap-4">
        <div className="text-[18px] font-bold text-white flex justify-center items-center">
          Activity Fund Application
        </div>
        <div className="pb-4 grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-6 justify-between items-center rounded-[12px]  gap-4">
          <TXCard
            title="Additional rewards"
            fee="188U"
            value="30"
            desc={<>Cumulative number of invitees</>}
          />
          <TXCard
            title="Additional rewards"
            fee="188U"
            value="100"
            desc={<>Cumulative number of invitees</>}
          />
          <TXCard
            title="Additional rewards"
            fee="188U"
            value="500"
            desc={<>Cumulative number of invitees</>}
          />
          <TXCard
            title="Additional rewards"
            fee="188U"
            value="1000"
            desc={<>Cumulative number of invitees</>}
          />
          <TXCard
            title="Additional rewards"
            fee="188U"
            value="3000"
            desc={<>Cumulative number of invitees</>}
          />
          <TXCard
            title="Additional rewards"
            fee="188U"
            value="5000"
            desc={<>Cumulative number of invitees</>}
          />
        </div>
        <div className="p-4 rounded-[12px] flex justify-between items-center bg-white-8 flex justify-center items-center text-[14px] text-casper">
          <div>
            Total number of invitees <b className="text-dodger-blue">0</b>
          </div>
          <div className="hidden md:block">
            Bonus <b className="text-dodger-blue"> 0U</b>
          </div>
        </div>
      </div>

      <div className="bg-white-4 rounded-[12px] p-4 flex flex-col gap-4 mt-4 ">
        <div className="font-bold text-[18px] flex justify-center items-center text-white">
          How to claim the bonus
        </div>
        <div className="grid xl:grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="p-8 flex flex-col gap-4 bg-white-4 rounded-[12px]">
            <div>
              <TabButton
                type="one"
                title="Step One"
                className="h-[23px] text-[12px] font-bold text-white"
              />
              <span className="text-[14px] text-casper font-bold pt-4">
                Copy the invitation link and recommendation code to your friends
              </span>
            </div>
            <CopyBox className="bg-white-8">
              https://ok777.casino/?AgentCode=330395
            </CopyBox>
            <div className="flex justify-between flex-wrap gap-2">
              {socials.map(item => (
                <div
                  key={item}
                  className="flex justify-center items-center w-9 h-9 bg-white-4 rounded-[8px] border-t border-white-4"
                >
                  <img
                    className="h-4 w-4 "
                    src={'/icons/social-icon/' + item + '.svg'}
                    alt="social"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 flex flex-col gap-4  bg-white-4 rounded-[12px]">
            <div className="flex flex-col gap-4 items-start">
              <TabButton
                type="one"
                title="Step Two"
                className="h-[23px] text-[12px] font-bold text-white"
              />
              <span className="text-[14px] text-casper font-bold">
                (Assist) friends to complete registration and recharge
              </span>
            </div>
            <div className="relative flex justify-center items-center">
              <img
                src="/images/Device1.png"
                className="h-[224.03px] mx-auto"
                alt="phone"
              />
              <div className="w-[320px] py-[10px] z-[999] pr-[9px] pl-[16px] bg-mirage absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 flex justify-between items-center shadow-[0_8px_16px_#3389FF40] w-[312px] rounded-[16px]">
                <img src="/images/logo.svg" alt="" />
                <div className="flex gap-2 relative">
                  <BlackButton
                    onClick={() => {}}
                    className="text-[12px] text-casper"
                  >
                    Log in
                  </BlackButton>
                  <TDButton
                    onClick={() => {}}
                    className="w-[85px] h-[33px] rounded-[8px] text-[12px]"
                    type="red"
                  >
                    Register
                  </TDButton>
                  <img
                    src="/icons/cursor.svg"
                    alt="cursor"
                    className="rotate absolute left-[15%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 grid 2xl:grid-cols-[40%_60%] items-center grid-cols-1 gap-8 justify-between bg-white-4 rounded-[12px]">
          <div>
            <TabButton
              type="one"
              title="Step Three"
              className="h-[23px] text-[12px] font-bold text-white"
            />
            <span className="text-[14px] text-casper font-bold pt-4">
              Unlock additional rewards and claim them to your account
            </span>
          </div>
          <div className="relative flex justify-center items-center">
            <img src="/images/Frame4.png" alt="phone" className="w-full" />
          </div>
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
      </div>
    </BetTemplate>
  )
}

export default FirstDeposit1Page
