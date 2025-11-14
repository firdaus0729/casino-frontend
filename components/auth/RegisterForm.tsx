'use client'

import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { signupUser, clearSignupStatus, clearError } from '../../store/slices/authSlice'
import { SignupRequest } from '../../types/api'
import { useToast } from '../../context/ToastProvider'
import { validateEmail, validatePassword, validateReferralCode } from '../../lib/validation'
import { extractErrorMessage } from '../../lib/error-utils'

import AuthButton from '../ui/AuthButton'
import PolicyForm from './PolicyForm'

const PoclifyFormInfo = [
  {
    content:
      "I agree to the <a href='#'>“User Agreement”</a> and confirm that I am over 18 years old",
  },
  {
    content:
      "<span>I agree to receive promotional notifications from <a href='#'>ok777.casino</a></span>",
  },
]

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const { signupStatus, error, isAuthenticated } = useAppSelector(state => state.auth)
  const { showSuccess, showError, showWarning } = useToast()
  
  const [policy, setPolicy] = useState(PoclifyFormInfo)
  const [showPassword, setShowPassword] = useState(false)
  const [discountCodeState, setDiscountCodeState] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState<SignupRequest>({
    email: '',
    password: '',
    referralCode: ''
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [agreedToPromotions, setAgreedToPromotions] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const changeDiscountCodeState = () => {
    setDiscountCodeState(!discountCodeState)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous errors
    setErrors({})
    
    // Validate form
    const emailValidation = validateEmail(formData.email)
    const passwordValidation = validatePassword(formData.password)
    const referralValidation = validateReferralCode(formData.referralCode || '')
    
    if (!emailValidation.isValid || !passwordValidation.isValid || !referralValidation.isValid) {
      const newErrors: Record<string, string> = {}
      if (!emailValidation.isValid) newErrors.email = emailValidation.message!
      if (!passwordValidation.isValid) newErrors.password = passwordValidation.message!
      if (!referralValidation.isValid) newErrors.referralCode = referralValidation.message!
      setErrors(newErrors)
      return
    }
    
    if (!agreedToTerms) {
      showWarning('Warning', 'Please agree to the User Agreement')
      return
    }

    try {
      await dispatch(signupUser(formData)).unwrap()
      // Success will be handled by the Redux state
    } catch (error) {
      console.error('Signup failed:', error)
    }
  }

  // Explicit click handler to support non-form button
  const handleRegisterClick = async () => {
    // Clear previous errors
    setErrors({})
    
    // Validate form
    const emailValidation = validateEmail(formData.email)
    const passwordValidation = validatePassword(formData.password)
    const referralValidation = validateReferralCode(formData.referralCode || '')
    
    if (!emailValidation.isValid || !passwordValidation.isValid || !referralValidation.isValid) {
      const newErrors: Record<string, string> = {}
      if (!emailValidation.isValid) newErrors.email = emailValidation.message!
      if (!passwordValidation.isValid) newErrors.password = passwordValidation.message!
      if (!referralValidation.isValid) newErrors.referralCode = referralValidation.message!
      setErrors(newErrors)
      return
    }
    
    if (!agreedToTerms) {
      showWarning('Warning', 'Please agree to the User Agreement')
      return
    }

    try {
      const result = await dispatch(signupUser(formData)).unwrap()
      // Use backend response message if available, otherwise use fallback
      const successMessage = result?.message || 'Signup succeeded! Please check your email for verification code.'
      showSuccess('Success', successMessage)
    } catch (err) {
      // Debug: Log the error to see what we're getting
      console.log('RegisterForm catch error:', err, 'Type:', typeof err)
      
      // Always try to extract the backend error message
      let errorMessage = 'An error occurred'
      
      if (typeof err === 'string') {
        errorMessage = err
      } else if (err && typeof err === 'object') {
        // Try to extract from various possible locations
        if ('message' in err && typeof err.message === 'string') {
          errorMessage = err.message
        } else if ('response' in err && err.response && typeof err.response === 'object') {
          const response = err.response as any
          if (response.data && response.data.message) {
            errorMessage = response.data.message
          } else if (response.data && response.data.error) {
            errorMessage = response.data.error
          }
        }
      }
      
      console.log('Final error message:', errorMessage)
      showError('Error', errorMessage)
    }
  }

  // Clear error when component mounts
  React.useEffect(() => {
    dispatch(clearError())
    dispatch(clearSignupStatus())
  }, [dispatch])

  // Handle successful signup
  React.useEffect(() => {
    if (signupStatus === 'succeeded' && isAuthenticated) {
      // Also show success toast if status changes via other triggers
      showSuccess('Success', 'Signup succeeded!')
    }
  }, [signupStatus, isAuthenticated, showSuccess])

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {/* Error Display */}
      {error && (
        <div className="error-message mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
          {error}
        </div>
      )}
      
      {/* Success Message */}
      {signupStatus === 'succeeded' && (
        <div className="success-message mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded text-green-400 text-sm">
          Account created successfully! You are now logged in.
        </div>
      )}

      <div className="input-group">
        <label className="input-label">
          <span>Email</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          className={`form-input ${errors.email ? 'border-red-500' : ''}`}
          required
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
        )}
      </div>
      <div className="input-group">
        <label className="input-label">
          <span>Password</span>
        </label>
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className={`form-input ${errors.password ? 'border-red-500' : ''}`}
            required
          />
          <div
            className="password-toggle cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            <span>
              {showPassword ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                </svg>
              )}
            </span>
          </div>
        </div>
        {errors.password && (
          <p className="text-red-400 text-xs mt-1">{errors.password}</p>
        )}
      </div>
      <div className="discount-code-form flex flex-col gap-6">
        <div
          className={`discount-code-form-label gap-4 flex ${
            discountCodeState == true ? 'open' : 'close'
          }`}
          onClick={changeDiscountCodeState}
        >
          <p>Referral code/discount code</p>
          {discountCodeState == true ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
            >
              <path
                d="M1.70906 7.55994L5.99906 3.25994L10.2891 7.55994L11.7091 6.13994L5.99906 0.439941L0.289062 6.13994L1.70906 7.55994Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
            >
              <path
                d="M5.99906 7.55994L11.7091 1.85994L10.2891 0.439941L5.99906 4.73994L1.70906 0.439941L0.289062 1.85994L5.99906 7.55994Z"
                fill="#2283F6"
              />
            </svg>
          )}
        </div>
        {discountCodeState == true ? (
          <div className="flex flex-col gap-6">
            <div className="input-group">
              <input
                type="text"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleInputChange}
                placeholder="Enter referral code (optional)"
                className={`form-input ${errors.referralCode ? 'border-red-500' : ''}`}
              />
              {errors.referralCode && (
                <p className="text-red-400 text-xs mt-1">{errors.referralCode}</p>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      
      {/* Terms and Conditions */}
      <div className="policy-section">
        <div className="policy-item">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="terms" className="text-sm text-gray-300">
            I agree to the <a href="#" className="text-blue-400 hover:underline">"User Agreement"</a> and confirm that I am over 18 years old
          </label>
        </div>
        <div className="policy-item">
          <input
            type="checkbox"
            id="promotions"
            checked={agreedToPromotions}
            onChange={(e) => setAgreedToPromotions(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="promotions" className="text-sm text-gray-300">
            I agree to receive promotional notifications from <a href="#" className="text-blue-400 hover:underline">ok777.casino</a>
          </label>
        </div>
      </div>
      
      <AuthButton 
        type="register" 
        disabled={signupStatus === 'loading'}
        loading={signupStatus === 'loading'}
        onClick={handleRegisterClick}
      />
    </form>
  )
}

export default RegisterForm
