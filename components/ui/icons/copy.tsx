import React from 'react'

interface CopyIconProps {
  className?: string
  color?: string
}

const CopyIcon: React.FC<CopyIconProps> = ({
  className = '',
  color = 'currentColor',
}) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20.7354 2H10.7354C9.63078 2 8.73535 2.89543 8.73535 4V14C8.73535 15.1046 9.63078 16 10.7354 16H20.7354C21.8399 16 22.7354 15.1046 22.7354 14V4C22.7354 2.89543 21.8399 2 20.7354 2Z"
        fill={color}
      />
      <path
        d="M9.23535 18C8.57231 18 7.93643 17.7366 7.46758 17.2678C6.99874 16.7989 6.73535 16.163 6.73535 15.5V8H4.73535C3.63535 8 2.73535 8.9 2.73535 10V20C2.73535 21.1 3.63535 22 4.73535 22H14.7354C15.8354 22 16.7354 21.1 16.7354 20V18H9.23535Z"
        fill={color}
      />
    </svg>
  )
}

export default CopyIcon
