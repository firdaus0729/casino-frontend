'use client'

import React, { useState } from 'react'
import MultiStepAuthFlow from '@/components/auth/MultiStepAuthFlow'
import SecurityVerification from '@/components/auth/SecurityVerification'
import MultiFactorAuth from '@/components/auth/MultiFactorAuth'
import ProgressTracker, { defaultAuthSteps } from '@/components/auth/ProgressTracker'
import UserProfileManager from '@/components/auth/UserProfileManager'
import Button from '@/components/ui/Button'
import { Shield, User, Key, CheckCircle, ArrowLeft } from 'lucide-react'

export default function AuthShowcase() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'sms' | 'totp' | 'backup'>('email')
  const [userProfile, setUserProfile] = useState({
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-01',
    country: 'US',
    city: 'New York',
    bio: 'Software developer passionate about building secure applications.',
    preferences: {
      language: 'en',
      timezone: 'UTC-5',
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      privacy: {
        profileVisibility: 'public' as const,
        showEmail: false,
        showPhone: false
      }
    },
    security: {
      twoFactorEnabled: true,
      lastPasswordChange: '2024-01-15',
      loginHistory: [
        {
          date: '2024-01-20',
          location: 'New York, US',
          device: 'Chrome on Windows'
        },
        {
          date: '2024-01-19',
          location: 'New York, US',
          device: 'Mobile App'
        }
      ]
    },
    verification: {
      emailVerified: true,
      phoneVerified: false,
      identityVerified: false
    }
  })

  const demos = [
    {
      id: 'multistep',
      title: 'Multi-Step Auth Flow',
      description: 'Complete authentication flow with multiple steps',
      icon: User,
      color: 'blue'
    },
    {
      id: 'verification',
      title: 'Security Verification',
      description: 'Email, SMS, TOTP, and backup code verification',
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: 'mfa',
      title: 'Multi-Factor Auth',
      description: 'Set up and manage multiple authentication factors',
      icon: Key,
      color: 'purple'
    },
    {
      id: 'progress',
      title: 'Progress Tracking',
      description: 'Visual progress tracking with security levels',
      icon: Shield,
      color: 'orange'
    },
    {
      id: 'profile',
      title: 'Profile Management',
      description: 'Complete user profile management system',
      icon: User,
      color: 'indigo'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const handleVerificationMethod = (method: 'email' | 'sms' | 'totp' | 'backup') => {
    setVerificationMethod(method)
  }

  const handleProfileUpdate = (updatedProfile: any) => {
    setUserProfile(prev => ({ ...prev, ...updatedProfile }))
  }

  const handleProfileSave = (profile: any) => {
    console.log('Profile saved:', profile)
    // In a real app, this would save to the backend
  }

  const renderDemoContent = () => {
    switch (activeDemo) {
      case 'multistep':
        return (
          <MultiStepAuthFlow
            isOpen={true}
            onClose={() => setActiveDemo(null)}
          />
        )

      case 'verification':
        return (
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <button
                onClick={() => setActiveDemo(null)}
                className="flex items-center space-x-2 text-casper hover:text-gallery transition-colors mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to demos</span>
              </button>
              
              <div className="flex space-x-2 mb-6">
                {(['email', 'sms', 'totp', 'backup'] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => handleVerificationMethod(method)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      verificationMethod === method
                        ? 'bg-blue-500 text-white'
                        : 'bg-white-2 text-casper hover:text-gallery'
                    }`}
                  >
                    {method.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <SecurityVerification
              method={verificationMethod}
              onVerify={(code) => console.log('Verification code:', code)}
              onResend={() => console.log('Resend code')}
              email="john.doe@example.com"
              phoneNumber="+1 (555) 123-4567"
            />
          </div>
        )

      case 'mfa':
        return (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setActiveDemo(null)}
              className="flex items-center space-x-2 text-casper hover:text-gallery transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to demos</span>
            </button>

            <MultiFactorAuth
              onSetup={(method, data) => console.log('MFA setup:', method, data)}
              onVerify={(method, code) => console.log('MFA verify:', method, code)}
              onDisable={(method) => console.log('MFA disable:', method)}
            />
          </div>
        )

      case 'progress':
        return (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setActiveDemo(null)}
              className="flex items-center space-x-2 text-casper hover:text-gallery transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to demos</span>
            </button>

            <ProgressTracker
              steps={defaultAuthSteps}
              currentStep="verification"
              onStepClick={(stepId) => console.log('Step clicked:', stepId)}
            />
          </div>
        )

      case 'profile':
        return (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setActiveDemo(null)}
              className="flex items-center space-x-2 text-casper hover:text-gallery transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to demos</span>
            </button>

            <UserProfileManager
              profile={userProfile}
              onUpdate={handleProfileUpdate}
              onSave={handleProfileSave}
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {activeDemo ? (
        <div className="container mx-auto px-4 py-8">
          {renderDemoContent()}
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              🔐 Authentication Components Showcase
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our comprehensive authentication system with multi-step flows, 
              security verification, MFA setup, progress tracking, and profile management.
            </p>
          </div>

          {/* Demo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {demos.map((demo) => {
              const Icon = demo.icon
              return (
                <div
                  key={demo.id}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                  onClick={() => setActiveDemo(demo.id)}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${getColorClasses(demo.color)}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                        {demo.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {demo.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 text-sm font-medium">
                      Try Demo
                    </span>
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-white group-hover:bg-white" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Features Overview */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              🚀 Complete Authentication System
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <User className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-white font-medium mb-2">User Management</h3>
                <p className="text-gray-400 text-sm">
                  Complete profile setup with personal information and preferences
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-white font-medium mb-2">Security Verification</h3>
                <p className="text-gray-400 text-sm">
                  Multi-layer security with verification codes and backup options
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Key className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-white font-medium mb-2">Multi-Factor Auth</h3>
                <p className="text-gray-400 text-sm">
                  Enhanced security with multiple authentication methods
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-white font-medium mb-2">Progress Tracking</h3>
                <p className="text-gray-400 text-sm">
                  Visual progress tracking with security level indicators
                </p>
              </div>
            </div>
          </div>

          {/* Quick Start */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">
              Ready to get started?
            </h3>
            <p className="text-gray-400 mb-6">
              Click on any demo above to explore the authentication components
            </p>
            <Button
              onClick={() => setActiveDemo('multistep')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              🚀 Start with Multi-Step Flow
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
