// Service modal handler will be passed as a prop

// Sidebar data structure for dynamic rendering
export interface SidebarItem {
  id: string
  icon: string
  label: string
  href?: string
  badge?: {
    text: string
    color: string
  }
  activeColor?: string
  hasHover?: boolean
  onClick?: () => void
  isActive?: boolean
  isCollapsedOnly?: boolean
  hideOnMobile?: boolean
}

export interface SidebarSection {
  id: string
  title?: string
  items: SidebarItem[]
  showDivider?: boolean
  className?: string
  hideOnMobile?: boolean
}

export interface TopButton {
  icon: string
  label: string
  active: boolean
  onClick?: () => void
}

export interface PaymentMethod {
  icon: string
  alt: string
}

export interface AppDownload {
  icon: string
  alt: string
  platform: string
}

// Top section buttons (Casino/Sport)
export const topButtons: TopButton[] = [
  {
    icon: '/icons/spade.svg',
    label: 'Casino',
    active: true,
    onClick() {
      console.log('Casino Games')
    },
  },
  {
    icon: '/icons/football.svg',
    label: 'Sport',
    active: false,
    onClick() {
      console.log('Football Games')
    },
  },
]

// Navigation items
export const navigationItems: SidebarItem[] = [
  {
    id: 'search',
    icon: '/icons/search.svg',
    label: 'Search',
    onClick() {},
  },
  {
    id: 'favorites',
    icon: '/icons/heart.svg',
    label: 'Favorites',
    href: '/favorites',
  },
  {
    id: 'recent',
    icon: '/icons/history.svg',
    label: 'Recent',
    href: '/recent',
  },
]

// Game categories
export const gameCategories: SidebarItem[] = [
  {
    id: 'hash-games',
    icon: '/icons/bitcoin.svg',
    label: 'Hash Games',
    href: '/?tab=hash',
    hasHover: true,
  },
  {
    id: 'slots',
    icon: '/icons/dice.svg',
    label: 'Slots',
    href: '/?tab=slots',
  },
  {
    id: 'live-casino',
    icon: '/icons/casino.svg',
    label: 'Live Casino',
    href: '/?tab=casino',
  },
  {
    id: 'futures',
    icon: '/icons/Futures.svg',
    label: 'Futures',
    href: '/?tab=futures',
  },
  {
    id: 'crypto-games',
    icon: '/icons/Cryptogra.svg',
    label: 'Crypto Games',
    href: '/?tab=crypto',
  },
  {
    id: 'sport',
    icon: '/icons/football.svg',
    label: 'Sport',
    href: '/?tab=sport',
  },
  {
    id: 'table-games',
    icon: '/icons/tablegame.svg',
    label: 'Table Games',
    href: '/?tab=table',
  },
]

// Membership and information items
export const membershipItems: SidebarItem[] = [
  {
    id: 'alliance-plan',
    icon: '/icons/thumbsup.svg',
    label: 'Alliance Plan',
    href: '/alliance',
  },
  {
    id: 'vip-club',
    icon: '/icons/king1.svg',
    label: 'VIP Club',
    href: '/vip-club',
    badge: {
      text: 'VIP',
      color: 'text-yellow-400',
    },
  },
  {
    id: 'game-providers',
    href: '/game-provider',
    icon: '/icons/game.svg',
    label: 'Game Providers',
  },
  {
    id: 'promotions',
    icon: '/icons/gift.svg',
    label: 'Promotions',
    href: '/promotions',
  },
  {
    id: 'help-center',
    icon: '/icons/info-circle.svg',
    label: 'Help center',
    href: '/help-center',
  },
]

// Tutorial items
export const tutorialItems: SidebarItem[] = [
  {
    id: 'beginner-tutorial',
    icon: '/icons/tutorial.svg',
    label: "Beginner's Tutorial",
    href: '/beginner-tutorial',
  },
]

// Service items - onClick will be set dynamically
export const serviceItems: SidebarItem[] = [
  {
    id: 'online-service',
    icon: '/icons/headset.svg',
    label: 'Online service',
  },
]

// Collapsed-only items (shown only when sidebar is collapsed)
export const collapsedOnlyItems: SidebarItem[] = [
  {
    id: 'download',
    icon: '/icons/archive-arrow-down.svg',
    label: 'Download',
    href: '/install-app',
    isCollapsedOnly: true,
  },
  {
    id: 'wallet',
    icon: '/icons/wallet.svg',
    label: 'Wallet',
    href: '/wallet',
    isCollapsedOnly: true,
  },
]

// Payment methods
export const paymentMethods: PaymentMethod[] = [
  {
    icon: '/icons/gpay.svg',
    alt: 'Google Pay',
  },
  {
    icon: '/icons/apay.svg',
    alt: 'Apple Pay',
  },
  {
    icon: '/icons/pay.svg',
    alt: 'PayPal',
  },
  {
    icon: '/icons/visa.svg',
    alt: 'Visa',
  },
]

// App download options
export const appDownloads: AppDownload[] = [
  {
    icon: '/icons/apple.svg',
    alt: 'Apple',
    platform: 'iOS',
  },
  {
    icon: '/icons/windows.svg',
    alt: 'Windows',
    platform: 'Windows',
  },
  {
    icon: '/icons/android.svg',
    alt: 'Android',
    platform: 'Android',
  },
]

// Language data
export const languageData = {
  cn: { name: '中文', flag: '/icons/flag-icon/cn.svg' },
  en: { name: 'English', flag: '/icons/flag-icon/uk.svg' },
  de: { name: 'Deutsch', flag: '/icons/flag-icon/de.svg' },
  pl: { name: 'Polish', flag: '/icons/flag-icon/pl.svg' },
  pt: { name: 'Português', flag: '/icons/flag-icon/pt.svg' },
  ua: { name: 'Ukraine', flag: '/icons/flag-icon/ua.svg' },
  es: { name: 'Español', flag: '/icons/flag-icon/es.svg' },
  'pt-br': { name: 'Português (BR)', flag: '/icons/flag-icon/br.svg' },
  fr: { name: 'Français', flag: '/icons/flag-icon/fr.svg' },
}

// Complete sidebar sections structure
export const sidebarSections: SidebarSection[] = [
  {
    id: 'navigation',
    items: navigationItems,
    showDivider: true,
    className: 'space-y-1 py-[16px]',
  },
  {
    id: 'game-categories',
    items: gameCategories,
    showDivider: true,
    className: 'py-[16px] space-y-1 flex-1',
    hideOnMobile: true,
  },
  {
    id: 'membership',
    items: membershipItems,
    showDivider: true,
    className: 'py-[16px]',
  },
  {
    id: 'tutorials',
    items: tutorialItems,
    showDivider: true,
    className: 'py-[16px]',
  },
  {
    id: 'services',
    items: serviceItems,
    showDivider: true,
    className: 'py-[16px]',
  },
  {
    id: 'collapsed-only',
    items: collapsedOnlyItems,
    showDivider: false,
    className: 'py-[16px]',
  },
]
