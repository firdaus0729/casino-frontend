'use client'

import React from 'react'
import { LanguageSelector } from '../ui/Internationalization'

interface LanguageSelectorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialLanguage: string
  onLanguageChange: (langCode: string) => void
}

const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  open,
  onOpenChange,
  initialLanguage,
  onLanguageChange,
}) => (
  <LanguageSelector
    open={open}
    onOpenChange={onOpenChange}
    initialLanguage={initialLanguage}
    onLanguageChange={onLanguageChange}
  />
)

export default LanguageSelectorModal
