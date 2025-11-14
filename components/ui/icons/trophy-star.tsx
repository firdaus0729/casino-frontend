import React from 'react'

interface TrophyStarIconProps {
  className?: string
  color?: string
}

const TrophyStarIcon: React.FC<TrophyStarIconProps> = ({
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
        d="M21.7354 4H18.7354V3C18.7354 2.45 18.2854 2 17.7354 2H7.73535C7.18535 2 6.73535 2.45 6.73535 3V4H3.73535C3.18535 4 2.73535 4.45 2.73535 5V8C2.73535 12.29 4.52535 14.88 7.54535 14.99C8.42535 16.51 9.94535 17.61 11.7354 17.91V20H8.73535V22H16.7354V20H13.7354V17.91C15.5254 17.61 17.0554 16.51 17.9254 14.99C20.9354 14.88 22.7354 12.29 22.7354 8V5C22.7354 4.45 22.2854 4 21.7354 4ZM4.73535 8V6H6.73535V12C6.73535 12.28 6.76535 12.56 6.79535 12.83C4.95535 12.12 4.73535 9.31 4.73535 8ZM14.5854 11.62L12.7354 10.65L10.8854 11.62L11.2354 9.56L9.73535 8.1L11.8054 7.8L12.7354 5.92L13.6654 7.8L15.7354 8.1L14.2354 9.56L14.5854 11.62ZM20.7354 8C20.7354 9.31 20.5154 12.12 18.6754 12.83C18.7154 12.56 18.7354 12.28 18.7354 12V6H20.7354V8Z"
        fill={color}
      />
    </svg>
  )
}

export default TrophyStarIcon
