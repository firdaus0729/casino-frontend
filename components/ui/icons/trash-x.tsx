import React from 'react'

interface TrashXIconProps {
  className?: string
  color?: string
}

const TrashXIcon: React.FC<TrashXIconProps> = ({
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
        d="M19.7354 6H17.7354V4C17.7354 2.9 16.8354 2 15.7354 2H9.73535C8.63535 2 7.73535 2.9 7.73535 4V6H2.73535V8H4.73535V20C4.73535 21.1 5.63535 22 6.73535 22H18.7354C19.8354 22 20.7354 21.1 20.7354 20V8H22.7354V6H19.7354ZM9.73535 4H15.7354V6H9.73535V4ZM16.4454 16.29L15.0354 17.7L12.7454 15.41L10.4554 17.7L9.04535 16.29L11.3354 14L9.04535 11.71L10.4554 10.3L12.7454 12.59L15.0354 10.3L16.4454 11.71L14.1554 14L16.4454 16.29Z"
        fill={color}
      />
    </svg>
  )
}

export default TrashXIcon
