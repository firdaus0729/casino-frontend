import React from 'react'

interface TrustWalletIconProps {
  className?: string
  color?: string
}

const TrustWalletIcon: React.FC<TrustWalletIconProps> = ({
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
      <path
        d="M2.95703 4.17796L12.7346 1V23C5.75052 20.0664 2.95703 14.4442 2.95703 11.2669V4.17796Z"
        fill={color}
      />
      <g style={{ mixBlendMode: 'luminosity' }}>
        <path
          d="M22.5129 4.17796L12.7354 1V23C19.7194 20.0664 22.5129 14.4442 22.5129 11.2669V4.17796Z"
          fill="url(#paint0_linear_1608_18929)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1608_18929"
          x1="19.9157"
          y1="-0.540582"
          x2="12.5296"
          y2="22.6995"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B1B9C3" />
          <stop offset="1" stopColor="#171F29" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default TrustWalletIcon
