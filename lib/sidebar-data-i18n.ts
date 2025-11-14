import {
  SidebarItem,
  SidebarSection,
  TopButton,
  PaymentMethod,
  AppDownload,
} from '@/components/sidebar-data'

// Function to generate sidebar data with i18n translations
export const createSidebarData = (t: (key: string) => string) => {
  // Top section buttons (Casino/Sport)
  const topButtons: TopButton[] = [
    {
      icon: '/icons/spade.svg',
      label: t('games.casino'),
      active: true,
    },
    {
      icon: '/icons/football.svg',
      label: t('games.sports'),
      active: false,
    },
  ]

  // Navigation items
  const navigationItems: SidebarItem[] = [
    {
      id: 'search',
      icon: '/icons/search.svg',
      label: t('app.search'),
    },
    {
      id: 'favorites',
      icon: '/icons/heart.svg',
      label: t('games.favorites'),
      href: '/favorites',
    },
    {
      id: 'recent',
      icon: '/icons/history.svg',
      label: t('games.recent'),
      href: '/recent',
    },
  ]

  // Game categories
  const gameCategories: SidebarItem[] = [
    {
      id: 'hash-games',
      icon: '/icons/bitcoin.svg',
      label: t('games.hashgames'),
      href: '/?tab=hash',
      hasHover: true,
    },
    {
      id: 'slots',
      icon: '/icons/dice.svg',
      label: t('games.slots'),
      href: '/?tab=slots',
    },
    {
      id: 'live-casino',
      icon: '/icons/casino.svg',
      label: t('games.live'),
      href: '/?tab=casino',
    },
    {
      id: 'futures',
      icon: '/icons/Futures.svg',
      label: t('games.futures'),
      href: '/?tab=futures',
    },
    {
      id: 'crypto-games',
      icon: '/icons/Cryptogra.svg',
      label: t('games.crypto'),
      href: '/?tab=crypto',
    },
    {
      id: 'sport',
      icon: '/icons/football.svg',
      label: t('games.sports'),
      href: '/?tab=sport',
    },
    {
      id: 'table-games',
      icon: '/icons/game.svg',
      label: t('games.table'),
      href: '/?tab=table',
    },
  ]

  // Membership and information items
  const membershipItems: SidebarItem[] = [
    {
      id: 'alliance-plan',
      icon: '/icons/thumbsup.svg',
      label: t('navigation.alliance'),
      href: '/alliance',
    },
    {
      id: 'vip-club',
      icon: '/icons/king1.svg',
      label: t('navigation.vip'),
      href: '/vip-club',
      badge: {
        text: 'VIP',
        color: 'text-yellow-orange',
      },
    },
    {
      id: 'game-providers',
      href: '/game-provider',
      icon: '/icons/game.svg',
      label: t('games.providers'),
    },
    {
      id: 'promotions',
      icon: '/icons/gift.svg',
      label: t('navigation.promotions'),
      href: '/promotions',
    },
    {
      id: 'help-center',
      icon: '/icons/info-circle.svg',
      label: t('navigation.help'),
      href: '/help-center',
    },
  ]

  // Tutorial items
  const tutorialItems: SidebarItem[] = [
    {
      id: 'beginner-tutorial',
      icon: '/icons/tutorial.svg',
      label: t('help.tutorial'),
      href: '/beginner-tutorial',
    },
  ]

  // Service items - onClick will be set dynamically
  const serviceItems: SidebarItem[] = [
    {
      id: 'online-service',
      icon: '/icons/headset.svg',
      label: t('help.onlineService'),
    },
  ]

  // Collapsed-only items (shown only when sidebar is collapsed)
  const collapsedOnlyItems: SidebarItem[] = [
    {
      id: 'download',
      icon: '/icons/archive-arrow-down.svg',
      label: t('app.download'),
      isCollapsedOnly: true,
    },
    {
      id: 'wallet',
      icon: '/icons/wallet.svg',
      label: t('navigation.wallet'),
      href: '/wallet',
      isCollapsedOnly: true,
    },
  ]

  // Payment methods
  const paymentMethods: PaymentMethod[] = [
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
  const appDownloads: AppDownload[] = [
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
  const languageData = {
    zh: { name: t('languages.chinese'), flag: '/icons/flag-icon/cn.svg' },
    en: { name: t('languages.english'), flag: '/icons/flag-icon/uk.svg' },
    de: { name: t('languages.german'), flag: '/icons/flag-icon/de.svg' },
    pl: { name: t('languages.polish'), flag: '/icons/flag-icon/pl.svg' },
    pt: {
      name: t('languages.portuguese'),
      flag: '/icons/flag-icon/pt.svg',
    },
    ua: { name: t('languages.ukrainian'), flag: '/icons/flag-icon/ua.svg' },
    es: { name: t('languages.spanish'), flag: '/icons/flag-icon/es.svg' },
    'pt-br': {
      name: t('languages.portugueseBR'),
      flag: '/icons/flag-icon/br.svg',
    },
    fr: { name: t('languages.french'), flag: '/icons/flag-icon/fr.svg' },
  }

  // Complete sidebar sections structure
  const sidebarSections: SidebarSection[] = [
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

  return {
    topButtons,
    navigationItems,
    gameCategories,
    membershipItems,
    tutorialItems,
    serviceItems,
    collapsedOnlyItems,
    paymentMethods,
    appDownloads,
    languageData,
    sidebarSections,
  }
}
