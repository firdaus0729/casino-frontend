import React from 'react'

interface ArrowToRightStrokeIconProps {
  className?: string
  color?: string
}

const ArrowToRightStrokeIcon: React.FC<ArrowToRightStrokeIconProps> = ({
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
        d="M17.2354 7C17.2354 6.44772 17.6831 6 18.2354 6H20.2354C20.7876 6 21.2354 6.44772 21.2354 7V17C21.2354 17.5523 20.7876 18 20.2354 18H18.2354C17.6831 18 17.2354 17.5523 17.2354 17V7ZM10.0257 17.6297L15.6454 12L10.0257 6.37033L8.6057 7.79033L11.8254 11H4.23535V13H11.8254L8.6057 16.2097L10.0257 17.6297Z"
        fill={color}
      />
    </svg>
  )
}

export default ArrowToRightStrokeIcon
