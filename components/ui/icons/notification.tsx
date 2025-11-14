import React from 'react'

interface NotificationIconProps {
  className?: string
  color?: string
}

const NotificationIcon: React.FC<NotificationIconProps> = ({
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
        d="M18.7354 3C17.9397 3 17.1766 3.31607 16.614 3.87868C16.0514 4.44129 15.7354 5.20435 15.7354 6C15.7354 6.79565 16.0514 7.55871 16.614 8.12132C17.1766 8.68393 17.9397 9 18.7354 9C19.531 9 20.2941 8.68393 20.8567 8.12132C21.4193 7.55871 21.7354 6.79565 21.7354 6C21.7354 5.20435 21.4193 4.44129 20.8567 3.87868C20.2941 3.31607 19.531 3 18.7354 3Z"
        fill={color}
      />

      <path
        d="M5.73535 4C4.63535 4 3.73535 4.9 3.73535 6V19C3.73535 20.1 4.63535 21 5.73535 21H18.7354C19.8354 21 20.7354 20.1 20.7354 19V10.01C20.1254 10.31 19.4554 10.5 18.7354 10.5C16.2554 10.5 14.2354 8.48 14.2354 6C14.2354 5.28 14.4254 4.61 14.7254 4H5.73535Z"
        fill={color}
      />
    </svg>
  )
}

export default NotificationIcon
