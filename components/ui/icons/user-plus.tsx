import React from 'react'

interface UserPlusIconProps {
  className?: string
  color?: string
}

const UserPlusIcon: React.FC<UserPlusIconProps> = ({
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
        d="M22.7354 11H19.7354V8H17.7354V11H14.7354V13H17.7354V16H19.7354V13H22.7354V11ZM8.73535 4C7.67449 4 6.65707 4.42143 5.90692 5.17157C5.15678 5.92172 4.73535 6.93913 4.73535 8C4.73535 9.06087 5.15678 10.0783 5.90692 10.8284C6.65707 11.5786 7.67449 12 8.73535 12C9.79622 12 10.8136 11.5786 11.5638 10.8284C12.3139 10.0783 12.7354 9.06087 12.7354 8C12.7354 6.93913 12.3139 5.92172 11.5638 5.17157C10.8136 4.42143 9.79622 4 8.73535 4ZM3.73535 20H13.7354C14.2854 20 14.7354 19.55 14.7354 19V18C14.7354 15.24 12.4954 13 9.73535 13H7.73535C4.97535 13 2.73535 15.24 2.73535 18V19C2.73535 19.55 3.18535 20 3.73535 20Z"
        fill={color}
      />
    </svg>
  )
}

export default UserPlusIcon
