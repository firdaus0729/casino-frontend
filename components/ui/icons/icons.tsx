'use client'

import React from 'react'

import GmailIcon from './GmailIcon'
import TelegramIcon from './TelegramIcon'
import MetaMaskIcon from './MetamaskIcon'
import TrustpilotIcon from './TrustpilotIcon'
import TONIcon from './TONIcon'

interface IconsProps {
  Type: 'icon' | 'text'
  Name: string
}

const Icons: React.FC<IconsProps> = ({ Type, Name }) => {
  let IconComponent = null
  let text = ''

  if (Type == 'icon') {
    switch (Name) {
      case 'Gmail':
        IconComponent = GmailIcon
        break
      case 'Telegram':
        IconComponent = TelegramIcon
        break
      case 'MetaMask':
        IconComponent = MetaMaskIcon
        break
      case 'Trustpilot':
        IconComponent = TrustpilotIcon
        break
      case 'TON':
        IconComponent = TONIcon
        break
      default:
        IconComponent = null
    }
  } else if (Type == 'text') {
    text = Name
  }

  return (
    <a href="#" className="social-icon-item">
      {Type == 'icon' ? (
        IconComponent ? (
          <IconComponent />
        ) : null
      ) : (
        <p>{`+${text}`}</p>
      )}
      {}
    </a>
  )
}

export default Icons
