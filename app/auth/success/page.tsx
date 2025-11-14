'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { setAuthToken } from '@/lib/auth'
import { fetchProfile } from '@/store/slices/authSlice'
import { useToast } from '@/context/ToastProvider'
import { useSidebar } from '@/context/SidebarProvider'

export default function AuthSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const { showSuccess, showError } = useToast()
  const { toggleAuthModal } = useSidebar()
  const [isProcessing, setIsProcessing] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleAuthSuccess = async () => {
      try {
        const token = searchParams.get('token')
        
        if (!token) {
          setError('No authentication token provided')
          setIsProcessing(false)
          return
        }

        console.log('Auth success page - token received:', token.substring(0, 20) + '...')

        // Save token to localStorage and set auth state
        setAuthToken(token)
        
        // Dispatch auth change event to notify other components
        window.dispatchEvent(new CustomEvent('AUTH_CHANGED_EVENT'))
        
        // Fetch user profile
        await dispatch(fetchProfile())
        
        showSuccess('Success', 'Successfully logged in with Telegram!')
        
        // Close auth modal if open
        toggleAuthModal()
        
        // Redirect to home page
        router.push('/')
        
      } catch (err) {
        console.error('Auth success error:', err)
        const errorMessage = err instanceof Error ? err.message : 'Authentication failed'
        setError(errorMessage)
        showError('Error', errorMessage)
        setIsProcessing(false)
      }
    }

    handleAuthSuccess()
  }, [searchParams, dispatch, showSuccess, showError, toggleAuthModal, router])

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-mirage flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-dodger-blue border-t-transparent rounded-full mx-auto mb-4" />
          <h2 className="text-white text-xl font-bold mb-2">Processing Authentication</h2>
          <p className="text-casper">Please wait while we complete your login...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-mirage flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 mb-4">
            <h2 className="text-red-400 text-xl font-bold mb-2">Authentication Failed</h2>
            <p className="text-red-300 mb-4">{error}</p>
            <button
              onClick={() => router.push('/')}
              className="bg-dodger-blue text-white px-6 py-2 rounded-lg hover:bg-dodger-blue/80 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-mirage flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin h-12 w-12 border-4 border-dodger-blue border-t-transparent rounded-full mx-auto mb-4" />
        <h2 className="text-white text-xl font-bold mb-2">Redirecting...</h2>
        <p className="text-casper">Taking you to the casino...</p>
      </div>
    </div>
  )
}

