import React, { useState, useEffect } from 'react'
import { metaMaskService } from '@/lib/metamask'
import { useToast } from '@/context/ToastProvider'
import { Loader } from 'lucide-react'

interface MetaMaskLoginProps {
  onLoginSuccess?: (data: { token: string; user: any; address: string }) => void
  onLoginError?: (error: string) => void
  className?: string
}

const MetaMaskLogin: React.FC<MetaMaskLoginProps> = ({
  onLoginSuccess,
  onLoginError,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState(false)
  const [userData, setUserData] = useState<{
    token: string
    user: any
    address: string
  } | null>(null)
  const { showSuccess, showError } = useToast()

  useEffect(() => {
    // Check if MetaMask is available on component mount
    setIsMetaMaskAvailable(metaMaskService.isMetaMaskAvailable())
    
    // Check if user is already logged in
    if (metaMaskService.isLoggedIn()) {
      const token = metaMaskService.getStoredToken()
      const address = metaMaskService.getStoredAddress()
      
      if (token && address) {
        setUserData({
          token,
          user: { address, type: 'metamask' },
          address
        })
      }
    }
  }, [])

  const handleLogin = async () => {
    if (!isMetaMaskAvailable) {
      showError('Error', 'MetaMask is not installed. Please install MetaMask to continue.')
      onLoginError?.('MetaMask not available')
      return
    }

    setIsLoading(true)
    
    try {
      const result = await metaMaskService.login()
      
      setUserData(result)
      showSuccess('Success', 'Successfully logged in with MetaMask!')
      onLoginSuccess?.(result)
      
      console.log('MetaMask login successful:', {
        address: result.address,
        formattedAddress: metaMaskService.formatAddress(result.address),
        token: metaMaskService.formatToken(result.token)
      })
    } catch (error: any) {
      console.error('MetaMask login error:', error)
      showError('Login Failed', error.message || 'Failed to login with MetaMask')
      onLoginError?.(error.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    metaMaskService.logout()
    setUserData(null)
    showSuccess('Success', 'Logged out successfully')
  }

  const handleGetProfile = async () => {
    if (!userData?.token) return

    try {
      const profile = await metaMaskService.getProfile(userData.token)
      console.log('Profile data:', profile)
      showSuccess('Success', 'Profile retrieved successfully')
    } catch (error: any) {
      console.error('Failed to get profile:', error)
      showError('Error', error.message || 'Failed to get profile')
    }
  }

  if (userData) {
    return (
      <div className={`p-4 bg-green-50 border border-green-200 rounded-lg ${className}`}>
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          ✅ MetaMask Connected
        </h3>
        
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-green-700">Wallet Address:</span>
            <div className="font-mono text-green-600 break-all">
              {metaMaskService.formatAddress(userData.address)}
            </div>
          </div>
          
          <div>
            <span className="font-medium text-green-700">JWT Token:</span>
            <div className="font-mono text-green-600 break-all">
              {metaMaskService.formatToken(userData.token)}
            </div>
          </div>
          
          <div>
            <span className="font-medium text-green-700">User Type:</span>
            <span className="text-green-600">{userData.user.type}</span>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleGetProfile}
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
          >
            Get Profile
          </button>
          
          <button
            onClick={handleLogout}
            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`p-4 border rounded-lg ${className}`}>
      <h3 className="text-lg font-semibold mb-4">
        🔐 Login with MetaMask
      </h3>
      
      {!isMetaMaskAvailable && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-yellow-800 text-sm">
            ⚠️ MetaMask is not installed. Please install MetaMask extension to continue.
          </p>
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline text-sm mt-1 block"
          >
            Download MetaMask
          </a>
        </div>
      )}
      
      <button
        onClick={handleLogin}
        disabled={!isMetaMaskAvailable || isLoading}
        className={`
          w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors
          ${isMetaMaskAvailable && !isLoading
            ? 'bg-orange-500 hover:bg-orange-600 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }
        `}
      >
        {isLoading ? (
          <>
            <Loader className="animate-spin h-4 w-4" />
            Connecting...
          </>
        ) : (
          <>
            <span>🦊</span>
            Login with MetaMask
          </>
        )}
      </button>
      
      <div className="mt-4 text-xs text-gray-500">
        <p>By connecting your wallet, you agree to our Terms of Service and Privacy Policy.</p>
      </div>
    </div>
  )
}

export default MetaMaskLogin
