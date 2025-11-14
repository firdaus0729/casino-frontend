import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  SignupRequest,
  SignupResponse,
  LoginRequest,
  LoginResponse,
  User,
  API_BASE_URL,
  API_ENDPOINTS,
  ProfileResponse,
  ReferralInfoResponse,
  SetTelegramRequest,
  SetTelegramResponse,
  SetWithdrawPasswordRequest,
  SetWithdrawPasswordResponse,
  SetAvatarRequest,
  SetAvatarResponse,
  GoogleOAuthResponse,
  VerifyEmailCodeRequest,
  VerifyEmailCodeResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  SetPasswordRequest,
  SetPasswordResponse,
  SetNameRequest,
} from '../../types/api'
import { apiService } from '../../lib/api'
import { setAuthToken as setAuthTokenEvent } from '../../lib/auth'
import { setAuthCookie, clearAuthCookie } from '../../lib/auth-cookies'
import { extractErrorMessage } from '../../lib/error-utils'
import { cleanupLocalStorage } from '../../lib/localStorage-utils'

// Auth State Interface
interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  signupStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  loginStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  tonAuthStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  hasPassword: boolean
}

// Initial State
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  signupStatus: 'idle',
  loginStatus: 'idle',
  tonAuthStatus: 'idle',
  hasPassword: false,
}

// Load auth state from localStorage
const loadAuthState = (): Partial<AuthState> => {
  if (typeof window === 'undefined') return {}

  try {
    const savedToken = localStorage.getItem('auth_token')

    if (savedToken) {
      // Set cookie when loading from localStorage
      setAuthCookie(savedToken)
      return {
        token: savedToken,
        isAuthenticated: true,
      }
    }
  } catch (error) {
    console.warn('Failed to load auth state from localStorage:', error)
  }

  return {}
}

// Save auth state to localStorage and cookies (only token, not user data)
const saveAuthState = (token: string) => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem('auth_token', token)
    setAuthCookie(token) // Set cookie for middleware access
  } catch (error) {
    console.warn('Failed to save auth state to localStorage:', error)
  }
}

// Clear auth state from localStorage and cookies
const clearAuthState = () => {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem('auth_token')
    clearAuthCookie() // Clear cookie for middleware

    // Clean up any remaining non-essential localStorage data
    cleanupLocalStorage()
  } catch (error) {
    console.warn('Failed to clear auth state from localStorage:', error)
  }
}

// Helper function to detect if user is a Google OAuth user
// Only use reliable detection methods - provider field and localStorage flags
const isGoogleOAuthUser = (user: User | null): boolean => {
  if (!user) return false

  console.log('isGoogleOAuthUser - Checking user:', {
    id: user.id,
    email: user.email,
    provider: user.provider,
    isVerified: user.isVerified,
    hasWithdrawPassword: user.hasWithdrawPassword,
  })

  // PRIMARY DETECTION: Check provider field
  if (user.provider === 'google') {
    console.log('isGoogleOAuthUser - Provider detection: google')
    return true
  }

  // SECONDARY DETECTION: Check localStorage flag set during Google OAuth login
  if (typeof window !== 'undefined') {
    const googleOAuthFlag = localStorage.getItem(
      `is_google_oauth_user_${user.id}`
    )
    if (googleOAuthFlag === 'true') {
      console.log('isGoogleOAuthUser - localStorage flag detection: true')
      return true
    }
  }

  // No fallback detection - only use reliable indicators
  console.log('isGoogleOAuthUser - No Google OAuth indicators found')
  return false
}

