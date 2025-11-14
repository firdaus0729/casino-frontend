import React from 'react'

interface HeadphoneMicIconProps {
  className?: string
  color?: string
}

const HeadphoneMicIcon: React.FC<HeadphoneMicIconProps> = ({
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
        d="M12.7354 2C7.22535 2 2.73535 6.49 2.73535 12V17C2.73535 17.55 3.18535 18 3.73535 18H6.73535C7.28535 18 7.73535 17.55 7.73535 17V12C7.73535 11.45 7.28535 11 6.73535 11H4.80535C5.29535 7.06 8.66535 4 12.7354 4C16.8054 4 20.1754 7.06 20.6654 11H18.7354C18.1854 11 17.7354 11.45 17.7354 12V17C17.7354 17.55 18.1854 18 18.7354 18H20.7354V19C20.7354 19.55 20.2854 20 19.7354 20H15.7354C15.7354 19.45 15.2854 19 14.7354 19H10.7354C10.1854 19 9.73535 19.45 9.73535 20V21C9.73535 21.55 10.1854 22 10.7354 22H19.7354C21.3854 22 22.7354 20.65 22.7354 19V12C22.7354 6.49 18.2454 2 12.7354 2Z"
        fill={color}
      />
    </svg>
  )
}

export default HeadphoneMicIcon
