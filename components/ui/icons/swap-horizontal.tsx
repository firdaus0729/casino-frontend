import React from 'react'

interface SwapHorizontalIconProps {
  className?: string
  color?: string
}

const SwapHorizontalIcon: React.FC<SwapHorizontalIconProps> = ({
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
        d="M17.7354 14H9.73535V16H17.7354V19L22.7354 15L17.7354 11V14Z"
        fill={color}
      />

      <path
        d="M15.7354 10V8H7.73535V5L2.73535 9L7.73535 13V10H15.7354Z"
        fill={color}
      />
    </svg>
  )
}

export default SwapHorizontalIcon