// Helper function to determine if user should use set-password (no old password) vs change-password (requires old password)
const shouldUseSetPassword = (user: User | null): boolean => {
  if (!user) return false

  // Check if user has a login password by looking at localStorage
  // If they've set a password before, we should require the old password
  if (typeof window !== 'undefined') {
    const hasSetPasswordBefore = localStorage.getItem(
      `has_set_login_password_${user.id}`
    )
    if (hasSetPasswordBefore === 'true') {
      console.log(
        'shouldUseSetPassword - User has set password before, requiring old password'
      )
      return false // User has set password before, require old password
    }
  }

  // For Google OAuth users who haven't set a password yet, allow setting without old password
  const isGoogleUser = isGoogleOAuthUser(user)
  if (isGoogleUser) {
    console.log(
      'shouldUseSetPassword - Google OAuth user, allowing set-password (no old password required)'
    )
    return true
  }

  // For regular email/password users, they should always use change-password
  console.log('shouldUseSetPassword - Regular user, requiring old password')
  return false
}

// Helper function to determine if user can set/change withdrawal password
// Withdrawal password requires login password to exist
// const canSetWithdrawalPassword = (user: User | null): boolean => {
//   if (!user) return false

//   // First check the hasPassword field from backend (most reliable)
//   if (user.hasPassword !== undefined) {
//     console.log(
//       'canSetWithdrawalPassword - User hasPassword from backend:',
//       user.hasPassword
//     )
//     return user.hasPassword
//   }

//   // Fallback: Check if user has a login password by looking at localStorage
//   if (typeof window !== 'undefined') {
//     const hasSetPasswordBefore = localStorage.getItem(
//       `has_set_login_password_${user.id}`
//     )
//     if (hasSetPasswordBefore === 'true') {
//       console.log(
//         'canSetWithdrawalPassword - User has login password from localStorage'
//       )
//       return true
//     }
//   }

//   // For Google OAuth users without hasPassword field, check if they've set a login password
//   const isGoogleUser = isGoogleOAuthUser(user)
//   if (isGoogleUser) {
//     console.log(
//       'canSetWithdrawalPassword - Google OAuth user without login password'
//     )
//     return false
//   }

//   // For regular email/password users, they should be able to set withdrawal password
//   console.log(
//     'canSetWithdrawalPassword - Regular user, can set withdrawal password'
//   )
//   return true
// }

// API Helper Function - Now using ApiService which uses Axios
const apiRequest = async <T>(
  endpoint: string,
  config: RequestInit = {}
): Promise<T> => {
  // This function is kept for compatibility but now uses ApiService
  // which internally uses Axios
  const method = config.method || 'GET'
  const headers = config.headers || {}

  if (method === 'GET') {
    return apiService.get(endpoint, { headers })
  } else {
    return apiService.post(endpoint, config.body, { headers })
  }
}

// Async Thunks
export const signupUser = createAsyncThunk<
  SignupResponse,
  SignupRequest,
  { rejectValue: string }
>('auth/signupUser', async (signupData, { rejectWithValue }) => {
  try {
    const response = await apiRequest<SignupResponse>(API_ENDPOINTS.SIGNUP, {
      method: 'POST',
      body: JSON.stringify(signupData),
    })
    return response
  } catch (error) {
    console.log('SignupUser thunk catch error:', error, 'Type:', typeof error)
    const errorMessage = extractErrorMessage(error, 'An error occurred')
    console.log('Extracted error message:', errorMessage)
    return rejectWithValue(errorMessage)
  }
})

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>('auth/loginUser', async (loginData, { rejectWithValue }) => {
  try {
    const response = await apiRequest<LoginResponse>(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(loginData),
    })
    return response
  } catch (error) {
    const errorMessage = extractErrorMessage(error, 'Login failed')
    return rejectWithValue(errorMessage)
  }
})

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logoutUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState }
      const token = state.auth.token

      if (token) {
        await apiRequest(API_ENDPOINTS.LOGOUT, {
          method: 'POST',
          headers: {
            Authorization: `${token}`,
          },
        })
      }
    } catch (error) {
      // Even if logout fails on server, we should clear local state
      console.warn('Logout request failed:', error)
    }
  }
)

