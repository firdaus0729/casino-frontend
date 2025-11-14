import React from 'react'

interface FileDetailIconProps {
  className?: string
  color?: string
}

const FileDetailIcon: React.FC<FileDetailIconProps> = ({
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
        d="M15.4454 2.28999C15.3519 2.1973 15.2411 2.12398 15.1193 2.07421C14.9974 2.02445 14.867 1.99923 14.7354 1.99999H6.73535C5.63535 1.99999 4.73535 2.89999 4.73535 3.99999V20C4.73535 21.1 5.63535 22 6.73535 22H18.7354C19.8354 22 20.7354 21.1 20.7354 20V7.99999C20.7354 7.72999 20.6254 7.47999 20.4454 7.28999L15.4454 2.28999ZM7.73535 6.99999H11.7354V8.99999H7.73535V6.99999ZM17.7354 17H7.73535V15H17.7354V17ZM17.7354 13H7.73535V11H17.7354V13ZM13.7354 8.99999V3.49999L19.2354 8.99999H13.7354Z"
        fill={color}
      />
    </svg>
  )
}

export default FileDetailIcon
