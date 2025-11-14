'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import CasinoCard from '@/components/ui/cards/CasinoCard'
import { useI18n } from '@/context/I18nProvider'
import { createPortal } from 'react-dom'

// Mock game data for favorites
const gameImages = [
  'https://api.builder.io/api/v1/image/assets/TEMP/a79278fafd9b48c78c8388123f81620317fe8d54?width=230',
  'https://api.builder.io/api/v1/image/assets/TEMP/8b925652b70e2da887252313faf53f95f3a960e8?width=230',
  'https://api.builder.io/api/v1/image/assets/TEMP/e791e1fa9f325156debd5ac895252c60b3b371c2?width=230',
]

const favoritesGames = [
  {
    id: 101,
    title: 'HUNTRESS WILD VENGEANCE',
    provider: 'PRINT STUDIOS',
    image: gameImages[0],
    badge: 'NEW',
  },
  {
    id: 102,
    title: 'SPEED BACCARAT',
    provider: 'DBLIVE',
    image: gameImages[1],
    badge: 'HOT',
  },
  {
    id: 103,
    title: 'LIGHTNING ROULETTE',
    provider: 'EVOLUTION',
    image: gameImages[2],
    badge: 'NEW',
  },
  {
    id: 104,
    title: 'MEGA MONEY WHEEL',
    provider: 'EVOLUTION',
    image: gameImages[0],
    badge: 'HOT',
  },
  {
    id: 105,
    title: 'BLACKJACK LIVE',
    provider: 'EVOLUTION',
    image: gameImages[1],
    badge: 'NEW',
  },
  {
    id: 106,
    title: 'IMMERSIVE ROULETTE',
    provider: 'EVOLUTION',
    image: gameImages[2],
    badge: 'HOT',
  },
  {
    id: 107,
    title: "GONZO'S QUEST",
    provider: 'NETENT',
    image: gameImages[0],
    badge: 'NEW',
  },
  {
    id: 108,
    title: 'STARBURST',
    provider: 'NETENT',
    image: gameImages[1],
    badge: 'HOT',
  },
]

