import { API_ENDPOINTS, API_BASE_URL } from '@/types/api'
import {
  MetaMaskNonceRequest,
  MetaMaskNonceResponse,
  MetaMaskVerifyRequest,
  MetaMaskVerifyResponse,
  MetaMaskProfileResponse,
} from '@/types/api'

// Extend Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean
      isTrust?: boolean
      isCoinbaseWallet?: boolean
      isBraveWallet?: boolean
      // Some wallets inject a multi-provider array; mark as optional and loosely typed
      providers?: unknown[]
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, handler: (...args: any[]) => void) => void
      removeListener: (event: string, handler: (...args: any[]) => void) => void
    }
  }
}

export class MetaMaskService {
  private static instance: MetaMaskService
  private apiBaseUrl: string

  constructor() {
    // Use API_BASE_URL which has normalized URL with protocol
    this.apiBaseUrl = API_BASE_URL
    console.log('MetaMaskService initialized with API URL:', this.apiBaseUrl)
  }

  static getInstance(): MetaMaskService {
    if (!MetaMaskService.instance) {
      MetaMaskService.instance = new MetaMaskService()
    }
    return MetaMaskService.instance
  }

  /**
   * Check if MetaMask is installed and available
   */
  isMetaMaskAvailable(): boolean {
    if (typeof window === 'undefined' || !window.ethereum) {
      return false
    }

    // Check if it's specifically MetaMask
    const isMetaMask = window.ethereum.isMetaMask === true
    const isTrustWallet = window.ethereum.isTrust === true
    const isCoinbaseWallet = window.ethereum.isCoinbaseWallet === true
    const isBraveWallet = window.ethereum.isBraveWallet === true

    console.log('MetaMask availability check:', {
      windowDefined: typeof window !== 'undefined',
      ethereumExists: !!window.ethereum,
      isMetaMask,
      isTrustWallet,
      isCoinbaseWallet,
      isBraveWallet,
      providers: window.ethereum.providers?.length || 0,
      ethereumKeys: Object.keys(window.ethereum),
    })

    // Simple detection: if MetaMask is true, consider it available
    // The actual wallet selection will happen during connection
    return isMetaMask
  }

  /**
   * Get the connected wallet address
   */
  async getWalletAddress(): Promise<string> {
    if (!this.isMetaMaskAvailable()) {
      throw new Error('MetaMask is not installed or not available')
    }

    try {
      // Try to connect specifically to MetaMask
      let accounts

      // First, try to get accounts without requesting permissions
      try {
        accounts = await window.ethereum!.request({
          method: 'eth_accounts',
        })
      } catch (e) {
        // If that fails, request accounts (this will trigger wallet selection)
        accounts = await window.ethereum!.request({
          method: 'eth_requestAccounts',
        })
      }

      if (!accounts || accounts.length === 0) {
        throw new Error('No wallet connected')
      }

      console.log('MetaMask connection successful:', { accounts })
      return accounts[0]
    } catch (error: any) {
      if (error.code === 4001) {
        throw new Error('User rejected the connection request')
      }
      throw new Error(`Failed to connect to MetaMask: ${error.message}`)
    }
  }

  /**
   * Request a nonce from the backend
   */
  async requestNonce(address: string): Promise<string> {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}${API_ENDPOINTS.METAMASK_NONCE}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ address } as MetaMaskNonceRequest),
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: MetaMaskNonceResponse = await response.json()

      if (data.code !== 200) {
        throw new Error(data.message || 'Failed to get nonce')
      }

      return data.data.nonce
    } catch (error: any) {
      throw new Error(`Failed to request nonce: ${error.message}`)
    }
  }

  /**
   * Sign a message with MetaMask
   */
  async signMessage(message: string, address: string): Promise<string> {
    if (!this.isMetaMaskAvailable()) {
      throw new Error('MetaMask is not installed or not available')
    }

    try {
      const signature = await window.ethereum!.request({
        method: 'personal_sign',
        params: [message, address],
      })

      return signature
    } catch (error: any) {
      if (error.code === 4001) {
        throw new Error('User rejected the signature request')
      }
      throw new Error(`Failed to sign message: ${error.message}`)
    }
  }

  /**
   * Verify the signature with the backend
   */
  async verifySignature(
    address: string,
    signature: string
  ): Promise<{ token: string; user: any }> {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}${API_ENDPOINTS.METAMASK_VERIFY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ address, signature } as MetaMaskVerifyRequest),
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: MetaMaskVerifyResponse = await response.json()

      if (data.code !== 200) {
        throw new Error(data.message || 'Failed to verify signature')
      }

      return data.data
    } catch (error: any) {
      throw new Error(`Failed to verify signature: ${error.message}`)
    }
  }

  /**
   * Get user profile using JWT token
   */
  async getProfile(token: string): Promise<MetaMaskProfileResponse['data']> {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}${API_ENDPOINTS.METAMASK_PROFILE}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: MetaMaskProfileResponse = await response.json()

      if (data.code !== 200) {
        throw new Error(data.message || 'Failed to get profile')
      }

      return data.data
    } catch (error: any) {
      throw new Error(`Failed to get profile: ${error.message}`)
    }
  }

  /**
   * Complete MetaMask login flow
   */
  async login(): Promise<{ token: string; user: any; address: string }> {
    try {
      // Step 1: Get wallet address
      const address = await this.getWalletAddress()
      console.log('Connected wallet address:', address)

      // Step 2: Request nonce from backend
      const nonce = await this.requestNonce(address)
      console.log('Received nonce:', nonce)

      // Step 3: Create message to sign
      const message = `Sign this message to authenticate: ${nonce}`
      console.log('Message to sign:', message)

      // Step 4: Sign message with MetaMask
      const signature = await this.signMessage(message, address)
      console.log('Signature received:', signature)

      // Step 5: Verify signature with backend
      const { token, user } = await this.verifySignature(address, signature)
      console.log('Authentication successful, token received')

      // Step 6: Store token in localStorage
      localStorage.setItem('metamask_token', token)
      localStorage.setItem('metamask_address', address)

      return { token, user, address }
    } catch (error: any) {
      console.error('MetaMask login failed:', error)
      throw error
    }
  }

  /**
   * Logout and clear stored data
   */
  logout(): void {
    localStorage.removeItem('metamask_token')
    localStorage.removeItem('metamask_address')
  }

  /**
   * Get stored token
   */
  getStoredToken(): string | null {
    return localStorage.getItem('metamask_token')
  }

  /**
   * Get stored address
   */
  getStoredAddress(): string | null {
    return localStorage.getItem('metamask_address')
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return !!this.getStoredToken()
  }

  /**
   * Format address for display (show first 6 and last 4 characters)
   */
  formatAddress(address: string): string {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  /**
   * Format JWT token for display (show first 10 and last 10 characters)
   */
  formatToken(token: string): string {
    if (!token) return ''
    return `${token.slice(0, 10)}...${token.slice(-10)}`
  }
}

// Export singleton instance
export const metaMaskService = MetaMaskService.getInstance()
