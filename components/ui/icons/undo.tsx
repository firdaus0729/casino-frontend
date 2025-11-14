import React from 'react'

interface UndoIconProps {
  className?: string
  color?: string
}

const UndoIcon: React.FC<UndoIconProps> = ({
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
        d="M9.73535 10H15.7354C17.9454 10 19.7354 11.79 19.7354 14C19.7354 16.21 17.9454 18 15.7354 18H12.7354V20H15.7354C19.0454 20 21.7354 17.31 21.7354 14C21.7354 10.69 19.0454 8 15.7354 8H9.73535V4L3.73535 9L9.73535 14V10Z"
        fill={color}
      />
    </svg>
  )
}

export default UndoIcon
