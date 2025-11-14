'use client'

import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setLoading, setInitialLoadComplete } from '@/store/slices/loadingSlice'

export default function LoadingScreen() {
  const { isLoading } = useAppSelector(state => state.loading)
  const dispatch = useAppDispatch()
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Animate progress bar (loading is already true from initial state)
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          dispatch(setInitialLoadComplete())
          return 100
        }
        return prev + 2 // Increase by 2% every 40ms
      })
    }, 40)

    return () => {
      clearInterval(progressInterval)
    }
  }, [dispatch])

  if (!isLoading) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] h-screen w-screen bg-[radial-gradient(circle_at_50%_50%,_#003A81_0%,_#0D131C_30%)] flex flex-col">
      {/* Red Progress Bar at Top */}
      <div className="w-full lg:h-4 h-2 ">
        <div
          className="h-full bg-crimson rounded-r-full transition-all duration-300 ease-out"
          style={{ width: `${loadingProgress}%` }}
        />
      </div>

      {/* Centered Logo and Progress */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex justify-center items-center">
          {/* 777 Logo with Flaming Soccer Ball */}
          <img src="/images/logo.svg" className="h-[6rem]" alt="logo" />

          {/* Loading Percentage */}
        </div>
      </div>
    </div>
  )
}
