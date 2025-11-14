'use client'

import React, { useState, useEffect } from 'react'
import { Shield, CheckCircle, AlertTriangle, Clock, Smartphone, Mail, Key, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SecurityVerificationProps {
  method: 'email' | 'sms' | 'totp' | 'backup'
  onVerify: (code: string) => void
  onResend: () => void
  onBackup?: () => void
  email?: string
  phoneNumber?: string
  isLoading?: boolean
}

const SecurityVerification: React.FC<SecurityVerificationProps> = ({
  method,
  onVerify,
  onResend,
  onBackup,
  email,
  phoneNumber,
  isLoading = false
}) => {
  const [code, setCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [showBackupCodes, setShowBackupCodes] = useState(false)
  const [backupCode, setBackupCode] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleCodeSubmit = () => {
    if (!code.trim()) {
      setErrors({ code: 'Verification code is required' })
      return
    }

    if (code.length < 4) {
      setErrors({ code: 'Code must be at least 4 digits' })
      return
    }

    onVerify(code)
  }

  const handleBackupCodeSubmit = () => {
    if (!backupCode.trim()) {
      setErrors({ backupCode: 'Backup code is required' })
      return
    }

    onVerify(backupCode)
  }

  const handleResend = () => {
    setTimeLeft(300) // Reset timer
    setErrors({})
    onResend()
  }

  const getMethodInfo = () => {
    switch (method) {
      case 'email':
        return {
          icon: Mail,
          title: 'Email Verification',
          description: `We've sent a verification code to ${email}`,
          placeholder: 'Enter 6-digit code',
          maxLength: 6
        }
      case 'sms':
        return {
          icon: Smartphone,
          title: 'SMS Verification',
          description: `We've sent a verification code to ${phoneNumber}`,
          placeholder: 'Enter 6-digit code',
          maxLength: 6
        }
      case 'totp':
        return {
          icon: Key,
          title: 'Authenticator App',
          description: 'Enter the code from your authenticator app',
          placeholder: 'Enter 6-digit code',
          maxLength: 6
        }
      case 'backup':
        return {
          icon: Shield,
          title: 'Backup Code',
          description: 'Enter one of your backup codes',
          placeholder: 'Enter backup code',
          maxLength: 8
        }
      default:
        return {
          icon: Shield,
          title: 'Security Verification',
          description: 'Enter your verification code',
          placeholder: 'Enter code',
          maxLength: 6
        }
    }
  }

  const methodInfo = getMethodInfo()
  const Icon = methodInfo.icon

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
          <Icon className="h-8 w-8 text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold text-gallery mb-2">
          {methodInfo.title}
        </h3>
        <p className="text-casper text-sm">
          {methodInfo.description}
        </p>
      </div>

      {/* Timer */}
      {timeLeft > 0 && (
        <div className="flex items-center justify-center space-x-2 text-sm">
          <Clock className="h-4 w-4 text-yellow-500" />
          <span className="text-casper">
            Code expires in <span className="text-yellow-500 font-medium">{formatTime(timeLeft)}</span>
          </span>
        </div>
      )}

      {/* Code Input */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-casper mb-2">
            Verification Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.replace(/\D/g, '').slice(0, methodInfo.maxLength))
              setErrors({})
            }}
            className={cn(
              "w-full p-4 rounded-lg border text-center text-lg font-mono tracking-widest",
              "bg-white-2 text-gallery placeholder-casper focus:outline-none transition-colors",
              errors.code ? "border-red-500 focus:border-red-500" : "border-white-4 focus:border-blue-500"
            )}
            placeholder={methodInfo.placeholder}
            maxLength={methodInfo.maxLength}
            disabled={isLoading}
          />
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleCodeSubmit}
          disabled={isLoading || !code.trim()}
          className={cn(
            "w-full py-3 rounded-lg font-medium transition-all",
            "bg-blue-500 hover:bg-blue-600 text-white",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transform hover:scale-105 active:scale-95"
          )}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent text-white rounded-full animate-spin" />
              <span>Verifying...</span>
            </div>
          ) : (
            'Verify Code'
          )}
        </button>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        {/* Resend Code */}
        <div className="text-center">
          <button
            onClick={handleResend}
            disabled={timeLeft > 0 || isLoading}
            className={cn(
              "text-sm transition-colors",
              timeLeft > 0 || isLoading
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500 hover:text-blue-400"
            )}
          >
            {timeLeft > 0 ? `Resend in ${formatTime(timeLeft)}` : 'Resend Code'}
          </button>
        </div>

        {/* Backup Options */}
        {method !== 'backup' && onBackup && (
          <div className="border-t border-white-4 pt-4">
            <div className="text-center mb-3">
              <button
                onClick={() => setShowBackupCodes(!showBackupCodes)}
                className="text-sm text-casper hover:text-gallery transition-colors"
              >
                Can't receive codes? Use backup option
              </button>
            </div>

            {showBackupCodes && (
              <div className="space-y-3 p-4 bg-white-2 rounded-lg border border-white-4">
                <div className="text-center">
                  <h4 className="text-sm font-medium text-gallery mb-1">Backup Code</h4>
                  <p className="text-xs text-casper mb-3">
                    Enter one of your backup codes to verify your identity
                  </p>
                </div>

                <div>
                  <input
                    type="text"
                    value={backupCode}
                    onChange={(e) => {
                      setBackupCode(e.target.value.toUpperCase())
                      setErrors({})
                    }}
                    className={cn(
                      "w-full p-3 rounded-lg border text-center font-mono",
                      "bg-white-2 text-gallery placeholder-casper focus:outline-none",
                      errors.backupCode ? "border-red-500" : "border-white-4 focus:border-blue-500"
                    )}
                    placeholder="Enter backup code"
                    disabled={isLoading}
                  />
                  {errors.backupCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.backupCode}</p>
                  )}
                </div>

                <button
                  onClick={handleBackupCodeSubmit}
                  disabled={isLoading || !backupCode.trim()}
                  className={cn(
                    "w-full py-2 rounded-lg text-sm font-medium transition-all",
                    "bg-gray-500 hover:bg-gray-600 text-white",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  Verify Backup Code
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Security Tips */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <h4 className="text-blue-400 font-medium mb-1">Security Tips</h4>
            <ul className="text-blue-300/80 space-y-1">
              <li>• Never share your verification codes with anyone</li>
              <li>• Codes expire after 5 minutes for security</li>
              <li>• Use backup codes only when necessary</li>
              <li>• Keep your backup codes in a safe place</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecurityVerification
