import React from 'react'

interface ArrowUpRightStrokeIconProps {
  className?: string
  color?: string
}

const ArrowUpRightStrokeIcon: React.FC<ArrowUpRightStrokeIconProps> = ({
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
        d="M17.5899 16.145V7.14496H8.58988V9.14496H14.1799L7.87988 15.435L9.29988 16.855L15.5899 10.555V16.145H17.5899Z"
        fill={color}
      />
    </svg>
  )
}

export default ArrowUpRightStrokeIcon
