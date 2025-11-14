// Form validation utilities

export interface ValidationResult {
  isValid: boolean
  message?: string
}

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim() === '') {
    return { isValid: false, message: 'Email is required' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' }
  }

  return { isValid: true }
}

// Password validation
export const validatePassword = (password: string): ValidationResult => {
  if (!password || password.trim() === '') {
    return { isValid: false, message: 'Password is required' }
  }

  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' }
  }

  if (password.length > 128) {
    return { isValid: false, message: 'Password must be less than 128 characters' }
  }

  // Check for at least one letter and one number
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /\d/.test(password)
  
  if (!hasLetter) {
    return { isValid: false, message: 'Password must contain at least one letter' }
  }

  if (!hasNumber) {
    return { isValid: false, message: 'Password must contain at least one number' }
  }

  return { isValid: true }
}

// Username validation (for display name)
export const validateUsername = (username: string): ValidationResult => {
  console.log('Frontend validateUsername called with:', { username, length: username?.length, type: typeof username })
  
  // TEMPORARILY DISABLE ALL VALIDATION TO TEST UNICODE SUPPORT
  console.log('Frontend validation bypassed for testing Unicode support')
  return { isValid: true }
}

// Telegram username validation
export const validateTelegram = (telegram: string): ValidationResult => {
  if (!telegram || telegram.trim() === '') {
    return { isValid: false, message: 'Telegram username is required' }
  }

  // Remove @ if present
  const cleanTelegram = telegram.replace('@', '')

  if (cleanTelegram.length < 5) {
    return { isValid: false, message: 'Telegram username must be at least 5 characters long' }
  }

  if (cleanTelegram.length > 32) {
    return { isValid: false, message: 'Telegram username must be less than 32 characters' }
  }

  // Check for valid characters (letters, numbers, underscores)
  const validCharsRegex = /^[a-zA-Z0-9_]+$/
  if (!validCharsRegex.test(cleanTelegram)) {
    return { isValid: false, message: 'Telegram username can only contain letters, numbers, and underscores' }
  }

  return { isValid: true }
}

// Referral code validation (optional)
export const validateReferralCode = (code: string): ValidationResult => {
  console.log('Frontend validateReferralCode called with:', { code, length: code?.length, type: typeof code })
  
  // TEMPORARILY DISABLE ALL VALIDATION TO TEST UNICODE SUPPORT
  console.log('Frontend referral code validation bypassed for testing Unicode support')
  return { isValid: true }
}

// Form validation helpers
export const validateForm = (fields: Record<string, any>, validators: Record<string, (value: any) => ValidationResult>) => {
  const errors: Record<string, string> = {}
  let isValid = true

  for (const [fieldName, validator] of Object.entries(validators)) {
    const result = validator(fields[fieldName])
    if (!result.isValid) {
      errors[fieldName] = result.message || 'Invalid value'
      isValid = false
    }
  }

  return { isValid, errors }
}

// Common validation rules
export const validationRules = {
  email: validateEmail,
  password: validatePassword,
  username: validateUsername,
  telegram: validateTelegram,
  referralCode: validateReferralCode,
}
