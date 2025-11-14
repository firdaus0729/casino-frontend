import React from 'react'

interface EducationIconProps {
  className?: string
  color?: string
}

const EducationIcon: React.FC<EducationIconProps> = ({
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
        d="M22.1851 8.61L13.1851 4.11C12.9051 3.97 12.5751 3.97 12.2951 4.11L6.29512 7.11L3.29512 8.61L2.29512 9.11C1.95512 9.28 1.74512 9.63 1.74512 10V16H3.74512V10.62L12.2951 14.9C12.4351 14.97 12.5851 15.01 12.7451 15.01C12.9051 15.01 13.0551 14.97 13.1951 14.9L22.1951 10.4C22.5351 10.23 22.7451 9.88 22.7451 9.51C22.7451 9.14 22.5351 8.79 22.1951 8.62L22.1851 8.61Z"
        fill={color}
      />

      <path
        d="M12.7354 17C12.2754 17 11.8054 16.89 11.3954 16.68L5.73535 13.85V15.44C5.73535 17.5 8.85535 20 12.7354 20C16.6154 20 19.7354 17.51 19.7354 15.44V13.85L14.0754 16.68C13.6654 16.89 13.1954 17 12.7354 17Z"
        fill={color}
      />
    </svg>
  )
}

export default EducationIcon
