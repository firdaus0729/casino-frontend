import React from 'react'

interface SwapDiagonalIconProps {
  className?: string
  color?: string
}

const SwapDiagonalIcon: React.FC<SwapDiagonalIconProps> = ({
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
        d="M18.0254 9.28997L12.0254 15.29L13.4454 16.71L19.4454 10.71L21.7354 13V7.04997L15.7354 6.99997L18.0254 9.28997Z"
        fill={color}
      />

      <path
        d="M13.4454 8.71001L12.0254 7.29001L6.02535 13.29L3.73535 11V16.95L9.73535 17L7.44535 14.71L13.4454 8.71001Z"
        fill={color}
      />
    </svg>
  )
}

export default SwapDiagonalIcon
