'use client'

import React from 'react'

export interface EarningCardProps {
  price: string
  id?: string
  title?: string
  image: string
}

const EarningCard: React.FC<EarningCardProps> = ({
  price,
  id,
  title,
  image,
}) => {
  return (
    <div className=" rounded-[8px] overflow-hidden w-full">
      <div className="relative rounded-[8px] overflow-hidden">
        <div className="rounded-[8px]  relative overflow-hidden">
          <img
            src={image}
            alt={`Casino game`}
            className="w-full object-cover transition-transform duration-300"
          />
          <div className="absolute rounded-[8px] w-full top-0 left-0 h-full hover:backdrop-blur-[3px] duration-300 "></div>
        </div>
        <p className="text-crimson pt-1 lg:hidden text-[12px] font-bold">
          {price}$
        </p>
        <p className="text-white pt-1 lg:hidden font-medium text-[10px]">
          {title}
        </p>
        <p className="text-[#55657E] pt-1 lg:hidden font-medium text-[10px]">
          ID:{id}
        </p>
      </div>
    </div>
  )
}

export default EarningCard
