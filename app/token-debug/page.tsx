'use client'

import React, { useState, useEffect } from 'react'
import { useAppSelector } from '@/store/hooks'
import { decodeToken, isTokenExpired, getTokenTimeUntilExpiry } from '@/lib/token-utils'

const TokenDebugPage: React.FC = () => {
  const { token, user, isAuthenticated } = useAppSelector(state => state.auth)
  const [tokenInfo, setTokenInfo] = useState<any>(null)

  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token)
      const expired = isTokenExpired(token)
      const timeUntilExpiry = getTokenTimeUntilExpiry(token)
      
      setTokenInfo({
        decoded,
        expired,
        timeUntilExpiry,
        tokenLength: token.length,
        tokenPreview: token.substring(0, 50) + '...'
      })
    }
  }, [token])

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Token Debug Page</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Auth State:</h2>
          <p>Is Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
          <p>Has Token: {token ? 'Yes' : 'No'}</p>
          <p>Has User: {user ? 'Yes' : 'No'}</p>
        </div>

        {token && tokenInfo && (
          <div>
            <h2 className="text-xl font-semibold">Token Information:</h2>
            <p>Token Length: {tokenInfo.tokenLength}</p>
            <p>Token Preview: {tokenInfo.tokenPreview}</p>
            <p>Is Expired: {tokenInfo.expired ? 'Yes' : 'No'}</p>
            <p>Time Until Expiry: {tokenInfo.timeUntilExpiry} seconds</p>
            <p>Time Until Expiry: {Math.floor(tokenInfo.timeUntilExpiry / 60)} minutes</p>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Decoded Token:</h3>
              <pre className="bg-gray-800 p-4 rounded overflow-auto">
                {JSON.stringify(tokenInfo.decoded, null, 2)}
              </pre>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold">Local Storage:</h2>
          <p>Auth Token: {localStorage.getItem('auth_token') ? 'Present' : 'Not Present'}</p>
          <p>Auth User: {localStorage.getItem('auth_user') ? 'Present' : 'Not Present'}</p>
        </div>
      </div>
    </div>
  )
}

export default TokenDebugPage
