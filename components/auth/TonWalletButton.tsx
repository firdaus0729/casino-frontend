'use client'

import React, { useState } from 'react'
import { UnifiedButton } from '../ui'
import { useTonAuth } from '../../hooks/useTonAuth'
import { TonAuthService } from '../../lib/tonAuthService'

interface TonWalletButtonProps {
  onSuccess?: (user: any) => void
  onError?: (error: string) => void
  className?: string
  children?: React.ReactNode
}

export const TonWalletButton: React.FC<TonWalletButtonProps> = ({
  onSuccess,
  onError,
  className = '',
  children
}) => {
  const { isConnected, address, isLoading, error, connect, signMessage } = useTonAuth()
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const handleTonAuth = async () => {
    try {
      setIsAuthenticating(true)

      if (!isConnected) {
        await connect()
        return
      }

      // Get challenge from backend
      const challengeResponse = await TonAuthService.getChallenge()
      const challenge = challengeResponse.data.challenge

      // Sign the challenge
      const signResult = await signMessage(challenge)
      if (!signResult) {
        throw new Error('Failed to sign message')
      }

      // Verify signature with backend
      const authResult = await TonAuthService.authenticateWithTon(
        address!,
        signResult.signature,
        signResult.message,
        signResult.walletStateInit
      )

      // Store token in localStorage for frontend use
      localStorage.setItem('auth_token', authResult.token)
      localStorage.setItem('user_type', 'ton')
      localStorage.setItem('user_address', authResult.user.address)

      onSuccess?.(authResult.user)
    } catch (error) {
      console.error('TON authentication error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed'
      onError?.(errorMessage)
    } finally {
      setIsAuthenticating(false)
    }
  }

  const getButtonText = () => {
    if (isAuthenticating) return 'Authenticating...'
    if (isLoading) return 'Connecting...'
    if (isConnected) return `Sign in with TON`
    return 'Connect TON Wallet'
  }

  const getButtonIcon = () => {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <div className="ton-wallet-button-container">
      <UnifiedButton
        variant="custom"
        className={`ton-wallet-button ${className} ${
          isLoading || isAuthenticating ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleTonAuth}
        disabled={isLoading || isAuthenticating}
      >
        {getButtonIcon()}
        {children || getButtonText()}
      </UnifiedButton>
      
      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}
      
      {isConnected && address && (
        <div className="mt-2 text-green-600 text-sm">
          Connected: {address.slice(0, 6)}...{address.slice(-4)}
        </div>
      )}
    </div>
  )
}