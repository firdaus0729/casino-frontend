import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from './slices/loadingSlice'
import carouselReducer from './slices/carouselSlice'
import authReducer from './slices/authSlice'
import walletReducer from './slices/walletSlice'
import i18nReducer from './slices/i18nSlice'
import userSettingsReducer from './slices/userSettingsSlice'

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    carousel: carouselReducer,
    auth: authReducer,
    wallet: walletReducer,
    i18n: i18nReducer,
    userSettings: userSettingsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
