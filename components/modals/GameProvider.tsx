'use client'
import { useState, useEffect } from 'react'
import { X, Trash2 } from 'lucide-react'

interface GamingProvider {
  id: string
  name: string
  count: number
  logo: string
  checked: boolean
}

const initialProviders: GamingProvider[] = [
  {
    id: 'cfg-gaming',
    name: 'CFG Gaming',
    count: 297,
    logo: 'https://api.builder.io/api/v1/image/assets/TEMP/f5cddd5e413250c1b4108d93f9a58ee79d3613ee?width=108',
    checked: true,
  },
  {
    id: 'pg-soft',
    name: 'PG Soft',
    count: 129,
    logo: 'https://api.builder.io/api/v1/image/assets/TEMP/2441d1a9cebe9554dc6f40951363cd68af84ceb1?width=108',
    checked: false,
  },
  {
    id: 'pragmatic-play',
    name: 'Pragmatic Play',
    count: 551,
    logo: 'https://api.builder.io/api/v1/image/assets/TEMP/c0f04498efc865d8cfe3d934552aa370b395e138?width=108',
    checked: false,
  },
  {
    id: 'bgaming',
    name: 'BGaming',
    count: 129,
    logo: 'https://api.builder.io/api/v1/image/assets/TEMP/1a4110961d408c5298340052d64be825e594a0bd?width=108',
    checked: false,
  },
  {
    id: 'jill',
    name: 'JILL',
    count: 124,
    logo: 'https://api.builder.io/api/v1/image/assets/TEMP/0d89b875251cda838d9ac9a5ad8e0e9b708560a1?width=108',
    checked: false,
  },
  {
    id: 'cq9',
    name: 'CQ9',
    count: 297,
    logo: 'https://api.builder.io/api/v1/image/assets/TEMP/e9acc5d701fd6d1fb82c90ff356e4ea7b32dee24?width=108',
    checked: true,
  },
  {
    id: 'funky-games',
    name: 'Funky_Games',
    count: 551,
    logo: 'https://api.builder.io/api/v1/image/assets/TEMP/909890790c4d3c0ec4384c4aba06ea79a87165d5?width=108',
    checked: false,
  },
  {
    id: 'playstar',
    name: 'PlayStar',
    count: 124,
    logo: 'https://api.builder.io/api/v1/image/assets/TEMP/06c3847cbf84c746eccb9348271bc3b72889f412?width=108',
    checked: false,
  },
  {
    id: 'jdb',
    name: 'JDB',
    count: 129,
    logo: 'https://api.builder.io/api/v1/image/assets/TEMP/3c89dce11f60d32c0ec657921d74b894fed778bd?width=108',
    checked: false,
  },
  {
    id: 'hacksaw',
    name: 'Hacksaw',
    count: 124,
    logo: 'https://api.builder.io/api/v1/image/assets/TEMP/7c3d073e5c59e5e693473d45145fd3c91c0fd331?width=108',
    checked: false,
  },
  {
    id: 'playngo',
    name: 'PlaynGo',
    count: 551,
    logo: 'https://api.builder.io/api/v1/image/assets/TEMP/1f6873f55e355edd5469d88f542177be047614c6?width=108',
    checked: false,
  },
]

interface GamingProviderModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function GamingProviderModal({
  isOpen,
  onClose,
}: GamingProviderModalProps) {
  const [providers, setProviders] = useState<GamingProvider[]>(initialProviders)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  const toggleProvider = (id: string) => {
    setProviders(prev =>
      prev.map(provider =>
        provider.id === id
          ? { ...provider, checked: !provider.checked }
          : provider
      )
    )
  }

  const clearAll = () => {
    setProviders(prev =>
      prev.map(provider => ({ ...provider, checked: false }))
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-end lg:items-center justify-center z-[9999]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`lg:relative w-[100vw] max-w-md transition-transform  duration-300 ease-out bg-black/60 ${
          isVisible ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 rounded-t-[14px] bg-gradient-to-b from-[#002554] to-gaming-mirage-54 p-4 pl-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16)] backdrop-blur-[32px]">
          <h2
            className="text-lg font-bold text-white"
            style={{
              fontFamily:
                'Montserrat, -apple-system, Roboto, Helvetica, sans-serif',
            }}
          >
            Choose
          </h2>
          <div
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gaming-white-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16)] backdrop-blur-[32px] transition-colors hover:bg-gaming-white-8 cursor-pointer"
          >
            <X className="h-4 w-4 text-[#A7B5CA]" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 bg-gaming-mirage-54 p-6 backdrop-blur-[3rem] max-h-[60dvh] lg:max-h-none overflow-y-auto">
          {providers.map(provider => (
            <div
              key={provider.id}
              className={`flex h-[50px] items-center gap-2 rounded-xl px-2 pl-2 ${
                provider.checked ? 'bg-gaming-white-4' : ''
              }`}
            >
              {/* Checkbox */}
              <div
                onClick={() => toggleProvider(provider.id)}
                className="flex items-center"
              >
                {provider.checked ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded border-2 border-[#2283F6] bg-[#2283F6]">
                    <svg width="25" height="24" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4 8L7 11L12 5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="h-6 w-6 rounded border-2 border-[#55657E]" />
                )}
              </div>

              {/* Provider Info */}
              <div className="flex flex-1 items-center gap-2 pl-3">
                <span
                  className="flex-1 text-sm font-bold text-white"
                  style={{
                    fontFamily:
                      'Montserrat, -apple-system, Roboto, Helvetica, sans-serif',
                  }}
                >
                  {provider.name}
                </span>

                {/* Count Badge */}
                <div className="flex h-[19px] items-center justify-center rounded bg-gaming-mirage px-2 backdrop-blur-[32px]">
                  <span
                    className="text-xs font-bold text-[#A7B5CA]"
                    style={{
                      fontFamily:
                        'Montserrat, -apple-system, Roboto, Helvetica, sans-serif',
                    }}
                  >
                    {provider.count}
                  </span>
                </div>
              </div>

              {/* Logo */}
              <img
                src={provider.logo}
                alt={provider.name}
                className="h-9 w-[54px] object-contain"
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 rounded-b-[14px] border-gaming-white-8 bg-gaming-mirage-54 p-4 backdrop-blur-[32px]">
          <div
            onClick={clearAll}
            className="flex items-center gap-2 rounded-lg px-4 py-2 transition-colors hover:bg-gaming-white-4"
          >
            <span
              className="text-sm font-bold text-[#A7B5CA]"
              style={{
                fontFamily:
                  'Montserrat, -apple-system, Roboto, Helvetica, sans-serif',
              }}
            >
              Clear All
            </span>
            <Trash2 className="h-6 w-6 text-[#A7B5CA]" />
          </div>
        </div>
      </div>
    </div>
  )
}
