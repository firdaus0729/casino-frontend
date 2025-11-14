import React from 'react'
import { PaymentMethod, AppDownload } from './sidebar-data'

interface SidebarBottomSectionProps {
  isCollapsed: boolean
  currentLanguage: { code: string; name: string }
  onLanguageClick: () => void
  paymentMethods: PaymentMethod[]
  appDownloads: AppDownload[]
  languageData: any
}

const SidebarBottomSection: React.FC<SidebarBottomSectionProps> = ({
  isCollapsed,
  currentLanguage,
  onLanguageClick,
  paymentMethods,
  appDownloads,
  languageData,
}) => {
  const currentLanguageDisplay =
    languageData[currentLanguage.code as keyof typeof languageData] ||
    languageData.cn

  if (isCollapsed) {
    return null
  }

  return (
    <div className="p-4 hidden lg:block mt-auto">
      {/* Payment Methods */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          {paymentMethods.map(method => (
            <div key={method.alt} className="flex items-center gap-1">
              <img src={method.icon} className="h-5" alt={method.alt} />
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center items-center bg-gray-700 text-white text-sm py-2 px-3 rounded hover:bg-gray-500 transition-colors">
          <span>By Crypto</span>
        </div>
      </div>

      <div className="w-full mx-auto h-[1px] relative bg-[linear-gradient(to_right,#1a2332,#6a7282,#1a2332)]"></div>

      {/* App Download */}
      <div className="flex items-center justify-between">
        <span className="text-white text-sm">
          <span>Ok777 App</span>
        </span>
        <div className="flex gap-2">
          {appDownloads.map(app => (
            <div key={app.platform} className="flex items-center gap-1">
              <img src={app.icon} className="w-4 h-4" alt={app.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SidebarBottomSection
