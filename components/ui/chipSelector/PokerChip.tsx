import { cn } from '@/lib/utils'

interface PokerChipProps {
  value: string | number
  color:
    | 'blue'
    | 'purple'
    | 'green'
    | 'navy'
    | 'red'
    | 'orange'
    | 'gold'
    | 'brown'
    | 'lightblue'
  isSelected?: boolean
  onClick?: () => void
  className?: string
}

const colorMap = {
  blue: 'var(--chip-blue)',
  purple: 'var(--chip-purple)',
  green: 'var(--chip-green)',
  navy: 'var(--chip-navy)',
  red: 'var(--chip-red)',
  orange: 'var(--chip-orange)',
  gold: 'var(--chip-gold)',
  brown: 'var(--chip-brown)',
  lightblue: 'var(--chip-lightblue)',
}

export function PokerChip({
  value,
  color,
  isSelected = false,
  onClick,
  className,
}: PokerChipProps) {
  const chipColor = colorMap[color]

  return (
    <div
      className={cn(
        'relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-all duration-200',
        isSelected &&
          ' ring-chip-orange shadow-[0_0_13px_0_var(--yellow-orange)]',
        className
      )}
      onClick={onClick}
      style={{
        filter: isSelected
          ? 'drop-shadow(0 4px 0 var(--chip-red)) drop-shadow(0 3px 0 var(--chip-orange)) drop-shadow(0 2px 0 var(--chip-green)) drop-shadow(0 1px 0 var(--chip-navy))'
          : 'drop-shadow(0 1px 0 var(--chip-navy))',
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 49 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_1px_0_var(--chip-navy)]"
      >
        <g filter="url(#filter0_di)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.8441 43.2767C23.8462 43.2767 23.0016 43.3048 22.967 43.3392C22.9325 43.3736 22.9043 44.2183 22.9043 45.2164V47.031H26.6587V43.2767H24.8441ZM39.2357 36.6126C39.2085 36.6126 38.5959 37.2041 37.8743 37.9271L36.5624 39.2416L39.2357 41.9148L41.909 39.2416L40.5971 37.9271C39.8758 37.2044 39.2634 36.6131 39.2357 36.6126ZM9.27055 37.904C8.56116 38.6148 7.98078 39.2385 7.98078 39.2902C7.98081 39.3418 8.55125 39.9534 9.24841 40.6491L10.516 41.914L13.1891 39.2407L10.5602 36.6118L9.27055 37.904ZM2.63086 26.7575H6.38519V23.0032H2.63086V26.7575ZM43.2716 26.7575H47.0299L46.979 23.0501L43.2716 22.9993V26.7575ZM39.2827 7.9858C39.2296 7.9858 38.6061 8.56708 37.8969 9.27759L36.6077 10.5694L39.2366 13.1933L41.909 10.5209L40.6441 9.25334C39.9484 8.55629 39.336 7.986 39.2827 7.9858ZM7.88683 10.5694L9.17871 11.8587C9.88909 12.5678 10.5127 13.1479 10.5644 13.148C10.6869 13.148 13.1425 10.6877 13.1431 10.5644C13.1431 10.5128 12.5618 9.89035 11.8513 9.18125L10.5595 7.89194L7.88683 10.5694ZM24.8255 2.72974C23.421 2.72974 22.9815 2.75788 22.9461 2.85004C22.9208 2.91621 22.9115 3.75047 22.9256 4.70379L22.9513 6.43714L26.6587 6.48801V2.72974H24.8255Z"
            fill="var(--gallery)"
          />
          <g filter="url(#filter1_i)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.6267 8.98198C28.5345 8.56146 33.5633 10.6195 36.8416 14.39C39.3958 17.3276 40.725 20.8982 40.721 24.8108C40.7147 30.8242 37.3559 36.2554 31.9752 38.9528C26.9697 41.4621 20.8473 41.0991 16.1911 38.017C12.8388 35.798 10.38 32.2721 9.47959 28.3929C8.23605 23.0352 9.81151 17.5233 13.7055 13.6079C16.3481 10.9509 19.8828 9.30275 23.6267 8.98198Z"
              fill={chipColor}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.8438 0.792257C26.5538 0.663859 29.7292 1.10892 32.4318 1.99607C40.8001 4.74312 47.0779 12.0662 48.5678 20.8187C49.6632 27.2533 48.0192 33.9157 44.0123 39.2797C43.1274 40.4644 40.5799 43.012 39.3952 43.8969C35.329 46.9342 30.7423 48.5634 25.7209 48.7538C18.9362 49.011 12.2632 46.2884 7.54384 41.3374C4.00171 37.6215 1.74786 32.9068 1.08654 27.8298C0.89873 26.3876 0.894941 23.1831 1.07956 21.7839C1.45443 18.9413 2.19077 16.5495 3.47147 14.0139C4.6767 11.6275 6.04273 9.73705 7.92983 7.84365C12.1758 3.58323 17.8319 1.07702 23.8438 0.792257ZM24.845 43.157C23.8471 43.157 23.0025 43.1851 22.9678 43.2196C22.9334 43.2539 22.9052 44.0986 22.9052 45.0967V46.9114H26.6595V43.157H24.845ZM39.2366 36.493C39.2094 36.493 38.5968 37.0845 37.8752 37.8075L36.5633 39.1219L39.2366 41.7952L41.9098 39.1219L40.598 37.8075C39.8767 37.0847 39.2642 36.4934 39.2366 36.493ZM9.2714 37.7843C8.56201 38.4951 7.98163 39.1188 7.98163 39.1705C7.98166 39.2222 8.5521 39.8337 9.24926 40.5295L10.5168 41.7943L13.1899 39.121L10.5611 36.4922L9.2714 37.7843ZM26.1626 8.05341C25.0471 7.96659 24.8705 7.96411 23.8907 8.02118C17.3212 8.40393 11.4677 12.7519 9.1599 18.9633C7.612 23.1291 7.80031 27.7785 9.68283 31.8725C10.9626 34.6556 13.3744 37.3713 16.0287 39.0175C17.9041 40.1806 20.0091 40.9766 22.1898 41.3474C23.3543 41.5453 26.2489 41.5676 27.3634 41.387C31.019 40.795 34.1946 39.1862 36.7481 36.6326C39.3017 34.0791 40.9104 30.9036 41.5025 27.248C41.6831 26.1335 41.6609 23.2389 41.4629 22.0744C41.1984 20.5186 40.5916 18.6388 39.9295 17.3241C39.1132 15.7032 38.234 14.4764 36.8989 13.0956C34.033 10.1318 30.2912 8.37451 26.1626 8.05341ZM2.63171 26.6379H6.38604V22.8836H2.63171V26.6379ZM43.2725 26.6379H47.0308L46.9799 22.9305L43.2725 22.8796V26.6379ZM39.2835 7.86615C39.2305 7.86615 38.607 8.44744 37.8978 9.15794L36.6086 10.4497L39.2374 13.0736L41.9098 10.4012L40.6449 9.1337C39.9493 8.43664 39.3368 7.86636 39.2835 7.86615ZM7.88768 10.4497L9.17956 11.739C9.88994 12.4481 10.5135 13.0283 10.5653 13.0284C10.6878 13.0284 13.1434 10.5681 13.1439 10.4448C13.1439 10.3932 12.5626 9.77071 11.8521 9.06161L10.5603 7.7723L7.88768 10.4497ZM24.8263 2.61009C23.4219 2.61009 22.9824 2.63824 22.947 2.7304C22.9216 2.79657 22.9123 3.63083 22.9265 4.58415L22.9521 6.31749L26.6595 6.36837V2.61009H24.8263Z"
              fill={chipColor}
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_di"
            x="0.943359"
            y="0.770508"
            width="48.0566"
            height="50.2295"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0.141176 0 0 0 0 0.313726 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
          </filter>
          <filter
            id="filter1_i"
            x="0.943359"
            y="0.770508"
            width="47.9551"
            height="48"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
            />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
          </filter>
        </defs>
      </svg>

      {/* Chip text */}
      <div className="absolute inset-0 flex items-center justify-center ">
        <span
          className={cn(
            'font-montserrat font-bold text-white  flex justify-center items-center leading-none',
            typeof value === 'string' && value.length > 3
              ? 'text-[10px] px-1'
              : 'text-lg'
          )}
          style={{
            WebkitTextStroke:
              typeof value === 'string' && value.length > 3
                ? '0.5px var(--chip-navy)'
                : undefined,
          }}
        >
          {value}
        </span>
      </div>
    </div>
  )
}
