import React from 'react'

interface ChevronRightIconProps {
  className?: string
  color?: string
}

const ChevronRightIcon: React.FC<ChevronRightIconProps> = ({
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
        d="M10.5948 17.71L16.2948 12L10.5948 6.28998L9.1748 7.70998L13.4748 12L9.1748 16.29L10.5948 17.71Z"
        fill={color}
      />
    </svg>
  )
}

export default ChevronRightIcon
