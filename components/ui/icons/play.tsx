import React from 'react'

interface PlayIconProps {
  className?: string
  color?: string
}

const PlayIcon: React.FC<PlayIconProps> = ({
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
        d="M8.25047 18.8717C8.40047 18.9617 8.57047 19.0017 8.74047 19.0017C8.91047 19.0017 9.10047 18.9517 9.25047 18.8617L19.2505 12.8617C19.5505 12.6817 19.7405 12.3517 19.7405 12.0017C19.7405 11.6517 19.5605 11.3217 19.2505 11.1417L9.25047 5.14171C9.09852 5.04954 8.92455 4.99998 8.74684 4.99822C8.56913 4.99646 8.39422 5.04257 8.24047 5.13171C7.93047 5.31171 7.73047 5.64171 7.73047 6.00171V18.0017C7.73047 18.3617 7.92047 18.6917 8.24047 18.8717H8.25047Z"
        fill={color}
      />
    </svg>
  )
}

export default PlayIcon
