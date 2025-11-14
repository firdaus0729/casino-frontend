'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { i18n, Locale, useTranslation } from '@/lib/i18n'

interface I18nContextType {
  t: (key: string, params?: Record<string, string | number>) => string
  locale: Locale
  setLocale: (locale: Locale) => Promise<void>
  translations: any
  hasKey: (key: string) => boolean
  isLoading: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const { t, locale, setLocale, translations, hasKey } = useTranslation()

  useEffect(() => {
    // i18n is already initialized with English translations
    // Just set loading to false
    setIsLoading(false)
  }, [])

  const value: I18nContextType = {
    t,
    locale,
    setLocale,
    translations,
    hasKey,
    isLoading,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

// Hook for easy access to translation function
export function useT() {
  const { t } = useI18n()
  return t
}

// Hook for locale management
export function useLocale() {
  const { locale, setLocale } = useI18n()
  return { locale, setLocale }
}
