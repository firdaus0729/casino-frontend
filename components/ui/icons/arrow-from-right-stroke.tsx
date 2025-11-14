import React from 'react'

interface ArrowFromRightStrokeIconProps {
  className?: string
  color?: string
}

const ArrowFromRightStrokeIcon: React.FC<ArrowFromRightStrokeIconProps> = ({
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
        d="M17.4404 7C17.4404 6.44772 17.8881 6 18.4404 6H20.4404C20.9927 6 21.4404 6.44772 21.4404 7V17C21.4404 17.5523 20.9927 18 20.4404 18H18.4404C17.8881 18 17.4404 17.5523 17.4404 17V7Z"
        fill={color}
      />

      <path
        d="M4.23551 12L9.85516 17.6296L11.2752 16.2096L8.05551 13H15.6455V11H8.05551L11.2752 7.7903L9.85516 6.3703L4.23551 12Z"
        fill={color}
      />
    </svg>
  )
}

export default ArrowFromRightStrokeIcon
