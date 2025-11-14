import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { API_BASE_URL, API_ENDPOINTS, ExchangeCurrencyRequest, ExchangeCurrencyResponse, FetchTransactionsRequest, FetchTransactionsResponse, WalletTransaction, WalletBetItem, WalletBetsResponse, WithdrawRequest, WithdrawResponse } from '../../types/api'
import { validateJWT } from '../../lib/jwt'
import { apiGet, apiPost } from '../../lib/axios'

interface WalletBalanceItem { currency: string; amount: number }
interface WalletAddressItem { blockchain: string; publicKey: string }

interface WalletState {
  balances: WalletBalanceItem[]
  addresses: WalletAddressItem[]
  transactions: WalletTransaction[]
  bets: WalletBetItem[]
  isLoading: boolean
  error: string | null
}

const initialState: WalletState = {
  balances: [],
  addresses: [],
  transactions: [],
  bets: [],
  isLoading: false,
  error: null,
}

// Axios-based API request function (replacing the old fetch-based one)
const apiRequest = async <T>(endpoint: string, config: any = {}): Promise<T> => {
  try {
    const response = await apiGet<T>(endpoint, config)
    return response
  } catch (error) {
    throw error
  }
}

export const fetchWalletInfo = createAsyncThunk<
  { code: number; message?: string; data?: { balances: WalletBalanceItem[]; addresses: WalletAddressItem[] } },
  void,
  { rejectValue: string; state: any }
>('wallet/fetchWalletInfo', async (_, { rejectWithValue, getState }) => {
  try {
    const token = (getState() as any).auth.token as string | null
    console.log("token:=====================>", token)
    
    // if (!token) throw new Error('Not authenticated')
    
    // Validate token before making request
    // const tokenValidation = validateJWT(token)
    // if (!tokenValidation.isValid) {
    //   throw new Error(`Invalid token: ${tokenValidation.error}`)
    // }
    // if (tokenValidation.isExpired) {
    //   throw new Error(`Token expired: ${tokenValidation.error}`)
    // }
    
    // Use Axios to fetch wallet info
    const response = await apiGet<{ code: number; message?: string; data?: { balances: WalletBalanceItem[]; addresses: WalletAddressItem[] } }>(
      API_ENDPOINTS.WALLET_INFO
    )
    console.log('Wallet API Response:=====================>', response.data)
    return response
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch wallet info')
  }
})

// Fetch last bets
export const fetchWalletBets = createAsyncThunk<
  WalletBetsResponse,
  void,
  { rejectValue: string; state: any }
>('wallet/fetchWalletBets', async (_, { rejectWithValue, getState }) => {
  try {
    const token = (getState() as any).auth.token as string | null
    if (!token) throw new Error('Not authenticated')
    const response = await apiGet<WalletBetsResponse>(
      API_ENDPOINTS.WALLET_BETS
    )
    return response
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch bets')
  }
})

// Withdraw crypto
export const withdrawCrypto = createAsyncThunk<
  WithdrawResponse,
  WithdrawRequest,
  { rejectValue: string; state: any }
>('wallet/withdrawCrypto', async (payload, { rejectWithValue, getState }) => {
  try {
    const token = (getState() as any).auth.token as string | null
    if (!token) throw new Error('Not authenticated')
    const response = await apiPost<WithdrawResponse>(
      API_ENDPOINTS.WALLET_WITHDRAW,
      payload
    )
    return response
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to withdraw')
  }
})

// Exchange currency
export const exchangeCurrency = createAsyncThunk<
  ExchangeCurrencyResponse,
  ExchangeCurrencyRequest,
  { rejectValue: string }
>('wallet/exchangeCurrency', async (payload, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { auth: { token: string } }
    const token = state.auth.token
    if (!token) throw new Error('Not authenticated')
    
    const response = await apiPost<ExchangeCurrencyResponse>(
      API_ENDPOINTS.EXCHANGE_CURRENCY,
      payload
    )
    return response
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Currency exchange failed'
    )
  }
})

// Fetch transactions
export const fetchTransactions = createAsyncThunk<
  FetchTransactionsResponse,
  FetchTransactionsRequest,
  { rejectValue: string }
>('wallet/fetchTransactions', async (payload, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { auth: { token: string } }
    const token = state.auth.token
    if (!token) throw new Error('Not authenticated')
    
    const response = await apiGet<FetchTransactionsResponse>(
      `${API_ENDPOINTS.TRANSACTIONS}?currency=${payload.currency}`
    )
    return response
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to fetch transactions'
    )
  }
})

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    clearWallet(state) {
      state.balances = []
      state.addresses = []
      state.transactions = []
      state.bets = []
      state.error = null
      state.isLoading = false
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWalletInfo.pending, state => {
        state.isLoading = true
        state.error = null
      })
      // Fetch wallet bets cases
      .addCase(fetchWalletBets.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchWalletBets.fulfilled, (state, action) => {
        state.isLoading = false
        state.bets = action.payload.data || []
      })
      .addCase(fetchWalletBets.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Failed to fetch bets'
      })
      // Withdraw cases
      .addCase(withdrawCrypto.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(withdrawCrypto.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(withdrawCrypto.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Failed to withdraw'
      })
      .addCase(fetchWalletInfo.fulfilled, (state, action) => {
        state.isLoading = false
        state.balances = action.payload.data?.balances || []
        state.addresses = action.payload.data?.addresses || []
      })
      .addCase(fetchWalletInfo.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Failed to fetch wallet info'
      })
      // Exchange currency cases
      .addCase(exchangeCurrency.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(exchangeCurrency.fulfilled, (state, action) => {
        state.isLoading = false
        // Refresh wallet balances after successful exchange
        // The actual balance update will be handled by refetching wallet info
      })
      .addCase(exchangeCurrency.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Currency exchange failed'
      })
      // Fetch transactions cases
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false
        state.transactions = action.payload.data || []
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Failed to fetch transactions'
      })
  },
})

export const { clearWallet } = walletSlice.actions
export default walletSlice.reducer


