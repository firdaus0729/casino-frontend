import React from 'react'

interface AlertSquareIconProps {
  className?: string
  color?: string
}

const AlertSquareIcon: React.FC<AlertSquareIconProps> = ({
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
        d="M19.7354 2.99994H5.73535C4.63535 2.99994 3.73535 3.89994 3.73535 4.99994V18.9999C3.73535 20.0999 4.63535 20.9999 5.73535 20.9999H19.7354C20.8354 20.9999 21.7354 20.0999 21.7354 18.9999V4.99994C21.7354 3.89994 20.8354 2.99994 19.7354 2.99994ZM13.7354 16.9999H11.7354V14.9999H13.7354V16.9999ZM13.7354 12.9999H11.7354V6.99994H13.7354V12.9999Z"
        fill={color}
      />
    </svg>
  )
}

export default AlertSquareIcon
