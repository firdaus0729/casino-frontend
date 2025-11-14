import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LoadingState {
  isLoading: boolean
  isInitialLoad: boolean
}

const initialState: LoadingState = {
  isLoading: true, // Start with loading true for immediate loading screen
  isInitialLoad: true, // Start with initial load true
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    // Set loading state (used for initial page load)
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },

    // Mark initial load as complete (called after first page load)
    setInitialLoadComplete: state => {
      state.isInitialLoad = false
      state.isLoading = false
    },

    // Reset loading state (for development/testing)
    resetLoadingState: state => {
      state.isLoading = true
      state.isInitialLoad = true
    },
  },
})

export const { setLoading, setInitialLoadComplete, resetLoadingState } =
  loadingSlice.actions
export default loadingSlice.reducer
