'use client'

import React, { useState } from 'react'
import MetaMaskLogin from '@/components/auth/MetaMaskLogin'
import { metaMaskService } from '@/lib/metamask'

export default function MetaMaskDemoPage() {
  const [loginData, setLoginData] = useState<{
    token: string
    user: any
    address: string
  } | null>(null)

  const handleLoginSuccess = (data: { token: string; user: any; address: string }) => {
    setLoginData(data)
    console.log('Login successful:', data)
  }

  const handleLoginError = (error: string) => {
    console.error('Login failed:', error)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🦊 MetaMask Authentication Demo
          </h1>
          
          <p className="text-gray-600 mb-8">
            This demo showcases the complete MetaMask login flow with JWT token authentication.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {/* MetaMask Login Component */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Authentication</h2>
              <MetaMaskLogin
                onLoginSuccess={handleLoginSuccess}
                onLoginError={handleLoginError}
                className="border border-gray-200"
              />
            </div>

            {/* User Information Display */}
            <div>
              <h2 className="text-xl font-semibold mb-4">User Information</h2>
              
              {loginData ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-3">✅ Authenticated User</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Wallet Address:</span>
                      <div className="font-mono text-gray-900 bg-gray-100 p-2 rounded mt-1 break-all">
                        {loginData.address}
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-700">Formatted Address:</span>
                      <div className="font-mono text-gray-900 bg-gray-100 p-2 rounded mt-1">
                        {metaMaskService.formatAddress(loginData.address)}
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-700">User Type:</span>
                      <span className="ml-2 text-gray-900">{loginData.user.type}</span>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-700">JWT Token (Formatted):</span>
                      <div className="font-mono text-gray-900 bg-gray-100 p-2 rounded mt-1 break-all">
                        {metaMaskService.formatToken(loginData.token)}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-500 text-center">
                    Please connect your MetaMask wallet to see user information
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              📋 How it Works
            </h3>
            
            <div className="space-y-2 text-sm text-blue-700">
              <div className="flex items-start gap-2">
                <span className="font-bold">1.</span>
                <span>Click "Login with MetaMask" to connect your wallet</span>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="font-bold">2.</span>
                <span>Backend generates a random nonce for your wallet address</span>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="font-bold">3.</span>
                <span>MetaMask prompts you to sign a message containing the nonce</span>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="font-bold">4.</span>
                <span>Backend verifies your signature and issues a JWT token</span>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="font-bold">5.</span>
                <span>JWT token is stored locally and used for authenticated requests</span>
              </div>
            </div>
          </div>

          {/* API Endpoints */}
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🔗 API Endpoints
            </h3>
            
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-mono bg-gray-200 px-2 py-1 rounded">POST</span>
                <span className="ml-2 font-mono text-gray-700">/api/v1/users/auth/nonce</span>
                <span className="ml-2 text-gray-600">- Generate nonce for wallet authentication</span>
              </div>
              
              <div>
                <span className="font-mono bg-gray-200 px-2 py-1 rounded">POST</span>
                <span className="ml-2 font-mono text-gray-700">/api/v1/users/auth/verify</span>
                <span className="ml-2 text-gray-600">- Verify signature and get JWT token</span>
              </div>
              
              <div>
                <span className="font-mono bg-gray-200 px-2 py-1 rounded">GET</span>
                <span className="ml-2 font-mono text-gray-700">/api/v1/users/profile-metamask</span>
                <span className="ml-2 text-gray-600">- Get user profile (requires JWT)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
