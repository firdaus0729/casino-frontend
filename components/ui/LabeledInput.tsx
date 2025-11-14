import React from 'react'
import { cn } from '@/lib/utils'

interface LabeledInputProps {
  label?: string
  value?: string
  placeholder?: string
  icon?: React.ReactNode
  className?: string
  onValueChange?: (value: string) => void
}

export const LabeledInput = React.forwardRef<
  HTMLInputElement,
  LabeledInputProps
>(
  (
    {
      label = 'Label',
      value,
      placeholder = 'Active/Focus',
      icon,
      className,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const defaultIcon = (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        <path
          d="M13.6006 21.0761L19.0608 17.9236C19.6437 17.5871 19.9346 17.4188 20.1465 17.1834C20.3341 16.9751 20.4759 16.7297 20.5625 16.4632C20.6602 16.1626 20.6602 15.8267 20.6602 15.1568V8.84268C20.6602 8.17277 20.6602 7.83694 20.5625 7.53638C20.4759 7.26982 20.3341 7.02428 20.1465 6.816C19.9355 6.58161 19.6453 6.41405 19.0674 6.08043L13.5996 2.92359C13.0167 2.58706 12.7259 2.41913 12.416 2.35328C12.1419 2.295 11.8584 2.295 11.5843 2.35328C11.2744 2.41914 10.9826 2.58706 10.3997 2.92359L4.93843 6.07666C4.35623 6.41279 4.06535 6.58073 3.85352 6.816C3.66597 7.02428 3.52434 7.26982 3.43773 7.53638C3.33984 7.83765 3.33984 8.17436 3.33984 8.84742V15.1524C3.33984 15.8254 3.33984 16.1619 3.43773 16.4632C3.52434 16.7297 3.66597 16.9751 3.85352 17.1834C4.06548 17.4188 4.35657 17.5871 4.93945 17.9236L10.3997 21.0761C10.9826 21.4126 11.2744 21.5806 11.5843 21.6465C11.8584 21.7047 12.1419 21.7047 12.416 21.6465C12.7259 21.5806 13.0177 21.4126 13.6006 21.0761Z"
          stroke="#55657E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 11.9998C9 13.6566 10.3431 14.9998 12 14.9998C13.6569 14.9998 15 13.6566 15 11.9998C15 10.3429 13.6569 8.99976 12 8.99976C10.3431 8.99976 9 10.3429 9 11.9998Z"
          stroke="#55657E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )

    return (
      <div className={cn('inline-flex items-center', className)}>
        <div className="relative rounded-xl border border-blue-bayoux hover:border-polo-blue active:border-dodger-blue peer-not-placeholder-shown:border-dodger-blue bg-vulcan min-w-40 h-12">
          {/* Label positioned absolutely to not interfere with border */}
          <div className="absolute -top-2 left-2 z-10">
            <div className="flex items-center px-1.5 py-0.5 rounded bg-gradient-to-b from-[#111923] to-vulcan">
              <span
                className="text-polo-blue text-[10px] font-normal leading-normal"
                style={{
                  fontFamily:
                    'Montserrat, -apple-system, Roboto, Helvetica, sans-serif',
                }}
              >
                {label}
              </span>
            </div>
          </div>

          {/* Input container */}
          <div className="flex items-center gap-4 px-4 h-full w-full">
            {icon || defaultIcon}
            <input
              ref={ref}
              type="text"
              value={value}
              placeholder={placeholder}
              onChange={e => onValueChange?.(e.target.value)}
              className={cn(
                'flex-1 overflow-hidden text-ellipsis bg-transparent text-blue-bayoux text-sm font-normal outline-none',
                'placeholder:text-blue-bayoux',
                'focus:outline-none focus:ring-0'
              )}
              style={{
                fontFamily:
                  'Montserrat, -apple-system, Roboto, Helvetica, sans-serif',
                textOverflow: 'ellipsis',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                display: '-webkit-box',
              }}
              {...props}
            />
          </div>
        </div>
      </div>
    )
  }
)

LabeledInput.displayName = 'LabeledInput'
