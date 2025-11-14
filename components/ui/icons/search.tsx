import React from 'react'

interface SearchIconProps {
  className?: string
  color?: string
}

const SearchIcon: React.FC<SearchIconProps> = ({
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
        d="M18.7354 10C18.7354 5.59 15.1454 2 10.7354 2C6.32535 2 2.73535 5.59 2.73535 10C2.73535 14.41 6.32535 18 10.7354 18C12.5854 18 14.2754 17.37 15.6354 16.31L20.7354 21.41L22.1454 20L17.0454 14.9C18.0954 13.54 18.7354 11.85 18.7354 10ZM4.73535 10C4.73535 6.69 7.42535 4 10.7354 4C14.0454 4 16.7354 6.69 16.7354 10C16.7354 13.31 14.0454 16 10.7354 16C7.42535 16 4.73535 13.31 4.73535 10Z"
        fill={color}
      />
    </svg>
  )
}

export default SearchIcon