export const refreshToken = createAsyncThunk<
  { token: string; user: User },
  void,
  { rejectValue: string }
>('auth/refreshToken', async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { auth: AuthState }
    const token = state.auth.token

    if (!token) {
      throw new Error('No token available')
    }

    const response = await apiRequest<{ token: string; user: User }>(
      API_ENDPOINTS.REFRESH_TOKEN,
      {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
        },
      }
    )

    return response
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Token refresh failed'
    )
  }
})

// Fetch current profile (requires auth)
export const fetchProfile = createAsyncThunk<
  ProfileResponse,
  void,
  { rejectValue: string }
>('auth/fetchProfile', async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { auth: AuthState }
    const token = state.auth.token
    if (!token) throw new Error('Not authenticated')

    const response = await apiRequest<ProfileResponse>(API_ENDPOINTS.PROFILE, {
      method: 'GET',
      headers: { Authorization: `${token}` },
    })

    return response
  } catch (error) {
    console.error('Profile API error:', error)
    const errorMessage = extractErrorMessage(error, 'Failed to fetch profile')
    console.error('Error details:', {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    })
    return rejectWithValue(errorMessage)
  }
})

// Fetch referral info
export const fetchReferralInfo = createAsyncThunk<
  ReferralInfoResponse,
  void,
  { rejectValue: string }
>('auth/fetchReferralInfo', async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { auth: AuthState }
    const token = state.auth.token
    if (!token) throw new Error('Not authenticated')
    const response = await apiRequest<ReferralInfoResponse>(
      API_ENDPOINTS.REFERRAL_INFO,
      {
        method: 'GET',
        headers: { Authorization: `${token}` },
      }
    )
    return response
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to fetch referral info'
    )
  }
})

// Set Telegram username
export const setTelegram = createAsyncThunk<
  SetTelegramResponse,
  SetTelegramRequest,
  { rejectValue: string }
>('auth/setTelegram', async (payload, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { auth: AuthState }
    const token = state.auth.token
    if (!token) throw new Error('Not authenticated')
    const response = await apiRequest<SetTelegramResponse>(
      API_ENDPOINTS.SET_TELEGRAM,
      {
        method: 'POST',
        headers: { Authorization: `${token}` },
        body: JSON.stringify(payload),
      }
    )
    return response
  } catch (error) {
    const errorMessage = extractErrorMessage(error, 'Failed to set telegram')
    return rejectWithValue(errorMessage)
  }
})

// Set Withdrawal Password
export const setWithdrawPassword = createAsyncThunk<
  SetWithdrawPasswordResponse,
  SetWithdrawPasswordRequest,
  { rejectValue: string }
>(
  'auth/setWithdrawPassword',
  async (payload, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState }
      const token = state.auth.token
      if (!token) throw new Error('Not authenticated')
      const response = await apiRequest<SetWithdrawPasswordResponse>(
        API_ENDPOINTS.SET_WITHDRAW_PASSWORD,
        {
          method: 'POST',
          headers: { Authorization: `${token}` },
          body: JSON.stringify(payload),
        }
      )
      return response
    } catch (error) {
      console.log('setWithdrawPassword error:', error)
      const errorMessage = extractErrorMessage(
        error,
        'Failed to set withdrawal password'
      )
      return rejectWithValue(errorMessage)
    }
  }
)

// Set Avatar
export const setAvatar = createAsyncThunk<
  SetAvatarResponse,
  SetAvatarRequest,
  { rejectValue: string }
>('auth/setAvatar', async (payload, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { auth: AuthState }
    const token = state.auth.token
    if (!token) throw new Error('Not authenticated')

    const response = await apiRequest<SetAvatarResponse>(
      API_ENDPOINTS.SET_AVATAR,
      {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )
    return response
  } catch (error) {
    const errorMessage = extractErrorMessage(error, 'Failed to set avatar')
    return rejectWithValue(errorMessage)
  }
})

