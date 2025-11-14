import React from 'react'

interface TicketStarIconProps {
  className?: string
  color?: string
}

const TicketStarIcon: React.FC<TicketStarIconProps> = ({
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
        d="M21.7354 5H3.73535C3.18535 5 2.73535 5.45 2.73535 6V9.55C2.73535 10.03 3.06535 10.44 3.53535 10.53C4.23535 10.67 4.73535 11.29 4.73535 12C4.73535 12.71 4.23535 13.33 3.53535 13.47C3.06535 13.56 2.73535 13.97 2.73535 14.45V18C2.73535 18.55 3.18535 19 3.73535 19H21.7354C22.2854 19 22.7354 18.55 22.7354 18V14.45C22.7354 13.97 22.4054 13.56 21.9354 13.47C21.2354 13.33 20.7354 12.71 20.7354 12C20.7354 11.29 21.2354 10.67 21.9354 10.53C22.4054 10.44 22.7354 10.03 22.7354 9.55V6C22.7354 5.45 22.2854 5 21.7354 5ZM15.2054 15.25L12.7354 13.6L10.2654 15.25L11.0854 12.57L9.23535 10.72L11.6154 10.51L12.7354 8.25L13.8554 10.51L16.2354 10.72L14.3854 12.57L15.2054 15.25Z"
        fill={color}
      />
    </svg>
  )
}

export default TicketStarIcon
