import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserSettingsState {
  emailVerified: Record<number, boolean> // userId -> emailVerified status
  withdrawPasswordSet: Record<number, boolean> // userId -> withdrawPasswordSet status
  selectedLanguage: string | null
}

const initialState: UserSettingsState = {
  emailVerified: {},
  withdrawPasswordSet: {},
  selectedLanguage: null,
}

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    setEmailVerified: (state, action: PayloadAction<{ userId: number; verified: boolean }>) => {
      state.emailVerified[action.payload.userId] = action.payload.verified
    },
    setWithdrawPasswordSet: (state, action: PayloadAction<{ userId: number; set: boolean }>) => {
      state.withdrawPasswordSet[action.payload.userId] = action.payload.set
    },
    setSelectedLanguage: (state, action: PayloadAction<string>) => {
      state.selectedLanguage = action.payload
    },
    clearUserSettings: (state, action: PayloadAction<number>) => {
      // Clear settings for a specific user (useful when user logs out)
      delete state.emailVerified[action.payload]
      delete state.withdrawPasswordSet[action.payload]
    },
    clearAllUserSettings: (state) => {
      state.emailVerified = {}
      state.withdrawPasswordSet = {}
      state.selectedLanguage = null
    },
  },
})

export const {
  setEmailVerified,
  setWithdrawPasswordSet,
  setSelectedLanguage,
  clearUserSettings,
  clearAllUserSettings,
} = userSettingsSlice.actions

export default userSettingsSlice.reducer
