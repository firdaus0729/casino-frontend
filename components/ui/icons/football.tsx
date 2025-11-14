import React from 'react'

interface FootballIconProps {
  className?: string
  color?: string
}

const FootballIcon: React.FC<FootballIconProps> = ({
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
        d="M12.7354 2C7.22535 2 2.73535 6.49 2.73535 12C2.73535 17.51 7.22535 22 12.7354 22C18.2454 22 22.7354 17.51 22.7354 12C22.7354 6.49 18.2454 2 12.7354 2ZM18.9654 17H16.7354L15.4854 19.5C14.6254 19.82 13.7054 20 12.7354 20C11.7654 20 10.8454 19.82 9.98535 19.5L8.73535 17H6.50535C5.67999 15.9753 5.12012 14.7628 4.87535 13.47L6.73535 10.99L5.51535 8.56C5.98562 7.57172 6.65319 6.69014 7.47696 5.96955C8.30074 5.24896 9.26329 4.70461 10.3054 4.37L12.7354 5.99L15.1654 4.37C17.2754 5.05 19.0054 6.58 19.9554 8.56L18.7354 11L20.5954 13.48C20.3481 14.7671 19.7922 15.975 18.9754 17H18.9654Z"
        fill={color}
      />

      <path
        d="M9.23535 11L10.7354 15H14.7354L16.2354 11L12.7354 8.5L9.23535 11Z"
        fill={color}
      />
    </svg>
  )
}

export default FootballIcon
