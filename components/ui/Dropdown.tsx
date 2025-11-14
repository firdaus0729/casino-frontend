'use client'

import React, { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'

interface DropdownOption {
  value: string
  label: string
  icon?: React.ReactNode
}

interface DropdownProps {
  options: DropdownOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
  error?: string
  label?: string
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  className = '',
  disabled = false,
  required = false,
  name,
  id,
  error,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(option => option.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="w-full relative" ref={dropdownRef}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-200 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={clsx(
            'w-full px-4 py-3 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-lg',
            'text-left text-white',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
        >
          <div className="flex items-center justify-between">
            <span className={selectedOption ? 'text-white' : 'text-gray-400'}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <svg
              className={clsx(
                'w-5 h-5 transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
            {options.map(option => (
              <div
                key={option.value}
                onClick={() => {
                  onChange?.(option.value)
                  setIsOpen(false)
                }}
                className={clsx(
                  'w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors duration-150',
                  'flex items-center gap-3',
                  option.value === value && 'bg-blue-600 hover:bg-blue-700'
                )}
              >
                {option.icon && (
                  <span className="flex-shrink-0">{option.icon}</span>
                )}
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default Dropdown
