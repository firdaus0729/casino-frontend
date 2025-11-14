import React from 'react'
import { TopButton } from './sidebar-data'

interface SidebarTopSectionProps {
  isCollapsed: boolean
  topButtons: TopButton[]
}

const SidebarTopSection: React.FC<SidebarTopSectionProps> = ({
  isCollapsed,
  topButtons,
}) => {
  return (
    <div className={`p-4 pb-0 ${isCollapsed ? 'px-2' : ''}`}>
      <div className={`flex gap-2 ${isCollapsed ? 'flex-col' : ''}`}>
        {topButtons.map(button => (
          <div
            key={button.label}
            className={`${
              isCollapsed ? 'w-full mb-2' : 'flex-1'
            } w-12 cursor-pointer ${
              button.active
                ? 'bg-gray-700 text-white'
                : 'bg-transparent text-gray-400 hover:bg-gray-700 active:bg-gray-700'
            } rounded-lg p-3 flex items-center gap-2 justify-center font-medium transition-colors`}
            style={button.active ? { background: '#374151' } : {}}
            onClick={button.onClick}
          >
            <img src={button.icon} className="w-5 h-5" alt={button.label} />
            {!isCollapsed && (
              <span className="text-sm font-bold">{button.label}</span>
            )}
          </div>
        ))}
      </div>
      <div className="w-full mx-auto h-[1px] relative bg-[linear-gradient(to_right,#1a2332,#6a7282,#1a2332)] mt-5"></div>
    </div>
  )
}

export default SidebarTopSection
