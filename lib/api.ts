import {
  API_BASE_URL,
  API_ENDPOINTS,
  ApiResponse,
  SignupRequest,
  SignupResponse,
  LoginRequest,
  LoginResponse,
  User,
  RequestConfig,
  VerifyEmailCodeRequest,
  VerifyEmailCodeResponse,
  ExchangeCurrencyRequest,
  ExchangeCurrencyResponse,
  FetchTransactionsRequest,
  FetchTransactionsResponse,
} from '../types/api'
import { validateJWT } from './jwt'
import { apiGet, apiPost } from './axios'

// API Service Class
class ApiService {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json; charset=utf-8',
    }

    // Initialize auth header from localStorage if available (browser only)
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('auth_token')
      if (savedToken) {
        this.setAuthToken(savedToken)
      }
    }
  }

  // Set authorization token
  setAuthToken(token: string) {
    // Validate token before setting
    const validation = validateJWT(token)
    if (!validation.isValid) {
      console.warn('Setting invalid token:', validation.error)
    } else if (validation.isExpired) {
      console.warn('Setting expired token:', validation.error)
    }

    this.defaultHeaders['Authorization'] = `${token}`
  }

  // Remove authorization token
  removeAuthToken() {
    delete this.defaultHeaders['Authorization']
  }

  // Convenience methods for direct use
  async get<T>(endpoint: string, config: any = {}): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', ...config })
  }

  async post<T>(endpoint: string, data?: any, config: any = {}): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body: data, ...config })
  }

  // Generic request method using Axios
  private async request<T>(
    endpoint: string,
    config: RequestConfig = { method: 'GET' }
  ): Promise<T> {
    try {
      const headers = {
        ...this.defaultHeaders,
        ...config.headers,
      }

      if (config.method === 'GET') {
        return await apiGet<T>(endpoint, { headers })
      } else {
        return await apiPost<T>(endpoint, config.body, { headers })
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Network error occurred')
    }
  }

  // Authentication Methods
  async signup(data: SignupRequest): Promise<SignupResponse> {
    console.log('====================================');
    console.log("Sdfasdf");
    console.log('====================================');
    return this.request<SignupResponse>(API_ENDPOINTS.SIGNUP, {
      method: 'POST',
      body: data,
    })
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: data,
    })
  }

  async logout(): Promise<ApiResponse> {
    return this.request<ApiResponse>(API_ENDPOINTS.LOGOUT, {
      method: 'POST',
    })
  }

  async refreshToken(): Promise<{ token: string; user: User }> {
    return this.request<{ token: string; user: User }>(
      API_ENDPOINTS.REFRESH_TOKEN,
      {
        method: 'POST',
      }
    )
  }

  async forgotPassword(email: string): Promise<ApiResponse> {
    return this.request<ApiResponse>(API_ENDPOINTS.FORGOT_PASSWORD, {
      method: 'POST',
      body: { email },
    })
  }

  async resetPassword(token: string, password: string): Promise<ApiResponse> {
    return this.request<ApiResponse>(API_ENDPOINTS.RESET_PASSWORD, {
      method: 'POST',
      body: { token, password },
    })
  }

  // User Profile Methods
  async getProfile(): Promise<{ user: User }> {
    return this.request<{ user: User }>(API_ENDPOINTS.PROFILE, {
      method: 'GET',
    })
  }

  async updateProfile(data: Partial<User>): Promise<{ user: User }> {
    return this.request<{ user: User }>(API_ENDPOINTS.UPDATE_PROFILE, {
      method: 'PUT',
      body: data,
    })
  }

  // Wallet Methods
  async getWallet(): Promise<{ wallet: any }> {
    return this.request<{ wallet: any }>(API_ENDPOINTS.WALLET, {
      method: 'GET',
    })
  }

  async getTransactions(params?: any): Promise<{ transactions: any[] }> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : ''
    return this.request<{ transactions: any[] }>(
      `${API_ENDPOINTS.TRANSACTIONS}${queryString}`,
      {
        method: 'GET',
      }
    )
  }

  // Game Methods
  async getGames(params?: any): Promise<{ games: any[] }> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : ''
    return this.request<{ games: any[] }>(
      `${API_ENDPOINTS.GAMES}${queryString}`,
      {
        method: 'GET',
      }
    )
  }

  async getGameProviders(): Promise<{ providers: any[] }> {
    return this.request<{ providers: any[] }>(API_ENDPOINTS.GAME_PROVIDERS, {
      method: 'GET',
    })
  }

  async placeBet(data: any): Promise<{ bet: any }> {
    return this.request<{ bet: any }>(API_ENDPOINTS.PLACE_BET, {
      method: 'POST',
      body: data,
    })
  }

  async getBetHistory(params?: any): Promise<{ bets: any[] }> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : ''
    return this.request<{ bets: any[] }>(
      `${API_ENDPOINTS.BET_HISTORY}${queryString}`,
      {
        method: 'GET',
      }
    )
  }

  // Promotion Methods
  async getPromotions(): Promise<{ promotions: any[] }> {
    return this.request<{ promotions: any[] }>(API_ENDPOINTS.PROMOTIONS, {
      method: 'GET',
    })
  }

  async claimBonus(bonusId: string): Promise<ApiResponse> {
    return this.request<ApiResponse>(
      `${API_ENDPOINTS.CLAIM_BONUS}/${bonusId}`,
      {
        method: 'POST',
      }
    )
  }

  // Support Methods
  async getTickets(): Promise<{ tickets: any[] }> {
    return this.request<{ tickets: any[] }>(API_ENDPOINTS.TICKETS, {
      method: 'GET',
    })
  }

  async createTicket(data: any): Promise<{ ticket: any }> {
    return this.request<{ ticket: any }>(API_ENDPOINTS.CREATE_TICKET, {
      method: 'POST',
      body: data,
    })
  }

  // Email Verification Methods
  async verifyEmailCode(
    data: VerifyEmailCodeRequest
  ): Promise<VerifyEmailCodeResponse> {
    return this.request<VerifyEmailCodeResponse>(
      API_ENDPOINTS.VERIFY_EMAIL_CODE,
      {
        method: 'POST',
        body: data,
      }
    )
  }

  // Currency Exchange Methods
  async exchangeCurrency(
    data: ExchangeCurrencyRequest
  ): Promise<ExchangeCurrencyResponse> {
    return this.request<ExchangeCurrencyResponse>(
      API_ENDPOINTS.EXCHANGE_CURRENCY,
      {
        method: 'POST',
        body: data,
      }
    )
  }

  // Transaction Methods
  async fetchTransactions(
    params: FetchTransactionsRequest
  ): Promise<FetchTransactionsResponse> {
    const queryString = new URLSearchParams({
      currency: params.currency,
    }).toString()
    return this.request<FetchTransactionsResponse>(
      `${API_ENDPOINTS.TRANSACTIONS}?${queryString}`,
      {
        method: 'GET',
      }
    )
  }

  // Hash Games - Odd/Even Methods
  async getCurrentRound(): Promise<{
    round: number
    betClosesAtBlock: number
    timestamp: number
  }> {
    return this.request<{
      round: number
      betClosesAtBlock: number
      timestamp: number
    }>(API_ENDPOINTS.ODD_EVEN_CURRENT_ROUND, {
      method: 'GET',
    })
  }

  async placeOddEvenBet(data: {
    amount: number
    choice: 'ODD' | 'EVEN'
    currency?: string
  }): Promise<{
    success: boolean
    betId: string
    roundId: string
    message: string
  }> {
    return this.request<{
      success: boolean
      betId: string
      roundId: string
      message: string
    }>(API_ENDPOINTS.ODD_EVEN_BET, {
      method: 'POST',
      body: data,
    })
  }

  async getRoundResult(blockNum: number): Promise<{
    blockNum: number
    blockId: string | null
    lastChar: string | null
    algorithm: string
    result: 'ODD' | 'EVEN' | null
    status: string
  }> {
    return this.request<{
      blockNum: number
      blockId: string | null
      lastChar: string | null
      algorithm: string
      result: 'ODD' | 'EVEN' | null
      status: string
    }>(`${API_ENDPOINTS.ODD_EVEN_ROUND_RESULT}/${blockNum}`, {
      method: 'GET',
    })
  }
}

// Create and export singleton instance
export const apiService = new ApiService()

// Export the class for testing or custom instances
export { ApiService }

// Convenience functions for Odd/Even game
export const getCurrentRound = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/hashgames/oddeven/round/current`)
  if (!response.ok) {
    throw new Error('Failed to fetch current round')
  }
  return response.json()
}

export const placeBet = async (data: {
  userId?: number
  amount: number
  choice: 'ODD' | 'EVEN'
  currency?: string
}): Promise<{
  success: boolean
  betId: string
  roundId: string
  blockNum: number
  betClosesAtBlock: number
}> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  
  const response = await fetch(`${API_BASE_URL}/api/v1/hashgames/oddeven/bet`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token }),
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to place bet')
  }
  
  return response.json()
}

export const getRoundResult = async (blockNum: number) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/hashgames/oddeven/round/${blockNum}/result`)
  if (!response.ok) {
    throw new Error('Failed to fetch round result')
  }
  return response.json()
}
