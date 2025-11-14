import React from 'react'

interface DesktopIconProps {
  className?: string
  color?: string
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
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
        d="M20.7344 2.5H4.73438C3.63437 2.5 2.73438 3.4 2.73438 4.5V13.5H22.7344V4.5C22.7344 3.4 21.8344 2.5 20.7344 2.5ZM2.73438 15.5C2.73438 16.6 3.63437 17.5 4.73438 17.5H11.7344V19.5H8.73438V21.5H16.7344V19.5H13.7344V17.5H20.7344C21.8344 17.5 22.7344 16.6 22.7344 15.5V14.5H2.73438V15.5Z"
        fill={color}
      />
    </svg>
  )
}

export default DesktopIcon
