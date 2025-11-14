import React from 'react'

interface MenuIconProps {
  className?: string
  color?: string
}

const MenuIcon: React.FC<MenuIconProps> = ({
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
        d="M4.73535 6H20.7354V8H4.73535V6ZM4.73535 11H20.7354V13H4.73535V11ZM4.73535 16H20.7354V18H4.73535V16Z"
        fill={color}
      />
    </svg>
  )
}

export default MenuIcon
