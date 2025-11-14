'use client'

import React, { useState, useEffect, useCallback } from 'react'
import PageBettingLayout from '@/components/hashgames/PageBettingLayout'
import { User } from '@/components/ui/icons'
import useAuthGuard from '@/hooks/useAuthGuard'
import { useToast } from '@/context/ToastProvider'
import { apiService } from '@/lib/api'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { fetchWalletInfo } from '@/store/slices/walletSlice'
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
  const dispatch = useAppDispatch()
  const { token } = useAppSelector(state => state.auth)
  const { balances, isLoading: walletLoading } = useAppSelector(state => state.wallet)
  
  // Get USD balance
  const usdBalance = balances.find(b => b.currency?.toUpperCase() === 'USD')?.amount || 0
  const displayBalance = typeof usdBalance === 'number' && Number.isFinite(usdBalance) ? usdBalance : 0
  
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
  const [pendingBets, setPendingBets] = useState<Array<{ type: BetType; amount: number }>>([])
  const [currentBlock, setCurrentBlock] = useState<number>(73852830)
  const [nextBlock, setNextBlock] = useState<number>(73872867)

  // Fetch wallet balance on mount
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWalletInfo())
    }
  }, [isAuthenticated, dispatch])

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

    // Check if user has sufficient balance
    if (displayBalance < betAmount) {
      showError('Error', `Insufficient balance. Your balance is $${displayBalance.toFixed(2)}`)
      return
    }

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

      // Add to pending bets
      setPendingBets(prev => [...prev, { type: selectedBetType, amount: betAmount }])

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
      
      // Refresh wallet balance after successful bet
      await dispatch(fetchWalletInfo())
      
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

  // Handle undo (remove last pending bet)
  const handleUndo = () => {
    if (pendingBets.length === 0) return

    const lastBet = pendingBets[pendingBets.length - 1]
    setPendingBets(prev => prev.slice(0, -1))

    // Update betting options
    setBettingOptions(prev => prev.map(option => {
      if (option.type === lastBet.type) {
        return {
          ...option,
          userBet: Math.max(0, option.userBet - lastBet.amount),
          totalAmount: Math.max(0, option.totalAmount - lastBet.amount),
          playerCount: Math.max(0, option.playerCount - 1),
        }
      }
      return option
    }))

    showSuccess('Success', 'Last bet undone')
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

      {/* Custom Chip Selector and Controls */}
      <div className="flex justify-center items-center w-full mt-4">
        <div
          className="flex items-end gap-4 p-8 w-full rounded-xl"
          style={{ background: 'rgba(255, 255, 255, 0.04)' }}
        >
          {/* Undo button section */}
          <div className="flex flex-col justify-center items-end gap-1 flex-1 min-w-0 px-4">
            <button
              onClick={handleUndo}
              disabled={pendingBets.length === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-montserrat font-bold text-xs transition-colors ${
                pendingBets.length > 0
                  ? 'text-chip-casper hover:text-white cursor-pointer'
                  : 'text-chip-casper/50 cursor-not-allowed'
              }`}
              style={{ background: 'rgba(0, 0, 0, 0.54)' }}
            >
              Undo
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 10H15C17.21 10 19 11.79 19 14C19 16.21 17.21 18 15 18H12V20H15C18.31 20 21 17.31 21 14C21 10.69 18.31 8 15 8H9V4L3 9L9 14V10Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          {/* Chips section */}
          <div className="flex items-center gap-4">
            {chips.map(chip => (
              <PokerChip
                key={chip.id}
                value={chip.value}
                color={chip.color}
                isSelected={selectedChip === chip.value}
                onClick={() => handleChipClick(chip.value)}
              />
            ))}
          </div>

          {/* Confirm button section */}
          <div className="flex flex-col justify-center items-start gap-1 flex-1 min-w-0 px-4">
            <button
              onClick={handleConfirmBet}
              disabled={!selectedBetType || betAmount <= 0 || isPlacingBet}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-montserrat font-bold text-xs transition-all ${
                selectedBetType && betAmount > 0 && !isPlacingBet
                  ? 'text-white hover:bg-dodger-blue cursor-pointer'
                  : 'text-chip-casper/50 cursor-not-allowed'
              }`}
              style={{ background: 'rgba(0, 0, 0, 0.54)' }}
            >
              {isPlacingBet ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Placing...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Confirm
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Balance Display */}
      <div className="text-center mt-4 mb-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.08]">
          <span className="text-sm text-casper">Balance:</span>
          <span className="text-lg font-bold text-dodger-blue">
            ${displayBalance.toFixed(2)}
          </span>
          {walletLoading && (
            <div className="w-4 h-4 border-2 border-dodger-blue border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      </div>

      {/* Bet Amount Display */}
      {selectedBetType && betAmount > 0 && (
        <div className="text-center mt-2">
          <p className="text-sm text-casper">
            Selected: <span className="text-white font-bold">{selectedBetType.toUpperCase()}</span> - 
            Amount: <span className="text-dodger-blue font-bold">${betAmount}</span>
            {displayBalance < betAmount && (
              <span className="text-red-500 ml-2">(Insufficient balance)</span>
            )}
          </p>
        </div>
      )}
    </PageBettingLayout>
  )
}

export default BankerPlayerBettingPage
