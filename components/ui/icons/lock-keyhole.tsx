import React from 'react'

interface LockKeyholeIconProps {
  className?: string
  color?: string
}

const LockKeyholeIcon: React.FC<LockKeyholeIconProps> = ({
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
        d="M6.73535 22H18.7354C19.8354 22 20.7354 21.1 20.7354 20V11C20.7354 9.9 19.8354 9 18.7354 9H17.7354V7C17.7354 4.24 15.4954 2 12.7354 2C9.97535 2 7.73535 4.24 7.73535 7V9H6.73535C5.63535 9 4.73535 9.9 4.73535 11V20C4.73535 21.1 5.63535 22 6.73535 22ZM13.7354 17.72V20H11.7354V17.72C11.4331 17.5455 11.1817 17.2949 11.0063 16.9932C10.8309 16.6914 10.7375 16.349 10.7354 16C10.7354 14.9 11.6354 14 12.7354 14C13.8354 14 14.7354 14.9 14.7354 16C14.7332 16.349 14.6398 16.6914 14.4644 16.9932C14.289 17.2949 14.0376 17.5455 13.7354 17.72ZM9.73535 7C9.73535 5.35 11.0854 4 12.7354 4C14.3854 4 15.7354 5.35 15.7354 7V9H9.73535V7Z"
        fill={color}
      />
    </svg>
  )
}

export default LockKeyholeIcon
