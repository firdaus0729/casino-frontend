import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Locale =
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'zh'
  | 'ja'
  | 'ko'
  | 'pt'
  | 'pl'
  | 'uk'

export interface Translation {
  [key: string]: string | Translation
}

export interface LocaleData {
  [namespace: string]: Translation
}

interface I18nState {
  currentLocale: Locale
  translations: LocaleData
  isLoading: boolean
  error: string | null
}

const initialState: I18nState = {
  currentLocale: 'en',
  translations: {},
  isLoading: false,
  error: null,
}

const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<Locale>) => {
      state.currentLocale = action.payload
      state.error = null
    },
    setTranslations: (state, action: PayloadAction<LocaleData>) => {
      state.translations = action.payload
      state.isLoading = false
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearTranslations: (state) => {
      state.translations = {}
      state.error = null
    },
  },
})

export const {
  setLocale,
  setTranslations,
  setLoading,
  setError,
  clearTranslations,
} = i18nSlice.actions

export default i18nSlice.reducer
