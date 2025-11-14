import { cn } from '@/lib/utils'
import React from 'react'
import XIcon from './icons/x'

interface ModalHeaderProps {
  title: string
  onClick?: () => void
  className?: string
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  className,
  onClick,
  title,
}) => {
  return (
    <>
      <div
        className={cn(
          'bg-[linear-gradient(1turn,#1119238A,#002554)] rounded-t-[14px]  border-t border-[#FFFFFF29] p-4 pl-6 flex items-center justify-between',
          className
        )}
      >
        <span className="text-white font-bold text-[18px]">{title}</span>
        <div
          onClick={onClick}
          className="bg-[#FFFFFF0A] text-casper rounded-[8px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16)] active:bg-[#FFFFFF21] hover:bg-[#FFFFFF21] flex items-center border border-[#FFFFFF0A] justify-center p-2.5  h-9 w-9 cursor-pointer"
        >
          <span>
            <XIcon />
          </span>
        </div>
      </div>
    </>
  )
}

export default ModalHeader
