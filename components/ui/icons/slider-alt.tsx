import React from 'react'

interface SliderAltIconProps {
  className?: string
  color?: string
}

const SliderAltIcon: React.FC<SliderAltIconProps> = ({
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
        d="M6.73535 11C8.59535 11 10.1454 9.72 10.5954 8H22.7354V6H10.5954C10.1454 4.28 8.59535 3 6.73535 3C4.52535 3 2.73535 4.79 2.73535 7C2.73535 9.21 4.52535 11 6.73535 11Z"
        fill={color}
      />

      <path
        d="M18.7354 21C20.9454 21 22.7354 19.21 22.7354 17C22.7354 14.79 20.9454 13 18.7354 13C16.8754 13 15.3254 14.28 14.8754 16H2.73535V18H14.8754C15.3254 19.72 16.8754 21 18.7354 21Z"
        fill={color}
      />
    </svg>
  )
}

export default SliderAltIcon
