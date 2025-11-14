'use client'

import React, { useState, useEffect } from 'react'
import { Shield, Smartphone, Mail, Key, QrCode, Download, CheckCircle, AlertTriangle, Clock, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MultiFactorAuthProps {
  onSetup: (method: MfaMethod, data?: any) => void
  onVerify: (method: MfaMethod, code: string) => void
  onDisable: (method: MfaMethod) => void
  isLoading?: boolean
}

type MfaMethod = 'totp' | 'sms' | 'email' | 'backup'

interface MfaMethodInfo {
  id: MfaMethod
  name: string
  description: string
  icon: React.ComponentType<any>
  status: 'enabled' | 'disabled' | 'pending'
  setupRequired: boolean
}

const MultiFactorAuth: React.FC<MultiFactorAuthProps> = ({
  onSetup,
  onVerify,
  onDisable,
  isLoading = false
}) => {
  const [selectedMethod, setSelectedMethod] = useState<MfaMethod | null>(null)
  const [setupStep, setSetupStep] = useState<'select' | 'setup' | 'verify'>('select')
  const [verificationCode, setVerificationCode] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [secretKey, setSecretKey] = useState('')
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Mock MFA methods data
  const [mfaMethods, setMfaMethods] = useState<MfaMethodInfo[]>([
    {
      id: 'totp',
      name: 'Authenticator App',
      description: 'Use Google Authenticator, Authy, or similar apps',
      icon: Key,
      status: 'disabled',
      setupRequired: true
    },
    {
      id: 'sms',
      name: 'SMS Verification',
      description: 'Receive codes via text message',
      icon: Smartphone,
      status: 'disabled',
      setupRequired: true
    },
    {
      id: 'email',
      name: 'Email Verification',
      description: 'Receive codes via email',
      icon: Mail,
      status: 'enabled',
      setupRequired: false
    },
    {
      id: 'backup',
      name: 'Backup Codes',
      description: 'One-time use codes for account recovery',
      icon: Shield,
      status: 'disabled',
      setupRequired: true
    }
  ])

  const handleMethodSelect = (method: MfaMethod) => {
    setSelectedMethod(method)
    setSetupStep('setup')
    setErrors({})

    // Generate mock setup data
    if (method === 'totp') {
      setQrCode('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIi8+PC9zdmc+')
      setSecretKey('JBSWY3DPEHPK3PXP')
    } else if (method === 'backup') {
      setBackupCodes([
        'ABCD-1234-EFGH',
        'IJKL-5678-MNOP',
        'QRST-9012-UVWX',
        'YZAB-3456-CDEF',
        'GHIJ-7890-KLMN'
      ])
    }
  }

  const handleSetup = () => {
    if (!selectedMethod) return

    const method = mfaMethods.find(m => m.id === selectedMethod)
    if (method?.setupRequired) {
      setSetupStep('verify')
    } else {
      // Direct enable for methods that don't require setup
      onSetup(selectedMethod)
    }
  }

  const handleVerify = () => {
    if (!selectedMethod || !verificationCode.trim()) {
      setErrors({ code: 'Verification code is required' })
      return
    }

    onVerify(selectedMethod, verificationCode)
  }

  const handleDisable = (method: MfaMethod) => {
    onDisable(method)
    setMfaMethods(prev => 
      prev.map(m => m.id === method ? { ...m, status: 'disabled' } : m)
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'enabled':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'disabled':
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enabled':
        return 'border-green-500/20 bg-green-500/5'
      case 'pending':
        return 'border-yellow-500/20 bg-yellow-500/5'
      case 'disabled':
      default:
        return 'border-gray-500/20 bg-gray-500/5'
    }
  }

  const renderSetupContent = () => {
    if (!selectedMethod) return null

    const method = mfaMethods.find(m => m.id === selectedMethod)
    if (!method) return null

    const Icon = method.icon

    switch (selectedMethod) {
      case 'totp':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                <QrCode className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gallery mb-2">
                Set up Authenticator App
              </h3>
              <p className="text-casper text-sm">
                Scan the QR code with your authenticator app
              </p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-lg">
                <img 
                  src={qrCode} 
                  alt="QR Code" 
                  className="w-48 h-48"
                />
              </div>
            </div>

            {/* Secret Key */}
            <div className="bg-white-2 rounded-lg p-4">
              <label className="block text-sm font-medium text-casper mb-2">
                Secret Key (if you can't scan QR code)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={secretKey}
                  readOnly
                  className="flex-1 p-2 bg-white-1 border border-white-4 rounded text-gallery font-mono text-sm"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(secretKey)}
                  className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2">Setup Instructions:</h4>
              <ol className="text-blue-300/80 text-sm space-y-1 list-decimal list-inside">
                <li>Install an authenticator app (Google Authenticator, Authy, etc.)</li>
                <li>Open the app and scan the QR code above</li>
                <li>Or manually enter the secret key</li>
                <li>Enter the 6-digit code from your app to verify</li>
              </ol>
            </div>
          </div>
        )

      case 'sms':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                <Smartphone className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-gallery mb-2">
                Set up SMS Verification
              </h3>
              <p className="text-casper text-sm">
                Enter your phone number to receive verification codes
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-casper mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="w-full p-3 rounded-lg border border-white-4 bg-white-2 text-gallery placeholder-casper focus:border-green-500 focus:outline-none"
              />
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="text-green-400 font-medium mb-2">SMS Verification:</h4>
              <ul className="text-green-300/80 text-sm space-y-1">
                <li>• You'll receive a verification code via SMS</li>
                <li>• Codes expire after 5 minutes</li>
                <li>• Standard SMS rates may apply</li>
              </ul>
            </div>
          </div>
        )

      case 'backup':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-gallery mb-2">
                Backup Codes Generated
              </h3>
              <p className="text-casper text-sm">
                Save these codes in a safe place. Each code can only be used once.
              </p>
            </div>

            {/* Backup Codes */}
            <div className="bg-white-2 rounded-lg p-4 border border-white-4">
              <div className="grid grid-cols-1 gap-2">
                {backupCodes.map((code, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-white-1 rounded border border-white-4"
                  >
                    <span className="font-mono text-gallery text-sm">{code}</span>
                    <span className="text-casper text-xs">#{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={() => {
                const content = backupCodes.map((code, index) => `Backup Code ${index + 1}: ${code}`).join('\n')
                const blob = new Blob([content], { type: 'text/plain' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'backup-codes.txt'
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download Backup Codes</span>
            </button>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h4 className="text-red-400 font-medium mb-2">⚠️ Important:</h4>
              <ul className="text-red-300/80 text-sm space-y-1">
                <li>• Store these codes in a safe, secure location</li>
                <li>• Each code can only be used once</li>
                <li>• You can generate new codes anytime</li>
                <li>• Don't share these codes with anyone</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const renderVerificationStep = () => {
    if (!selectedMethod) return null

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gallery mb-2">
            Verify Setup
          </h3>
          <p className="text-casper text-sm">
            Enter the verification code to complete setup
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-casper mb-2">
            Verification Code
          </label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => {
              setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))
              setErrors({})
            }}
            className={cn(
              "w-full p-3 rounded-lg border text-center text-lg font-mono tracking-widest",
              "bg-white-2 text-gallery placeholder-casper focus:outline-none",
              errors.code ? "border-red-500" : "border-white-4 focus:border-blue-500"
            )}
            placeholder="000000"
            maxLength={6}
          />
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code}</p>
          )}
        </div>

        <button
          onClick={handleVerify}
          disabled={isLoading || !verificationCode.trim()}
          className={cn(
            "w-full py-3 rounded-lg font-medium transition-all",
            "bg-blue-500 hover:bg-blue-600 text-white",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isLoading ? 'Verifying...' : 'Verify & Enable'}
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
          <Shield className="h-8 w-8 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gallery mb-2">
          Multi-Factor Authentication
        </h2>
        <p className="text-casper">
          Add an extra layer of security to your account
        </p>
      </div>

      {setupStep === 'select' && (
        <>
          {/* MFA Methods */}
          <div className="space-y-4">
            {mfaMethods.map((method) => {
              const Icon = method.icon
              return (
                <div
                  key={method.id}
                  className={cn(
                    "p-4 rounded-lg border transition-all cursor-pointer",
                    getStatusColor(method.status),
                    "hover:border-blue-500/30"
                  )}
                  onClick={() => method.status === 'disabled' && handleMethodSelect(method.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-white-2">
                        <Icon className="h-5 w-5 text-gallery" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gallery">{method.name}</h3>
                        <p className="text-sm text-casper">{method.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(method.status)}
                      {method.status === 'enabled' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDisable(method.id)
                          }}
                          className="text-red-500 hover:text-red-400 text-sm"
                        >
                          Disable
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Security Info */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-blue-400 font-medium mb-2">Security Benefits:</h4>
            <ul className="text-blue-300/80 text-sm space-y-1">
              <li>• Protect your account even if your password is compromised</li>
              <li>• Required for high-value transactions and sensitive operations</li>
              <li>• Multiple verification methods for flexibility</li>
              <li>• Backup codes for emergency access</li>
            </ul>
          </div>
        </>
      )}

      {setupStep === 'setup' && (
        <div className="space-y-6">
          <button
            onClick={() => setSetupStep('select')}
            className="flex items-center space-x-2 text-casper hover:text-gallery transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to methods</span>
          </button>
          {renderSetupContent()}
          <button
            onClick={handleSetup}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            Continue Setup
          </button>
        </div>
      )}

      {setupStep === 'verify' && (
        <div className="space-y-6">
          <button
            onClick={() => setSetupStep('setup')}
            className="flex items-center space-x-2 text-casper hover:text-gallery transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to setup</span>
          </button>
          {renderVerificationStep()}
        </div>
      )}
    </div>
  )
}

export default MultiFactorAuth
