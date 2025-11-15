// API Base Configuration
// Default to localhost for development, override with NEXT_PUBLIC_API_BASE_URL for production
// Helper function to ensure URL always has a protocol
const normalizeApiUrl = (url: string | undefined): string => {
  if (!url) {
    return 'http://localhost:4000'
  }
  
  // Remove trailing slashes
  url = url.trim().replace(/\/+$/, '')
  
  // If URL doesn't start with http:// or https://, add https://
  if (!url.match(/^https?:\/\//i)) {
    // For localhost, use http://, otherwise use https://
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
      url = `http://${url}`
    } else {
      url = `https://${url}`
    }
  }
  
  return url
}

export const API_BASE_URL = normalizeApiUrl(process.env.NEXT_PUBLIC_API_BASE_URL)

// Log API base URL in development for debugging
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('🌐 API Base URL:', API_BASE_URL)
  console.log('📝 NEXT_PUBLIC_API_BASE_URL env var:', process.env.NEXT_PUBLIC_API_BASE_URL || 'not set (using default localhost:4000)')
}

// Common API Response Structure
export interface ApiResponse<T = any> {
  code: number
  message: string
  data?: T
}

// Error Response Structure
export interface ApiError {
  code: number
  message: string
  errors?: Record<string, string[]>
}

// User Authentication Types
export interface User {
  id?: string | number
  email?: string
  username?: string
  firstName?: string
  lastName?: string
  name?: string
  phone?: string
  telegram?: string
  avatar?: string
  isVerified?: boolean
  hasWithdrawPassword?: boolean
  hasPassword?: boolean // Whether user has set a login password
  provider?: string // 'google', 'email', etc.
  createdAt?: string
  updatedAt?: string
}

// Signup Request/Response Types
export interface SignupRequest {
  email: string
  password: string
  referralCode?: string
}

export interface SignupResponse {
  code: number
  message: string
  data?: {
    user: User
    token: string
  }
}

// Login Request/Response Types
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  code: number
  message?: string
  data?: {
    token: string
    user?: User
  }
}

// Password Reset Types
export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
}

// Profile Update Types
export interface UpdateProfileRequest {
  firstName?: string
  lastName?: string
  username?: string
  avatar?: string
}

// Wallet/Balance Types
export interface Wallet {
  id: string
  userId: string
  balance: number
  currency: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Transaction {
  id: string
  userId: string
  walletId: string
  type: 'deposit' | 'withdrawal' | 'bet' | 'win' | 'bonus'
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  description?: string
  reference?: string
  createdAt: string
  updatedAt: string
}

// Game Types
export interface Game {
  id: string
  name: string
  category: string
  provider: string
  image: string
  isActive: boolean
  minBet: number
  maxBet: number
  rtp: number
  createdAt: string
  updatedAt: string
}

export interface Bet {
  id: string
  userId: string
  gameId: string
  amount: number
  currency: string
  multiplier: number
  payout: number
  status: 'pending' | 'won' | 'lost' | 'cancelled'
  result?: any
  createdAt: string
  updatedAt: string
}

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  SIGNUP: '/api/v1/users/signup',
  LOGIN: '/api/v1/users/signin',
  LOGOUT: '/api/v1/users/logout',
  REFRESH_TOKEN: '/api/v1/users/refresh',
  FORGOT_PASSWORD: '/api/v1/users/forgot-password',
  RESET_PASSWORD: '/api/v1/users/reset-password',
  VERIFY_EMAIL_CODE: '/api/v1/users/confirm-email-code',

  // User Profile
  PROFILE: '/api/v1/users/profile',
  UPDATE_PROFILE: '/api/v1/users/profile',

  // Wallet
  WALLET: '/api/v1/wallet',
  TRANSACTIONS: '/api/v1/wallet/transactions',
  DEPOSIT: '/api/v1/wallet/deposit',
  WITHDRAW: '/api/v1/wallet/withdraw',
  EXCHANGE_CURRENCY: '/api/v1/wallets/exchange',
  WALLET_BETS: '/api/v1/wallets/bets',
  WALLET_WITHDRAW: '/api/v1/wallets/withdraw',

  // Games
  GAMES: '/api/v1/games',
  GAME_PROVIDERS: '/api/v1/games/providers',
  PLACE_BET: '/api/v1/games/bet',
  BET_HISTORY: '/api/v1/games/bets',

  // Promotions
  PROMOTIONS: '/api/v1/promotions',
  CLAIM_BONUS: '/api/v1/promotions/claim',

  // Support
  TICKETS: '/api/v1/support/tickets',
  CREATE_TICKET: '/api/v1/support/tickets',

  // Referrals
  REFERRAL_INFO: '/api/v1/users/referal-info',
  SET_TELEGRAM: '/api/v1/users/set-telegram',
  SET_WITHDRAW_PASSWORD: '/api/v1/users/set-withdrawal-password',
  SET_AVATAR: '/api/v1/users/set-avatar',
  VERIFY_EMAIL: '/api/v1/users/verify-email',
  CHANGE_PASSWORD: '/api/v1/users/change-password',
  SET_NAME: '/api/v1/users/set-name',
  SET_PHONE: '/api/v1/users/set-phone',
  SET_PASSWORD: '/api/v1/users/set-password',
  GOOGLE_OAUTH_CALLBACK: '/api/v1/users/auth/google/callback',
  WALLET_INFO: '/api/v1/wallets/info',

