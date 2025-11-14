import React from 'react'

interface Clock4IconProps {
  className?: string
  color?: string
}

const Clock4Icon: React.FC<Clock4IconProps> = ({
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
        d="M12.7354 2C7.22535 2 2.73535 6.49 2.73535 12C2.73535 17.51 7.22535 22 12.7354 22C18.2454 22 22.7354 17.51 22.7354 12C22.7354 6.49 18.2454 2 12.7354 2ZM17.4354 15.87L12.2354 12.87C11.9254 12.69 11.7354 12.36 11.7354 12V6H13.7354V11.42L18.4354 14.13L17.4354 15.86V15.87Z"
        fill={color}
      />
    </svg>
  )
}

export default Clock4Icon