// Request email verification code (sent via email)
export const requestEmailVerification = createAsyncThunk<
  { code: number; message?: string },
  void,
  { rejectValue: string }
>('auth/requestEmailVerification', async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { auth: AuthState }
    const token = state.auth.token
    if (!token) throw new Error('Not authenticated')
    const response = await apiRequest<{ code: number; message?: string }>(
      API_ENDPOINTS.VERIFY_EMAIL,
      {
        method: 'POST',
        headers: { Authorization: `${token}` },
      }
    )
    return response
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to request verification'
    )
  }
})

// Change account password
export const changeAccountPassword = createAsyncThunk<
  { code: number; message?: string },
  { password: string; newPassword: string },
  { rejectValue: string }
>(
  'auth/changeAccountPassword',
  async (payload, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState }
      const token = state.auth.token
      if (!token) throw new Error('Not authenticated')
      const response = await apiRequest<{ code: number; message?: string }>(
        API_ENDPOINTS.CHANGE_PASSWORD,
        {
          method: 'POST',
          headers: { Authorization: `${token}` },
          body: JSON.stringify(payload),
        }
      )
      return response
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to change password'
      )
    }
  }
)

// Set display name
export const setDisplayName = createAsyncThunk<
  { code: number; message?: string; data?: { name: string } },
  { name: string },
  { rejectValue: string }
>('auth/setDisplayName', async (payload, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { auth: AuthState }
    const token = state.auth.token
    if (!token) throw new Error('Not authenticated')

    const requestPayload: SetNameRequest = { username: payload.name }
    const response = await apiRequest<{
      code: number
      message?: string
      data?: { name: string }
    }>(API_ENDPOINTS.SET_NAME, {
      method: 'POST',
      headers: { Authorization: `${token}` },
      body: JSON.stringify(requestPayload),
    })
    console.log('setDisplayName response:', response)
    return response
  } catch (error) {
    const errorMessage = extractErrorMessage(error, 'Failed to set name')
    return rejectWithValue(errorMessage)
  }
})

// Set phone number
export const setPhone = createAsyncThunk<
  { code: number; message?: string; data?: { phone: string } },
  { phone: string },
  { rejectValue: string }
>('auth/setPhone', async (payload, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { auth: AuthState }
    const token = state.auth.token
    if (!token) throw new Error('Not authenticated')
    const response = await apiRequest<{
      code: number
      message?: string
      data?: { phone: string }
    }>(API_ENDPOINTS.SET_PHONE, {
      method: 'POST',
      headers: { Authorization: `${token}` },
      body: JSON.stringify(payload),
    })
    return response
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to set phone'
    )
  }
})

// Google OAuth login
export const googleLogin = createAsyncThunk<
  GoogleOAuthResponse,
  { code: string },
  { rejectValue: string }
>('auth/googleLogin', async (payload, { rejectWithValue }) => {
  try {
    // Support both API JSON and redirected token patterns
    let response: GoogleOAuthResponse

    // If payload.code is actually a JWT token (set by server redirect), use it directly
    if (payload.code && payload.code.split('.').length === 3) {
      response = { code: 200, data: { token: payload.code } }
    } else {
      response = await apiRequest<GoogleOAuthResponse>(
        `${API_ENDPOINTS.GOOGLE_OAUTH_CALLBACK}?code=${payload.code}`,
        { method: 'GET' }
      )
    }
    return response
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Google login failed'
    )
  }
})

// Verify email with confirmation code
export const verifyEmailCode = createAsyncThunk<
  VerifyEmailCodeResponse,
  VerifyEmailCodeRequest,
  { rejectValue: string }
