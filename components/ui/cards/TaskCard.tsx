'use client'

import TDButton from '../Button/TDButton'
import AlertSquareIcon from '../icons/alert-square'

interface TaskCardProps {
  n: number
  price: number
}

const TaskCard: React.FC<TaskCardProps> = ({ n, price }) => {
  return (
    <div className="rounded-[12px] overflow-hidden">
      <div className="w-full text-white bg-white-8 py-2 px-4 font-bold text-[14px]">
        The <>{n}</>th level task
      </div>
      <div className="p-4 bg-white-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <img
              src="/icons/game-icon/NiuNiu1.svg"
              className="w-12 h-12"
              alt="coin"
            />
            <div className="font-bold text-white">
              <span className="block">
                <span>Cumulative valid bets on the day</span>
              </span>
              <span className="block uppercase">
                <span>
                  <span className="text-yellow-orange">
                    <>{price}</>
                  </span>
                  usdt
                </span>
              </span>
            </div>
          </div>
          <TDButton
            onClick={() => {}}
            type="blue"
            className="w-[87px] text-[12px] h-[33px] font-bold gap-[10px] rounded-[8px] text-white"
          >
            <AlertSquareIcon />
            Claim
          </TDButton>
        </div>
        <div className="flex pt-4">
          <div className="h-[14px] relative w-full rounded-full bg-white-13 p-[3px]">
            <div className="h-full w-[50%] border-t border-white-33 bg-crimson rounded-full"></div>
            <div className="absolute font-bold text-white text-[10px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              50%
            </div>
          </div>
          <div className="text-dodger-blue font-bold flex justify-center items-center text-[10px] w-8">
            1U
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
