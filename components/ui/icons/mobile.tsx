import React from 'react'

interface MobileIconProps {
  className?: string
  color?: string
}

const MobileIcon: React.FC<MobileIconProps> = ({
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
        d="M7.73535 22H17.7354C18.8354 22 19.7354 21.1 19.7354 20V4C19.7354 2.9 18.8354 2 17.7354 2H7.73535C6.63535 2 5.73535 2.9 5.73535 4V20C5.73535 21.1 6.63535 22 7.73535 22ZM12.7354 17C13.2854 17 13.7354 17.45 13.7354 18C13.7354 18.55 13.2854 19 12.7354 19C12.1854 19 11.7354 18.55 11.7354 18C11.7354 17.45 12.1854 17 12.7354 17Z"
        fill={color}
      />
    </svg>
  )
}

export default MobileIcon
