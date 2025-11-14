'use client'

import React, { useState, useEffect } from 'react'
import PageBettingLayout from '@/components/hashgames/PageBettingLayout'
import { User, Copy, Check, ExternalLink } from 'lucide-react'
import { useI18n } from '@/context/I18nProvider'
import useAuthGuard from '@/hooks/useAuthGuard'
import { getCurrentRound, placeBet, getRoundResult } from '@/lib/api'
import { ResponsiveChipSelector } from '@/components/ui/chipSelector/ResponsiveChipSelector'
import FairnessVerificationModal from '@/components/hashgames/FairnessVerificationModal'
import { cn } from '@/lib/utils'

interface RoundInfo {
  round: number
  betClosesAtBlock: number
  currentBlock: number
  secondsUntilClose: number
  timestamp: number
}

interface RoundResult {
  blockNum: number
  blockId: string | null
  lastChar: string | null
  algorithm: string
  result: 'ODD' | 'EVEN' | null
  status: string
}

const OddEvenBettingPage: React.FC = () => {
  const { t } = useI18n()
  const { isAuthenticated } = useAuthGuard()
  const [roundInfo, setRoundInfo] = useState<RoundInfo | null>(null)
  const [selectedChoice, setSelectedChoice] = useState<'ODD' | 'EVEN' | null>(null)
  const [betAmount, setBetAmount] = useState<number>(0)
  const [selectedChip, setSelectedChip] = useState<number>(1)
  const [isPlacingBet, setIsPlacingBet] = useState(false)
  const [betResult, setBetResult] = useState<RoundResult | null>(null)
  const [showFairnessModal, setShowFairnessModal] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [pendingRoundBlock, setPendingRoundBlock] = useState<number | null>(null)
  const [isWaitingForResult, setIsWaitingForResult] = useState(false)

  // Fetch current round info
  useEffect(() => {
    const fetchRoundInfo = async () => {
      try {
        const info = await getCurrentRound()
        setRoundInfo(info)
      } catch (err) {
        console.error('Error fetching round info:', err)
        setError('Failed to load round information')
      }
    }

    fetchRoundInfo()
    // Poll every 3 seconds for new round info
    const interval = setInterval(fetchRoundInfo, 3000)
    return () => clearInterval(interval)
  }, [])

  // Poll for round result for the last placed bet
  useEffect(() => {
    if (!pendingRoundBlock) return

    let isCancelled = false

    const pollResult = async () => {
      try {
        const result = await getRoundResult(pendingRoundBlock)
        if (
          result.status === 'settled' &&
          result.result &&
          !isCancelled
        ) {
          setBetResult(result)
          setPendingRoundBlock(null)
          setIsWaitingForResult(false)
          setSuccessMessage(
            `Round #${result.blockNum} settled: ${result.result}`
          )
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Error polling round result:', err)
        }
      }
    }

    setIsWaitingForResult(true)
    pollResult()
    const interval = setInterval(pollResult, 5000)

    return () => {
      isCancelled = true
      clearInterval(interval)
    }
  }, [pendingRoundBlock])

  const handleChipSelect = (value: number) => {
    setSelectedChip(value)
    setBetAmount(value)
  }

  const handlePlaceBet = async () => {
    if (!selectedChoice || !betAmount || betAmount <= 0) {
      setError('Please select ODD or EVEN and enter a bet amount')
      return
    }

    if (!isAuthenticated) {
      setError('Please log in to place a bet')
      return
    }

    setIsPlacingBet(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const result = await placeBet({
        amount: betAmount,
        choice: selectedChoice,
        currency: 'USD',
      })

      setSuccessMessage(`Bet placed successfully! Waiting for round #${result.blockNum}`)
      setSelectedChoice(null)
      setBetAmount(0)
      setPendingRoundBlock(result.blockNum)
      setBetResult(null)
      
      // Fetch updated round info
      const info = await getCurrentRound()
      setRoundInfo(info)
    } catch (err: any) {
      setError(err.message || 'Failed to place bet')
    } finally {
      setIsPlacingBet(false)
    }
  }

  const handleVerifyFairness = async () => {
    const targetBlock =
      pendingRoundBlock ??
      betResult?.blockNum ??
      (roundInfo ? roundInfo.round - 1 : null)

    if (!targetBlock) {
      setError('No completed round to verify yet')
      return
    }

    try {
      const result = await getRoundResult(targetBlock)
      setBetResult(result)
      setShowFairnessModal(true)
    } catch (err) {
      setError('Round result not available yet')
    }
  }

  const bettingOptions = [
    {
      id: 'odd',
      label: 'ODD',
      color: '#ED1D49',
      progress: 50,
      amount: '0',
      users: 0,
      odds: '1 : 1.95',
      isSelected: selectedChoice === 'ODD',
    },
    {
      id: 'even',
      label: 'EVEN',
      color: '#FFB636',
      progress: 50,
      amount: '0',
      users: 0,
      odds: '1 : 1.95',
      isSelected: selectedChoice === 'EVEN',
    },
  ]

  return (
    <PageBettingLayout>
      {/* Main Betting Section */}
      <div className="flex p-2 md:p-8 items-start gap-2 md:gap-4 w-full rounded-xl bg-white/[0.04]">
        {/* ODD Section */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="flex pb-4 justify-between items-center w-full">
            <div className="flex flex-col items-start">
              <div className="text-base font-bold">
                <span className="text-casper">$</span>
                <span className="text-white">{bettingOptions[0].amount}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4 text-casper" />
                <span className="text-sm font-bold text-casper">
                  {bettingOptions[0].users}
                </span>
              </div>
            </div>
            {/* Progress Circle for ODD */}
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
                  stroke="#ED1D49"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${bettingOptions[0].progress * 1.13} ${(100 - bettingOptions[0].progress) * 1.13}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-crimson">
                  {bettingOptions[0].progress}%
                </span>
              </div>
            </div>
          </div>
          <div
            className={`flex h-9 px-4 justify-center items-center gap-2 rounded-lg border ${
              selectedChoice === 'ODD'
                ? 'border-crimson bg-crimson/20'
                : 'border-white/[0.08] bg-mirage'
            } shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-[32px] cursor-pointer transition-all`}
            onClick={() => setSelectedChoice('ODD')}
          >
            <span className="text-sm font-bold text-white">
              ${betAmount > 0 ? betAmount.toFixed(2) : '0'}
            </span>
          </div>
          <div
            className={`text-2xl font-bold cursor-pointer transition-all ${
              selectedChoice === 'ODD' ? 'text-crimson scale-110' : 'text-crimson'
            }`}
            onClick={() => setSelectedChoice('ODD')}
          >
            {t('hashgame.odd') || 'ODD'}
          </div>
          <div className="flex h-9 px-4 justify-center items-center gap-2 rounded-lg border border-white/[0.08] bg-mirage shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-[32px]">
            <span className="text-sm font-bold text-white">1 : 1.95</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-[188px] bg-white/[0.04]"></div>

        {/* EVEN Section */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="flex pb-4 justify-between items-center w-full">
            {/* Progress Circle for EVEN */}
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
                  stroke="#FFB636"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${bettingOptions[1].progress * 1.13} ${(100 - bettingOptions[1].progress) * 1.13}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-yellow-orange">
                  {bettingOptions[1].progress}%
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-base font-bold text-right">
                <span className="text-casper">$</span>
                <span className="text-white">{bettingOptions[1].amount}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-casper">
                  {bettingOptions[1].users}
                </span>
                <User className="w-4 h-4 text-casper" />
              </div>
            </div>
          </div>
          <div
            className={`flex h-9 px-4 justify-center items-center gap-2 rounded-lg border ${
              selectedChoice === 'EVEN'
                ? 'border-yellow-orange bg-yellow-orange/20'
                : 'border-white/[0.08] bg-mirage'
            } shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-[32px] cursor-pointer transition-all`}
            onClick={() => setSelectedChoice('EVEN')}
          >
            <span className="text-sm font-bold text-white">
              ${betAmount > 0 ? betAmount.toFixed(2) : '0'}
            </span>
          </div>
          <div
            className={`text-2xl font-bold cursor-pointer transition-all ${
              selectedChoice === 'EVEN'
                ? 'text-yellow-orange scale-110'
                : 'text-yellow-orange'
            }`}
            onClick={() => setSelectedChoice('EVEN')}
          >
            {t('hashgame.even') || 'EVEN'}
          </div>
          <div className="flex h-9 px-4 justify-center items-center gap-2 rounded-lg border border-white/[0.08] bg-mirage shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-[32px]">
            <span className="text-sm font-bold text-white">1 : 1.95</span>
          </div>
        </div>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="w-full p-4 bg-red-500/20 border border-red-500 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="w-full p-4 bg-green-500/20 border border-green-500 rounded-lg">
          <p className="text-green-400 text-sm">{successMessage}</p>
        </div>
      )}

      {isWaitingForResult && pendingRoundBlock && (
        <div className="w-full p-4 bg-white/5 border border-white/10 rounded-lg">
          <p className="text-white text-sm">
            Waiting for Tron block #{pendingRoundBlock} to be confirmed...
          </p>
        </div>
      )}

      {/* Betting Controls */}
      <div className="flex flex-col gap-4 w-full">
        <ResponsiveChipSelector />

        {/* Quick amount selectors */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[1, 5, 10, 25, 50, 100].map(value => (
            <button
              key={value}
              onClick={() => handleChipSelect(value)}
              className={cn(
                'px-4 py-2 rounded-lg border text-sm font-semibold transition-all',
                selectedChip === value
                  ? 'bg-dodger-blue text-white border-dodger-blue'
                  : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
              )}
            >
              ${value}
            </button>
          ))}
        </div>
        
        {/* Bet Amount Input */}
        <div className="flex gap-4 items-center justify-center">
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(parseFloat(e.target.value) || 0)}
            placeholder="Enter bet amount"
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-dodger-blue"
            min="1"
            max="15000"
          />
          <button
            onClick={handlePlaceBet}
            disabled={isPlacingBet || !selectedChoice || betAmount <= 0}
            className={`px-8 py-2 rounded-lg font-bold transition-all ${
              isPlacingBet || !selectedChoice || betAmount <= 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-dodger-blue text-white hover:bg-blue-600'
            }`}
          >
            {isPlacingBet ? 'Placing Bet...' : 'Confirm Bet'}
          </button>
        </div>

        {/* Fairness Verification Button */}
        {roundInfo && (
          <button
            onClick={handleVerifyFairness}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all text-sm"
          >
            Verify Fairness
          </button>
        )}
      </div>

      {/* Round Result Display */}
      {betResult && betResult.result && (
        <div className="w-full p-4 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-white font-bold mb-2">Round Result</h3>
          <div className="flex items-center gap-4">
            <span className="text-casper">Block:</span>
            <span className="text-white">{betResult.blockNum}</span>
            <span className="text-casper">Result:</span>
            <span
              className={`font-bold ${
                betResult.result === 'ODD' ? 'text-crimson' : 'text-yellow-orange'
              }`}
            >
              {betResult.result}
            </span>
            {betResult.blockId && (
              <a
                href={`https://tronscan.org/#/block/${betResult.blockNum}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-dodger-blue hover:underline"
              >
                View on TronScan
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Fairness Verification Modal */}
      {showFairnessModal && betResult && (
        <FairnessVerificationModal
          isOpen={showFairnessModal}
          onClose={() => setShowFairnessModal(false)}
          roundResult={betResult}
        />
      )}
    </PageBettingLayout>
  )
}

export default OddEvenBettingPage
