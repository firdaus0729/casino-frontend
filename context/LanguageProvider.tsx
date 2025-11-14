'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useI18n } from './I18nProvider'
import { Locale } from '@/lib/i18n'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSelectedLanguage } from '@/store/slices/userSettingsSlice'

interface Language {
  code: string
  name: string
}

interface LanguageContextType {
  currentLanguage: Language
  setCurrentLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

// Map existing language codes to i18n locale codes
const languageCodeMap: Record<string, Locale> = {
  cn: 'zh',
  en: 'en',
  de: 'de',
  es: 'es',
  fr: 'fr',
  pt: 'pt',
  'pt-br': 'pt',
  pl: 'pl',
  ua: 'uk',
  zh: 'zh',
  ja: 'ja',
  ko: 'ko',
}

// Reverse map for getting language code from locale
const localeToLanguageMap: Record<Locale, string> = {
  en: 'en',
  es: 'es',
  fr: 'fr',
  de: 'de',
  zh: 'cn',
  ja: 'ja',
  ko: 'ko',
  pt: 'pt',
  pl: 'pl',
  uk: 'ua',
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: React.ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const dispatch = useAppDispatch()
  const { locale, setLocale } = useI18n()
  const selectedLanguage = useAppSelector(state => state.userSettings.selectedLanguage)
  
  const [currentLanguage, setCurrentLanguage] = useState<Language>({
    code: localeToLanguageMap[locale] || 'en',
    name: 'English',
  })

  // Load language from Redux store on mount
  useEffect(() => {
    if (selectedLanguage) {
      try {
        const parsed = JSON.parse(selectedLanguage)
        setCurrentLanguage(parsed)
        // Update i18n locale based on saved language
        const i18nLocale = languageCodeMap[parsed.code] || 'en'
        setLocale(i18nLocale)
      } catch (error) {
        console.error('Failed to parse saved language:', error)
      }
    }
  }, [selectedLanguage, setLocale])

  // Save language to Redux store when it changes and update i18n
  const handleLanguageChange = async (language: Language) => {
    setCurrentLanguage(language)
    dispatch(setSelectedLanguage(JSON.stringify(language)))

    // Update i18n locale
    const i18nLocale = languageCodeMap[language.code] || 'en'
    await setLocale(i18nLocale)
  }

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setCurrentLanguage: handleLanguageChange,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
