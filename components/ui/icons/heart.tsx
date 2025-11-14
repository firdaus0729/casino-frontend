import React from 'react'

interface HeartIconProps {
  className?: string
  color?: string
}

const HeartIcon: React.FC<HeartIconProps> = ({
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
        d="M12.0252 20.6932C12.2252 20.8932 12.4752 20.9832 12.7352 20.9832C12.9952 20.9832 13.2452 20.8832 13.4452 20.6932L20.9452 13.1932C23.2952 10.8432 23.2952 7.14315 20.9452 4.78315C18.6552 2.49315 15.1052 2.43315 12.7352 4.58315C10.3752 2.43315 6.8252 2.49315 4.5252 4.78315C2.1752 7.14315 2.1752 10.8432 4.5252 13.1932L12.0252 20.6932Z"
        fill={color}
      />
    </svg>
  )
}

export default HeartIcon
