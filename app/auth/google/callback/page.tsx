'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { googleLogin, fetchProfile } from '@/store/slices/authSlice'

export default function GoogleCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const code = searchParams.get('code')
    const tokenFromRedirect = searchParams.get('token')
    const error = searchParams.get('error')

    if (error) {
      console.error('Google OAuth error:', error)
      alert('Google login failed: ' + error)
      router.push('/')
      return
    }

    // If server redirected with token, use it directly
    if (tokenFromRedirect) {
      console.log('Google OAuth: Using token from redirect:', tokenFromRedirect.substring(0, 20) + '...')
      dispatch(googleLogin({ code: tokenFromRedirect }))
        .unwrap()
        .then(() => {
          console.log('Google OAuth: Token saved, fetching profile...')
          return dispatch(fetchProfile()).unwrap()
        })
        .then(() => {
          console.log('Google OAuth: Profile fetched, redirecting to home')
          router.push('/')
        })
        .catch((err) => {
          console.error('Google OAuth error:', err)
          router.push('/')
        })
      return
    }

    if (!code) { router.push('/'); return }

    // Dispatch Google login with the authorization code
    console.log('Google OAuth: Using authorization code:', code.substring(0, 20) + '...')
    dispatch(googleLogin({ code }))
      .unwrap()
      .then(() => {
        console.log('Google OAuth: Token saved, fetching profile...')
        // Fetch user profile after successful login
        return dispatch(fetchProfile()).unwrap()
      })
      .then(() => {
        console.log('Google OAuth: Profile fetched, redirecting to home')
        alert('Google login successful!')
        router.push('/')
      })
      .catch((err) => {
        console.error('Google login failed:', err)
        const message = err instanceof Error ? err.message : 'Google login failed'
        alert(message)
        router.push('/')
      })
  }, [searchParams, dispatch, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-mirage">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dodger-blue mx-auto mb-4"></div>
        <p className="text-white text-lg">Processing Google login...</p>
      </div>
    </div>
  )
}