export default function FavoritesPage() {
  const { t } = useI18n()
  const gameProviders = [
    { id: 'all', label: t('games.allProviders') },
    { id: 'pragmatic', label: 'Pragmatic Play' },
    { id: 'netent', label: 'NetEnt' },
    { id: 'playngo', label: "Play'n GO" },
    { id: 'evolution', label: 'Evolution' },
  ]

  const gameTypes = [
    { id: 'all', label: t('app.allTypes') },
    { id: 'new', label: t('games.new') },
    { id: 'hot', label: t('games.hot') },
    { id: 'featured', label: t('games.featured') },
    { id: 'exclusive', label: t('games.exclusive') },
  ]
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProvider, setSelectedProvider] = useState(gameProviders[0])
  const [selectedType, setSelectedType] = useState(gameTypes[0])
  const [isProviderOpen, setIsProviderOpen] = useState(false)
  const [isTypeOpen, setIsTypeOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  })
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const providerRef = useRef<HTMLDivElement>(null)
  const typeRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        providerRef.current &&
        !providerRef.current.contains(event.target as Node)
      ) {
        setIsProviderOpen(false)
        setActiveDropdown(null)
      }
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) {
        setIsTypeOpen(false)
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Filter games based on search term and filters
  const filteredGames = favoritesGames.filter(game => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.provider.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesProvider =
      selectedProvider.id === 'all' ||
      game.provider.toLowerCase().includes(selectedProvider.id.toLowerCase())

    const matchesType =
      selectedType.id === 'all' ||
      game.badge?.toLowerCase() === selectedType.id.toLowerCase()

    return matchesSearch && matchesProvider && matchesType
  })

  return (
    <div className="max-w-7xl p-2 m-auto">
      {/* Header */}
      <div className="bg-[#111923]/54 backdrop-blur-[2rem] border-b border-gray-700 py-4">
        <div className="mx-auto">
          <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-red-500">❤️</span>
            <span className="text-white">{t('games.favorites')}</span>
          </h1>

          {/* Search and filters */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row items-start gap-3 w-full">
              {/* Search Input */}
              <div className="flex items-center gap-2 flex-1 w-full px-4 py-3 rounded-lg border border-gray-600 bg-transparent">
                <Search className="h-6 w-6 text-white stroke-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder={t('app.favoritesPlaceholder')}
                  className="flex-1 bg-transparent text-gray-300 text-sm font-medium font-montserrat placeholder:text-gray-400 border-none outline-none min-w-0"
                />
              </div>

              {/* Dropdowns */}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                {/* Game Provider Dropdown */}
                <div ref={providerRef} className="relative">
                  <div
                    onClick={() => {
                      if (providerRef.current) {
                        const rect = providerRef.current.getBoundingClientRect()
                        setDropdownPosition({
                          top: rect.bottom + window.scrollY + 4,
                          left: rect.left + window.scrollX,
                          width: rect.width,
                        })
                        setActiveDropdown('provider')
                        setIsProviderOpen(!isProviderOpen)
                      }
                    }}
                    className="flex items-center justify-between w-full sm:w-[180px] h-12 px-4 rounded-lg bg-white-8 hover:bg-white/12 transition-colors cursor-pointer"
                  >
                    <span className="text-gray-300 text-sm font-bold font-montserrat hover:text-white transition-colors">
                      {selectedProvider.label}
                    </span>
                    <ChevronDown
                      className={`h-6 w-6 text-white stroke-gray-400 transition-transform ${
                        isProviderOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Game Type Dropdown */}
                <div ref={typeRef} className="relative">
                  <div
                    onClick={() => {
                      if (typeRef.current) {
                        const rect = typeRef.current.getBoundingClientRect()
                        setDropdownPosition({
                          top: rect.bottom + window.scrollY + 4,
                          left: rect.left + window.scrollX,
                          width: rect.width,
                        })
                        setActiveDropdown('type')
                        setIsTypeOpen(!isTypeOpen)
                      }
                    }}
                    className="flex items-center justify-between w-full sm:w-[150px] h-12 px-4 rounded-lg bg-white-8 hover:bg-white/12 transition-colors cursor-pointer"
                  >
                    <span className="text-gray-300 text-sm font-bold font-montserrat hover:text-white transition-colors">
                      {selectedType.label}
                    </span>
                    <ChevronDown
                      className={`h-6 w-6 text-white stroke-gray-400 transition-transform ${
                        isTypeOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-4">
        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-400">
            {filteredGames.length}{' '}
            {filteredGames.length === 1 ? 'game' : 'games'} found
          </p>
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredGames.map(game => (
              <CasinoCard key={game.id} {...game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold mb-2">No favorites found</h3>
            <p className="text-gray-400">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Start adding games to your favorites!'}
            </p>
          </div>
        )}
      </div>

      {/* Portal-based Dropdown */}
      {(isProviderOpen || isTypeOpen) &&
        typeof window !== 'undefined' &&
        createPortal(
          <div
            className="fixed bg-[rgba(17,25,35,0.95)] border border-white-8 rounded-lg backdrop-blur-[32px] shadow-lg"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
              zIndex: 99999,
            }}
          >
            {activeDropdown === 'provider' &&
              gameProviders.map(provider => (
                <div
                  key={provider.id}
                  onClick={() => {
                    setSelectedProvider(provider)
                    setIsProviderOpen(false)
                    setActiveDropdown(null)
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-white-8 transition-colors cursor-pointer ${
                    selectedProvider.id === provider.id ? 'bg-blue-500/20' : ''
                  }`}
                >
                  <span className="text-gray-300 text-sm font-medium font-montserrat">
                    {provider.label}
                  </span>
                </div>
              ))}
            {activeDropdown === 'type' &&
              gameTypes.map(type => (
                <div
                  key={type.id}
                  onClick={() => {
                    setSelectedType(type)
                    setIsTypeOpen(false)
                    setActiveDropdown(null)
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-white-8 transition-colors cursor-pointer ${
                    selectedType.id === type.id ? 'bg-blue-500/20' : ''
                  }`}
                >
                  <span className="text-gray-300 text-sm font-medium font-montserrat">
                    {type.label}
                  </span>
                </div>
              ))}
          </div>,
          document.body
        )}
    </div>
  )
}
