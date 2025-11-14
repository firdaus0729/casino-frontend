import React from 'react'

interface EnvelopeIconProps {
  className?: string
  color?: string
}

const EnvelopeIcon: React.FC<EnvelopeIconProps> = ({
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
        d="M20.7354 4H4.73535C3.63535 4 2.73535 4.9 2.73535 6V6.25L12.7354 13.75L22.7354 6.25V6C22.7354 4.9 21.8354 4 20.7354 4Z"
        fill={color}
      />

      <path
        d="M12.7354 16C12.5254 16 12.3154 15.93 12.1354 15.8L2.73535 8.75V18C2.73535 19.1 3.63535 20 4.73535 20H20.7354C21.8354 20 22.7354 19.1 22.7354 18V8.75L13.3354 15.8C13.1554 15.93 12.9454 16 12.7354 16Z"
        fill={color}
      />
    </svg>
  )
}

export default EnvelopeIcon
