import React from 'react'

interface SidebarIconProps {
  className?: string
  color?: string
}

const SidebarIcon: React.FC<SidebarIconProps> = ({
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
        d="M20.7354 4H4.73535C3.63535 4 2.73535 4.9 2.73535 6V18C2.73535 19.1 3.63535 20 4.73535 20H20.7354C21.8354 20 22.7354 19.1 22.7354 18V6C22.7354 4.9 21.8354 4 20.7354 4ZM4.73535 6H10.7354V18H4.73535V6Z"
        fill={color}
      />

      <path d="M6.7373 8H8.7373V10H6.7373V8Z" fill={color} />

      <path d="M6.7373 12H8.7373V14H6.7373V12Z" fill={color} />
    </svg>
  )
}

export default SidebarIcon
