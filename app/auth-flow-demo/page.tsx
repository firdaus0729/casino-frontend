'use client'

import React, { useState } from 'react'
import MultiStepAuthFlow from '@/components/auth/MultiStepAuthFlow'
import Button from '@/components/ui/Button'

export default function AuthFlowDemo() {
  const [isAuthFlowOpen, setIsAuthFlowOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            🔐 Multi-Step Auth Flow
          </h1>
          <p className="text-gray-400">
            Experience our comprehensive authentication system
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">👤</span>
              </div>
              <h3 className="text-white font-medium">User Management</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Complete profile setup with personal information and preferences
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🛡️</span>
              </div>
              <h3 className="text-white font-medium">Security Verification</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Multi-layer security with verification codes and security questions
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🔢</span>
              </div>
              <h3 className="text-white font-medium">Multi-Factor Auth</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Enhanced security with multiple authentication methods and factors
            </p>
          </div>
        </div>

        {/* Demo Button */}
        <Button
          onClick={() => setIsAuthFlowOpen(true)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
        >
          🚀 Try Auth Flow Demo
        </Button>

        {/* Instructions */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="text-yellow-400 font-medium mb-2">Demo Instructions:</h4>
          <ul className="text-yellow-300/80 text-sm space-y-1">
            <li>• Choose your preferred authentication method</li>
            <li>• Enter your credentials and complete verification</li>
            <li>• Set up security questions for account recovery</li>
            <li>• Complete your profile information</li>
            <li>• Experience the smooth multi-step flow</li>
          </ul>
        </div>

        {/* Auth Flow Modal */}
        <MultiStepAuthFlow
          isOpen={isAuthFlowOpen}
          onClose={() => setIsAuthFlowOpen(false)}
        />
      </div>
    </div>
  )
}
