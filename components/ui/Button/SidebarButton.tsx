import React from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SidebarItem as SidebarItemType } from '../../sidebar-data'

interface SidebarItemProps extends SidebarItemType {
  isCollapsed: boolean
  onHashHover?: (e: React.MouseEvent<HTMLDivElement>) => void
  onHashHoverLeave?: () => void
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  href,
  badge,
  activeColor,
  isCollapsed,
  hasHover,
  onClick,
  onHashHover,
  onHashHoverLeave,
  isCollapsedOnly,
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  // Check if this item is active based on query parameters
  const isActive = (() => {
    if (!href) return false

    // For query parameter URLs like /?tab=slots
    if (href.includes('?tab=')) {
      const url = new URL(href, 'http://localhost')
      const tabParam = url.searchParams.get('tab')
      const currentTab = searchParams.get('tab')

      // If we're on the lobby page and the tab matches
      if (pathname === '/' && tabParam && currentTab === tabParam) {
        return true
      }

      // If no tab is selected but this is the lobby tab
      if (pathname === '/' && !currentTab && tabParam === 'lobby') {
        return true
      }
    }

    // Fallback to original pathname check
    return pathname?.startsWith(href)
  })()

  // Don't render if this is a collapsed-only item and sidebar is not collapsed
  if (isCollapsedOnly && !isCollapsed) {
    return null
  }

  const baseClasses = cn(
    'flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors',
    isCollapsed ? 'justify-center' : '',
    isActive
      ? 'bg-white/10 text-white'
      : activeColor || 'text-gray-300 hover:bg-gray-700 active:bg-gray-700'
  )

  const content = (
    <>
      <img src={icon} className="w-5 h-5" alt={label} />
      {!isCollapsed && (
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold">{label}</span>
          {badge && (
            <span className={cn('text-xs font-medium', badge.color)}>
              {badge.text}
            </span>
          )}
        </div>
      )}
      {!isCollapsed && hasHover && (
        <svg
          className="w-3 h-3 text-gray-500 ml-auto"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </>
  )

  // Handle click - use onClick if provided, otherwise handle href navigation
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      if (onClick) {
        onClick()
      } else if (href) {
        // For query parameter URLs, always navigate to root path with query
        if (href.includes('?tab=')) {
          // Extract tab parameter from href without creating URL object
          const tabMatch = href.match(/\?tab=([^&]+)/)
          if (tabMatch && tabMatch[1]) {
            const tabId = tabMatch[1]
            const newUrl = `/?tab=${tabId}`
            router.push(newUrl)
          }
        } else {
          // For regular URLs
          router.push(href)
        }
      }
    } catch (error) {
      console.error('Navigation error:', error)
      // Fallback to window.location if router fails
      if (href) {
        if (href.includes('?tab=')) {
          const tabMatch = href.match(/\?tab=([^&]+)/)
          if (tabMatch && tabMatch[1]) {
            window.location.href = `/?tab=${tabMatch[1]}`
          }
        } else {
          window.location.href = href
        }
      }
    }
  }

  return (
    <div
      className={baseClasses}
      onClick={handleClick}
      onMouseEnter={hasHover ? onHashHover : undefined}
      onMouseLeave={hasHover ? onHashHoverLeave : undefined}
      aria-current={isActive ? 'page' : undefined}
    >
      {content}
    </div>
  )
}

export default SidebarItem
