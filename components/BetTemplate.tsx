'use client'

import { ReactNode } from 'react'
import BlackButton from './ui/Button/BlackButton'
import FlatButton from './ui/Button/FlatButton'
import TDButton from './ui/Button/TDButton'
import ArrowLeftStrokeIcon from './ui/icons/arrow-left-stroke'
import { cn } from '@/lib/utils'

interface BetTemplateProps {
  children: ReactNode
  background: string
  heading: string
  title: {
    line1: string
    line2: string
  }
  submit: string
  onClick: () => void
  button?: string
  onButtonClick?: () => void
}

const BetTemplate: React.FC<BetTemplateProps> = ({
  children,
  background,
  title,
  heading,
  submit,
  onClick,
  onButtonClick,
  button,
}) => {
  return (
    <>
      <div className="md:w-[70%] w-full mx-auto">
        <div className="lg:flex hidden gap-4 items-center py-8">
          <BlackButton>
            <ArrowLeftStrokeIcon className="w-4 h-4" />
          </BlackButton>
          <span className="font-bold text-[18px] text-white">{heading}</span>
        </div>
        <div className="rounded-[12px] overflow-hidden lg:mb-64">
          <div
            className={cn(
              'h-[426px] w-full  flex flex-col justify-around lg:justify-center  bg-right gap-10 bg-no-repeat bg-cover',
              background
            )}
          >
            <div className="text-white pl-10 hidden xl:block max-w-[50%] uppercase font-bold">
              <div className="text-[40px]">{title.line1}</div>
              <div className="text-[32px]">{title.line2}</div>
            </div>
            <FlatButton
              onClick={onClick}
              className="w-[371.52px] uppercase ml-10 h-[82px] hidden  xl:flex text-[29.82px] font-bold rounded-[19.88px] bg-[linear-gradient(#0C60FF,#2C9FFA)]"
            >
              {submit}
            </FlatButton>
            {button && (
              <div className="flex lg:hidden itemes-end justify-center pt-[32px]">
                <TDButton
                  onClick={() => onButtonClick?.()}
                  type="blue"
                  className="w-[217px] h-[42px] text-[14px] "
                >
                  {button}
                </TDButton>
              </div>
            )}
          </div>
          <div className="px-4 bg-white-4 pt-8">
            {button && (
              <div className="lg:flex hidden justify-center pb-[32px]">
                <TDButton
                  onClick={() => onButtonClick}
                  type="blue"
                  className="w-[217px] h-[42px] text-[14px] "
                >
                  {button}
                </TDButton>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default BetTemplate