>('auth/verifyEmailCode', async (payload, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { auth: AuthState }
    const token = state.auth.token
    if (!token) throw new Error('Not authenticated')

    const response = await apiRequest<VerifyEmailCodeResponse>(
      API_ENDPOINTS.VERIFY_EMAIL_CODE,
      {
        method: 'POST',
        headers: { Authorization: `${token}` },
        body: JSON.stringify(payload),
      }
    )
    return response
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Email verification failed'
    )
  }
})

// Change password
export const changePassword = createAsyncThunk<
  ChangePasswordResponse,
  ChangePasswordRequest,
  { rejectValue: string }
>('auth/changePassword', async (payload, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { auth: AuthState }
    const token = state.auth.token
    if (!token) throw new Error('Not authenticated')

    const response = await apiRequest<ChangePasswordResponse>(
      API_ENDPOINTS.CHANGE_PASSWORD,
      {
        method: 'POST',
        headers: { Authorization: `${token}` },
        body: JSON.stringify(payload),
      }
    )
    return response
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Password change failed'
    )
  }
})

// Set password (for Google OAuth users who don't have a known password)
export const setPassword = createAsyncThunk<
  SetPasswordResponse,
  SetPasswordRequest,
  { rejectValue: string }
>('auth/setPassword', async (payload, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { auth: AuthState }
    const token = state.auth.token
    if (!token) throw new Error('Not authenticated')

    const response = await apiRequest<SetPasswordResponse>(
      API_ENDPOINTS.SET_PASSWORD,
      {
        method: 'POST',
        headers: { Authorization: `${token}` },
        body: JSON.stringify(payload),
      }
    )
    return response
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Password setting failed'
    )
  }
})

// TON Wallet Authentication
export const tonLogin = createAsyncThunk<
  { token: string; user: any },
  {
    address: string
    signature: string
    message: string
    walletStateInit?: string
  },
  { rejectValue: string }
