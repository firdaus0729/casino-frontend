import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CarouselState {
  // Main banner carousel state
  mainBannerCurrentSlide: number
  // Other carousels can be added here as needed
  newLaunchesCurrentSlide: number
  liveCasinoCurrentSlide: number
  slotsCurrentSlide: number
  hashCurrentSlide: number
  sportCurrentSlide: number
  futuresCurrentSlide: number
  cryptograCurrentSlide: number
  tableGamesCurrentSlide: number
  latestEarningsCurrentSlide: number
  gameManufacturersCurrentSlide: number
}

const initialState: CarouselState = {
  mainBannerCurrentSlide: 0,
  newLaunchesCurrentSlide: 0,
  liveCasinoCurrentSlide: 0,
  slotsCurrentSlide: 0,
  hashCurrentSlide: 0,
  sportCurrentSlide: 0,
  futuresCurrentSlide: 0,
  cryptograCurrentSlide: 0,
  tableGamesCurrentSlide: 0,
  latestEarningsCurrentSlide: 0,
  gameManufacturersCurrentSlide: 0,
}

const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {
    setMainBannerSlide: (state, action: PayloadAction<number>) => {
      state.mainBannerCurrentSlide = action.payload
    },
    setNewLaunchesSlide: (state, action: PayloadAction<number>) => {
      state.newLaunchesCurrentSlide = action.payload
    },
    setLiveCasinoSlide: (state, action: PayloadAction<number>) => {
      state.liveCasinoCurrentSlide = action.payload
    },
    setSlotsSlide: (state, action: PayloadAction<number>) => {
      state.slotsCurrentSlide = action.payload
    },
    setHashSlide: (state, action: PayloadAction<number>) => {
      state.hashCurrentSlide = action.payload
    },
    setSportSlide: (state, action: PayloadAction<number>) => {
      state.sportCurrentSlide = action.payload
    },
    setFuturesSlide: (state, action: PayloadAction<number>) => {
      state.futuresCurrentSlide = action.payload
    },
    setCryptograSlide: (state, action: PayloadAction<number>) => {
      state.cryptograCurrentSlide = action.payload
    },
    setTableGamesSlide: (state, action: PayloadAction<number>) => {
      state.tableGamesCurrentSlide = action.payload
    },
    setLatestEarningsSlide: (state, action: PayloadAction<number>) => {
      state.latestEarningsCurrentSlide = action.payload
    },
    setGameManufacturersSlide: (state, action: PayloadAction<number>) => {
      state.gameManufacturersCurrentSlide = action.payload
    },
    // Reset all carousel states
    resetAllCarousels: state => {
      Object.assign(state, initialState)
    },
  },
})

export const {
  setMainBannerSlide,
  setNewLaunchesSlide,
  setLiveCasinoSlide,
  setSlotsSlide,
  setHashSlide,
  setSportSlide,
  setFuturesSlide,
  setCryptograSlide,
  setTableGamesSlide,
  setLatestEarningsSlide,
  setGameManufacturersSlide,
  resetAllCarousels,
} = carouselSlice.actions

export default carouselSlice.reducer
