import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface SearchInputProps {
  value?: string
  placeholder?: string
  onValueChange?: (value: string) => void
  onClear?: () => void
  className?: string
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      placeholder = 'Search...',
      onValueChange,
      onClear,
      className,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value || '')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      onValueChange?.(newValue)
    }

    const handleClear = () => {
      setInputValue('')
      onValueChange?.('')
      onClear?.()
    }

    const searchIcon = (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        <path
          d="M10 2.5C14.1339 2.5 17.5 5.86614 17.5 10C17.5 11.7317 16.9013 13.316 15.9141 14.5947L15.6455 14.9424L15.9561 15.2539L20.7021 20L20 20.7021L14.9414 15.6436L14.5928 15.916C13.3164 16.9108 11.7334 17.5 10 17.5C5.86614 17.5 2.5 14.1339 2.5 10C2.5 5.86614 5.86614 2.5 10 2.5ZM10 3.5C6.41386 3.5 3.5 6.41386 3.5 10C3.5 13.5861 6.41386 16.5 10 16.5C13.5861 16.5 16.5 13.5861 16.5 10C16.5 6.41386 13.5861 3.5 10 3.5Z"
          fill="#55657E"
          stroke="#55657E"
        />
      </svg>
    )

    const clearIcon = (
      <div
        onClick={handleClear}
        className="p-1 hover:bg-blue-bayoux/10 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dodger-blue focus:ring-opacity-50"
        title="Clear search"
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
            d="M18.3628 6.34015L12.7026 12.0003L13.0562 12.3538L13.7671 13.0638L18.3618 17.6595L17.6587 18.3626L14.4731 15.1859L12.355 13.0569L12.0015 12.7025L11.647 13.056L6.34033 18.3626L5.63721 17.6595L10.2339 13.0638L11.2974 12.0003L5.63721 6.34015L6.34033 5.63702L12.0005 11.2972L12.354 10.9437L17.6597 5.63702L18.3628 6.34015Z"
            fill="#55657E"
            stroke="#55657E"
          />
        </svg>
      </div>
    )

    return (
      <div
        className={cn(
          'flex w-full px-4 py-3 justify-center items-center gap-2 rounded-lg border border-dodger-blue h-12',
          className
        )}
      >
        <div className="flex items-center flex-shrink-0">{searchIcon}</div>

        <input
          ref={ref}
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          className={cn(
            'flex-1 overflow-hidden text-ellipsis bg-transparent text-polo-blue text-sm font-normal outline-none min-w-0',
            'placeholder:text-blue-bayoux/70',
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

        {inputValue && inputValue.length > 0 && (
          <div className="flex items-center flex-shrink-0">{clearIcon}</div>
        )}
      </div>
    )
  }
)

SearchInput.displayName = 'SearchInput'
