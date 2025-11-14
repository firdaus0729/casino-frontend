import React from 'react'

interface ChevronsDownIconProps {
  className?: string
  color?: string
}

const ChevronsDownIcon: React.FC<ChevronsDownIconProps> = ({
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
        d="M12.7354 15.24L8.44539 10.94L7.02539 12.36L12.7354 18.06L18.4454 12.36L17.0254 10.94L12.7354 15.24Z"
        fill={color}
      />

      <path
        d="M12.7354 10.24L8.44539 5.93997L7.02539 7.35997L12.7354 13.06L18.4454 7.35997L17.0254 5.93997L12.7354 10.24Z"
        fill={color}
      />
    </svg>
  )
}

export default ChevronsDownIcon
