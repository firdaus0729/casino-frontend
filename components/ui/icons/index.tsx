'use client'

import React from 'react'

// Import all SVG icon components
import AlertSquare from './alert-square'
import ArchiveArrowDown from './archive-arrow-down'
import ArrowFromRightStroke from './arrow-from-right-stroke'
import ArrowLeftStroke from './arrow-left-stroke'
import ArrowToRightStroke from './arrow-to-right-stroke'
import ArrowUpRightStroke from './arrow-up-right-stroke'
import Cart from './cart'
import ChartNetwork from './chart-network'
import CheckCircle from './check-circle'
import Check from './check'
import Checklist from './checklist'
import ChevronDown from './chevron-down'
import ChevronLeft from './chevron-left'
import ChevronRight from './chevron-right'
import ChevronUp from './chevron-up'
import ChevronsDown from './chevrons-down'
import ChevronsUp from './chevrons-up'
import Clock4 from './clock-4'
import Copy from './copy'
import Crown from './crown'
import CurrencyNotes1 from './currency-notes-1'
import CurrencyNotes from './currency-notes'
import Desktop from './desktop'
import DockRightArrow from './dock-right-arrow'
import DoughnutChart from './doughnut-chart'
import Edit from './edit'
import Education from './education'
import Envelope from './envelope'
import EyeSlash from './eye-slash'
import Eye from './eye'
import FileDetail from './file-detail'
import FileReport from './file-report'
import Fingerprint from './fingerprint'
import Football from './football'
import Form from './form'
import Gamepad from './gamepad'
import Gift from './gift'
import Grid9 from './grid-9'
import Group from './group'
import Handshake from './handshake'
import HeadphoneMic from './headphone-mic'
import Heart from './heart'
import History from './history'
import InfoCircle from './info-circle'
import InfoShield from './info-shield'
import Like from './like'
import LockKeyhole from './lock-keyhole'
import MedalStarAlt2 from './medal-star-alt-2'
import Menu from './menu'
import MessageDots2 from './message-dots-2'
import Mobile from './mobile'
import Notification from './notification'
import Play from './play'
import Plus from './plus'
import PriceTag from './price-tag'
import PrintDollar from './print-dollar'
import QrScan from './qr-scan'
import Receipt from './receipt'
import SearchPlus from './search-plus'
import Search from './search'
import Sidebar from './sidebar'
import SliderAlt from './slider-alt'
import Spade from './spade'
import SwapDiagonal from './swap-diagonal'
import SwapHorizontal from './swap-horizontal'
import TicketStar from './ticket-star'
import TrashAlt from './trash-alt'
import TrashX from './trash-x'
import TrophyStar from './trophy-star'
import Undo from './undo'
import UserPlus from './user-plus'
import UserSquare from './user-square'
import User from './user'
import Vpn from './vpn'
import Wallet from './wallet'
import X from './x'

// Icon component interface
interface IconProps {
  type: string
  className?: string
  color?: string
}

// Icon component
const Icon: React.FC<IconProps> = ({
  type,
  className = '',
  color = 'currentColor',
}) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    'alert-square': AlertSquare,
    'archive-arrow-down': ArchiveArrowDown,
    'arrow-from-right-stroke': ArrowFromRightStroke,
    'arrow-left-stroke': ArrowLeftStroke,
    'arrow-to-right-stroke': ArrowToRightStroke,
    'arrow-up-right-stroke': ArrowUpRightStroke,
    cart: Cart,
    'chart-network': ChartNetwork,
    'check-circle': CheckCircle,
    check: Check,
    checklist: Checklist,
    'chevron-down': ChevronDown,
    'chevron-left': ChevronLeft,
    'chevron-right': ChevronRight,
    'chevron-up': ChevronUp,
    'chevrons-down': ChevronsDown,
    'chevrons-up': ChevronsUp,
    'clock-4': Clock4,
    copy: Copy,
    crown: Crown,
    'currency-notes-1': CurrencyNotes1,
    'currency-notes': CurrencyNotes,
    desktop: Desktop,
    'dock-right-arrow': DockRightArrow,
    'doughnut-chart': DoughnutChart,
    edit: Edit,
    education: Education,
    envelope: Envelope,
    'eye-slash': EyeSlash,
    eye: Eye,
    'file-detail': FileDetail,
    'file-report': FileReport,
    fingerprint: Fingerprint,
    football: Football,
    form: Form,
    gamepad: Gamepad,
    gift: Gift,
    'grid-9': Grid9,
    group: Group,
    handshake: Handshake,
    'headphone-mic': HeadphoneMic,
    heart: Heart,
    history: History,
    'info-circle': InfoCircle,
    'info-shield': InfoShield,
    like: Like,
    'lock-keyhole': LockKeyhole,
    'medal-star-alt-2': MedalStarAlt2,
    menu: Menu,
    'message-dots-2': MessageDots2,
    mobile: Mobile,
    notification: Notification,
    play: Play,
    plus: Plus,
    'price-tag': PriceTag,
    'print-dollar': PrintDollar,
    'qr-scan': QrScan,
    receipt: Receipt,
    'search-plus': SearchPlus,
    search: Search,
    sidebar: Sidebar,
    'slider-alt': SliderAlt,
    spade: Spade,
    'swap-diagonal': SwapDiagonal,
    'swap-horizontal': SwapHorizontal,
    'ticket-star': TicketStar,
    'trash-alt': TrashAlt,
    'trash-x': TrashX,
    'trophy-star': TrophyStar,
    undo: Undo,
    'user-plus': UserPlus,
    'user-square': UserSquare,
    user: User,
    vpn: Vpn,
    wallet: Wallet,
    x: X,
  }

  const IconComponent = iconMap[type]

  if (!IconComponent) {
    console.warn(`Icon type "${type}" not found`)
    return null
  }

  return <IconComponent className={className} color={color} />
}

export default Icon

// Export individual icons for direct import if needed
export {
  AlertSquare,
  ArchiveArrowDown,
  ArrowFromRightStroke,
  ArrowLeftStroke,
  ArrowToRightStroke,
  ArrowUpRightStroke,
  Cart,
  ChartNetwork,
  CheckCircle,
  Check,
  Checklist,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsDown,
  ChevronsUp,
  Clock4,
  Copy,
  Crown,
  CurrencyNotes1,
  CurrencyNotes,
  Desktop,
  DockRightArrow,
  DoughnutChart,
  Edit,
  Education,
  Envelope,
  EyeSlash,
  Eye,
  FileDetail,
  FileReport,
  Fingerprint,
  Football,
  Form,
  Gamepad,
  Gift,
  Grid9,
  Group,
  Handshake,
  HeadphoneMic,
  Heart,
  History,
  InfoCircle,
  InfoShield,
  Like,
  LockKeyhole,
  MedalStarAlt2,
  Menu,
  MessageDots2,
  Mobile,
  Notification,
  Play,
  Plus,
  PriceTag,
  PrintDollar,
  QrScan,
  Receipt,
  SearchPlus,
  Search,
  Sidebar,
  SliderAlt,
  Spade,
  SwapDiagonal,
  SwapHorizontal,
  TicketStar,
  TrashAlt,
  TrashX,
  TrophyStar,
  Undo,
  UserPlus,
  UserSquare,
  User,
  Vpn,
  Wallet,
  X,
}
