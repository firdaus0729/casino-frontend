import axios from 'axios'
import { API_BASE_URL } from '@/types/api'

const TON_API_BASE_URL = `${API_BASE_URL}/api/v1/users`

export interface TonChallengeResponse {
  code: number
  message: string
  data: {
    challenge: string
    expiresIn: number
  }
}

export interface TonVerifyRequest {
  address: string
  signature: string
  message: string
  walletStateInit?: string
}

export interface TonVerifyResponse {
  code: number
  message: string
  data: {
    token: string
    user: {
      address: string
      type: string
      publicKey: string
    }
  }
}

export interface TonProfileResponse {
  code: number
  message: string
  data: {
    user: {
      address: string
      type: string
      publicKey: string
      authenticatedAt: string
    }
  }
}

export class TonAuthService {
  /**
   * Get a challenge for TON wallet authentication
   */
  static async getChallenge(): Promise<TonChallengeResponse> {
    try {
      const response = await axios.get(`${TON_API_BASE_URL}/auth/challenge`)
      return response.data
    } catch (error) {
      console.error('Error getting TON challenge:', error)
      throw new Error('Failed to get authentication challenge')
    }
  }

  /**
   * Verify TON signature and authenticate user
   */
  static async verifySignature(data: TonVerifyRequest): Promise<TonVerifyResponse> {
    try {
      const response = await axios.post(`${TON_API_BASE_URL}/auth/verify`, data)
      return response.data
    } catch (error) {
      console.error('Error verifying TON signature:', error)
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Authentication failed'
        throw new Error(message)
      }
      throw new Error('Failed to verify signature')
    }
  }

  /**
   * Get user profile (requires authentication)
   */
  static async getProfile(token: string): Promise<TonProfileResponse> {
    try {
      const response = await axios.get(`${TON_API_BASE_URL}/profile-ton`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error('Error getting TON profile:', error)
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Failed to get profile'
        throw new Error(message)
      }
      throw new Error('Failed to get profile')
    }
  }

  /**
   * Complete TON authentication flow
   */
  static async authenticateWithTon(
    address: string,
    signature: string,
    message: string,
    walletStateInit?: string
  ): Promise<{ token: string; user: any }> {
    try {
      const verifyResponse = await this.verifySignature({
        address,
        signature,
        message,
        walletStateInit
      })

      if (verifyResponse.code === 200) {
        return {
          token: verifyResponse.data.token,
          user: verifyResponse.data.user
        }
      } else {
        throw new Error(verifyResponse.message)
      }
    } catch (error) {
      console.error('TON authentication error:', error)
      throw error
    }
  }
}
