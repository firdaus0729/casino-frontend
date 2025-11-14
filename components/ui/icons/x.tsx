import React from 'react'

interface XIconProps {
  className?: string
  color?: string
}

const XIcon: React.FC<XIconProps> = ({
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
        d="M10.615 12.71L5.66504 17.66L7.07504 19.07L9.90504 16.24L12.735 13.41L14.855 15.54L18.395 19.07L19.805 17.66L14.855 12.71L14.145 12L19.805 6.33999L18.395 4.92999L12.735 10.59L7.07504 4.92999L5.66504 6.33999L11.325 12L10.615 12.71Z"
        fill={color}
      />
    </svg>
  )
}

export default XIcon
