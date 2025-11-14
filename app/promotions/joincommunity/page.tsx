'use client'

import BetTemplate from '@/components/BetTemplate'
import BlackButton from '@/components/ui/Button/BlackButton'
import FlatButton from '@/components/ui/Button/FlatButton'
import TabButton from '@/components/ui/Button/TabButton'
import TDButton from '@/components/ui/Button/TDButton'
import TaskCard from '@/components/ui/cards/TaskCard'
import TXCard from '@/components/ui/cards/TXCard'
import { CopyBox } from '@/components/ui/CopyBox'
import AlertSquareIcon from '@/components/ui/icons/alert-square'
import CopyIcon from '@/components/ui/icons/copy'
import CurrencyNotes1Icon from '@/components/ui/icons/currency-notes-1'
import InfoCircleIcon from '@/components/ui/icons/info-circle'

const JoinCommunityPage = () => {
  const clickSubmit = () => {}

  const socials = [
    'Telegram',
    'Facebook',
    'X',
    'Instagram',
    'WhatsApp',
    'Line',
    'Discord',
    'Tiktok',
  ] as const

  const clickButton = () => {
    return
  }
  const data = {
    heading: 'Join the community now',
    title: {
      line1: 'Join the community',
      line2: 'Start a mission journey',
    },
    background: "bg-[url('/images/banner/Banner01-1.jpg')]",
    submit: 'join the fun!',
    onClick: clickSubmit,
    button: 'Recommend Friends',
    onButtonClick: clickButton,
  }

  const tasks = [2500, 3000, 400, 345300, 23400, 5670, 345300, 23400, 5670]
  return (
    <BetTemplate {...data}>
      <div className="p-4 bg-white-4 rounded-[12px] flex flex-col gap-4">
        <div className="text-[18px] font-bold text-white flex justify-center items-center">
          Complete tasks every day and give bonuses every day!
        </div>
        <div className="lg:w-[70%] w-full mx-auto flex justify-center items-center text-[14px] text-casper">
          Want to play around and make money? Now join the official community of
          OK777 to complete the designated 
          <span className="text-yellow-orange">
            interactive tasks, betting challenges, and friend invitation
            activities.{' '}
          </span>
          There are new tasks every day, with prizes, and you can also be on the
          “Task King List”! Click the social media link below to join the event.
        </div>
        <div className=" rounded-[12px] flex justify-center items-center flex-wrap gap-2 flex justify-center items-center text-[14px] text-casper">
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

      <div className="bg-white-4 rounded-[12px] p-4 flex flex-col gap-4 mt-4 ">
        <div className="font-bold text-[14px] flex justify-center items-center text-white">
          How to claim the bonus
        </div>
        <div className="grid xl:grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="p-8 flex flex-col gap-8 bg-white-4 rounded-[12px]">
            <div>
              <TabButton
                type="one"
                title="Super simple mission"
                className="h-[23px] text-[12px] font-bold text-white"
              />
              <span className="text-[14px] text-casper font-bold pt-4">
                Leave a message, share, and invite friends
              </span>
            </div>
            <div className="relative flex justify-center items-center">
              <img
                src="/images/Device3.png"
                className="h-[330.49px] mx-auto"
                alt="phone"
              />
              <img
                src="/images/star1.svg"
                alt="star"
                className="absolute right-[15%] top-[30%]"
              />
              <div className="absolute top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2">
                <FlatButton
                  onClick={() => {}}
                  className="w-[242px] h-[41px] text-[12px]"
                >
                  Message
                </FlatButton>
                <FlatButton
                  onClick={() => {}}
                  className="w-[242px] h-[41px] text-[12px]"
                >
                  Share
                </FlatButton>
                <FlatButton
                  onClick={() => {}}
                  className="w-[242px] h-[41px] text-[12px] bg-cornflower-blue"
                >
                  Invite friends
                </FlatButton>
                <img
                  src="/icons/cursor.svg"
                  alt="cursor"
                  className="rotate absolute -left-1/4 -bottom-1/3"
                />
              </div>
            </div>
          </div>
          <div className="p-8 flex flex-col gap-4  bg-white-4 rounded-[12px]">
            <div className="flex flex-col gap-4 items-start">
              <TabButton
                type="one"
                title="There will be rewards when you finish"
                className="h-[23px] text-[12px] font-bold text-white"
              />
              <span className="text-[14px] text-casper font-bold">
                No new users are allowed, everyone can participate
              </span>
              <span className="text-[14px] text-casper font-bold">
                Continuous participation can still be limited 
              </span>
              <span className="text-[14px] text-dodger-blue font-bold">
                Headframe, lottery qualifications, ranking awards!
              </span>
            </div>
            <div className="relative flex justify-center items-center relative">
              <img
                src="/images/giftbox.png"
                alt="gift"
                className="transform -rotate-[17.81deg] absolute z-[99] top-[10px] left-[-10px]  blur-[2px] h-[98.25px]"
              />
              <img
                src="/images/giftbox.png"
                alt="gift"
                className="h-[250px] relative z-[999]"
              />
              <img
                src="/images/giftbox.png"
                alt="gift"
                className="h-[72.61px] blur-[2px] absolute z-[99] rotate-[12.02deg] bottom-[50px] right-[-10px]"
              />
            </div>
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

export default JoinCommunityPage