>('auth/tonLogin', async (payload, { rejectWithValue }) => {
  try {
    // Import TonAuthService dynamically to avoid SSR issues
    const { TonAuthService } = await import('@/lib/tonAuthService')

    const response = await TonAuthService.authenticateWithTon(
      payload.address,
      payload.signature,
      payload.message,
      payload.walletStateInit
    )

    return response
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'TON authentication failed'
    )
  }
})

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    ...initialState,
    ...loadAuthState(),
  },
  reducers: {
    // Clear error
    clearError: state => {
      state.error = null
    },

    // Clear signup status
    clearSignupStatus: state => {
      state.signupStatus = 'idle'
    },

    // Clear login status
    clearLoginStatus: state => {
      state.loginStatus = 'idle'
    },

    // Clear TON auth status
    clearTonAuthStatus: state => {
      state.tonAuthStatus = 'idle'
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },

    // Manual logout (clear state without API call)
    manualLogout: state => {
      // Clear email verification status from localStorage before clearing user
      if (state.user?.id && typeof window !== 'undefined') {
        localStorage.removeItem(`email_verified_${state.user.id}`)
        console.log(
          'AuthSlice: Cleared email verification status from localStorage for user:',
          state.user.id
        )
      }
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      state.signupStatus = 'idle'
      state.loginStatus = 'idle'
      clearAuthState()
      apiService.removeAuthToken()
    },

    // Update user profile
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        saveAuthState(state.token!)
      }
    },
  },
  extraReducers: builder => {
    // Signup cases
    builder
      .addCase(signupUser.pending, state => {
        state.isLoading = true
        state.signupStatus = 'loading'
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.signupStatus = 'succeeded'
        state.error = null

        if (action.payload.data) {
          state.user = action.payload.data.user ?? null
          state.token = action.payload.data.token
          state.isAuthenticated = true
          saveAuthState(action.payload.data.token)
          apiService.setAuthToken(action.payload.data.token)
          // Notify app-level listeners (real-time state updates)
          console.log('AuthSlice: Dispatching AUTH_CHANGED_EVENT for signup')
          setAuthTokenEvent(action.payload.data.token)
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false
        state.signupStatus = 'failed'
        state.error = action.payload || 'Signup failed'
      })

    // Login cases
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true
        state.loginStatus = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.loginStatus = 'succeeded'
        state.error = null

        if (action.payload.data) {
          state.user = action.payload.data.user ?? null
          state.token = action.payload.data.token
          state.isAuthenticated = true
          saveAuthState(action.payload.data.token)
          apiService.setAuthToken(action.payload.data.token)
          // Notify listeners
          console.log('AuthSlice: Dispatching AUTH_CHANGED_EVENT for login')
          setAuthTokenEvent(action.payload.data.token)
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.loginStatus = 'failed'
        state.error = action.payload || 'Login failed'
      })

    // Logout cases
    builder
      .addCase(logoutUser.fulfilled, state => {
        // Clear email verification status from localStorage before clearing user
        if (state.user?.id && typeof window !== 'undefined') {
          localStorage.removeItem(`email_verified_${state.user.id}`)
          console.log(
            'AuthSlice: Cleared email verification status from localStorage for user:',
            state.user.id
          )
        }
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = null
        state.signupStatus = 'idle'
        state.loginStatus = 'idle'
        clearAuthState()
        apiService.removeAuthToken()
        setAuthTokenEvent(null)
      })
      .addCase(logoutUser.rejected, state => {
        // Even if logout fails on server, clear local state
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = null
        state.signupStatus = 'idle'
        state.loginStatus = 'idle'
        clearAuthState()
        apiService.removeAuthToken()
        setAuthTokenEvent(null)
      })

    // Refresh token cases
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.user = action.payload.user
        state.isAuthenticated = true
        saveAuthState(action.payload.token)
      })
      .addCase(refreshToken.rejected, state => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        clearAuthState()
      })

      // Fetch profile cases
      .addCase(fetchProfile.fulfilled, (state, action) => {
        console.log(
          'fetchProfile.fulfilled - Received payload:',
          action.payload
        )
        if (action.payload.data) {
          const p = action.payload.data
          console.log('Profile data to be stored:', p)
          console.log('Telegram field specifically:', {
            telegram: p.telegram,
            hasTelegram: !!p.telegram,
            telegramType: typeof p.telegram,
          })
          console.log('Email verification field specifically:', {
            isVerified: p.isVerified,
            hasIsVerified: p.isVerified !== undefined,
            isVerifiedType: typeof p.isVerified,
          })
          // Normalize avatar to absolute URL for consistent rendering across app
          const normalizedAvatar = p.avatar
            ? p.avatar.startsWith('/')
              ? `${API_BASE_URL}${p.avatar}`
              : p.avatar
            : undefined
          state.user = {
            id: p.id,
            email: p.email,
            name: p.name,
            phone: p.phone,
            telegram: p.telegram,
            avatar: normalizedAvatar,
            isVerified: p.isVerified || p.email_verified, // Handle both field names
            hasWithdrawPassword:
              'withdrawal_password' in (p as Record<string, unknown>)
                ? !!(p as any).withdrawal_password
                : false, // Map if present
            hasPassword: p.hasPassword, // Whether user has set a login password
            provider: state.user?.provider, // Preserve provider field from previous state
          }
          // Update stored user if token exists
          if (state.token) {
            saveAuthState(state.token)
          }
        }
      })
      // Update telegram locally after successful set
      .addCase(setTelegram.fulfilled, (state, action) => {
        console.log('setTelegram.fulfilled reducer called:', {
          payload: action.payload,
          currentUser: state.user,
          newTelegram: action.payload.data?.telegram,
        })
        if (state.user && action.payload.data?.telegram) {
          state.user = { ...state.user, telegram: action.payload.data.telegram }
          console.log('Updated user state with new telegram:', state.user)
          if (state.token) saveAuthState(state.token)
        }
      })
      // Update avatar locally after successful set
      .addCase(setAvatar.fulfilled, (state, action) => {
        console.log('setAvatar.fulfilled:', action.payload)
        const data = action.payload?.data
        if (state.user && data?.path) {
          // Construct the full avatar URL
          const avatarUrl = data.path.startsWith('http')
            ? data.path
            : `${API_BASE_URL}${data.path.startsWith('/') ? '' : '/'}${data.path}`

          state.user = { ...state.user, avatar: avatarUrl }
          if (state.token) saveAuthState(state.token)
          console.log('Updated user avatar:', avatarUrl)
        }
      })
      .addCase(setDisplayName.fulfilled, (state, action) => {
        console.log('setDisplayName.fulfilled:', action.payload)

        // Only log success - don't update state locally
        // Fresh data will be fetched from database via fetchProfile
        if (action.payload.code === 200 || action.payload.code === 0) {
          console.log(
            'Backend confirmed display name update - fresh data will be fetched from database'
          )
        } else {
          // Backend returned error - don't update state
          console.warn(
            'Backend rejected display name update:',
            action.payload.message
          )
          state.error =
            action.payload.message || 'Failed to update display name'
        }
      })
      .addCase(setDisplayName.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Failed to set name'
      })
      .addCase(setPhone.fulfilled, (state, action) => {
        if (!state.user) state.user = {}
        if (action.payload.data?.phone) {
          state.user = { ...state.user, phone: action.payload.data.phone }
          if (state.token) saveAuthState(state.token)
        }
      })
      // Update withdrawal password status after successful set
      .addCase(setWithdrawPassword.fulfilled, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, hasWithdrawPassword: true }
          if (state.token) saveAuthState(state.token)
        }
      })
      .addCase(googleLogin.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload.data?.token) {
          console.log(
            'Google OAuth: Setting token in state:',
            action.payload.data.token.substring(0, 20) + '...'
          )
          state.token = action.payload.data.token
          state.isAuthenticated = true
          apiService.setAuthToken(action.payload.data.token)

          // Set provider field for Google OAuth user
          if (state.user) {
            state.user.provider = 'google'
            console.log('Google OAuth: Set provider field to "google"')
          } else {
            // If user is not loaded yet, create a minimal user object with provider
            state.user = { provider: 'google' }
            console.log(
              'Google OAuth: Created minimal user object with provider "google"'
            )
          }

          // Mark this user as a Google OAuth user in localStorage
          if (typeof window !== 'undefined' && state.user?.id) {
            localStorage.setItem(
              `is_google_oauth_user_${state.user.id}`,
              'true'
            )
            console.log(
              'Google OAuth: Marked user as Google OAuth user in localStorage'
            )
          }

          // Always save auth state with token, even if user is not loaded yet
          saveAuthState(action.payload.data.token)
          console.log(
            'Google OAuth: Auth state saved to localStorage and cookies'
          )
          window.dispatchEvent(new CustomEvent('AUTH_CHANGED_EVENT'))
        }
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Google login failed'
      })
      // Email verification cases
      .addCase(verifyEmailCode.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(verifyEmailCode.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload.data?.verified && state.user) {
          state.user.isVerified = true
          if (state.token) {
            saveAuthState(state.token)
            // Also save to localStorage for persistent verification status
            if (typeof window !== 'undefined') {
              localStorage.setItem(
                `email_verified_${state.user.id}`,
                JSON.stringify(true)
              )
              console.log(
                'AuthSlice: Saved email verification status to localStorage for user:',
                state.user.id
              )
            }
          }
        }
      })
      .addCase(verifyEmailCode.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Email verification failed'
      })
      // Change password cases
      .addCase(changePassword.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false

        // Mark that user has set a login password before logging out
        if (state.user?.id && typeof window !== 'undefined') {
          localStorage.setItem(
            `has_set_login_password_${state.user.id}`,
            'true'
          )
          console.log(
            'Password changed successfully - marked user as having set login password before'
          )
        }

        // Force logout after successful password change
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = null
        state.signupStatus = 'idle'
        state.loginStatus = 'idle'
        // Clear auth state from localStorage
        clearAuthState()
        apiService.removeAuthToken()
        setAuthTokenEvent(null)
        // Dispatch auth change event
        window.dispatchEvent(new CustomEvent('AUTH_CHANGED_EVENT'))
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Password change failed'
      })
      // Set password cases (for Google OAuth users)
      .addCase(setPassword.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(setPassword.fulfilled, (state, action) => {
        state.isLoading = false

        // Mark that user has set a login password before logging out
        if (state.user?.id && typeof window !== 'undefined') {
          localStorage.setItem(
            `has_set_login_password_${state.user.id}`,
            'true'
          )
          console.log(
            'Password set successfully - marked user as having set login password before'
          )
        }

        // Force logout after successful password setting
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = null
        state.signupStatus = 'idle'
        state.loginStatus = 'idle'
        // Clear auth state from localStorage
        clearAuthState()
        apiService.removeAuthToken()
        setAuthTokenEvent(null)
        // Dispatch auth change event
        window.dispatchEvent(new CustomEvent('AUTH_CHANGED_EVENT'))
      })
      .addCase(setPassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Password setting failed'
      })
      // TON Login cases
      .addCase(tonLogin.pending, state => {
        state.isLoading = true
        state.tonAuthStatus = 'loading'
        state.error = null
      })
      .addCase(tonLogin.fulfilled, (state, action) => {
        state.isLoading = false
        state.tonAuthStatus = 'succeeded'
        state.error = null

        if (action.payload) {
          state.user = action.payload.user
          state.token = action.payload.token
          state.isAuthenticated = true
          saveAuthState(action.payload.token)
          apiService.setAuthToken(action.payload.token)
          // Notify listeners
          console.log('AuthSlice: Dispatching AUTH_CHANGED_EVENT for TON login')
          setAuthTokenEvent(action.payload.token)
        }
      })
      .addCase(tonLogin.rejected, (state, action) => {
        state.isLoading = false
        state.tonAuthStatus = 'failed'
        state.error = action.payload || 'TON authentication failed'
      })
  },
})

