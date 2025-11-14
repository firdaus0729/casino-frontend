'use client'

import React from 'react'
import TDButton from './Button/TDButton'
import { Loader } from 'lucide-react'

interface AuthButtonProps {
  type: 'login' | 'register'
  onClick?: () => void
  className?: string
  disabled?: boolean
  loading?: boolean
}

const AuthButton: React.FC<AuthButtonProps> = ({
  type,
  onClick,
  className = 'w-full h-[40px] ',
  disabled = false,
  loading = false,
}) => {
  const buttonInfo = {
    login: loading ? 'LOGGING IN...' : 'LOG IN',
    register: loading ? 'CREATING ACCOUNT...' : 'REGISTER',
  }

  return (
    <TDButton 
      type="red" 
      onClick={onClick} 
      className={className}
      disabled={disabled || loading}
    >
      <span className="text-sm flex items-center justify-center gap-2">
        {loading && (
          <Loader className="animate-spin h-4 w-4" />
        )}
        {buttonInfo[type]}
      </span>
    </TDButton>
  )
}

export default AuthButton
