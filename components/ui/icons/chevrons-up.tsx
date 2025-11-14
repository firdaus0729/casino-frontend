import React from 'react'

interface ChevronsUpIconProps {
  className?: string
  color?: string
}

const ChevronsUpIcon: React.FC<ChevronsUpIconProps> = ({
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
        d="M7.02539 11.64L8.44539 13.06L12.7354 8.76L17.0254 13.06L18.4454 11.64L12.7354 5.94L7.02539 11.64Z"
        fill={color}
      />

      <path
        d="M7.02539 16.64L8.44539 18.06L12.7354 13.76L17.0254 18.06L18.4454 16.64L12.7354 10.94L7.02539 16.64Z"
        fill={color}
      />
    </svg>
  )
}

export default ChevronsUpIcon
