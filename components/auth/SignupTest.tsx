'use client'

import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { signupUser, clearError, clearSignupStatus } from '../../store/slices/authSlice'
import { SignupRequest } from '../../types/api'

const SignupTest: React.FC = () => {
  const dispatch = useAppDispatch()
  const { signupStatus, error, isAuthenticated, user } = useAppSelector(state => state.auth)

  const handleTestSignup = async () => {
    const testData: SignupRequest = {
      email: 'test@example.com',
      password: 'password123',
      referralCode: 'TEST123'
    }

    try {
      await dispatch(signupUser(testData)).unwrap()
      console.log('Signup successful!')
    } catch (error) {
      console.error('Signup failed:', error)
    }
  }

  const handleClearStatus = () => {
    dispatch(clearError())
    dispatch(clearSignupStatus())
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-white text-lg mb-4">Signup Test Component</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-gray-300">Status: <span className="text-white">{signupStatus}</span></p>
          <p className="text-gray-300">Authenticated: <span className="text-white">{isAuthenticated ? 'Yes' : 'No'}</span></p>
          {user && (
            <p className="text-gray-300">User: <span className="text-white">{user.email}</span></p>
          )}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
            <p className="text-red-400">Error: {error}</p>
          </div>
        )}

        {signupStatus === 'succeeded' && (
          <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
            <p className="text-green-400">Signup successful!</p>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleTestSignup}
            disabled={signupStatus === 'loading'}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {signupStatus === 'loading' ? 'Signing up...' : 'Test Signup'}
          </button>
          
          <button
            onClick={handleClearStatus}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Clear Status
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignupTest
