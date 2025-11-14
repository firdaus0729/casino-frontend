'use client'

import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { signupUser, loginUser, fetchProfile } from '@/store/slices/authSlice'
import { useToast } from '@/context/ToastProvider'
import { useI18n } from '@/context/I18nProvider'
import { extractErrorMessage } from '@/lib/error-utils'
import { X, ArrowLeft, Check, Shield, User, Key, Smartphone, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

type AuthStep = 'method' | 'credentials' | 'verification' | 'security' | 'profile' | 'complete'

interface MultiStepAuthFlowProps {
  isOpen: boolean
  onClose: () => void
  initialStep?: AuthStep
}

interface AuthState {
  step: AuthStep
  email: string
  password: string
  confirmPassword: string
  referralCode: string
  phoneNumber: string
  twoFactorCode: string
  securityQuestions: {
    question1: string
    answer1: string
    question2: string
    answer2: string
  }
  profile: {
    firstName: string
    lastName: string
    dateOfBirth: string
    country: string
  }
  agreedToTerms: boolean
  agreedToNotifications: boolean
  method: 'email' | 'phone' | 'social' | 'metamask'
}

const MultiStepAuthFlow: React.FC<MultiStepAuthFlowProps> = ({
  isOpen,
  onClose,
  initialStep = 'method'
}) => {
  const { t } = useI18n()
  const dispatch = useAppDispatch()
  const { showSuccess, showError, showWarning } = useToast()
  const { signupStatus, isAuthenticated } = useAppSelector(state => state.auth)

  const [authState, setAuthState] = useState<AuthState>({
    step: initialStep,
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
    phoneNumber: '',
    twoFactorCode: '',
    securityQuestions: {
      question1: '',
      answer1: '',
      question2: '',
      answer2: ''
    },
    profile: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      country: ''
    },
    agreedToTerms: false,
    agreedToNotifications: false,
    method: 'email'
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Step configuration
  const steps = [
    { id: 'method', title: 'Choose Method', icon: User, description: 'Select authentication method' },
    { id: 'credentials', title: 'Credentials', icon: Key, description: 'Enter login details' },
    { id: 'verification', title: 'Verify', icon: Mail, description: 'Verify your identity' },
    { id: 'security', title: 'Security', icon: Shield, description: 'Set up security questions' },
    { id: 'profile', title: 'Profile', icon: User, description: 'Complete your profile' },
    { id: 'complete', title: 'Complete', icon: Check, description: 'Welcome aboard!' }
  ] as const

  const currentStepIndex = steps.findIndex(step => step.id === authState.step)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const updateAuthState = (updates: Partial<AuthState>) => {
    setAuthState(prev => ({ ...prev, ...updates }))
  }

  const goToStep = (step: AuthStep) => {
    updateAuthState({ step })
    setErrors({})
  }

  const goBack = () => {
    const currentIndex = steps.findIndex(step => step.id === authState.step)
    if (currentIndex > 0) {
      goToStep(steps[currentIndex - 1].id as AuthStep)
    }
  }

  const validateStep = (step: AuthStep): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 'credentials':
        if (!authState.email) newErrors.email = 'Email is required'
        if (!authState.password) newErrors.password = 'Password is required'
        if (authState.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
        if (authState.confirmPassword && authState.password !== authState.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match'
        }
        break
      case 'verification':
        if (authState.method === 'email' && !authState.twoFactorCode) {
          newErrors.twoFactorCode = 'Verification code is required'
        }
        break
      case 'security':
        if (!authState.securityQuestions.answer1) newErrors.answer1 = 'Security answer is required'
        if (!authState.securityQuestions.answer2) newErrors.answer2 = 'Security answer is required'
        break
      case 'profile':
        if (!authState.profile.firstName) newErrors.firstName = 'First name is required'
        if (!authState.profile.lastName) newErrors.lastName = 'Last name is required'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = async () => {
    if (!validateStep(authState.step)) return

    setIsLoading(true)
    
    try {
      switch (authState.step) {
        case 'method':
          goToStep('credentials')
          break
        case 'credentials':
          if (authState.method === 'email') {
            // Send verification code
            await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
            goToStep('verification')
          } else {
            goToStep('security')
          }
          break
        case 'verification':
          // Verify code
          await new Promise(resolve => setTimeout(resolve, 1000))
          goToStep('security')
          break
        case 'security':
          goToStep('profile')
          break
        case 'profile':
          // Complete registration
          const result = await dispatch(signupUser({
            email: authState.email,
            password: authState.password,
            referralCode: authState.referralCode
          })).unwrap()
          // Use backend response message if available
          const successMessage = result?.message || 'Registration completed successfully!'
          showSuccess('Success', successMessage)
          goToStep('complete')
          break
        case 'complete':
          onClose()
          break
      }
    } catch (error) {
      // When using .unwrap(), the error is already the extracted message from Redux thunk
      const errorMessage = typeof error === 'string' ? error : extractErrorMessage(error, 'An error occurred')
      showError('Error', errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMethodSelect = (method: AuthState['method']) => {
    updateAuthState({ method })
  }

  const renderStepContent = () => {
    switch (authState.step) {
      case 'method':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gallery mb-6">Choose Authentication Method</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleMethodSelect('email')}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all text-left",
                  authState.method === 'email' 
                    ? "border-dodger-blue bg-dodger-blue/10" 
                    : "border-white-4 hover:border-white-8"
                )}
              >
                <Mail className="h-6 w-6 text-dodger-blue mb-2" />
                <div className="font-medium text-gallery">Email</div>
                <div className="text-sm text-casper">Verify with email code</div>
              </button>

              <button
                onClick={() => handleMethodSelect('phone')}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all text-left",
                  authState.method === 'phone' 
                    ? "border-dodger-blue bg-dodger-blue/10" 
                    : "border-white-4 hover:border-white-8"
                )}
              >
                <Smartphone className="h-6 w-6 text-dodger-blue mb-2" />
                <div className="font-medium text-gallery">Phone</div>
                <div className="text-sm text-casper">SMS verification</div>
              </button>

              <button
                onClick={() => handleMethodSelect('social')}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all text-left",
                  authState.method === 'social' 
                    ? "border-dodger-blue bg-dodger-blue/10" 
                    : "border-white-4 hover:border-white-8"
                )}
              >
                <User className="h-6 w-6 text-dodger-blue mb-2" />
                <div className="font-medium text-gallery">Social</div>
                <div className="text-sm text-casper">Google, Telegram</div>
              </button>

              <button
                onClick={() => handleMethodSelect('metamask')}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all text-left",
                  authState.method === 'metamask' 
                    ? "border-dodger-blue bg-dodger-blue/10" 
                    : "border-white-4 hover:border-white-8"
                )}
              >
                <Shield className="h-6 w-6 text-dodger-blue mb-2" />
                <div className="font-medium text-gallery">MetaMask</div>
                <div className="text-sm text-casper">Web3 wallet</div>
              </button>
            </div>
          </div>
        )

      case 'credentials':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gallery mb-6">Enter Your Credentials</h3>
            
            <div>
              <label className="block text-sm font-medium text-casper mb-2">Email</label>
              <input
                type="email"
                value={authState.email}
                onChange={(e) => updateAuthState({ email: e.target.value })}
                className="w-full p-3 rounded-lg border border-white-4 bg-white-2 text-gallery placeholder-casper focus:border-dodger-blue focus:outline-none"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-casper mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={authState.password}
                  onChange={(e) => updateAuthState({ password: e.target.value })}
                  className="w-full p-3 pr-10 rounded-lg border border-white-4 bg-white-2 text-gallery placeholder-casper focus:border-dodger-blue focus:outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-casper hover:text-gallery"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {authState.method === 'email' && (
              <div>
                <label className="block text-sm font-medium text-casper mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={authState.confirmPassword}
                    onChange={(e) => updateAuthState({ confirmPassword: e.target.value })}
                    className="w-full p-3 pr-10 rounded-lg border border-white-4 bg-white-2 text-gallery placeholder-casper focus:border-dodger-blue focus:outline-none"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-casper hover:text-gallery"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-casper mb-2">Referral Code (Optional)</label>
              <input
                type="text"
                value={authState.referralCode}
                onChange={(e) => updateAuthState({ referralCode: e.target.value })}
                className="w-full p-3 rounded-lg border border-white-4 bg-white-2 text-gallery placeholder-casper focus:border-dodger-blue focus:outline-none"
                placeholder="Enter referral code"
              />
            </div>
          </div>
        )

      case 'verification':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gallery mb-6">Verify Your Identity</h3>
            <p className="text-casper mb-4">
              We've sent a verification code to {authState.email}
            </p>
            
            <div>
              <label className="block text-sm font-medium text-casper mb-2">Verification Code</label>
              <input
                type="text"
                value={authState.twoFactorCode}
                onChange={(e) => updateAuthState({ twoFactorCode: e.target.value })}
                className="w-full p-3 rounded-lg border border-white-4 bg-white-2 text-gallery placeholder-casper focus:border-dodger-blue focus:outline-none text-center text-lg tracking-widest"
                placeholder="000000"
                maxLength={6}
              />
              {errors.twoFactorCode && <p className="text-red-500 text-sm mt-1">{errors.twoFactorCode}</p>}
            </div>

            <div className="text-center">
              <button className="text-dodger-blue hover:text-blue-400 text-sm">
                Resend Code
              </button>
            </div>
          </div>
        )

      case 'security':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gallery mb-6">Security Questions</h3>
            <p className="text-casper mb-4">
              Set up security questions to help recover your account
            </p>
            
            <div>
              <label className="block text-sm font-medium text-casper mb-2">Security Question 1</label>
              <select
                value={authState.securityQuestions.question1}
                onChange={(e) => updateAuthState({ 
                  securityQuestions: { 
                    ...authState.securityQuestions, 
                    question1: e.target.value 
                  }
                })}
                className="w-full p-3 rounded-lg border border-white-4 bg-white-2 text-gallery focus:border-dodger-blue focus:outline-none"
              >
                <option value="">Select a question</option>
                <option value="birth_city">What city were you born in?</option>
                <option value="first_pet">What was the name of your first pet?</option>
                <option value="mother_maiden">What is your mother's maiden name?</option>
                <option value="favorite_teacher">What was your favorite teacher's name?</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-casper mb-2">Answer</label>
              <input
                type="text"
                value={authState.securityQuestions.answer1}
                onChange={(e) => updateAuthState({ 
                  securityQuestions: { 
                    ...authState.securityQuestions, 
                    answer1: e.target.value 
                  }
                })}
                className="w-full p-3 rounded-lg border border-white-4 bg-white-2 text-gallery placeholder-casper focus:border-dodger-blue focus:outline-none"
                placeholder="Your answer"
              />
              {errors.answer1 && <p className="text-red-500 text-sm mt-1">{errors.answer1}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-casper mb-2">Security Question 2</label>
              <select
                value={authState.securityQuestions.question2}
                onChange={(e) => updateAuthState({ 
                  securityQuestions: { 
                    ...authState.securityQuestions, 
                    question2: e.target.value 
                  }
                })}
                className="w-full p-3 rounded-lg border border-white-4 bg-white-2 text-gallery focus:border-dodger-blue focus:outline-none"
              >
                <option value="">Select a question</option>
                <option value="first_car">What was the make of your first car?</option>
                <option value="childhood_friend">What was your childhood best friend's name?</option>
                <option value="favorite_sport">What was your favorite sport in high school?</option>
                <option value="dream_job">What was your dream job as a child?</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-casper mb-2">Answer</label>
              <input
                type="text"
                value={authState.securityQuestions.answer2}
                onChange={(e) => updateAuthState({ 
                  securityQuestions: { 
                    ...authState.securityQuestions, 
                    answer2: e.target.value 
                  }
                })}
                className="w-full p-3 rounded-lg border border-white-4 bg-white-2 text-gallery placeholder-casper focus:border-dodger-blue focus:outline-none"
                placeholder="Your answer"
              />
              {errors.answer2 && <p className="text-red-500 text-sm mt-1">{errors.answer2}</p>}
            </div>
          </div>
        )

      case 'profile':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gallery mb-6">Complete Your Profile</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-casper mb-2">First Name</label>
                <input
                  type="text"
                  value={authState.profile.firstName}
                  onChange={(e) => updateAuthState({ 
                    profile: { 
                      ...authState.profile, 
                      firstName: e.target.value 
                    }
                  })}
                  className="w-full p-3 rounded-lg border border-white-4 bg-white-2 text-gallery placeholder-casper focus:border-dodger-blue focus:outline-none"
                  placeholder="First name"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-casper mb-2">Last Name</label>
                <input
                  type="text"
                  value={authState.profile.lastName}
                  onChange={(e) => updateAuthState({ 
                    profile: { 
                      ...authState.profile, 
                      lastName: e.target.value 
                    }
                  })}
                  className="w-full p-3 rounded-lg border border-white-4 bg-white-2 text-gallery placeholder-casper focus:border-dodger-blue focus:outline-none"
                  placeholder="Last name"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-casper mb-2">Date of Birth</label>
              <input
                type="date"
                value={authState.profile.dateOfBirth}
                onChange={(e) => updateAuthState({ 
                  profile: { 
                    ...authState.profile, 
                    dateOfBirth: e.target.value 
                  }
                })}
                className="w-full p-3 rounded-lg border border-white-4 bg-white-2 text-gallery focus:border-dodger-blue focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-casper mb-2">Country</label>
              <select
                value={authState.profile.country}
                onChange={(e) => updateAuthState({ 
                  profile: { 
                    ...authState.profile, 
                    country: e.target.value 
                  }
                })}
                className="w-full p-3 rounded-lg border border-white-4 bg-white-2 text-gallery focus:border-dodger-blue focus:outline-none"
              >
                <option value="">Select your country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="JP">Japan</option>
                <option value="KR">South Korea</option>
                <option value="CN">China</option>
                <option value="IN">India</option>
              </select>
            </div>

            <div className="space-y-3 pt-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={authState.agreedToTerms}
                  onChange={(e) => updateAuthState({ agreedToTerms: e.target.checked })}
                  className="w-4 h-4 text-dodger-blue border-white-4 rounded focus:ring-dodger-blue"
                />
                <span className="text-sm text-casper">
                  I agree to the <a href="#" className="text-dodger-blue hover:underline">Terms of Service</a>
                </span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={authState.agreedToNotifications}
                  onChange={(e) => updateAuthState({ agreedToNotifications: e.target.checked })}
                  className="w-4 h-4 text-dodger-blue border-white-4 rounded focus:ring-dodger-blue"
                />
                <span className="text-sm text-casper">
                  I want to receive notifications and updates
                </span>
              </label>
            </div>
          </div>
        )

      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gallery mb-2">Welcome Aboard!</h3>
              <p className="text-casper">
                Your account has been successfully created. You can now start using our platform.
              </p>
            </div>
            <div className="bg-white-2 rounded-lg p-4">
              <div className="text-sm text-casper mb-2">Account Summary:</div>
              <div className="text-gallery font-medium">{authState.email}</div>
              <div className="text-sm text-casper">{authState.profile.firstName} {authState.profile.lastName}</div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white-1 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {currentStepIndex > 0 && (
                <button
                  onClick={goBack}
                  className="p-2 rounded-lg hover:bg-white-4 transition-colors"
                >
                  <ArrowLeft size={20} className="text-casper" />
                </button>
              )}
              <div>
                <h2 className="text-xl font-bold text-gallery">
                  {steps[currentStepIndex]?.title || 'Authentication'}
                </h2>
                <p className="text-sm text-casper">
                  {steps[currentStepIndex]?.description || 'Complete your authentication'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white-4 transition-colors"
            >
              <X size={20} className="text-casper" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-casper mb-2">
              <span>Step {currentStepIndex + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-white-4 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-dodger-blue to-blue-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between mt-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStepIndex
              const isCompleted = index < currentStepIndex
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                    isActive && "bg-dodger-blue text-white",
                    isCompleted && "bg-green-500 text-white",
                    !isActive && !isCompleted && "bg-white-4 text-casper"
                  )}>
                    {isCompleted ? <Check size={16} /> : <Icon size={16} />}
                  </div>
                  <span className={cn(
                    "text-xs mt-1",
                    isActive ? "text-dodger-blue font-medium" : "text-casper"
                  )}>
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-casper">
              {authState.step === 'method' && 'Choose your preferred authentication method'}
              {authState.step === 'credentials' && 'Enter your account credentials'}
              {authState.step === 'verification' && 'Verify your email address'}
              {authState.step === 'security' && 'Set up security questions'}
              {authState.step === 'profile' && 'Complete your profile information'}
              {authState.step === 'complete' && 'Your account is ready!'}
            </div>
            <button
              onClick={handleNext}
              disabled={isLoading}
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-all",
                authState.step === 'complete' 
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-dodger-blue hover:bg-blue-600 text-white",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                authState.step === 'complete' ? 'Get Started' : 'Continue'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultiStepAuthFlow
