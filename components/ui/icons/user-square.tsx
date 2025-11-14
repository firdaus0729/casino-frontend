import React from 'react'

interface UserSquareIconProps {
  className?: string
  color?: string
}

const UserSquareIcon: React.FC<UserSquareIconProps> = ({
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
        d="M19.7354 3H5.73535C4.63535 3 3.73535 3.9 3.73535 5V19C3.73535 20.1 4.63535 21 5.73535 21H19.7354C20.8354 21 21.7354 20.1 21.7354 19V5C21.7354 3.9 20.8354 3 19.7354 3ZM15.7354 10C15.7354 11.71 14.4454 13 12.7354 13C11.0254 13 9.73535 11.71 9.73535 10C9.73535 8.29 11.0254 7 12.7354 7C14.4454 7 15.7354 8.29 15.7354 10ZM6.83535 19C7.29535 16.72 9.31535 15 11.7354 15H13.7354C16.1454 15 18.1654 16.72 18.6354 19H6.83535Z"
        fill={color}
      />
    </svg>
  )
}

export default UserSquareIcon
