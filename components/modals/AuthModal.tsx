'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { signupUser, loginUser, logoutUser, fetchProfile, googleLogin, tonLogin } from '@/store/slices/authSlice'
import { API_BASE_URL } from '@/types/api'
import { SignupRequest } from '@/types/api'
import { X, Eye, EyeOff, ChevronDown, Loader } from 'lucide-react'
import { useSidebar } from '../../context/SidebarProvider'
import { cn } from '@/lib/utils'
import { useI18n } from '@/context/I18nProvider'
import { useToast } from '@/context/ToastProvider'
import { validateEmail, validatePassword, validateReferralCode } from '@/lib/validation'
import { metaMaskService } from '@/lib/metamask'
import { trustWalletService } from '@/lib/trustwallet'
import TelegramLogin from '../auth/TelegramLogin'
import { useTonAuth } from '@/hooks/useTonAuth'
import { TonAuthService } from '@/lib/tonAuthService'

import './style.css'
import TDButton from '../ui/Button/TDButton'
import TonIcon from '../ui/icons/TONIcon'
import GoogleIcon from '../ui/icons/GoogleIcon'
import MetamaskIcon from '../ui/icons/MetamaskIcon'
import TelegramIcon from '../ui/icons/TelegramIcon'

interface SocialButtonProps {
  icon: React.ReactNode
  onClick?: () => void
}

const SocialButton = ({ icon, onClick }: SocialButtonProps) => (
  <div
    onClick={(e) => {
      e.preventDefault()
      e.stopPropagation()
      console.log('🔘 SocialButton clicked!', { 
        onClick: !!onClick,
        onClickName: onClick?.name || 'anonymous'
      })
      if (onClick) {
        onClick()
      }
    }}
    className="flex h-9 w-9 items-center justify-center text-casper rounded-lg bg-white-4 backdrop-blur-[32px] transition-colors hover:bg-white-8 cursor-pointer"
    style={{
      boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.16) inset',
    }}
  >
    <span>{icon}</span>
  </div>
)

const TrustWalletIcon = () => (
  <svg width="25" height="24" viewBox="0 0 16 16" fill="none">
    <path
      d="M7.5 14.5554C3.51622 12.6038 1.9815 9.29679 1.98145 7.51141V3.14716L7.5 1.35419V14.5554Z"
      fill="currentColor"
      stroke="currentColor"
      className="text-casper"
    />
    <g style={{ mixBlendMode: 'luminosity' }}>
      <path
        d="M14.5184 2.78533L8 0.666687V15.3334C12.656 13.3776 14.5184 9.6295 14.5184 7.51131V2.78533Z"
        fill="url(#paint0_linear_trust)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_trust"
        x1="12.7869"
        y1="-0.360368"
        x2="7.86282"
        y2="15.133"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="var(--tw-color-border-light)" />
        <stop offset="1" stopColor="var(--tw-color-border-dark)" />
      </linearGradient>
    </defs>
  </svg>
)

