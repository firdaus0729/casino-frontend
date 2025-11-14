import React, { useState } from 'react'
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/Dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'
import { useT } from '@/context/I18nProvider'

interface Language {
  code: string
  name: string
  flag: React.ReactNode
}

interface LanguageSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLanguageChange?: (languageCode: string) => void
  initialLanguage?: string
}

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    flag: (
      <svg
        width="24"
        height="18"
        viewBox="0 0 24 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_en)">
          <path d="M0 0H24V18H0V0Z" fill="#012169" />
          <path d="M0 0L24 18M24 0L0 18" stroke="white" strokeWidth="2" />
          <path d="M0 0L24 18M24 0L0 18" stroke="#C8102E" strokeWidth="1.2" />
          <path d="M12 0V18M0 9H24" stroke="white" strokeWidth="2" />
          <path d="M12 0V18M0 9H24" stroke="#C8102E" strokeWidth="1.2" />
        </g>
        <defs>
          <clipPath id="clip0_en">
            <rect width="24" height="18" rx="4" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    code: 'zh',
    name: '中文',
    flag: (
      <svg
        width="24"
        height="18"
        viewBox="0 0 24 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_zh)">
          <path d="M0 0H24V18H0V0Z" fill="#EE1C25" />
          <path
            d="M2.88004 6.66078L4.50002 1.80078L6.12 6.66078L1.80005 3.69078H7.19998L2.88004 6.66078Z"
            fill="#FFFF00"
          />
          <path
            d="M9.90642 1.89369L8.23926 2.26314L9.35132 0.967266L9.24225 2.71134L8.31708 1.16731L9.90642 1.89369Z"
            fill="#FFFF00"
          />
          <path
            d="M11.5889 4.02639L9.90898 3.72033L11.4366 2.95719L10.6596 4.52245L10.4057 2.74045L11.5889 4.02639Z"
            fill="#FFFF00"
          />
          <path
            d="M11.3438 7.01729L9.93472 6.05266L11.6407 5.97892L10.293 7.0912L10.7879 5.36058L11.3438 7.01729Z"
            fill="#FFFF00"
          />
          <path
            d="M9.22461 8.97165L8.29745 7.53765L9.89957 8.12855L8.22679 8.63397L9.35172 7.2288L9.22461 8.97165Z"
            fill="#FFFF00"
          />
        </g>
        <defs>
          <clipPath id="clip0_zh">
            <rect width="24" height="18" rx="4" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },

  {
    code: 'de',
    name: 'Deutsch',
    flag: (
      <svg
        width="24"
        height="18"
        viewBox="0 0 24 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_de)">
          <path d="M0 12H24V18H0V12Z" fill="#FFCE00" />
          <path d="M0 0H24V6H0V0Z" fill="black" />
          <path d="M0 6H24V12H0V6Z" fill="#DD0000" />
        </g>
        <defs>
          <clipPath id="clip0_de">
            <rect width="24" height="18" rx="4" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    code: 'pl',
    name: 'Polish',
    flag: (
      <svg
        width="24"
        height="18"
        viewBox="0 0 24 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_pl)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 18H0V0H24V18Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 18H0V9H24V18Z"
            fill="#DC143C"
          />
        </g>
        <defs>
          <clipPath id="clip0_pl">
            <rect width="24" height="18" rx="4" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    code: 'pt',
    name: 'Português',
    flag: (
      <svg
        width="24"
        height="18"
        viewBox="0 0 24 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_pt)">
          <path d="M0 0H24V18H0V0Z" fill="#006600" />
          <path d="M0 0H24V18H0V0Z" fill="#FF0000" />
          <path d="M0 0H24V18H0V0Z" fill="#FFFF00" />
          <circle cx="12" cy="9" r="3" fill="#006600" />
        </g>
        <defs>
          <clipPath id="clip0_pt">
            <rect width="24" height="18" rx="4" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    code: 'ua',
    name: 'Ukraine',
    flag: (
      <svg
        width="24"
        height="18"
        viewBox="0 0 24 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_ua)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0H24V18H0V0Z"
            fill="#FFD700"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0H24V9H0V0Z"
            fill="#0057B8"
          />
        </g>
        <defs>
          <clipPath id="clip0_ua">
            <rect width="24" height="18" rx="4" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    code: 'es',
    name: 'Español',
    flag: (
      <svg
        width="24"
        height="18"
        viewBox="0 0 24 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_es)">
          <path d="M0 0H24V18H0V0Z" fill="#AA151B" />
          <path d="M0 6H24V12H0V6Z" fill="#F1BF00" />
        </g>
        <defs>
          <clipPath id="clip0_es">
            <rect width="24" height="18" rx="4" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    code: 'pt-br',
    name: 'Português (BR)',
    flag: (
      <svg
        width="24"
        height="18"
        viewBox="0 0 24 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_br)">
          <path d="M0 0H24V18H0V0Z" fill="#009C3B" />
          <path d="M0 0H24V18H0V0Z" fill="#FFDF00" />
          <path d="M0 0H24V18H0V0Z" fill="#002776" />
          <circle cx="12" cy="9" r="3" fill="#009C3B" />
        </g>
        <defs>
          <clipPath id="clip0_br">
            <rect width="24" height="18" rx="4" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    code: 'fr',
    name: 'Français',
    flag: (
      <svg
        width="24"
        height="18"
        viewBox="0 0 24 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_fr)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0H24V18H0V0Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0H7.99875V18H0V0Z"
            fill="#002654"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.0012 0H24V18H16.0012V0Z"
            fill="#CE1126"
          />
        </g>
        <defs>
          <clipPath id="clip0_fr">
            <rect width="24" height="18" rx="4" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
]

const RadioButton = ({ selected = false }: { selected?: boolean }) => {
  if (selected) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
          fill="#2283F6"
          stroke="#2283F6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 10L11 14L9 12"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
        stroke="#55657E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LanguageSelector({
  open,
  onOpenChange,
  onLanguageChange,
  initialLanguage = 'en',
}: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage)
  const t = useT()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            // Mobile: slide from bottom, full width
            'fixed h-fit bottom-0 left-0 right-0 z-50',
            'w-full max-w-none rounded-t-3xl border-0',
            'data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
            // Tablet and desktop: centered dialog
            'sm:fixed sm:left-[50%] sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%]',
            'sm:w-full sm:max-w-[402px] sm:rounded-xl',
            'sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-[48%]',
            'sm:data-[state=closed]:slide-out-to-left-1/2 sm:data-[state=closed]:slide-out-to-top-[48%]',
            // Shared styles
            'p-0 bg-[rgba(17,25,35,0.54)] backdrop-blur-[32px]',
            'shadow-[0_1px_0_0_rgba(255,255,255,0.16)_inset]',
            'duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95'
          )}
        >
          {/* Header */}
          <div
            className={cn(
              'flex items-center justify-between px-4 py-4 rounded-t-3xl sm:px-6 sm:rounded-t-xl',
              'bg-gradient-to-b from-[rgba(17,25,35,0.54)] to-[#002554]',
              'shadow-[0_1px_0_0_rgba(255,255,255,0.16)_inset] backdrop-blur-[32px]'
            )}
          >
            <DialogTitle className="text-white font-montserrat text-lg sm:text-xl font-bold">
              {t('settings.language')}
            </DialogTitle>
            <div
              onClick={() => onOpenChange(false)}
              className={cn(
                'flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-lg',
                'border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.04)]',
                'shadow-[0_1px_0_0_rgba(255,255,255,0.16)_inset] backdrop-blur-[32px]',
                'hover:bg-[rgba(255,255,255,0.08)] transition-colors',
                'touch-manipulation' // Better touch support on mobile
              )}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.58662 8.47378L3.28662 11.7738L4.22662 12.7138L6.11329 10.8271L7.99995 8.94044L9.41329 10.3604L11.7733 12.7138L12.7133 11.7738L9.41329 8.47378L8.93995 8.00044L12.7133 4.22711L11.7733 3.28711L7.99995 7.06044L4.22662 3.28711L3.28662 4.22711L7.05995 8.00044L6.58662 8.47378Z"
                  fill="#A7B5CA"
                />
              </svg>
            </div>
          </div>

          {/* Languages List */}
          <div className="px-4 py-4 space-y-0 max-h-[60vh] overflow-y-auto sm:max-h-none sm:overflow-visible">
            {languages.map(language => {
              const isSelected = selectedLanguage === language.code

              return (
                <div
                  key={language.code}
                  onClick={() => {
                    setSelectedLanguage(language.code)
                    if (onLanguageChange) {
                      onLanguageChange(language.code)
                    }
                  }}
                  className={cn(
                    'flex items-center justify-between w-full h-[52px] sm:h-[50px] px-4 rounded-xl',
                    'hover:bg-[rgba(255,255,255,0.02)] active:bg-[rgba(255,255,255,0.04)] transition-colors',
                    'touch-manipulation', // Better touch support
                    isSelected && 'bg-[#1C2532]'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-[18px] flex items-center justify-center flex-shrink-0">
                      {language.flag}
                    </div>
                    <span
                      className={cn(
                        'font-montserrat text-sm sm:text-sm font-bold',
                        'text-left truncate', // Handle long language names
                        isSelected ? 'text-[#93ACD3]' : 'text-[#55657E]'
                      )}
                    >
                      {language.name}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    <RadioButton selected={isSelected} />
                  </div>
                </div>
              )
            })}
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
