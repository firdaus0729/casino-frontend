import React from 'react'

interface ReceiptIconProps {
  className?: string
  color?: string
}

const ReceiptIcon: React.FC<ReceiptIconProps> = ({
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
        d="M21.7354 11H18.7354V5C18.7354 3.9 17.8354 3 16.7354 3H4.73535C3.63535 3 2.73535 3.9 2.73535 5V18C2.73535 19.65 4.08535 21 5.73535 21H19.7354C21.3854 21 22.7354 19.65 22.7354 18V12C22.7354 11.45 22.2854 11 21.7354 11ZM14.7354 17H11.7354V15H14.7354V17ZM14.7354 13H6.73535V11H14.7354V13ZM14.7354 9H6.73535V7H14.7354V9ZM20.7354 18C20.7354 18.55 20.2854 19 19.7354 19C19.1854 19 18.7354 18.55 18.7354 18V13H20.7354V18Z"
        fill={color}
      />
    </svg>
  )
}

export default ReceiptIcon
