import React from 'react'

interface ChevronLeftIconProps {
  className?: string
  color?: string
}

const ChevronLeftIcon: React.FC<ChevronLeftIconProps> = ({
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
        d="M14.8748 6.28998L9.1748 12L14.8748 17.71L16.2948 16.29L11.9948 12L16.2948 7.70998L14.8748 6.28998Z"
        fill={color}
      />
    </svg>
  )
}

export default ChevronLeftIcon
