import { ReactNode } from 'react'
import TDButton from '../Button/TDButton'
import AlertSquareIcon from '../icons/alert-square'
import InfoCircleIcon from '../icons/info-circle'

interface TXCard {
  title: string
  fee: string
  value: string
  desc: ReactNode
}

const TXCard: React.FC<TXCard> = ({ title, fee, value, desc }) => {
  return (
    <>
      <div className="rounded-[12px] p-4 bg-white-4 gap-4 flex justify-center items-center">
        <div className="w-full p-4 flex gap-4 flex-col relative">
          <InfoCircleIcon className="w-6 h-6 text-blue-bayoux absolute top-0 right-0" />
          <span className="font-normal text-[14px] text-white">{title}</span>
          <span className="text-dodger-blue text-[14px]">{fee}</span>
          <div className="text-yellow-orange text-[24px]">{value}</div>
          <span className="font-normal text-[14px] text-casper">{desc}</span>
        </div>
        <div>
          <TDButton
            type="blue"
            onClick={() => {}}
            className="w-[87px] h-[33px] gap-[10px] rounded-[8px] text-white text-[12px] font-bold"
          >
            <AlertSquareIcon className="w-4 h-4" />
            Claim
          </TDButton>
        </div>
      </div>
    </>
  )
}

export default TXCard
