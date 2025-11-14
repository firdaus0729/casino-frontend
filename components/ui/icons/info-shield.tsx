import React from 'react'

interface InfoShieldIconProps {
  className?: string
  color?: string
}

const InfoShieldIcon: React.FC<InfoShieldIconProps> = ({
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
        d="M21.155 6.11L13.185 2.11C12.905 1.97 12.565 1.97 12.285 2.11L4.31496 6.11C4.00496 6.26 3.80496 6.56 3.76496 6.9C3.75496 7.01 2.80497 17.67 12.315 21.91C12.4435 21.9692 12.5834 21.9999 12.725 21.9999C12.8665 21.9999 13.0064 21.9692 13.135 21.91C22.645 17.66 21.705 7 21.685 6.9C21.669 6.73213 21.61 6.57122 21.5136 6.43282C21.4173 6.29443 21.2869 6.18324 21.135 6.11H21.155ZM13.735 17H11.735V11H13.735V17ZM13.735 9H11.735V7H13.735V9Z"
        fill={color}
      />
    </svg>
  )
}

export default InfoShieldIcon
