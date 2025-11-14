import React from 'react'

interface PrintDollarIconProps {
  className?: string
  color?: string
}

const PrintDollarIcon: React.FC<PrintDollarIconProps> = ({
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
        d="M20.7354 4H22.7354V2H19.7354H5.73535H2.73535V4H4.73535H20.7354Z"
        fill={color}
      />

      <path
        d="M4.73535 5V20C4.73535 21.1 5.63535 22 6.73535 22H18.7354C19.8354 22 20.7354 21.1 20.7354 20V5H4.73535ZM13.7354 17.91V19H11.7354V17.92C9.39535 17.55 8.73535 15.92 8.73535 15H10.7354C10.7454 15.14 10.8954 16 12.7354 16C14.1154 16 14.7354 15.42 14.7354 15C14.7354 14.68 14.7354 14 12.7354 14C9.25535 14 8.73535 12.12 8.73535 11C8.73535 9.71 9.76535 8.42 11.7354 8.09V7H13.7354V8.12C15.4654 8.53 16.1354 9.97 16.1354 11H15.1354L14.1354 11.02C14.1254 10.64 13.9154 10 12.7354 10C11.4354 10 10.7354 10.52 10.7354 11C10.7354 11.37 10.7354 12 12.7354 12C16.2154 12 16.7354 13.88 16.7354 15C16.7354 16.29 15.7054 17.58 13.7354 17.91Z"
        fill={color}
      />
    </svg>
  )
}

export default PrintDollarIcon
