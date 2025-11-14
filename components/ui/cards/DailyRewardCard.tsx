'use client'

import { cn } from '@/lib/utils'

interface DailyRewardProps {
  date: number
  reward: string
  className: string
}

const DailyRewardCard: React.FC<DailyRewardProps> = ({
  date,
  reward,
  className,
}) => {
  return (
    <>
      <div className={cn('rounded-[12px] overflow-hidden', className)}>
        <div className="py-[8px] font-bold w-full text-[14px] text-white flex justify-center items-center bg-white-8">
          <span>Day {date}</span>
        </div>
        <div className="p-4 flex flex-col gap-4 bg-white-4 items-center">
          <img src="/images/coins.svg" alt="coins" />
          <span className="uppercase text-dodger-blue  font-bold text-[14px]">
            {reward}
          </span>
        </div>
      </div>
    </>
  )
}

export default DailyRewardCard
