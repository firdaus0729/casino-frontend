import React from 'react'

interface CheckIconProps {
  className?: string
  color?: string
}

const CheckIcon: React.FC<CheckIconProps> = ({
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
        d="M9.72539 15.94L5.43539 11.65L4.02539 13.06L9.02539 18.06C9.22539 18.26 9.47539 18.35 9.73539 18.35C9.99539 18.35 10.2454 18.25 10.4454 18.06L21.4454 7.05999L20.0354 5.64999L9.74539 15.94H9.72539Z"
        fill={color}
      />
    </svg>
  )
}

export default CheckIcon