  // MetaMask Authentication
  METAMASK_NONCE: '/api/v1/users/auth/nonce',
  METAMASK_VERIFY: '/api/v1/users/auth/verify',
  METAMASK_PROFILE: '/api/v1/users/profile-metamask',

  // Hash Games - Odd/Even
  ODD_EVEN_CURRENT_ROUND: '/api/v1/hashgames/oddeven/round/current',
  ODD_EVEN_BET: '/api/v1/hashgames/oddeven/bet',
  ODD_EVEN_ROUND_RESULT: '/api/v1/hashgames/oddeven/round',
} as const

// Request Configuration
export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: any
  timeout?: number
}

// Pagination
export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Profile Response
export interface ProfileResponse {
  code: number
  message?: string
  data?: {
    id: number | string
    email: string
    name?: string
    phone?: string
    telegram?: string
    avatar?: string
    isVerified?: boolean
    email_verified?: boolean // Backend field name
    hasPassword?: boolean
  }
}

// Referral Info
export interface ReferralUser {
  id: number | string
  name?: string | null
  email: string
  referralCode?: string
  referralBonuses?: any[]
}

export interface ReferralInfoResponse {
  code: number
  message?: string
  data?: {
    user: ReferralUser
    directSubordinates: any[]
    directSubordinatesCount: number
    totalTeamCount: number
  }
}

export interface SetTelegramRequest {
  telegram: string
}

export interface SetTelegramResponse {
  code: number
  message?: string
  data?: {
    telegram: string
  }
}

export interface SetWithdrawPasswordRequest {
  password: string
  oldPassword?: string
  loginPassword: string
}

export interface SetWithdrawPasswordResponse {
  code: number
  message?: string
}

export interface SetAvatarRequest {
  imageBase64: string
}

export interface SetAvatarResponse {
  code: number
  message?: string
  data?: {
    path: string
  }
}

export interface VerifyEmailResponse {
  code: number
  message?: string
}

export interface ChangePasswordRequest {
  password: string
  newPassword: string
}

export interface ChangePasswordResponse {
  code: number
  message?: string
}

export interface SetPasswordRequest {
  newPassword: string
}

export interface SetPasswordResponse {
  code: number
  message?: string
}

export interface SetNameRequest {
  username: string
}

export interface SetNameResponse {
  code: number
  message?: string
  data?: { name: string }
}

export interface SetPhoneRequest {
  phone: string
}

export interface SetPhoneResponse {
  code: number
  message?: string
  data?: { phone: string }
}

export interface GoogleOAuthResponse {
  code: number
  message?: string
  data?: { token: string }
}

// Email Verification Types
export interface VerifyEmailCodeRequest {
  code: string
}

export interface VerifyEmailCodeResponse {
  code: number
  message: string
  data?: {
    verified: boolean
  }
}

// Currency Exchange Types
export interface ExchangeCurrencyRequest {
  fromCurrency: string
  toCurrency: string
  amount: number
}

export interface ExchangeCurrencyResponse {
  code: number
  message: string
}

// Wallet Transaction Types (for API responses)
export interface WalletTransaction {
  txId: string
  currency: string
  amount: number
  type: 'deposit' | 'withdraw' | 'exchange'
}

export interface FetchTransactionsRequest {
  currency: string
}

export interface FetchTransactionsResponse {
  code: number
  message: string
  data: WalletTransaction[]
}

export interface WalletBalanceItem {
  currency: string
  amount: number
}

export interface WalletAddressItem {
  blockchain: string // Blockchain name (e.g., "Tron", "Ethereum", "Binance Smart Chain")
  publicKey: string
}

export interface WalletInfoResponse {
  code: number
  message?: string
  data?: {
    balances: WalletBalanceItem[]
    addresses: WalletAddressItem[]
  }
}

export interface WalletBetItem {
  id: number
  game: string
  amount: number
  currency: string
  result: 'win' | 'lose'
}

export interface WalletBetsResponse {
  code: number
  message?: string
  data?: WalletBetItem[]
}

export interface WithdrawRequest {
  blockchain: string
  currency: string
  to: string
  amount: number
  withdrawalPassword: string
}

export interface WithdrawResponse {
  code: number
  message?: string
}

// MetaMask Authentication Types
export interface MetaMaskNonceRequest {
  address: string
}

export interface MetaMaskNonceResponse {
  code: number
  message: string
  data: {
    nonce: string
  }
}

export interface MetaMaskVerifyRequest {
  address: string
  signature: string
}

export interface MetaMaskVerifyResponse {
  code: number
  message: string
  data: {
    token: string
    user: {
      address: string
      type: string
    }
  }
}

export interface MetaMaskProfileResponse {
  code: number
  message: string
  data: {
    user: {
      address: string
      type: string
      authenticatedAt: string
    }
  }
}