export const {
  clearError,
  clearSignupStatus,
  clearLoginStatus,
  clearTonAuthStatus,
  setLoading,
  manualLogout,
  updateUserProfile,
} = authSlice.actions

// Helper function to determine if email verification buttons should be shown
// Clean conditional logic based on provider and verification status
const shouldShowEmailVerificationButtons = (user: User | null): boolean => {
  if (!user) {
    console.log(
      'shouldShowEmailVerificationButtons - No user data, showing buttons'
    )
    return true // Show buttons if no user data
  }

  const isGoogleUser = isGoogleOAuthUser(user)
  console.log('shouldShowEmailVerificationButtons - User check:', {
    userId: user.id,
    email: user.email,
    provider: user.provider,
    isVerified: user.isVerified,
    isGoogleUser,
    hasWithdrawPassword: user.hasWithdrawPassword,
  })

  // Hide buttons if user is Google OAuth (already verified by Google)
  if (isGoogleUser) {
    console.log(
      'shouldShowEmailVerificationButtons - Google OAuth user detected, hiding buttons'
    )
    return false
  }

  // Hide buttons if email is already verified
  if (user.isVerified) {
    console.log(
      'shouldShowEmailVerificationButtons - Email already verified, hiding buttons'
    )
    return false
  }

  // Show buttons for unverified email/password users
  console.log(
    'shouldShowEmailVerificationButtons - Showing buttons for unverified user'
  )
  return true
}

// Export helper functions for detecting Google OAuth users and password setting logic
export {
  isGoogleOAuthUser,
  shouldUseSetPassword,
  shouldShowEmailVerificationButtons,
  // canSetWithdrawalPassword,
}

export default authSlice.reducer
