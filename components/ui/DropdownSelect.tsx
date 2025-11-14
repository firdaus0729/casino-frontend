import React, { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import ChevronDownIcon from './icons/chevron-down'

interface DropdownSelectProps {
  label?: string
  value?: string
  placeholder?: string
  options?: Array<{ value: string; label: string; icon?: React.ReactNode }>
  onChange?: (value: string) => void
  className?: string
}

export function DropdownSelect({
  label,
  value = 'Default',
  placeholder,
  options = [],
  onChange,
  className,
}: DropdownSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const selectedOption = useMemo(
    () => options.find(o => o.value === value),
    [options, value]
  )
  const displayLabel = selectedOption?.label ?? value ?? placeholder
  const LeftIcon = (selectedOption?.icon as React.ReactNode) ?? options[0].icon

  const handleToggle = () => setIsOpen(s => !s)
  const handleOptionSelect = (optionValue: string) => {
    onChange?.(optionValue)
    setIsOpen(false)
  }

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex h-12 flex-col justify-center items-start gap-1 flex-1 rounded-lg bg-white-4 cursor-pointer transition-all duration-200 hover:bg-opacity-60"
        onClick={handleToggle}
      >
        <div className="flex px-3 items-center gap-2 w-full">
          {/* Left icon reflects current selection */}
          {LeftIcon}

          <div className="flex flex-col justify-center items-start flex-1 min-w-0">
            {label && (
              <div
                className="text-[10px] font-normal leading-normal"
                style={{
                  color: '#93ACD3',
                  fontFamily:
                    'Montserrat, -apple-system, Roboto, Helvetica, sans-serif',
                }}
              >
                {label}
              </div>
            )}
            <div
              className="text-sm font-bold leading-normal truncate w-full text-left"
              style={{
                color: '#A7B5CA',
                fontFamily:
                  'Montserrat, -apple-system, Roboto, Helvetica, sans-serif',
              }}
            >
              {displayLabel}
            </div>
          </div>

          <ChevronDownIcon
            className={cn('text-casper', isOpen ? 'rotate-180' : '')}
          />
        </div>
      </div>

      {isOpen && options.length > 0 && (
        <div
          role="listbox"
          className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-gray-600 shadow-lg z-50"
          style={{ background: 'rgba(17, 25, 35, 0.95)' }}
        >
          {options.map(option => (
            <div
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={cn(
                'flex px-3 py-2 items-center gap-2 cursor-pointer hover:bg-gray-700 hover:bg-opacity-50 first:rounded-t-lg last:rounded-b-lg transition-colors'
              )}
              onClick={() => handleOptionSelect(option.value)}
            >
              {option.icon}
              <div className="flex flex-col justify-center items-start flex-1">
                <div
                  className="text-sm font-bold leading-normal"
                  style={{
                    color: '#A7B5CA',
                    fontFamily:
                      'Montserrat, -apple-system, Roboto, Helvetica, sans-serif',
                  }}
                >
                  {option.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
