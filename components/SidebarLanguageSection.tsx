import React from 'react'
import { languageData } from './sidebar-data'

interface SidebarLanguageSectionProps {
  isCollapsed: boolean
  currentLanguage: { code: string; name: string }
  onLanguageClick: () => void
}

const SidebarLanguageSection: React.FC<SidebarLanguageSectionProps> = ({
  isCollapsed,
  currentLanguage,
  onLanguageClick,
}) => {
  const currentLanguageDisplay =
    languageData[currentLanguage.code as keyof typeof languageData] ||
    languageData.cn

  return (
    <div className="lg:hidden ">
      <div
        onClick={onLanguageClick}
        className={`flex items-center gap-3 p-3 hover:bg-gray-700 active:bg-gray-700 rounded-lg cursor-pointer text-gray-300 transition-colors ${
          isCollapsed ? 'justify-center' : ''
        }`}
      >
        <img
          src={currentLanguageDisplay.flag}
          className="w-5 h-5"
          alt="language"
        />
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">Language:</span>
            <span className="text-sm text-white">
              {currentLanguageDisplay.name}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default SidebarLanguageSection
