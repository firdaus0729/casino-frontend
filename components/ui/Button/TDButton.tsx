'use client'

import { cn } from '@/lib/utils'
import { Loader, Loader2 } from 'lucide-react'
import { ReactNode } from 'react'

interface TDButtonProps {
  className?: string
  type?: 'red' | 'blue'
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
}

const TDButton: React.FC<TDButtonProps> = ({
  className,
  type,
  children,
  onClick,
  disabled = false,
  loading = false,
}) => {
  const isDisabled = disabled || loading
  const redStyle = isDisabled
    ? 'bg-[linear-gradient(#F9476E8A_0%,#BD01398A_24%)] inset-0 ' +
        'cursor-not-allowed'
    : 'bg-[linear-gradient(#F9476E_0%,#BD0139_24%)] ' +
        'hover:bg-[linear-gradient(#FF7593,#C4003A,#F92956)]'
  const blueStyle = isDisabled
    ? 'bg-[linear-gradient(#2C9FFA8A_0%,#0C60FF8A_24%)] cursor-not-allowed'
    : 'bg-[linear-gradient(#2C9FFA_0%,#0C60FF_24%)] ' +
        'hover:bg-[linear-gradient(#47AEFF,#1868FF,#47AEFF)]'
  const Style = type === 'red' ? redStyle : blueStyle
  const edge = isDisabled 
    ? type === 'red' ? 'bg-[#ED1D4980] inset-0' : 'bg-[#2283F680] inset-0' 
    : type === 'red' ? 'bg-[#ED1D4980]' : 'bg-[#2283F680]'

  return (
    <>
      <div
        onClick={isDisabled ? undefined : onClick}
        className={cn(
          'pushable group relative border-none bg-transparent p-0 ' +
            'outline-offset-1 transition-filter duration-250 ' +
            'focus:outline-none focus-visible:outline',
          isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
          className
        )}
      >
        <span
          className={cn(
            'edge absolute top-1 left-0 rounded-[0.75rem] w-full h-full',
            edge
          )}
        ></span>
        <span
          className={cn(
            `front relative rounded-[0.75rem] text-white will-change-transform ` +
              `inner-shadow-[#FFFFFF21] transform transition-transform ` +
              `${isDisabled ? '' : 'group-hover:-translate-y-[0.1875rem]'} ` +
              `${isDisabled ? '' : 'group-active:translate-y-[0.0625rem]'} ` +
              `font-bold flex items-center justify-center`,
            className,
            Style
          )}
        >
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            children
          )}
        </span>
      </div>
    </>
  )
}

export default TDButton
