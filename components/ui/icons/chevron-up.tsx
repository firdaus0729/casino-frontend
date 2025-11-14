import React from 'react'

interface ChevronUpIconProps {
  className?: string
  color?: string
}

const ChevronUpIcon: React.FC<ChevronUpIconProps> = ({
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
        d="M8.44441 15.5599L12.7344 11.2599L17.0244 15.5599L18.4444 14.1399L12.7344 8.43994L7.02441 14.1399L8.44441 15.5599Z"
        fill={color}
      />
    </svg>
  )
}

export default ChevronUpIcon
