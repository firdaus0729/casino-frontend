import React from 'react'

interface CrownIconProps {
  className?: string
  color?: string
}

const CrownIcon: React.FC<CrownIconProps> = ({
  className = '',
  color = 'currentColor',
}) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21.0654 3.06C20.87 2.99196 20.6583 2.9862 20.4595 3.04351C20.2607 3.10082 20.0845 3.21839 19.9554 3.38L16.7354 7.4L13.5154 3.38C13.1354 2.91 12.3354 2.91 11.9554 3.38L8.73535 7.4L5.51535 3.38C5.24535 3.05 4.80535 2.92 4.40535 3.06C4.00535 3.2 3.73535 3.58 3.73535 4V15H21.7354V4C21.7354 3.58 21.4654 3.2 21.0654 3.06ZM3.73535 19C3.73535 20.1 4.63535 21 5.73535 21H19.7354C20.8354 21 21.7354 20.1 21.7354 19V17H3.73535V19Z"
        fill={color}
      />
    </svg>
  )
}

export default CrownIcon
