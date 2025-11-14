import React from 'react'

interface ArrowLeftStrokeIconProps {
  className?: string
  color?: string
}

const ArrowLeftStrokeIcon: React.FC<ArrowLeftStrokeIconProps> = ({
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
        d="M12.4803 6.29001L6.78027 12L12.4803 17.71L13.9003 16.29L10.6003 13H18.6903V11H10.6003L13.9003 7.71001L12.4803 6.29001Z"
        fill={color}
      />
    </svg>
  )
}

export default ArrowLeftStrokeIcon
