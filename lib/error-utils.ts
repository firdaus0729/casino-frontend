import { AxiosError } from 'axios'

/**
 * Interface for backend error response structure
 */
interface BackendErrorResponse {
  message?: string
  error?: string
  errors?: string[]
  code?: number
  status?: number
  details?: string
  reason?: string
  data?: {
    message?: string
    error?: string
    errors?: string[]
  }
}

/**
 * Extracts error message from various error sources
 * Priority: Backend response message > Backend error > Axios message > Fallback
 */
export const extractErrorMessage = (error: unknown, fallbackMessage: string = 'An error occurred'): string => {
  // Handle Axios errors (most common)
  if (error && typeof error === 'object' && 'isAxiosError' in error && error.isAxiosError) {
    const axiosError = error as AxiosError<BackendErrorResponse>
    
    // Log the full error for debugging
    console.log('Extracting error message from Axios error:', {
      status: axiosError.response?.status,
      data: axiosError.response?.data,
      message: axiosError.message,
      fullError: axiosError
    })
    
    // Try to extract message from backend response
    if (axiosError.response?.data) {
      const backendData = axiosError.response.data
      
      // Check for message in different possible locations
      if (backendData.message) {
        console.log('Using backend message:', backendData.message)
        return backendData.message
      }
      
      if (backendData.error) {
        console.log('Using backend error:', backendData.error)
        return backendData.error
      }
      
      if (backendData.data?.message) {
        console.log('Using nested backend message:', backendData.data.message)
        return backendData.data.message
      }
      
      if (backendData.data?.error) {
        console.log('Using nested backend error:', backendData.data.error)
        return backendData.data.error
      }
      
      if (backendData.errors && Array.isArray(backendData.errors) && backendData.errors.length > 0) {
        console.log('Using backend errors array:', backendData.errors[0])
        return backendData.errors[0]
      }
      
      // Check for common backend error patterns
      if (backendData.details && typeof backendData.details === 'string') {
        console.log('Using backend details:', backendData.details)
        return backendData.details
      }
      
      if (backendData.reason && typeof backendData.reason === 'string') {
        console.log('Using backend reason:', backendData.reason)
        return backendData.reason
      }
      
      // If we have response data but no specific message, show the status
      if (axiosError.response.status) {
        console.log('Using status-based message for status:', axiosError.response.status)
      }
    }
    
    // Check for HTTP status-specific messages
    if (axiosError.response?.status) {
      switch (axiosError.response.status) {
        case 400:
          return 'Invalid request. Please check your input and try again.'
        case 401:
          return 'Authentication failed. Please log in again.'
        case 403:
          return 'Access denied. You do not have permission to perform this action.'
        case 404:
          return 'Resource not found. Please try again.'
        case 409:
          return 'Conflict. This action cannot be completed due to a conflict.'
        case 422:
          return 'Validation failed. Please check your input and try again.'
        case 429:
          return 'Too many requests. Please wait a moment and try again.'
        case 500:
          return 'Server error. Please try again later.'
        case 502:
          return 'Service temporarily unavailable. Please try again later.'
        case 503:
          return 'Service temporarily unavailable. Please try again later.'
        default:
          return axiosError.message || fallbackMessage
      }
    }
    
    // Fallback to Axios error message
    return axiosError.message || fallbackMessage
  }
  
  // Handle Error objects
  if (error instanceof Error) {
    return error.message
  }
  
  // Handle string errors
  if (typeof error === 'string') {
    return error
  }
  
  // Handle objects with message property
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message
  }
  
  // Fallback
  return fallbackMessage
}

/**
 * Extracts error details for logging purposes
 */
export const extractErrorDetails = (error: unknown): { message: string; status?: number; data?: any } => {
  if (error && typeof error === 'object' && 'isAxiosError' in error && error.isAxiosError) {
    const axiosError = error as AxiosError
    return {
      message: extractErrorMessage(error),
      status: axiosError.response?.status,
      data: axiosError.response?.data
    }
  }
  
  return {
    message: extractErrorMessage(error)
  }
}

/**
 * Creates a standardized error object for consistent error handling
 */
export const createStandardError = (error: unknown, fallbackMessage: string = 'An error occurred') => {
  const message = extractErrorMessage(error, fallbackMessage)
  const details = extractErrorDetails(error)
  
  return {
    message,
    status: details.status,
    data: details.data,
    originalError: error
  }
}

/**
 * Checks if an error is a network error (no response from server)
 */
export const isNetworkError = (error: unknown): boolean => {
  if (error && typeof error === 'object' && 'isAxiosError' in error && error.isAxiosError) {
    const axiosError = error as AxiosError
    return !axiosError.response && axiosError.request
  }
  return false
}

/**
 * Checks if an error is a timeout error
 */
export const isTimeoutError = (error: unknown): boolean => {
  if (error && typeof error === 'object' && 'isAxiosError' in error && error.isAxiosError) {
    const axiosError = error as AxiosError
    return axiosError.code === 'ECONNABORTED' || axiosError.message.includes('timeout')
  }
  return false
}

/**
 * Extracts success message from backend response
 */
export const extractSuccessMessage = (response: any, fallbackMessage: string = 'Operation completed successfully'): string => {
  if (!response) return fallbackMessage
  
  // Check for message in different possible locations
  if (response.message) {
    console.log('Using backend success message:', response.message)
    return response.message
  }
  
  if (response.data?.message) {
    console.log('Using nested backend success message:', response.data.message)
    return response.data.message
  }
  
  if (response.data?.success && typeof response.data.success === 'string') {
    console.log('Using backend success field:', response.data.success)
    return response.data.success
  }
  
  return fallbackMessage
}

/**
 * Extracts backend response message (success or error)
 */
export const extractBackendMessage = (response: any, isError: boolean = false): string => {
  if (isError) {
    return extractErrorMessage(response, 'An error occurred')
  } else {
    return extractSuccessMessage(response, 'Operation completed successfully')
  }
}
