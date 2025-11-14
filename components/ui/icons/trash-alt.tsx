import React from 'react'

interface TrashAltIconProps {
  className?: string
  color?: string
}

const TrashAltIcon: React.FC<TrashAltIconProps> = ({
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
        d="M17.7354 6V4C17.7354 2.9 16.8354 2 15.7354 2H9.73535C8.63535 2 7.73535 2.9 7.73535 4V6H2.73535V8H4.73535V20C4.73535 21.1 5.63535 22 6.73535 22H18.7354C19.8354 22 20.7354 21.1 20.7354 20V8H22.7354V6H17.7354ZM15.7354 6H9.73535V4H15.7354V6Z"
        fill={color}
      />
    </svg>
  )
}

export default TrashAltIcon
