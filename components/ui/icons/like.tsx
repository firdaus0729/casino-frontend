import React from 'react'

interface LikeIconProps {
  className?: string
  color?: string
}

const LikeIcon: React.FC<LikeIconProps> = ({
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
        d="M4.73047 21.5H5.73047V8.5H4.73047C3.63047 8.5 2.73047 9.4 2.73047 10.5V19.5C2.73047 20.6 3.63047 21.5 4.73047 21.5ZM20.7305 8.5H14.1205L15.2405 5.13C15.4405 4.52 15.3405 3.85 14.9705 3.33C14.5905 2.81 13.9905 2.5 13.3505 2.5H12.7405C12.4405 2.5 12.1605 2.63 11.9705 2.86L7.74047 7.94V21.5H18.0505C18.4574 21.4993 18.8545 21.3745 19.1886 21.1422C19.5227 20.9099 19.778 20.5812 19.9205 20.2L22.6805 12.85C22.7205 12.74 22.7405 12.62 22.7405 12.5V10.5C22.7405 9.4 21.8405 8.5 20.7405 8.5H20.7305Z"
        fill={color}
      />
    </svg>
  )
}

export default LikeIcon
