import React from 'react'

interface MessageDots2IconProps {
  className?: string
  color?: string
}

const MessageDots2Icon: React.FC<MessageDots2IconProps> = ({
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
        d="M20.7402 2.5H4.74023C3.64023 2.5 2.74023 3.4 2.74023 4.5V16.5C2.74023 17.6 3.64023 18.5 4.74023 18.5H7.74023V20.5C7.74023 20.86 7.93023 21.19 8.25023 21.37C8.40023 21.46 8.57023 21.5 8.74023 21.5C8.91023 21.5 9.10023 21.45 9.25023 21.36L14.0102 18.5H20.7302C21.8302 18.5 22.7302 17.6 22.7302 16.5V4.5C22.7302 3.4 21.8302 2.5 20.7302 2.5H20.7402ZM9.74023 12.5C8.64023 12.5 7.74023 11.6 7.74023 10.5C7.74023 9.4 8.64023 8.5 9.74023 8.5C10.8402 8.5 11.7402 9.4 11.7402 10.5C11.7402 11.6 10.8402 12.5 9.74023 12.5ZM15.7402 12.5C14.6402 12.5 13.7402 11.6 13.7402 10.5C13.7402 9.4 14.6402 8.5 15.7402 8.5C16.8402 8.5 17.7402 9.4 17.7402 10.5C17.7402 11.6 16.8402 12.5 15.7402 12.5Z"
        fill={color}
      />
    </svg>
  )
}

export default MessageDots2Icon
