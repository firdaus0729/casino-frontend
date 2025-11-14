import React from 'react'

interface DockRightArrowIconProps {
  className?: string
  color?: string
}

const DockRightArrowIcon: React.FC<DockRightArrowIconProps> = ({
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
        d="M19.7354 3H5.73535C4.63535 3 3.73535 3.9 3.73535 5V19C3.73535 20.1 4.63535 21 5.73535 21H19.7354C20.8354 21 21.7354 20.1 21.7354 19V5C21.7354 3.9 20.8354 3 19.7354 3ZM5.73535 19V5H14.7354V19H5.73535Z"
        fill={color}
      />

      <path
        d="M7.27539 9.20999L10.0754 12L7.27539 14.79L8.69539 16.21L12.8954 12L8.69539 7.78999L7.27539 9.20999Z"
        fill={color}
      />
    </svg>
  )
}

export default DockRightArrowIcon
