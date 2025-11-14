import React from 'react'

interface SearchPlusIconProps {
  className?: string
  color?: string
}

const SearchPlusIcon: React.FC<SearchPlusIconProps> = ({
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
        d="M11.0303 18.295C12.8803 18.295 14.5703 17.665 15.9303 16.605L21.0303 21.705L22.4403 20.295L17.3403 15.195C18.4318 13.7945 19.0263 12.0706 19.0303 10.295C19.0303 5.88498 15.4403 2.29498 11.0303 2.29498C6.62027 2.29498 3.03027 5.88498 3.03027 10.295C3.03027 14.705 6.62027 18.295 11.0303 18.295ZM7.03027 9.29498H10.0303V6.29498H12.0303V9.29498H15.0303V11.295H12.0303V14.295H10.0303V11.295H7.03027V9.29498Z"
        fill={color}
      />
    </svg>
  )
}

export default SearchPlusIcon
