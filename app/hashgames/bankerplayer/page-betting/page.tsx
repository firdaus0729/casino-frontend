'use client'

import React, { useState, useEffect, useCallback } from 'react'
import PageBettingLayout from '@/components/hashgames/PageBettingLayout'
import { User } from '@/components/ui/icons'
import useAuthGuard from '@/hooks/useAuthGuard'
import { useToast } from '@/context/ToastProvider'
import { apiService } from '@/lib/api'
import { useAppSelector } from '@/store/hooks'
import { Check } from 'lucide-react'
import { PokerChip } from '@/components/ui/chipSelector/PokerChip'

type BetType = 'banker' | 'tie' | 'player' | null

interface BettingOption {
  type: BetType
  color: string
  ratio: string
  percent: number
  totalAmount: number
  playerCount: number
  userBet: number
}

const BankerPlayerBettingPage: React.FC = () => {
  const { isAuthenticated } = useAuthGuard()
  const { showSuccess, showError, showWarning } = useToast()
  const { token } = useAppSelector(state => state.auth)
  
  // State management
  const [selectedBetType, setSelectedBetType] = useState<BetType>(null)
  const [selectedChip, setSelectedChip] = useState<number>(1)
  const [betAmount, setBetAmount] = useState<number>(0)
  const [isPlacingBet, setIsPlacingBet] = useState(false)
  const [bettingOptions, setBettingOptions] = useState<BettingOption[]>([
    { type: 'banker', color: 'crimson', ratio: '1 : 1.95', percent: 100, totalAmount: 7592, playerCount: 11, userBet: 0 },
    { type: 'tie', color: 'malachite', ratio: '1 : 8', percent: 0, totalAmount: 7592, playerCount: 11, userBet: 0 },
    { type: 'player', color: 'yellow-orange', ratio: '1 : 1.95', percent: 0, totalAmount: 7592, playerCount: 11, userBet: 0 },
  ])
  const [currentBlock, setCurrentBlock] = useState<number>(73852830)
  const [nextBlock, setNextBlock] = useState<number>(73872867)

  // No need to fetch wallet balance - betting works without balance

  // Handle chip selection from global chip selector
  useEffect(() => {
    const handleChipSelect = (event: CustomEvent) => {
      const chipValue = event.detail?.value
      if (chipValue && typeof chipValue === 'number') {
        setSelectedChip(chipValue)
        if (selectedBetType) {
          setBetAmount(chipValue)
        }
      }
    }

    window.addEventListener('chipSelected' as any, handleChipSelect as EventListener)
    return () => {
      window.removeEventListener('chipSelected' as any, handleChipSelect as EventListener)
    }
  }, [selectedBetType])

  // Handle bet type selection
  const handleBetTypeClick = (type: BetType) => {
    if (!isAuthenticated) {
      showError('Error', 'Please log in to place a bet')
      return
    }

    setSelectedBetType(type)
    if (selectedChip > 0) {
      setBetAmount(selectedChip)
    }
  }

  // Handle chip click (direct from chips)
  const handleChipClick = (value: number) => {
    setSelectedChip(value)
    if (selectedBetType) {
      setBetAmount(value)
    }
  }

  // Handle confirm bet
  const handleConfirmBet = async () => {
    if (!isAuthenticated) {
      showError('Error', 'Please log in to place a bet')
      return
    }

    if (!selectedBetType) {
      showWarning('Warning', 'Please select BANKER, TIE, or PLAYER')
      return
    }

    if (betAmount <= 0) {
      showWarning('Warning', 'Please select a bet amount')
      return
    }

    // No balance check - allow betting with $0 balance
    // Bets are recorded and wins/losses are tracked, but balance is not modified

    setIsPlacingBet(true)

    try {
      // Banker/Player game uses: game: 4
      // Bet types: 1 = BANKER, 2 = PLAYER, 3 = TIE
      const betTypeMap: Record<Exclude<BetType, null>, number> = {
        banker: 1,
        player: 2,
        tie: 3,
      }
      
      // Type guard: selectedBetType is guaranteed to be non-null here due to check above
      const betType = selectedBetType as Exclude<BetType, null>
      
      const response = await apiService.placeBet({
        game: 4, // Banker/Player game
        amount: betAmount,
        currency: 'USD',
        type: betTypeMap[betType],
      })

      // Update betting options UI
      setBettingOptions(prev => prev.map(option => {
        if (option.type === selectedBetType) {
          return {
            ...option,
            userBet: option.userBet + betAmount,
            totalAmount: option.totalAmount + betAmount,
            playerCount: option.playerCount + 1,
          }
        }
        return option
      }))

      showSuccess('Success', `Bet placed successfully on ${betType.toUpperCase()}!`)
      
      // Reset selection
      setSelectedBetType(null)
      setBetAmount(0)
    } catch (error: any) {
      const errorMessage = error?.message || error?.response?.data?.message || 'Failed to place bet'
      showError('Error', errorMessage)
    } finally {
      setIsPlacingBet(false)
    }
  }


  // Chips data
  const chips: Array<{
    id: string
    value: number
    color: 'blue' | 'purple' | 'green' | 'navy' | 'red' | 'orange' | 'gold' | 'brown' | 'lightblue'
  }> = [
    { id: '1', value: 1, color: 'blue' },
    { id: '5', value: 5, color: 'purple' },
    { id: '10', value: 10, color: 'green' },
    { id: '50', value: 50, color: 'navy' },
    { id: '100', value: 100, color: 'red' },
  ]

  return (
    <PageBettingLayout>
      <div className="flex p-2 items-start gap-4 w-full rounded-xl bg-white/[0.04]">
        {/* Betting Columns */}
        {bettingOptions.map(item => {
          const isSelected = selectedBetType === item.type
          return (
            <div
              key={item.type}
              onClick={() => handleBetTypeClick(item.type)}
              className={`flex flex-col items-center gap-8 flex-1 cursor-pointer transition-all ${
                isSelected ? 'ring-2 ring-dodger-blue rounded-lg p-2' : ''
              }`}
            >
              <div className="flex justify-around sm:justify-center items-center w-full gap-1">
                {/* Progress Circle */}
                <div className="relative w-10 h-10">
                  <svg
                    className="w-10 h-10 transform -rotate-90"
                    viewBox="0 0 40 40"
                  >
                    <circle
                      cx="20"
                      cy="20"
                      r="18"
                      stroke="rgba(255,255,255,0.13)"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="18"
                      stroke={item.color}
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${item.percent * 1.13} ${
                        (100 - item.percent) * 1.13
                      }`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-xs font-bold text-${item.color}`}>
                      {item.percent}%
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-base font-bold text-right">
                    <span className="text-casper">$</span>
                    <span className="text-white">{item.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-casper" />
                    <span className="text-sm font-bold text-casper">{item.playerCount}</span>
                  </div>
                </div>
              </div>
              
              {/* User Bet Amount */}
              <div className="flex h-9 px-4 justify-center items-center gap-2 rounded-lg border border-white/[0.08] bg-mirage shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-[32px]">
                <span className="text-sm font-bold text-white">
                  ${item.userBet.toFixed(2)}
                </span>
                {isSelected && (
                  <Check className="w-4 h-4 text-dodger-blue" />
                )}
              </div>
              
              {/* Bet Type Label */}
              <div className={`text-lg font-bold text-${item.color}`}>
                {item.type?.toUpperCase() || ''}
              </div>
              
              {/* Odds */}
              <div className="flex h-9 px-4 justify-center items-center gap-2 rounded-lg border border-white/[0.08] bg-mirage shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-[32px]">
                <span className="text-sm font-bold text-white">{item.ratio}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Simple Betting Controls - Chips and Confirm */}
      <div className="flex justify-center items-end gap-4 p-8 w-full rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
        {chips.map(chip => (
          <PokerChip
            key={chip.id}
            value={chip.value}
            color={chip.color}
            isSelected={selectedChip === chip.value}
            onClick={() => handleChipClick(chip.value)}
          />
        ))}
        <button
          onClick={handleConfirmBet}
          disabled={!selectedBetType || betAmount <= 0 || isPlacingBet}
          className={`px-6 py-2 rounded-lg font-bold text-white transition-all ${
            selectedBetType && betAmount > 0 && !isPlacingBet
              ? 'bg-dodger-blue hover:bg-blue-600 cursor-pointer'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isPlacingBet ? 'Placing...' : 'Confirm'}
        </button>
      </div>
    </PageBettingLayout>
  )
}

export default BankerPlayerBettingPage
