import React from 'react'

interface UserIconProps {
  className?: string
  color?: string
}

const UserIcon: React.FC<UserIconProps> = ({
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
        d="M12.7354 2.00002C11.4093 2.00002 10.1375 2.5268 9.19982 3.46448C8.26214 4.40216 7.73535 5.67393 7.73535 7.00002C7.73535 8.3261 8.26214 9.59787 9.19982 10.5355C10.1375 11.4732 11.4093 12 12.7354 12C14.0614 12 15.3332 11.4732 16.2709 10.5355C17.2086 9.59787 17.7354 8.3261 17.7354 7.00002C17.7354 5.67393 17.2086 4.40216 16.2709 3.46448C15.3332 2.5268 14.0614 2.00002 12.7354 2.00002ZM4.73535 22H20.7354C21.2854 22 21.7354 21.55 21.7354 21V20C21.7354 16.14 18.5954 13 14.7354 13H10.7354C6.87535 13 3.73535 16.14 3.73535 20V21C3.73535 21.55 4.18535 22 4.73535 22Z"
        fill={color}
      />
    </svg>
  )
}

export default UserIcon
