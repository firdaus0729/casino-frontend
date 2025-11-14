'use client'

import React, { useState, useEffect } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface PageLoaderProps {
  message?: string
}

const PageLoader: React.FC<PageLoaderProps> = ({ message = 'Loading...' }) => {
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(progressInterval)
  }, [])

  return (
    <div className="fixed inset-0 loading-bg flex flex-col z-[9999]">
      {/* Red Progress Bar at Top */}
      <div className="w-full lg:h-4 h-2">
        <div
          className="h-full bg-crimson rounded-r-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(loadingProgress, 100)}%` }}
        />
      </div>

      {/* Centered Logo */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex justify-center items-center">
          {/* 777 Logo with Flaming Soccer Ball */}
          <img src="/images/logo.svg" className="h-[96px]" alt="logo" />
        </div>
      </div>
    </div>
  )
}

export default PageLoader
