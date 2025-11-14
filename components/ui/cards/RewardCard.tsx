'use client'

// this is the first carousel card

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '..'
import FlatButton from '../Button/FlatButton'

interface TypeOneProps {
  button: string
  image: string // image URL from /public
  link?: string
  mainTitle: string
  subTitle: string
}

const TypeOne: React.FC<TypeOneProps> = ({
  button,
  image,
  link = '#',
  mainTitle,
  subTitle,
}) => {
  return (
    <div
      className="group relative overflow-hidden rounded-[14px] lg:h-[270px] h-[196px] lg:px-8 px-6 lg:py-16 py-8 flex items-end text-white shadow-md transition-all duration-300 "
      style={{ width: '100%' }}
    >
      {/* Background image layer with hover zoom */}
      <div
        className="absolute inset-0 bg-no-repeat transition-transform duration-500 "
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute top-[15%] left-[5%] w-3/5">
        <p>
          <span className="font-bold text-[1.4rem] md:text-[1.6]">
            {mainTitle}
          </span>
        </p>
        <p>
          <span className="font-semibold text-[1rem] md:text-[1.2rem] leading-[1.5rem] md:leading-[2rem]">
            {subTitle}
          </span>
        </p>
      </div>

      {/* subtle dark overlay for readability */}
      {/* <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/30" /> */}

      {/* sheen sweep on hover */}
      {/* <div className="pointer-events-none absolute inset-y-0 left-[-40%] w-[40%] skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:left-[140%]" /> */}

      <div>
        <a href={link}>
          <FlatButton className="lg:w-[173px] w-[125.58px] lg:h-[52px] lg:text-[18.9px] text-[13.72px] h-[33.73px] font-bold lg:rounded-[12.6px] rounded-[9.15px] bg-[linear-gradient(#0C60FF,#2C9FFA)]">
            {button}
          </FlatButton>
        </a>
      </div>
    </div>
  )
}

export default TypeOne
