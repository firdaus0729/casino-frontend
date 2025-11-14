import React from 'react'

interface ArchiveArrowDownIconProps {
  className?: string
  color?: string
}

const ArchiveArrowDownIcon: React.FC<ArchiveArrowDownIconProps> = ({
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
        d="M22.5354 6.4L19.8354 2.8C19.4554 2.3 18.8654 2 18.2354 2H7.23535C6.60535 2 6.00535 2.3 5.63535 2.8L2.93535 6.4H2.94535C2.81535 6.58 2.73535 6.77 2.73535 7V20C2.73535 21.1 3.63535 22 4.73535 22H20.7354C21.8354 22 22.7354 21.1 22.7354 20V7C22.7354 6.77 22.6454 6.58 22.5254 6.41H22.5354V6.4ZM12.7354 18L8.73535 14H11.7354V10H13.7354V14H16.7354L12.7354 18ZM5.73535 6L7.23535 4H18.2354L19.7354 6H5.73535Z"
        fill={color}
      />
    </svg>
  )
}

export default ArchiveArrowDownIcon
