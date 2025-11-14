import React from 'react'

interface SpadeIconProps {
  className?: string
  color?: string
}

const SpadeIcon: React.FC<SpadeIconProps> = ({
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
        d="M13.3849 2.24C13.2037 2.08507 12.9732 1.99993 12.7349 1.99993C12.4965 1.99993 12.266 2.08507 12.0849 2.24L4.57488 8.68C3.71583 9.51142 3.12449 10.5803 2.8766 11.7499C2.62872 12.9194 2.73555 14.1363 3.18344 15.2447C3.63133 16.3532 4.39987 17.3027 5.39066 17.9717C6.38145 18.6407 7.54937 18.9988 8.74488 19C9.80488 19 10.8449 18.7 11.7449 18.18V20H8.74488V22H16.7449V20H13.7449V18.18C14.6449 18.7 15.6849 19 16.7449 19C20.0549 19 22.7449 16.31 22.7449 13C22.7449 11.38 22.0749 9.81 20.8649 8.64L13.3949 2.24H13.3849Z"
        fill={color}
      />
    </svg>
  )
}

export default SpadeIcon
