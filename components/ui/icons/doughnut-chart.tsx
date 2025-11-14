import React from 'react'

interface DoughnutChartIconProps {
  className?: string
  color?: string
}

const DoughnutChartIcon: React.FC<DoughnutChartIconProps> = ({
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
        d="M13.7354 7.1C15.6954 7.5 17.2354 9.04 17.6354 11H22.6854C22.2154 6.28 18.4554 2.52 13.7354 2.05V7.1Z"
        fill={color}
      />

      <path
        d="M17.6354 13C17.1754 15.28 15.1554 17 12.7354 17C9.97535 17 7.73535 14.76 7.73535 12C7.73535 9.58 9.45535 7.56 11.7354 7.1V2.05C6.68535 2.55 2.73535 6.81 2.73535 12C2.73535 17.52 7.21535 22 12.7354 22C17.9254 22 22.1854 18.05 22.6854 13H17.6354Z"
        fill={color}
      />
    </svg>
  )
}

export default DoughnutChartIcon
