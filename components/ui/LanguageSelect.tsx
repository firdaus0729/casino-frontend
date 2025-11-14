import { useState, useRef, useEffect } from 'react'
import { Search } from 'lucide-react'

export interface Language {
  code: string
  name: string
  flag: string
}

export const languages: Language[] = [
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ua', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'br', name: 'Português (BR)', flag: '🇧🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
]

interface LanguageSelectProps {
  open?: boolean
  onRequestClose?: () => void
  triggerless?: boolean
  inline?: boolean
  value?: Language | null
  onChange?: (lang: Language) => void
}

export default function LanguageDropdown({
  open,
  onRequestClose,
  triggerless,
  inline,
  value,
  onChange,
}: LanguageSelectProps) {
  const isControlled = typeof open === 'boolean'
  const [isOpenState, setIsOpenState] = useState(false)
  const isOpen = isControlled ? (open as boolean) : isOpenState
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    value || languages[6]
  ) // Default to Chinese
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollThumbRef = useRef<HTMLDivElement>(null)

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calculate scroll thumb position and size
  const scrollRatio = clientHeight / scrollHeight
  const scrollThumbHeight = Math.max(scrollRatio * 100, 20) // Minimum thumb height
  const scrollThumbTop =
    (scrollTop / (scrollHeight - clientHeight)) * (100 - scrollThumbHeight)

  const updateScrollMetrics = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current
      setScrollTop(scrollTop)
      setScrollHeight(scrollHeight)
      setClientHeight(clientHeight)
    }
  }

  const handleScroll = () => {
    updateScrollMetrics()
  }

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    const startY = e.clientY
    const startTop = scrollTop

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY
      const scrollContainer = scrollContainerRef.current
      if (scrollContainer) {
        const maxScroll = scrollHeight - clientHeight
        const scrollRatio = deltaY / (100 - scrollThumbHeight)
        const newScrollTop = Math.max(
          0,
          Math.min(maxScroll, startTop + scrollRatio * maxScroll)
        )
        scrollContainer.scrollTop = newScrollTop
      }
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleTrackClick = (e: React.MouseEvent) => {
    const scrollContainer = scrollContainerRef.current
    const scrollTrack = e.currentTarget
    if (scrollContainer && scrollTrack) {
      const rect = scrollTrack.getBoundingClientRect()
      const clickY = e.clientY - rect.top
      const trackHeight = rect.height
      const scrollRatio = clickY / trackHeight
      const maxScroll = scrollHeight - clientHeight
      scrollContainer.scrollTop = scrollRatio * maxScroll
    }
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      updateScrollMetrics()
      scrollContainer.addEventListener('scroll', handleScroll)
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [filteredLanguages])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isControlled) {
          onRequestClose && onRequestClose()
        } else {
          setIsOpenState(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isControlled, onRequestClose])

  const FlagComponent = ({ code, name }: { code: string; name: string }) => {
    switch (code) {
      case 'de':
        return (
          <svg
            width="24"
            height="18"
            viewBox="0 0 24 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_de)">
              <path d="M0 12H24V18H0V12Z" fill="#FFCE00" />
              <path d="M0 0H24V6H0V0Z" fill="black" />
              <path d="M0 6H24V12H0V6Z" fill="#DD0000" />
            </g>
            <defs>
              <clipPath id="clip0_de">
                <rect width="24" height="18" rx="4" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )
      case 'pl':
        return (
          <svg
            width="24"
            height="18"
            viewBox="0 0 24 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_pl)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 18H0V0H24V18Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 18H0V9H24V18Z"
                fill="#DC143C"
              />
            </g>
            <defs>
              <clipPath id="clip0_pl">
                <rect width="24" height="18" rx="4" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )
      case 'pt':
        return (
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/66de423489519396011389fd3ef2bc92f4a166d2?width=48"
            alt="Portugal flag"
            className="w-6 h-[18px] aspect-[4/3] rounded"
          />
        )
      case 'ua':
        return (
          <svg
            width="24"
            height="18"
            viewBox="0 0 24 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_ua)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0H24V18H0V0Z"
                fill="#FFD700"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0H24V9H0V0Z"
                fill="#0057B8"
              />
            </g>
            <defs>
              <clipPath id="clip0_ua">
                <rect width="24" height="18" rx="4" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )
      case 'es':
        return (
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/4617f2553722a80a1a3ec1108536d85b409ead73?width=48"
            alt="Spain flag"
            className="w-6 h-[18px] aspect-[4/3]"
          />
        )
      case 'br':
        return (
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/bad7e8606b2aed3047fd250a48eb1cb58eafef8d?width=48"
            alt="Brazil flag"
            className="w-6 h-[18px] aspect-[4/3] rounded"
          />
        )
      case 'zh':
        return (
          <svg
            width="24"
            height="18"
            viewBox="0 0 24 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_cn)">
              <path d="M0 0H24V18H0V0Z" fill="#EE1C25" />
              <path
                d="M2.87979 6.65999L4.49977 1.79999L6.11975 6.65999L1.7998 3.68999H7.19974L2.87979 6.65999Z"
                fill="#FFFF00"
              />
              <path
                d="M9.90673 1.89314L8.23956 2.26259L9.35162 0.966717L9.24255 2.71079L8.31738 1.16676L9.90673 1.89314Z"
                fill="#FFFF00"
              />
              <path
                d="M11.5891 4.02553L9.90917 3.71947L11.4368 2.95633L10.6598 4.5216L10.4059 2.7396L11.5891 4.02553Z"
                fill="#FFFF00"
              />
              <path
                d="M11.344 7.01717L9.93497 6.05254L11.641 5.9788L10.2932 7.09108L10.7881 5.36046L11.344 7.01717Z"
                fill="#FFFF00"
              />
              <path
                d="M9.22497 8.97153L8.29782 7.53753L9.89993 8.12843L8.22715 8.63384L9.35209 7.22868L9.22497 8.97153Z"
                fill="#FFFF00"
              />
            </g>
            <defs>
              <clipPath id="clip0_cn">
                <rect width="24" height="18" rx="4" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )
      case 'fr':
        return (
          <svg
            width="24"
            height="18"
            viewBox="0 0 24 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_fr)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0H24V18H0V0Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0H7.99875V18H0V0Z"
                fill="#002654"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.001 0H23.9997V18H16.001V0Z"
                fill="#CE1126"
              />
            </g>
            <defs>
              <clipPath id="clip0_fr">
                <rect width="24" height="18" rx="4" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )
      default:
        return <span className="text-lg">{name.slice(0, 2)}</span>
    }
  }

  useEffect(() => {
    if (value) {
      setSelectedLanguage(value)
    }
  }, [value])

  return (
    <div className="relative right-[272px]" ref={dropdownRef}>
      {/* Trigger Button (optional) */}
      {!triggerless && (
        <div
          onClick={() => setIsOpenState(!isOpen)}
          className="flex items-center gap-3 px-4 py-3 bg-[#111923]/90 border border-white/13 rounded-xl backdrop-blur-[32px] hover:bg-[#111923]/95 transition-colors"
        >
          <FlagComponent
            code={selectedLanguage.code}
            name={selectedLanguage.name}
          />
          <span className="text-[#55657E] font-medium text-sm font-montserrat">
            {selectedLanguage.name}
          </span>
          <svg
            className={`w-4 h-4 text-[#55657E] transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`${
            inline ? 'static' : 'absolute top-full left-0 mt-2'
          } w-[280px] p-4 rounded-[14px] border border-white/13 bg-[#111923]/90 backdrop-blur-[32px] z-50`}
        >
          <div className="flex gap-2">
            <div className="flex flex-col gap-2 flex-1">
              {/* Search */}
              <div className="flex items-center h-12 px-3 bg-[#0D131C] border border-[#55657E] rounded-lg">
                <Search
                  className="w-6 h-6 text-[#55657E] mr-4"
                  strokeWidth={2}
                />
                <input
                  type="text"
                  placeholder="Default"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-[#55657E] placeholder-[#55657E] font-montserrat text-sm font-normal outline-none"
                />
              </div>

              {/* Language Options - Custom scrollbar hidden */}
              <div
                ref={scrollContainerRef}
                className="max-h-[300px] overflow-y-auto pr-2 scrollbar-hidden"
                onScroll={handleScroll}
              >
                {filteredLanguages.map(lang => (
                  <div
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang)
                      onChange && onChange(lang)
                      if (isControlled) {
                        onRequestClose && onRequestClose()
                      } else {
                        setIsOpenState(false)
                      }
                      setSearchQuery('')
                    }}
                    className={`flex items-center gap-4 w-full h-12 px-3 rounded-lg transition-colors mb-1 ${
                      lang.code === 'zh'
                        ? 'bg-white/[0.04]'
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <FlagComponent code={lang.code} name={lang.name} />
                    <span
                      className={`font-montserrat text-sm font-bold truncate ${
                        lang.code === 'zh' ? 'text-[#93ACD3]' : 'text-[#55657E]'
                      }`}
                    >
                      {lang.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Scroll Indicator - Figma Style */}
            {scrollHeight > clientHeight && (
              <div
                className="w-2 h-[300px] flex flex-col relative cursor-pointer"
                onClick={handleTrackClick}
              >
                {/* Scroll Track */}
                <div className="w-2 h-full bg-transparent relative">
                  {/* Scroll Thumb */}
                  <div
                    ref={scrollThumbRef}
                    className="w-2 bg-[#2A3546] rounded cursor-grab active:cursor-grabbing hover:bg-[#3a4556] transition-colors"
                    style={{
                      height: `${Math.max(scrollThumbHeight, 30)}px`,
                      transform: `translateY(${scrollThumbTop * 3}px)`,
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                    onMouseDown={handleThumbMouseDown}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
