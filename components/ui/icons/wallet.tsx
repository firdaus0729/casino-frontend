import React from 'react'

interface WalletIconProps {
  className?: string
  color?: string
}

const WalletIcon: React.FC<WalletIconProps> = ({
  className = '',
  color = 'currentColor',
}) => {
  return (
    <svg
      className={className}
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.7354 10H22.7354V14H14.7354V10Z" fill={color} />

      <path
        d="M14.7354 16C13.6354 16 12.7354 15.1 12.7354 14V10C12.7354 8.9 13.6354 8 14.7354 8H22.7354V5C22.7354 3.9 21.8354 3 20.7354 3H4.73535C3.63535 3 2.73535 3.9 2.73535 5V19C2.73535 20.1 3.63535 21 4.73535 21H20.7354C21.8354 21 22.7354 20.1 22.7354 19V16H14.7354Z"
        fill={color}
      />
    </svg>
  )
}

export default WalletIcon
