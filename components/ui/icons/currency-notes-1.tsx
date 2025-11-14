import React from 'react'

interface CurrencyNotes1IconProps {
  className?: string
  color?: string
}

const CurrencyNotes1Icon: React.FC<CurrencyNotes1IconProps> = ({
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
        d="M21.7354 8H7.73535C7.18535 8 6.73535 8.45 6.73535 9V19C6.73535 19.55 7.18535 20 7.73535 20H21.7354C22.2854 20 22.7354 19.55 22.7354 19V9C22.7354 8.45 22.2854 8 21.7354 8ZM20.7354 16C19.6354 16 18.7354 16.9 18.7354 18H10.7354C10.7354 16.9 9.83535 16 8.73535 16V12C9.83535 12 10.7354 11.1 10.7354 10H18.7354C18.7354 11.1 19.6354 12 20.7354 12V16Z"
        fill={color}
      />

      <path
        d="M18.7354 4H3.73535C3.18535 4 2.73535 4.45 2.73535 5V16H4.73535V6H18.7354V4ZM14.7354 12C14.2049 12 13.6962 12.2107 13.3211 12.5858C12.9461 12.9609 12.7354 13.4696 12.7354 14C12.7354 14.5304 12.9461 15.0391 13.3211 15.4142C13.6962 15.7893 14.2049 16 14.7354 16C15.2658 16 15.7745 15.7893 16.1496 15.4142C16.5246 15.0391 16.7354 14.5304 16.7354 14C16.7354 13.4696 16.5246 12.9609 16.1496 12.5858C15.7745 12.2107 15.2658 12 14.7354 12Z"
        fill={color}
      />
    </svg>
  )
}

export default CurrencyNotes1Icon
