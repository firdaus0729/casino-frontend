'use client'

import React from 'react'

interface ChipSVGProps {
  value?: number
  label?: string
  color: string
  selected?: boolean
  onClick?: () => void
  sizePx?: number
}

export const ChipSVG: React.FC<ChipSVGProps> = ({
  value,
  label,
  color,
  selected = false,
  onClick,
  sizePx = 64,
}) => {
  const display = label ?? (value != null ? String(value) : '')
  const textLines = display.split('\n')
  const darkStroke = '#0B1220'

  return (
    <div
      onClick={onClick}
      aria-pressed={selected}
      className={
        'relative inline-flex items-center justify-center rounded-full ' +
        'transition-transform active:scale-95'
      }
      style={{ width: sizePx, height: sizePx }}
    >
      <svg
        width={sizePx}
        height={sizePx}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="baseGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="60%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </radialGradient>
          <linearGradient id="innerSheen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1A2640" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#0F1722" stopOpacity="0.55" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="3"
              result="blur"
            />
          </filter>
        </defs>

        {/* Golden outer ring when selected */}
        {selected && (
          <>
            <circle
              cx="50"
              cy="50"
              r="49"
              fill="none"
              stroke="#FFB636"
              strokeWidth="4"
            />
            <circle
              cx="50"
              cy="50"
              r="49"
              fill="none"
              stroke="#FFB636"
              strokeWidth="4"
              opacity="0.5"
              filter="url(#glow)"
            />
          </>
        )}

        {/* Outer base */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="url(#baseGrad)"
          stroke={darkStroke}
          strokeWidth="2"
        />

        {/* Outer inner ring */}
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke={darkStroke}
          strokeWidth="3"
          opacity="0.9"
        />

        {/* Inner disc */}
        <circle
          cx="50"
          cy="50"
          r="28"
          fill="url(#innerSheen)"
          stroke={darkStroke}
          strokeWidth="2.5"
        />

        {/* 8 markers: 4 squares (cardinal) and 4 diamonds (diagonals) */}
        {([0, 90, 180, 270] as number[]).map((deg, idx) => (
          <g key={`sq-${idx}`} transform={`rotate(${deg} 50 50)`}>
            <rect
              x="46"
              y="6"
              width="8"
              height="10"
              rx="2"
              fill="#F2F6FF"
              stroke="#DCE4F2"
              strokeWidth="1"
            />
          </g>
        ))}
        {([45, 135, 225, 315] as number[]).map((deg, idx) => (
          <g key={`dm-${idx}`} transform={`rotate(${deg} 50 50)`}>
            <rect
              x="48"
              y="8"
              width="6"
              height="6"
              rx="1.5"
              fill="#F2F6FF"
              stroke="#DCE4F2"
              strokeWidth="1"
              transform="rotate(45 51 11)"
            />
          </g>
        ))}

        {/* Label */}
        {textLines.length === 1 ? (
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fontFamily="inherit"
            fontWeight="800"
            fontSize="28"
            fill="#FFFFFF"
          >
            {textLines[0]}
          </text>
        ) : (
          <>
            <text
              x="50"
              y="48"
              textAnchor="middle"
              fontFamily="inherit"
              fontWeight="800"
              fontSize="14"
              fill="#FFFFFF"
            >
              {textLines[0]}
            </text>
            <text
              x="50"
              y="64"
              textAnchor="middle"
              fontFamily="inherit"
              fontWeight="800"
              fontSize="14"
              fill="#FFFFFF"
            >
              {textLines[1]}
            </text>
          </>
        )}
      </svg>
    </div>
  )
}

