import React from 'react'

interface ChevronDownIconProps {
  className?: string
  color?: string
}

const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({
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
        d="M12.7344 15.56L18.4444 9.85997L17.0244 8.43997L12.7344 12.74L8.44441 8.43997L7.02441 9.85997L12.7344 15.56Z"
        fill={color}
      />
    </svg>
  )
}

export default ChevronDownIcon
