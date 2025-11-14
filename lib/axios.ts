import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { API_BASE_URL } from '../types/api'
import { extractErrorMessage, extractErrorDetails } from './error-utils'
import { isTokenExpired } from './token-utils'

// Re-export for use in error handler
const API_BASE_URL_FOR_ERROR = API_BASE_URL

// Create axios instance with base configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout (increased for deployed database)
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

// Request interceptor to add auth token and check expiration
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage (client-side) or from Redux store
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token')
      if (token) {
        // TEMPORARILY DISABLE TOKEN EXPIRATION CHECK TO DEBUG AUTO-LOGOUT ISSUE
        // Check if token is expired before making the request
        // if (isTokenExpired(token)) {
        //   console.log('Token is expired - clearing auth data and redirecting')
        //   console.log('Token details:', { token: token.substring(0, 20) + '...', length: token.length })
        //   localStorage.removeItem('auth_token')
        //   localStorage.removeItem('auth_state')
        //   
        //   // Clear any email verification status
        //   const keys = Object.keys(localStorage)
        //   keys.forEach(key => {
        //     if (key.startsWith('email_verified_')) {
        //       localStorage.removeItem(key)
        //     }
        //   })
        //   
        //   // Redirect to login page
        //   window.location.href = '/'
        //   return Promise.reject(new Error('Token expired'))
        // } else {
        //   console.log('Token is valid - proceeding with request')
        // }
        
        console.log('Token expiration check temporarily disabled for debugging')
        
        config.headers.Authorization = `${token}`
      }
    }
    
    console.log('Axios Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      headers: config.headers,
    })
    
    return config
  },
  (error: AxiosError) => {
    console.error('Axios Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor to handle responses and errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('Axios Response:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      url: response.config.url,
    })
    
    return response
  },
  (error: AxiosError) => {
    console.error('Axios Response Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
    })
    
    // Handle network errors (connection refused, CORS, etc.)
    if (!error.response && error.message) {
      const isNetworkError = error.message.includes('Network Error') || 
                            error.message.includes('ERR_NETWORK') ||
                            error.message.includes('fetch failed')
      
      if (isNetworkError) {
        const baseURL = error.config?.baseURL || API_BASE_URL_FOR_ERROR
        console.error(`Network Error: Cannot connect to backend at ${baseURL}`)
        console.error('Please ensure:')
        console.error('1. Backend server is running (npm run dev in ok777-backend-main)')
        console.error('2. Backend is accessible at:', baseURL)
        console.error('3. CORS is properly configured in backend')
      }
    }
    
    // Handle specific error cases
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Check if this is a withdrawal password endpoint error (don't redirect for these)
      const isWithdrawalPasswordError = error.config?.url?.includes('/set-withdrawal-password')
      
      if (!isWithdrawalPasswordError) {
        // Unauthorized or Forbidden - likely expired token (but not for withdrawal password)
        console.log('Authentication error - clearing token and redirecting to login')
        if (typeof window !== 'undefined') {
          // Clear all auth-related data
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_state')
          
          // Clear any email verification status
          const keys = Object.keys(localStorage)
          keys.forEach(key => {
            if (key.startsWith('email_verified_')) {
              localStorage.removeItem(key)
            }
          })
          
          // Redirect to login page
          window.location.href = '/'
        }
      } else {
        console.log('Withdrawal password error - not redirecting, allowing component to handle error')
      }
    }
    
    return Promise.reject(error)
  }
)

// Generic API request function
export const apiRequest = async <T>(
  endpoint: string,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const response = await axiosInstance.request<T>({
      url: endpoint,
      ...config,
    })
    return response.data
  } catch (error) {
    // Extract proper error message from backend response
    const errorMessage = extractErrorMessage(error, 'Request failed')
    const errorDetails = extractErrorDetails(error)
    
    console.error('API Request Error:', {
      endpoint,
      message: errorMessage,
      status: errorDetails.status,
      data: errorDetails.data,
      config
    })
    
    // Preserve the original error structure instead of throwing a new Error
    throw error
  }
}

// Specific API methods
export const apiGet = <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
  return apiRequest<T>(endpoint, { ...config, method: 'GET' })
}

export const apiPost = <T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return apiRequest<T>(endpoint, { ...config, method: 'POST', data })
}

export const apiPut = <T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return apiRequest<T>(endpoint, { ...config, method: 'PUT', data })
}

export const apiDelete = <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
  return apiRequest<T>(endpoint, { ...config, method: 'DELETE' })
}

// Export the axios instance for direct use if needed
export default axiosInstance
