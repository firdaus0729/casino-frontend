import React, { useRef } from 'react'
import { cn } from '@/lib/utils'

interface CopyBoxProps {
  children?: React.ReactNode
  onClick?: () => void
  icon?: React.ReactNode
  className?: string
  onCopy?: (text: string) => void
}

export const CopyBox = React.forwardRef<HTMLButtonElement, CopyBoxProps>(
  (
    { children = 'Filled', onClick, icon, className, onCopy, ...props },
    ref
  ) => {
    const handleCopy = async (e: React.MouseEvent) => {
      e.stopPropagation() // Prevent button onClick from firing
      const textToCopy = typeof children === 'string' ? children : 'Filled'

      try {
        await navigator.clipboard.writeText(textToCopy)
        onCopy?.(textToCopy)
      } catch (error) {
        console.error('Failed to copy text:', error)
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = textToCopy
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        onCopy?.(textToCopy)
      }
    }

    const defaultIcon = (
      <div
        onClick={handleCopy}
        className="p-1 hover:bg-ebony-clay rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 cursor-pointer"
        title={`Copy "${typeof children === 'string' ? children : 'text'}"`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path
            d="M10 2.5H20C20.8284 2.5 21.5 3.17157 21.5 4V14C21.5 14.8284 20.8284 15.5 20 15.5H10C9.17157 15.5 8.5 14.8284 8.5 14V4C8.5 3.17157 9.17157 2.5 10 2.5Z"
            fill="white"
            stroke="white"
          />
          <path
            d="M8.5 18C7.83696 18 7.20107 17.7366 6.73223 17.2678C6.26339 16.7989 6 16.163 6 15.5V8H4C2.9 8 2 8.9 2 10V20C2 21.1 2.9 22 4 22H14C15.1 22 16 21.1 16 20V18H8.5Z"
            fill="white"
          />
        </svg>
      </div>
    )

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          'flex justify-center items-start gap-1 rounded-lg bg-[#1C2532] h-12 px-4 py-3',
          'hover:bg-[#253040] transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50',
          className
        )}
        {...props}
      >
        <div className="flex min-w-40 items-center gap-2 flex-1 self-stretch justify-between">
          <span
            className=" overflow-hidden text-ellipsis text-left text-white text-xs font-bold leading-normal"
            style={{
              fontFamily:
                'Montserrat, -apple-system, Roboto, Helvetica, sans-serif',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              display: '-webkit-box',
            }}
          >
            {children}
          </span>
          {icon || defaultIcon}
        </div>
      </button>
    )
  }
)

CopyBox.displayName = 'CopyBox'