export default function AuthModal() {
  const router = useRouter()
  const { isAuthModalOpen, toggleAuthModal, authModalInitialTab } = useSidebar()
  const { t } = useI18n()
  const dispatch = useAppDispatch()
  const { signupStatus, isAuthenticated, user } = useAppSelector(state => state.auth)
  const { showSuccess, showError, showWarning } = useToast()
  const [isLogin, setIsLogin] = useState(authModalInitialTab)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('password123')
  const [referralCode, setReferralCode] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(true)
  const [agreedToNotifications, setAgreedToNotifications] = useState(true)
  const [showReferral, setShowReferral] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isMetaMaskLoading, setIsMetaMaskLoading] = useState(false)
  const [isTelegramLoading, setIsTelegramLoading] = useState(false)
  const [isTonLoading, setIsTonLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isMobileKeyboardOpen, setIsMobileKeyboardOpen] = useState(false)

  // Update isLogin when authModalInitialTab changes
  useEffect(() => {
    setIsLogin(authModalInitialTab)
  }, [authModalInitialTab])

  // Handle mobile keyboard detection
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      const initialViewportHeight = window.visualViewport?.height || window.innerHeight
      const currentViewportHeight = window.visualViewport?.height || window.innerHeight
      const heightDifference = initialViewportHeight - currentViewportHeight
      
      // If viewport height decreased significantly, keyboard is likely open
      setIsMobileKeyboardOpen(heightDifference > 150)
    }

    const handleVisualViewportChange = () => {
      if (window.visualViewport) {
        const heightDifference = window.innerHeight - window.visualViewport.height
        setIsMobileKeyboardOpen(heightDifference > 150)
      }
    }

    // Listen for viewport changes
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleVisualViewportChange)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleVisualViewportChange)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const login = async () => {
    // Clear previous errors
    setErrors({})
    
    // Validate form
    const emailValidation = validateEmail(email)
    const passwordValidation = validatePassword(password)
    
    if (!emailValidation.isValid || !passwordValidation.isValid) {
      const newErrors: Record<string, string> = {}
      if (!emailValidation.isValid) newErrors.email = emailValidation.message!
      if (!passwordValidation.isValid) newErrors.password = passwordValidation.message!
      setErrors(newErrors)
      return
    }

    try {
      setIsSubmitting(true)
      const result = await dispatch(loginUser({ email, password })).unwrap()
      // Use backend response message if available, otherwise use fallback
      const successMessage = result?.message || 'Login successful! Welcome back.'
      showSuccess('Success', successMessage)
      
      // If token is returned, user is already logged in via Redux slice
      // Fetch profile to ensure we have complete user data
      if (result?.data?.token) {
        try {
          await dispatch(fetchProfile()).unwrap()
        } catch (profileError) {
          console.warn('Failed to fetch profile after login:', profileError)
          // Continue anyway since we have the token
        }
      }
      
      toggleAuthModal()
      // Navigate to dashboard
      router.push('/')
    } catch (err: any) {
      // Always try to extract the backend error message
      let errorMessage = 'An error occurred'
      let errorCode = null
      
      // Use extractErrorMessage utility for consistent error handling
      if (typeof err === 'string') {
        errorMessage = err
      } else if (err && typeof err === 'object') {
        // Check if it's an Axios error with a proper message
        if ('isAxiosError' in err && err.isAxiosError) {
          // Import extractErrorMessage dynamically to avoid circular dependency
          const { extractErrorMessage } = require('@/lib/error-utils')
          errorMessage = extractErrorMessage(err, 'Login failed')
          
          // Extract error code if available
          if (err.response?.data) {
            errorCode = err.response.data.errorCode || err.response.data.code || null
          }
        } else {
          // Try to extract from various possible locations
          if ('message' in err && typeof err.message === 'string') {
            errorMessage = err.message
          } else if ('response' in err && err.response && typeof err.response === 'object') {
            const response = err.response as any
            if (response.data) {
              if (response.data.message) {
                errorMessage = response.data.message
              }
              if (response.data.errorCode || response.data.code) {
                errorCode = response.data.errorCode || response.data.code
              }
            } else if (response.data && response.data.error) {
              errorMessage = response.data.error
            }
          }
        }
      }
      
      // Check if user not found - show red error and switch to registration
      if (errorCode === 'USER_NOT_FOUND' || errorMessage.toLowerCase().includes('not found') || errorMessage.toLowerCase().includes('register first')) {
        showError('Error', errorMessage)
        // Switch to registration tab
        setIsLogin(false)
      } else {
        // For network errors, provide more helpful message
        if (errorMessage.toLowerCase().includes('network') || errorMessage.toLowerCase().includes('connect')) {
          showError('Connection Error', 'Cannot connect to server. Please ensure the backend is running and check your internet connection.')
        } else {
          showError('Error', errorMessage)
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const logout = async () => {
    try {
      setIsSubmitting(true)
      await dispatch(logoutUser()).unwrap()
      showSuccess('Success', 'Logged out successfully')
      toggleAuthModal()
    } catch (err) {
      // Even if server logout fails, local state is cleared in reducer
      showSuccess('Success', 'Logged out')
      toggleAuthModal()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleLogin = async () => {
    console.log('Google login button clicked!')
    
    try {
      setIsGoogleLoading(true)
      
      // Prefer backend-initiated OAuth (ensures redirect_uri matches server's configured callback)
      const backendStart = `${API_BASE_URL}/api/v1/users/auth/google`
      window.location.href = backendStart
    } catch (err) {
      console.error('Google login failed:', err)
      const message = err instanceof Error ? err.message : 'Google login failed'
      showError('Error', 'Google login failed: ' + message)
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const handleMetaMaskLogin = async () => {
    console.log('🦊 handleMetaMaskLogin called!')
    
    try {
      console.log('Setting MetaMask loading to true')
      setIsMetaMaskLoading(true)
      
      // Check if MetaMask is available
      console.log('Checking MetaMask availability...')
      const isAvailable = metaMaskService.isMetaMaskAvailable()
      console.log('MetaMask available:', isAvailable)
      
      if (!isAvailable) {
        showError('Error', 'MetaMask is not installed. Please install MetaMask to continue.')
        return
      }

      console.log('🦊 Starting MetaMask login process...')
      // Perform MetaMask login
      const result = await metaMaskService.login()
      
      console.log('🦊 MetaMask login successful:', {
        address: result.address,
        formattedAddress: metaMaskService.formatAddress(result.address),
        token: metaMaskService.formatToken(result.token)
      })
      
      showSuccess('Success', 'Successfully logged in with MetaMask!')
      
      // Close the auth modal
      toggleAuthModal()
      
      // You can also dispatch the result to your auth store if needed
      // dispatch(setMetaMaskUser(result))
      
    } catch (err: any) {
      console.error('🦊 MetaMask login failed:', err)
      showError('Login Failed', err.message || 'Failed to login with MetaMask')
    } finally {
      console.log('Setting MetaMask loading to false')
      setIsMetaMaskLoading(false)
    }
  }

  const handleTrustWalletLogin = async () => {
    console.log('🔷 handleTrustWalletLogin called!')
    
    try {
      console.log('Setting Trust Wallet loading to true')
      setIsMetaMaskLoading(true) // Reuse the same loading state for now
      
      // Check if Trust Wallet is available
      console.log('Checking Trust Wallet availability...')
      const isAvailable = trustWalletService.isTrustWalletAvailable()
      console.log('Trust Wallet available:', isAvailable)
      
      if (!isAvailable) {
        showError('Error', 'Trust Wallet is not installed. Please install Trust Wallet to continue.')
        return
      }

      console.log('🔷 Starting Trust Wallet login process...')
      // Perform Trust Wallet login
      const result = await trustWalletService.login()
      
      console.log('🔷 Trust Wallet login successful:', {
        address: result.address,
        formattedAddress: trustWalletService.formatAddress(result.address),
        token: trustWalletService.formatToken(result.token)
      })
      
      showSuccess('Success', 'Successfully logged in with Trust Wallet!')
      
      // Close the auth modal
      toggleAuthModal()
      
    } catch (err: any) {
      console.error('🔷 Trust Wallet login failed:', err)
      showError('Login Failed', err.message || 'Failed to login with Trust Wallet')
    } finally {
      console.log('Setting Trust Wallet loading to false')
      setIsMetaMaskLoading(false)
    }
  }

  const handleTonLogin = async () => {
    console.log('handleTonLogin called!')
    
    try {
      console.log('Setting TON loading to true')
      setIsTonLoading(true)
      
      // Get challenge from backend
      console.log('Getting TON challenge...')
      const challengeResponse = await TonAuthService.getChallenge()
      const challenge = challengeResponse.data.challenge
      console.log('Challenge received:', challenge)
      
      // For now, simulate wallet connection and signing
      // In production, this would integrate with actual TON wallet
      console.log('Simulating TON wallet connection...')
      
      // Simulate wallet address (this would come from actual wallet)
      const mockAddress = 'UQAbc123def456ghi789jkl012mno345pqr678stu901vwx234yz567890'
      const mockSignature = `mock_signature_${Date.now()}_${challenge.slice(0, 8)}`
      
      console.log('Simulating signature...')
      
      // Use Redux action for TON authentication
      console.log('Dispatching TON login action...')
      const result = await dispatch(tonLogin({
        address: mockAddress,
        signature: mockSignature,
        message: challenge
      }))
      
      if (tonLogin.fulfilled.match(result)) {
        console.log('TON authentication successful:', result.payload)
        showSuccess('Success', 'Successfully logged in with TON wallet!')
        
        // Close the auth modal
        toggleAuthModal()
      } else {
        throw new Error(result.payload || 'TON authentication failed')
      }
      
    } catch (err: any) {
      console.error('TON login failed:', err)
      showError('Login Failed', err.message || 'Failed to login with TON wallet')
    } finally {
      console.log('Setting TON loading to false')
      setIsTonLoading(false)
    }
  }

  const handleTelegramLogin = () => {
    console.log('Telegram login clicked')
    setIsTelegramLoading(true)
    
    // Redirect to Telegram login widget
    const telegramLoginUrl = `https://oauth.telegram.org/auth?bot_id=8335171732&origin=${encodeURIComponent(window.location.origin)}&return_to=${encodeURIComponent(`${API_BASE_URL}/auth/telegram/callback`)}`
    window.location.href = telegramLoginUrl
  }

  const register = async () => {
    // Check if user is already logged in
    if (isAuthenticated) {
      const userEmail = user?.email || 'your account'
      showWarning(
        'Already Logged In', 
        `You are already logged in as ${userEmail}. If you want to create a new account, please log out first.`
      )
      // Switch to login tab to show current session
      setIsLogin(true)
      return
    }
    
    // Clear previous errors
    setErrors({})
    
    // Validate form
    const emailValidation = validateEmail(email)
    const passwordValidation = validatePassword(password)
    const referralValidation = validateReferralCode(referralCode)
    
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
      setIsSubmitting(true)
      const payload: SignupRequest = {
        email,
        password,
        referralCode: referralCode || undefined,
      }
      const result = await dispatch(signupUser(payload)).unwrap()
      // Use backend response message if available, otherwise use fallback
      const successMessage = result?.message || 'Registration successful! Welcome to OK777.'
      showSuccess('Success', successMessage)
      
      // If token is returned, user is already logged in via Redux slice
      // Fetch profile to ensure we have complete user data
      if (result?.data?.token) {
        try {
          await dispatch(fetchProfile()).unwrap()
        } catch (profileError) {
          console.warn('Failed to fetch profile after signup:', profileError)
          // Continue anyway since we have the token
        }
      }
      
      toggleAuthModal()
      // Navigate to dashboard
      router.push('/')
    } catch (err: any) {
      // Always try to extract the backend error message
      let errorMessage = 'An error occurred'
      let errorCode = null
      
      if (typeof err === 'string') {
        errorMessage = err
      } else if (err && typeof err === 'object') {
        // Try to extract from various possible locations
        if ('message' in err && typeof err.message === 'string') {
          errorMessage = err.message
        } else if ('response' in err && err.response && typeof err.response === 'object') {
          const response = err.response as any
          if (response.data) {
            if (response.data.message) {
              errorMessage = response.data.message
            }
            if (response.data.errorCode || response.data.code) {
              errorCode = response.data.errorCode || response.data.code
            }
          } else if (response.data && response.data.error) {
            errorMessage = response.data.error
          }
        }
      }
      
      // Check if user already exists - show yellow warning and switch to login
      if (errorCode === 'USER_ALREADY_EXISTS' || errorMessage.toLowerCase().includes('already registered') || errorMessage.toLowerCase().includes('login instead')) {
        showWarning('Warning', errorMessage)
        // Switch to login tab
        setIsLogin(true)
      } else {
        showError('Error', errorMessage)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (isAuthModalOpen) {
      setShouldRender(true)
      const timer = setTimeout(() => setIsVisible(true), 10)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
      const timer = setTimeout(() => setShouldRender(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isAuthModalOpen])

  if (!shouldRender) return null

  return (
    <div className={cn(
      "fixed inset-0 z-[9999] flex justify-center overflow-hidden",
      // Mobile: adjust positioning when keyboard is open
      isMobileKeyboardOpen ? "items-start pt-4" : "items-end sm:items-center"
    )}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-mirage-73" />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full max-w-[740px] flex justify-center items-center modal-content-scroll transform transition-all duration-300 ease-out',
          // Mobile: adjust height and positioning when keyboard is open
          isMobileKeyboardOpen ? 'h-auto max-h-[calc(100vh-2rem)]' : 'h-full max-h-screen',
          isVisible ? 'translate-y-0' : 'translate-y-full sm:translate-y-8'
        )}
      >
        {/* Desktop Layout */}
        <div className="hidden md:flex w-full h-[670px] rounded-[14px] overflow-hidden bg-mirage-54 backdrop-blur-[32px]">
          {/* Left Side - Branding */}
          <div className="flex-1 relative">
            {/* Background Image with Gradient Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-mirage"
              style={{
                backgroundImage:
                  "url('https://api.builder.io/api/v1/image/assets/TEMP/1966099a1a2c23b6a4509e98b3ec5376765f2b13?width=740')",
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-mirage/90" />

            {/* Bull Character and Text */}
            <div className="relative z-10 flex flex-col items-center justify-between h-full p-8 pt-16">
              {/* Logo/3D Character placeholder */}
              <div className="w-[115px] h-14 rounded-lg flex items-center justify-center"></div>

              {/* Welcome Text */}
              <div className="text-center">
                <h1 className="font-black text-[32px] text-gallery leading-none mb-2">
                  WELCOME
                </h1>
                <h2 className="font-black text-[32px] text-gallery leading-none mb-2">
                  BONUS
                </h2>
                <h3 className="font-black text-[32px] text-gallery leading-none mb-4">
                  UP TO 590%
                </h3>
                <p className="text-casper text-base font-medium">
                  + 225 Free Spins
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 flex flex-col p-6 overflow-y-auto modal-content-scroll">
            {/* Close Button */}
            <div className="flex justify-end mb-6">
              <div
                onClick={toggleAuthModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white-4 bg-white-4 backdrop-blur-[32px] hover:bg-white-8 transition-colors cursor-pointer"
                style={{
                  boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.16) inset',
                }}
              >
                <span>
                  <X size={16} className="text-casper" />
                </span>
              </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex rounded-xl p-1 mb-6">
              <div
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-4 px-3 text-sm font-bold text-center transition-colors cursor-pointer ${
                  isLogin
                    ? 'text-gallery border-b-2 border-dodger-blue'
                    : 'text-casper'
                }`}
              >
                <span>{t('auth.login')}</span>
              </div>
              <div
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-4 px-3 text-center text-sm font-bold transition-colors cursor-pointer ${
                  !isLogin
                    ? 'text-gallery border-b-2 border-dodger-blue'
                    : 'text-casper'
                }`}
              >
                <span>{t('auth.register')}</span>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 flex flex-col">
              {/* Email Input */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute -top-2 left-2 z-10 px-1 bg-gradient-to-b from-mirage to-deep-blue">
                    <span className="text-xs text-polo-blue">
                      {t('auth.usernameEmail')}
                    </span>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value)
                      // Clear error when user starts typing
                      if (errors.email) {
                        setErrors(prev => ({ ...prev, email: '' }))
                      }
                    }}
                    placeholder={t('auth.userEmailPlaceholder')}
                    className={`w-full h-12 px-4 pt-2 bg-deep-blue border rounded-xl text-white placeholder-blue-bayoux text-sm focus:outline-none ${
                      errors.email ? 'border-red-500' : 'border-blue-bayoux focus:border-dodger-blue'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute -top-2 left-2 z-10 px-1 bg-gradient-to-b from-mirage to-deep-blue">
                    <span className="text-xs text-polo-blue">
                      <span>{t('auth.password')}</span>
                    </span>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value)
                      // Clear error when user starts typing
                      if (errors.password) {
                        setErrors(prev => ({ ...prev, password: '' }))
                      }
                    }}
                    placeholder={
                      !isLogin && password
                        ? '✱ ✱ ✱ ✱ ✱ ✱ ✱ ✱'
                        : t('auth.passPlaceholder')
                    }
                    className={`w-full h-12 px-4 pt-2 pr-12 bg-deep-blue rounded-xl text-sm focus:outline-none ${
                      errors.password
                        ? 'border-red-500 text-white'
                        : !isLogin && password
                        ? 'border-2 border-dodger-blue text-white'
                        : 'border border-blue-bayoux text-white placeholder-blue-bayoux'
                    }`}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    <span>
                      {showPassword ? (
                        <Eye size={20} className="text-blue-bayoux" />
                      ) : (
                        <EyeOff size={20} className="text-blue-bayoux" />
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                  )}
                </div>
              </div>

              {/* Forgot Password / Referral Code */}
              {isLogin ? (
                <div className="mb-6">
                  <div className="text-dodger-blue text-sm font-bold cursor-pointer">
                    <span>{t('auth.forgotPassword')}</span>
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <div
                    onClick={() => setShowReferral(!showReferral)}
                    className="flex items-center text-dodger-blue text-sm font-bold cursor-pointer"
                  >
                    <span>{t('auth.referralPlaceholder')}</span>
                    <ChevronDown size={20} className="ml-1" />
                  </div>
                  {showReferral && (
                    <div>
                      <input
                        type="text"
                        value={referralCode}
                        onChange={e => {
                          setReferralCode(e.target.value)
                          // Clear error when user starts typing
                          if (errors.referralCode) {
                            setErrors(prev => ({ ...prev, referralCode: '' }))
                          }
                        }}
                        placeholder={t('auth.referralPlaceholder')}
                        className={`w-full h-12 px-4 mt-2 bg-deep-blue border rounded-xl text-white placeholder-blue-bayoux text-sm focus:outline-none ${
                          errors.referralCode ? 'border-red-500' : 'border-blue-bayoux focus:border-dodger-blue'
                        }`}
                      />
                      {errors.referralCode && (
                        <p className="text-red-400 text-xs mt-1">{errors.referralCode}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Registration Checkboxes */}
              {!isLogin && (
                <div className="mb-6 space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={e => setAgreedToTerms(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          agreedToTerms
                            ? 'bg-dodger-blue border-dodger-blue'
                            : 'border-blue-bayoux bg-transparent'
                        }`}
                      >
                        {agreedToTerms && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M2 6L5 9L10 3"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-casper">
                      {t('auth.agreeUserAgreement')}
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        checked={agreedToNotifications}
                        onChange={e =>
                          setAgreedToNotifications(e.target.checked)
                        }
                        className="sr-only"
                      />
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          agreedToNotifications
                            ? 'bg-dodger-blue border-dodger-blue'
                            : 'border-blue-bayoux bg-transparent'
                        }`}
                      >
                        {agreedToNotifications && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M2 6L5 9L10 3"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-casper">
                      {t('auth.agreePromotional')}{' '}
                      <span className="text-[#2283F6]">ok777.casino</span>
                    </span>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <TDButton
                onClick={isLogin ? login : register}
                type="red"
                disabled={!isLogin && !agreedToTerms}
                loading={isSubmitting}
                className="w-full h-11 text-[14px] font-bold text-white"
              >
                {isLogin ? t('auth.signIn') : t('auth.signUp')}
              </TDButton>

              {/* If authenticated, show quick logout button */}
              {/* {isAuthenticated && (
                <div className="mt-3">
                  <TDButton
                    onClick={logout}
                    type="blue"
                    className="w-full h-10 text-[13px] font-bold text-white"
                  >
                    {t('auth.logout')}
                  </TDButton>
                </div>
              )} */}

              {/* Spacer */}
              <div className="flex-1" />

              {/* Social Login */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="flex-1 h-px bg-[#3C485C]" />
                  <span className="text-sm text-[#A7B5CA]">
                    <span>{t('auth.logInUsing')}</span>
                  </span>
                  <div className="flex-1 h-px bg-[#3C485C]" />
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <div
                    onClick={isGoogleLoading ? undefined : handleGoogleLogin}
                    className={`flex h-9 w-9 items-center justify-center text-casper rounded-lg bg-white-4 backdrop-blur-[32px] transition-colors ${
                      isGoogleLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-white-8 cursor-pointer'
                    }`}
                    style={{
                      boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.16) inset',
                    }}
                  >
                    <span>
                      {isGoogleLoading ? (
                        <Loader className="animate-spin h-4 w-4" />
                      ) : (
                        <GoogleIcon />
                      )}
                    </span>
                  </div>
                  <div
                    onClick={isTelegramLoading ? undefined : handleTelegramLogin}
                    className={`flex h-9 w-9 items-center justify-center text-casper rounded-lg bg-white-4 backdrop-blur-[32px] transition-colors ${
                      isTelegramLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-white-8 cursor-pointer'
                    }`}
                    style={{
                      boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.16) inset',
                    }}
                  >
                    <span>
                      {isTelegramLoading ? (
                        <Loader className="animate-spin h-4 w-4" />
                      ) : (
                        <TelegramIcon />
                      )}
                    </span>
                  </div>
                  <SocialButton icon={<MetamaskIcon />} onClick={handleMetaMaskLogin} />
                  <SocialButton 
                    icon={
                      isTonLoading ? (
                        <Loader className="animate-spin h-4 w-4" />
                      ) : (
                        <TonIcon />
                      )
                    } 
                    onClick={handleTonLogin}
                  />

                  <SocialButton icon={<TrustWalletIcon />} onClick={handleTrustWalletLogin} />
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white-4 backdrop-blur-[32px] text-[#A7B5CA] text-xs font-bold cursor-pointer">
                    <span>+3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div
          className={cn(
            "md:hidden animation-fade-in absolute top-0 w-full max-w-md mx-auto bg-[#111923] overflow-x-hidden overflow-y-auto modal-content-scroll",
            // Adjust height when keyboard is open
            isMobileKeyboardOpen ? "h-auto max-h-[calc(100vh-2rem)]" : "h-full"
          )}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* Blue Gradient Background - Hide when keyboard is open */}
          {!isMobileKeyboardOpen && (
            <div className="relative">
              <div
                className="w-full h-80 bg-gradient-to-b from-[#003A81] to-[#111923]"
                style={{
                  filter: 'blur(175px)',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transform: 'scale(1.5)',
                }}
              />

              {/* Hero Image */}
              <div className="relative h-[312.32px] overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/e46eb9b989312e0dd83d423e4baeabe941ec23dd?width=804"
                  alt="Casino"
                  className="w-full h-full object-fill"
                />

                {/* Close Button */}
                <div
                  onClick={toggleAuthModal}
                  className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white-4 bg-white-4 backdrop-blur-[32px] hover:bg-white-8 transition-colors cursor-pointer"
                  style={{
                    boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.16) inset',
                  }}
                >
                  <span>
                    <X size={16} className="text-casper" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Close Button - Show when keyboard is open */}
          {isMobileKeyboardOpen && (
            <div className="flex justify-end p-4">
              <div
                onClick={toggleAuthModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white-4 bg-white-4 backdrop-blur-[32px] hover:bg-white-8 transition-colors cursor-pointer"
                style={{
                  boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.16) inset',
                }}
              >
                <span>
                  <X size={16} className="text-casper" />
                </span>
              </div>
            </div>
          )}

          {/* Form Section */}
          <div className={cn(
            "px-4 space-y-6 relative flex flex-col bg-[#111923]",
            // Adjust padding when keyboard is open
            isMobileKeyboardOpen ? "pb-4" : "pb-12 justify-between"
          )}>
            <div className="flex flex-col gap-[24px]">
              {/* Tab Switcher */}
              <div className="flex rounded-xl p-1">
                <div
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-4 px-3 text-sm font-bold transition-colors text-center cursor-pointer ${
                    isLogin
                      ? 'text-[#EDEDED] border-b-2 border-[#2283F6]'
                      : 'text-[#A7B5CA]'
                  }`}
                >
                  <span>{t('auth.login')}</span>
                </div>
                <div
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-4 px-3 text-sm font-bold transition-colors text-center cursor-pointer ${
                    !isLogin
                      ? 'text-[#EDEDED] border-b-2 border-[#2283F6]'
                      : 'text-[#A7B5CA]'
                  }`}
                >
                  <span>{t('auth.register')}</span>
                </div>
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className="absolute -top-2 left-2 z-10 px-1 bg-gradient-to-b from-[#111923] to-[#0D131C]">
                  <span className="text-xs text-[#93ACD3]">
                    <span>{t('auth.usernameEmail')}</span>
                  </span>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value)
                    // Clear error when user starts typing
                    if (errors.email) {
                      setErrors(prev => ({ ...prev, email: '' }))
                    }
                  }}
                  onFocus={(e) => {
                    // Scroll input into view when focused on mobile
                    if (typeof window !== 'undefined' && window.innerWidth < 768) {
                      setTimeout(() => {
                        e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      }, 300)
                    }
                  }}
                  placeholder={t('auth.userEmailPlaceholder')}
                  className={`w-full h-12 px-4 pt-2 bg-[#0D131C] border rounded-xl text-white placeholder-[#55657E] text-sm focus:outline-none ${
                    errors.email ? 'border-red-500' : 'border-[#55657E] focus:border-[#2283F6]'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute -top-2 left-2 z-10 px-1 bg-gradient-to-b from-[#111923] to-[#0D131C]">
                  <span className="text-xs text-[#93ACD3]">
                    {t('settings.password')}
                  </span>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value)
                    // Clear error when user starts typing
                    if (errors.password) {
                      setErrors(prev => ({ ...prev, password: '' }))
                    }
                  }}
                  onFocus={(e) => {
                    // Scroll input into view when focused on mobile
                    if (typeof window !== 'undefined' && window.innerWidth < 768) {
                      setTimeout(() => {
                        e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      }, 300)
                    }
                  }}
                  placeholder={
                    !isLogin && password
                      ? '✱ ✱ ✱ ✱ ✱ ✱ ✱ ✱'
                      : t('auth.passPlaceholder')
                  }
                  className={`w-full h-12 px-4 pt-2 pr-12 bg-[#0D131C] rounded-xl text-sm focus:outline-none ${
                    errors.password
                      ? 'border-red-500 text-white'
                      : !isLogin && password
                      ? 'border-2 border-[#2283F6] text-white'
                      : 'border border-[#55657E] text-white placeholder-[#55657E]'
                  }`}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  <span>
                    <EyeOff size={20} className="text-white" />
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Registration specific fields */}
              {!isLogin && (
                <div className="space-y-4">
                  {/* Referral Code */}
                  {!showReferral && (
                    <div
                      onClick={() => setShowReferral(!showReferral)}
                      className="flex items-center justify-between w-full text-[#2283F6] text-sm font-bold py-2 cursor-pointer"
                    >
                      <span>{t('alliance.referralCode')}</span>
                      <ChevronDown size={20} />
                    </div>
                  )}
                  {showReferral && (
                    <div>
                      <input
                        type="text"
                        value={referralCode}
                        onChange={e => {
                          setReferralCode(e.target.value)
                          // Clear error when user starts typing
                          if (errors.referralCode) {
                            setErrors(prev => ({ ...prev, referralCode: '' }))
                          }
                        }}
                        placeholder={t('auth.referralPlaceholder')}
                        className={`w-full h-12 px-4 mt-2 bg-deep-blue border rounded-xl text-white placeholder-blue-bayoux text-sm focus:outline-none ${
                          errors.referralCode ? 'border-red-500' : 'border-blue-bayoux focus:border-dodger-blue'
                        }`}
                      />
                      {errors.referralCode && (
                        <p className="text-red-400 text-xs mt-1">{errors.referralCode}</p>
                      )}
                    </div>
                  )}

                  {/* Submit Button */}
                  <TDButton
                    className="!w-full h-11"
                    type="red"
                    onClick={register}
                    loading={isSubmitting}
                  >
                    {t('auth.register')}
                  </TDButton>

                  {/* Checkboxes */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          checked={agreedToTerms}
                          onChange={e => setAgreedToTerms(e.target.checked)}
                          className="sr-only"
                        />
                        <div
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                            agreedToTerms
                              ? 'bg-[#2283F6] border-[#2283F6]'
                              : 'border-[#55657E] bg-transparent'
                          }`}
                        >
                          {agreedToTerms && (
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M2 6L5 9L10 3"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-casper">
                        {t('auth.agreeUserAgreement')}
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          checked={agreedToNotifications}
                          onChange={e =>
                            setAgreedToNotifications(e.target.checked)
                          }
                          className="sr-only"
                        />
                        <div
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                            agreedToNotifications
                              ? 'bg-[#2283F6] border-[#2283F6]'
                              : 'border-[#55657E] bg-transparent'
                          }`}
                        >
                          {agreedToNotifications && (
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M2 6L5 9L10 3"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-casper">
                        {t('auth.agreePromotional')}{' '}
                        <span className="text-[#2283F6]">ok777.casino</span>
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Login Submit Button */}
              {isLogin && (
                <>
                  <TDButton className="!w-full h-11" type="red" onClick={login} loading={isSubmitting}>
                    {t('auth.login')}
                  </TDButton>
                </>
              )}
            </div>

            {/* Social Login */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="flex-1 h-px bg-[#3C485C]" />
                <span className="text-sm text-[#A7B5CA]">Log in using</span>
                <div className="flex-1 h-px bg-[#3C485C]" />
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <div
                  onClick={isGoogleLoading ? undefined : handleGoogleLogin}
                  className={`flex h-9 w-9 items-center justify-center text-casper rounded-lg bg-white-4 backdrop-blur-[32px] transition-colors ${
                    isGoogleLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-white-8 cursor-pointer'
                  }`}
                  style={{
                    boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.16) inset',
                  }}
                >
                  <span>
                    {isGoogleLoading ? (
                      <Loader className="animate-spin h-4 w-4" />
                    ) : (
                      <GoogleIcon />
                    )}
                  </span>
                </div>
                <div
                  onClick={isTelegramLoading ? undefined : handleTelegramLogin}
                  className={`flex h-9 w-9 items-center justify-center text-casper rounded-lg bg-white-4 backdrop-blur-[32px] transition-colors ${
                    isTelegramLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-white-8 cursor-pointer'
                  }`}
                  style={{
                    boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.16) inset',
                  }}
                >
                  <span>
                    {isTelegramLoading ? (
                      <Loader className="animate-spin h-4 w-4" />
                    ) : (
                      <TelegramIcon />
                    )}
                  </span>
                </div>
                <div
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('MetaMask button clicked!', { isMetaMaskLoading })
                    if (!isMetaMaskLoading) {
                      handleMetaMaskLogin()
                    }
                  }}
                  onMouseEnter={() => console.log('MetaMask button hovered')}
                  onMouseDown={() => console.log('MetaMask button mouse down')}
                  className={`flex h-9 w-9 items-center justify-center text-casper rounded-lg bg-white-4 backdrop-blur-[32px] transition-colors ${
                    isMetaMaskLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-white-8 cursor-pointer'
                  }`}
                  style={{
                    boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.16) inset',
                    zIndex: 1000,
                    position: 'relative'
                  }}
                >
                  <span>
                    {isMetaMaskLoading ? (
                      <Loader className="animate-spin h-4 w-4" />
                    ) : (
                      <MetamaskIcon />
                    )}
                  </span>
                </div>
                <SocialButton 
                  icon={
                    isTonLoading ? (
                      <Loader className="animate-spin h-4 w-4" />
                    ) : (
                      <TonIcon />
                    )
                  } 
                  onClick={handleTonLogin}
                />
                <SocialButton icon={<TrustWalletIcon />} onClick={handleTrustWalletLogin} />
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white-4 backdrop-blur-[32px] text-[#A7B5CA] text-xs font-bold cursor-pointer">
                  <span>98</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
