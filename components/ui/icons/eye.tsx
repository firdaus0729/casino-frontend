import React from 'react'

interface EyeIconProps {
  className?: string
  color?: string
}

const EyeIcon: React.FC<EyeIconProps> = ({
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
        d="M12.7359 18.995C20.3659 18.995 22.6659 12.375 22.6859 12.315C22.7559 12.105 22.7559 11.885 22.6859 11.685C22.6659 11.615 20.3659 5.005 12.7359 5.005C5.1059 5.005 2.8059 11.615 2.7859 11.675C2.7159 11.885 2.7159 12.105 2.7859 12.305C2.8059 12.375 5.1059 18.985 12.7359 18.985V18.995ZM12.7359 8.995C14.3759 8.995 15.7359 10.355 15.7359 11.995C15.7359 13.635 14.3759 14.995 12.7359 14.995C11.0959 14.995 9.7359 13.635 9.7359 11.995C9.7359 10.355 11.0959 8.995 12.7359 8.995Z"
        fill={color}
      />
    </svg>
  )
}

export default EyeIcon
