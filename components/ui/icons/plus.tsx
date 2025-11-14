import React from 'react'

interface PlusIconProps {
  className?: string
  color?: string
}

const PlusIcon: React.FC<PlusIconProps> = ({
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
        d="M11.7354 17V21H13.7354V13H21.7354V11H13.7354V3H11.7354V11H3.73535V13H11.7354V17Z"
        fill={color}
      />
    </svg>
  )
}

export default PlusIcon
