import React from 'react'

interface InfoCircleIconProps {
  className?: string
  color?: string
}

const InfoCircleIcon: React.FC<InfoCircleIconProps> = ({
  className = '',
  color = 'currentColor',
}) => {
  return (
    <svg
      className={`${className} cursor-pointer`}
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.7266 22.0194C18.2366 22.0194 22.7266 17.5294 22.7266 12.0194C22.7266 6.50943 18.2366 2.01943 12.7266 2.01943C7.21656 2.01943 2.72656 6.50943 2.72656 12.0194C2.72656 17.5294 7.21656 22.0194 12.7266 22.0194ZM11.7266 7.01943H13.7266V9.01943H11.7266V7.01943ZM11.7266 11.0194H13.7266V17.0194H11.7266V11.0194Z"
        fill={color}
      />
    </svg>
  )
}

export default InfoCircleIcon
