import React from 'react'

interface CheckCircleIconProps {
  className?: string
  color?: string
}

const CheckCircleIcon: React.FC<CheckCircleIconProps> = ({
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
        d="M12.7354 2C7.22535 2 2.73535 6.49 2.73535 12C2.73535 17.51 7.22535 22 12.7354 22C18.2454 22 22.7354 17.51 22.7354 12C22.7354 6.49 18.2454 2 12.7354 2ZM11.4454 15.71C11.2454 15.91 10.9954 16 10.7354 16C10.4754 16 10.2254 15.9 10.0254 15.71L7.02535 12.71L8.43535 11.3L10.7254 13.59L16.0154 8.3L17.4254 9.71L11.4254 15.71H11.4454Z"
        fill={color}
      />
    </svg>
  )
}

export default CheckCircleIcon
