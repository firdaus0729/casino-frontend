'use client'

import BetTemplate from '@/components/BetTemplate'
import BlackButton from '@/components/ui/Button/BlackButton'
import TabButton from '@/components/ui/Button/TabButton'
import TDButton from '@/components/ui/Button/TDButton'
import TaskCard from '@/components/ui/cards/TaskCard'
import TXCard from '@/components/ui/cards/TXCard'
import AlertSquareIcon from '@/components/ui/icons/alert-square'
import CopyIcon from '@/components/ui/icons/copy'
import CurrencyNotes1Icon from '@/components/ui/icons/currency-notes-1'
import InfoCircleIcon from '@/components/ui/icons/info-circle'

const DepositBonusPage = () => {
  const clickSubmit = () => {}

  const clickButton = () => {
    return
  }
  const data = {
    heading: 'Daily 100% deposit bonus',
    title: {
      line1: 'Daily 100%',
      line2: 'deposit bonus',
    },
    background: "bg-[url('/images/banner/Banner11-1.jpg')]",
    submit: 'Claim now',
    onClick: clickSubmit,
    button: 'Go to recharge',
    onButtonClick: clickButton,
  }

  const tasks = [2500, 3000, 400, 345300, 23400, 5670, 345300, 23400, 5670]
  return (
    <BetTemplate {...data}>
      <div className="p-4 bg-white-4 rounded-[12px] flex flex-col gap-4">
        <div className="text-[18px] font-bold text-white flex justify-center items-center">
          Activity Fund Application
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 rounded-[12px] bg-white-4 gap-4">
          <TXCard
            title="First single transaction≥50U"
            fee="20%"
            value="20"
            desc={
              <>
                HighestGift Turnover Multiple <b className="text-white">10</b>
              </>
            }
          />
          <TXCard
            title="First single transaction≥50U"
            fee="30%"
            value="150"
            desc={
              <>
                HighestGift Turnover Multiple <b className="text-white">15</b>
              </>
            }
          />
          <TXCard
            title="First single transaction≥50U"
            fee="50%"
            value="1000"
            desc={
              <>
                HighestGift Turnover Multiple <b className="text-white">22</b>
              </>
            }
          />
          <TXCard
            title="First single transaction≥50U"
            fee="100%"
            value="20000"
            desc={
              <>
                HighestGift Turnover Multiple <b className="text-white">35</b>
              </>
            }
          />
        </div>
        <div className="p-4 rounded-[12px] bg-white-4 flex justify-center items-center text-[14px] text-casper">
          This event cannot be repeated or claimed multiple times. Please check
          the turnover multiple and <br className="hidden lg:block" /> choose
          your largest reward proactively
        </div>
      </div>

      <div className="bg-white-4 rounded-[12px] p-4 flex flex-col gap-4 mt-4 ">
        <div className="font-bold text-[18px] flex justify-center items-center text-white">
          How to claim the bonus
        </div>
        <div className="grid xl:grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="p-8 flex flex-col gap-8 justify-between bg-white-4 rounded-[12px]">
            <div>
              <TabButton
                type="one"
                title="Step One"
                className="h-[23px] text-[12px] font-bold text-white"
              />
              <span className="text-[14px] text-casper font-bold pt-4">
                New user registration 365 Select a single recharge level within
                days
              </span>
            </div>
            <div className="relative flex justify-center items-center">
              <img
                src="/images/Device.png"
                alt="phone"
                className="h-[224.03px]"
              />
              <div className="w-[320px] py-[10px] z-[999] pr-[9px] pl-[16px] bg-mirage absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-between items-center shadow-[0_8px_16px_#3389FF40] w-[312px] rounded-[16px]">
                <BlackButton className="">
                  <CurrencyNotes1Icon className="w-4 h-4" color="#1BB83D" />
                </BlackButton>
                <div>
                  <span className="text-casper text-[10px] block">
                    Recharge successful
                  </span>
                  <b className="text-malachite text-[18px] block">+5000.00</b>
                </div>
              </div>
              <div className="w-[276.88px] h-[58px] z-[99] py-[10px] pr-[9px] pl-[16px] bg-mirage-8a absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-between items-center shadow-[0_8px_16px_#3389FF40] rounded-[16px]" />
              <div className="w-[239.56px] h-[58px] z-[9] py-[10px] pr-[9px] pl-[16px] bg-mirage-8a absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-between items-center shadow-[0_8px_16px_#3389FF40]  rounded-[16px]" />
            </div>
          </div>
          <div className="p-8 flex flex-col items-start gap-4 bg-white-4 rounded-[12px]">
            <TabButton
              type="one"
              title="Step Two"
              className="h-[23px] text-[12px] font-bold text-white"
            />
            <span className="text-[14px] text-casper font-bold">
              Receive corresponding bonus
            </span>
            <div className="flex justify-center items-center">
              <img src="/images/Frame2.png" alt="phone" />
            </div>
          </div>
        </div>
        <div className="p-8 grid 2xl:grid-cols-[60%_40%] items-center grid-cols-1 gap-8 justify-between bg-white-4 rounded-[12px]">
          <div>
            <TabButton
              type="one"
              title="Step Three"
              className="h-[23px] text-[12px] font-bold text-white"
            />
            <span className="text-[14px] text-casper font-bold pt-4">
              New user registration 365 Select a single recharge level within
              days
            </span>
          </div>
          <div className="relative flex justify-center items-center">
            <img
              src="/images/Frame3.png"
              alt="phone"
              className="h-[224.03px]"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <TDButton
            onClick={() => {}}
            type="blue"
            className="w-[217px] h-[42px] text-[14px] "
          >
            Go to recharge
          </TDButton>
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

export default DepositBonusPage
