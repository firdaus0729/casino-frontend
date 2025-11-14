import React from 'react'

interface FormIconProps {
  className?: string
  color?: string
}

const FormIcon: React.FC<FormIconProps> = ({
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
        d="M20.2363 3.49997H6.23633C5.13633 3.49997 4.23633 4.39997 4.23633 5.49997V19.5C4.23633 20.6 5.13633 21.5 6.23633 21.5H20.2363C21.3363 21.5 22.2363 20.6 22.2363 19.5V5.49997C22.2363 4.39997 21.3363 3.49997 20.2363 3.49997ZM18.2363 17.5H8.23633V15.5H18.2363V17.5ZM8.23633 12.5C8.23633 11.67 8.90633 11 9.73633 11C10.5663 11 11.2363 11.67 11.2363 12.5C11.2363 13.33 10.5663 14 9.73633 14C8.90633 14 8.23633 13.33 8.23633 12.5ZM18.2363 13.5H12.2363V11.5H18.2363V13.5ZM18.2363 9.49997H8.23633V7.49997H18.2363V9.49997Z"
        fill={color}
      />
    </svg>
  )
}

export default FormIcon
