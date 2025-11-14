import React from 'react'

interface FileReportIconProps {
  className?: string
  color?: string
}

const FileReportIcon: React.FC<FileReportIconProps> = ({
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
        d="M15.4454 2.29C15.2554 2.1 15.0054 2 14.7354 2H6.73535C5.63535 2 4.73535 2.9 4.73535 4V20C4.73535 21.1 5.63535 22 6.73535 22H18.7354C19.8354 22 20.7354 21.1 20.7354 20V8C20.7354 7.73 20.6254 7.48 20.4454 7.29L15.4454 2.29ZM9.73535 19H7.73535V13H9.73535V19ZM13.7354 19H11.7354V11H13.7354V19ZM17.7354 19H15.7354V15H17.7354V19ZM13.7354 9V3.5L19.2354 9H13.7354Z"
        fill={color}
      />
    </svg>
  )
}

export default FileReportIcon
