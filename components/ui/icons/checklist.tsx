import React from 'react'

interface ChecklistIconProps {
  className?: string
  color?: string
}

const ChecklistIcon: React.FC<ChecklistIconProps> = ({
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
        d="M5.09086 8.24L3.80086 6.94L2.38086 8.36L5.09086 11.06L9.80086 6.36L8.38086 4.94L5.09086 8.24ZM5.09086 16.24L3.80086 14.94L2.38086 16.36L5.09086 19.06L9.80086 14.36L8.38086 12.94L5.09086 16.24ZM11.0909 15.15H23.0909V17.15H11.0909V15.15ZM11.0909 7.15H23.0909V9.15H11.0909V7.15Z"
        fill={color}
      />
    </svg>
  )
}

export default ChecklistIcon
