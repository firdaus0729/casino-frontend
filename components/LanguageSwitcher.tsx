'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageProvider'
import { useT } from '@/context/I18nProvider'

const languages: { code: string; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'ua', name: 'Українська', flag: '🇺🇦' },
]

export default function LanguageSwitcher() {
  const { currentLanguage, setCurrentLanguage } = useLanguage()
  const t = useT()

  const handleLanguageChange = async (languageCode: string) => {
    const language = languages.find(lang => lang.code === languageCode)
    if (language) {
      await setCurrentLanguage({
        code: languageCode,
        name: language.name,
      })
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">{t('settings.language')}:</span>
      <select
        value={currentLanguage.code}
        onChange={e => handleLanguageChange(e.target.value)}
        className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}
