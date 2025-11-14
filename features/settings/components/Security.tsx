import React, { useState } from 'react'
import TDButton from '@/components/ui/Button/TDButton'
import FlatButton from '@/components/ui/Button/FlatButton'
import ModalContainer from '@/components/modals/ModalContainer'
import LockKeyholeIcon from '@/components/ui/icons/lock-keyhole'
import CheckIcon from '@/components/ui/icons/check'
import XIcon from '@/components/ui/icons/x'
import EnvelopeIcon from '@/components/ui/icons/envelope'
import EyeSlashIcon from '@/components/ui/icons/eye-slash'
import EyeIcon from '@/components/ui/icons/eye'
import CheckCircleIcon from '@/components/ui/icons/check-circle'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { 
  setWithdrawPassword, 
  requestEmailVerification, 
  verifyEmailCode, 
  changePassword, 
  setPassword, 
  isGoogleOAuthUser, 
  shouldUseSetPassword, 
  shouldShowEmailVerificationButtons, 
  // canSetWithdrawalPassword
} from '@/store/slices/authSlice'
import { setEmailVerified, setWithdrawPasswordSet } from '@/store/slices/userSettingsSlice'
import { useToast } from '@/context/ToastProvider'
import { validatePassword } from '@/lib/validation'
import { extractErrorMessage, extractSuccessMessage } from '@/lib/error-utils'

const Security: React.FC = () => {
  const [passwordModal, setPasswordModal] = useState(false)
  const [withdrawModal, setWithdrawModal] = useState(false)
  const [emailModal, setEmailModal] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)
  const { emailVerified: emailVerifiedState, withdrawPasswordSet: withdrawPasswordSetState } = useAppSelector(state => state.userSettings)
  const { showSuccess, showError } = useToast()
  
  // Detect if user is a Google OAuth user
  const isGoogleUser = isGoogleOAuthUser(user)
  // Detect if user should use set-password (no old password) vs change-password (requires old password)
  const shouldUseSetPasswordMode = shouldUseSetPassword(user)
  // Check if user can set/change withdrawal password (requires login password to exist)
  // const canSetWithdrawPassword = canSetWithdrawalPassword(user)
  // Clean conditional logic for email verification buttons
  const showEmailVerificationButtons = shouldShowEmailVerificationButtons(user)
  
  // Get email verification status from Redux store
  const emailVerified = user?.id ? emailVerifiedState[user.id as number] ?? !!user?.isVerified : false
  
  // Get withdrawal password status from Redux store
  const withdrawPasswordSet = user?.id ? withdrawPasswordSetState[user.id as number] ?? !!user?.hasWithdrawPassword : false

  const [emailSendCooldown, setEmailSendCooldown] = useState<number>(0)

  React.useEffect(() => {
    if (emailSendCooldown <= 0) return
    const timer = setInterval(() => {
      setEmailSendCooldown(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [emailSendCooldown])

  const handleVerifyAndBind = async () => {
    if (!verificationCode.trim()) {
      showError('Error', 'Please enter verification code')
      return
    }

    try {
      setIsVerifying(true)
      // Verify the email code
      const result = await dispatch(verifyEmailCode({ code: verificationCode })).unwrap()
      
      // If verification succeeds, automatically bind the email
      if (user?.id) {
        dispatch(setEmailVerified({ userId: user.id as number, verified: true }))
      }
      setVerificationCode('')
      
      // Close modal and show success message from backend
      toggleEmailModal()
      const successMessage = extractSuccessMessage(result, 'Email has been successfully verified and bound!')
      showSuccess('Success', successMessage)
    } catch (error) {
      console.error('Email verification failed:', error)
      const errorMessage = extractErrorMessage(error, 'Invalid verification code, please try again.')
      showError('Error', errorMessage)
    } finally {
      setIsVerifying(false)
    }
  }

  const [showPassword, setShowPassword] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword1, setNewPassword1] = useState('')
  const [newPassword2, setNewPassword2] = useState('')
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({})
  
  // Withdrawal password state
  const [loginPassword, setLoginPassword] = useState('')
  const [oldWithdrawPassword, setOldWithdrawPassword] = useState('')
  const [withdrawPassword1, setWithdrawPassword1] = useState('')
  const [withdrawPassword2, setWithdrawPassword2] = useState('')
  const [withdrawPasswordErrors, setWithdrawPasswordErrors] = useState<Record<string, string>>({})
  
  // Real-time validation for new password
  React.useEffect(() => {
    if (newPassword1 && newPassword1.length > 0) {
      const validation = validatePassword(newPassword1)
      if (!validation.isValid) {
        setPasswordErrors(prev => ({ ...prev, newPassword: validation.message! }))
      } else {
        setPasswordErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors.newPassword
          return newErrors
        })
      }
    } else {
      setPasswordErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.newPassword
        return newErrors
      })
    }
  }, [newPassword1])
  
  // Real-time validation for password confirmation
  React.useEffect(() => {
    if (newPassword2 && newPassword1 !== newPassword2) {
      setPasswordErrors(prev => ({ ...prev, confirmPassword: 'New passwords do not match' }))
    } else {
      setPasswordErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.confirmPassword
        return newErrors
      })
    }
  }, [newPassword1, newPassword2])
  
  // Real-time validation for withdrawal password
  React.useEffect(() => {
    if (withdrawPassword1 && withdrawPassword1.length > 0) {
      const validation = validatePassword(withdrawPassword1)
      if (!validation.isValid) {
        setWithdrawPasswordErrors(prev => ({ ...prev, withdrawPassword: validation.message! }))
      } else {
        setWithdrawPasswordErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors.withdrawPassword
          return newErrors
        })
      }
    } else {
      setWithdrawPasswordErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.withdrawPassword
        return newErrors
      })
    }
  }, [withdrawPassword1])
  
  // Real-time validation for withdrawal password confirmation
  React.useEffect(() => {
    if (withdrawPassword2 && withdrawPassword1 !== withdrawPassword2) {
      setWithdrawPasswordErrors(prev => ({ ...prev, confirmWithdrawPassword: 'Withdrawal passwords do not match' }))
    } else {
      setWithdrawPasswordErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.confirmWithdrawPassword
        return newErrors
      })
    }
  }, [withdrawPassword1, withdrawPassword2])
  
  const toggleSuccessForm = () => {
    setIsOpen(!isOpen)
    const authContainer = document.getElementById('auth-container')
    const successForm = document.getElementById('success-form')
    if (successForm) {
      successForm.style.display = isOpen ? 'block' : 'none'
    }
    if (authContainer) {
      authContainer.style.display = isOpen ? 'none' : 'block'
    }
    console.log(successForm?.style.display, isOpen)
  }

  const togglePasswordModal = () => {
    setPasswordModal(!passwordModal)
    // Clear form data and errors when closing modal
    if (passwordModal) {
      setOldPassword('')
      setNewPassword1('')
      setNewPassword2('')
      setPasswordErrors({})
    }
  }

  const toggleWithdraw = () => {
    setWithdrawModal(!withdrawModal)
    // Clear form data and errors when closing modal
    if (withdrawModal) {
      setLoginPassword('')
      setOldWithdrawPassword('')
      setWithdrawPassword1('')
      setWithdrawPassword2('')
      setWithdrawPasswordErrors({})
    }
  }

  const toggleEmailModal = () => {
    setEmailModal(!emailModal)
  }

  const securityInfo = [
    {
      title: 'Password',
      icon: <LockKeyholeIcon />,
      state: '',
      desc: shouldUseSetPasswordMode 
        ? 'You signed up with Google. You can set a password for additional security.'
        : 'For security reasons, it is recommended to change your login password regularly.',
      button: shouldUseSetPasswordMode ? 'Set password' : 'Change password',
      onClick: togglePasswordModal,
    },
    // Only show withdrawal password section if user can set it (has login password)
    ...(user?.hasPassword ? [{
      title: 'Withdrawal Password',
      icon: <LockKeyholeIcon />,
      state: withdrawPasswordSet ? 'ok' : 'no',
      desc: 'For security reasons, please create your fund password.',
      button: withdrawPasswordSet ? 'Change Withdrawal Password' : 'Set Withdrawal Password',
      onClick: toggleWithdraw,
    }] : [{
      title: 'Withdrawal Password',
      icon: <LockKeyholeIcon />,
      state: 'no',
      desc: 'You must set a login password first before you can create a withdrawal password.',
      button: 'Set Login Password First',
      onClick: togglePasswordModal,
    }]),
    {
      title: 'Email address',
      icon: <EnvelopeIcon />,
      state: emailVerified ? 'ok' : 'no',
      desc: emailVerified 
        ? 'You have bound your email address. If you need to modify it, please contact customer service!'
        : 'Please verify your email address to secure your account.',
      button: emailVerified ? 'Verified' : 'Verify now',
      onClick: emailVerified ? () => {} : toggleEmailModal,
    }
  ]

  return (
    <div className=" [@media(max-width:768px)]:w-full">
      <div className="w-full  flex flex-col gap-4">
        {/* Security Header */}
        <h1 className="text-lg sm:text-xl hidden lg:block font-bold text-white ">
          Security
        </h1>
        <div className="grid lg:grid-cols-2 gap-4">
          {securityInfo.map(item => (
            <div
              key={item.title}
              className="bg-white-4 justify-between rounded-[12px] p-4 gap-4 flex flex-col"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-3 text-casper items-center text-[14px] font-bold">
                  {item.icon}
                  {item.title}
                </div>
                {item.state === 'ok' ? (
                  <div className="flex gap-2 items-center text-malachite font-medium text-[14px]">
                    <CheckIcon className="w-6 h-6" />
                    <span className="lg:hidden">Verified</span>
                  </div>
                ) : item.state === '' ? (<></>) : (
                  <div className="flex gap-2 items-center text-crimson font-medium text-[14px]">
                    <XIcon className="w-6 h-6" />
                    <span className="lg:hidden">Not activated</span>
                  </div>
                )}
              </div>
              <div className="text-casper text-[14px]">{item.desc}</div>
              {!(item.title === 'Email address' && !showEmailVerificationButtons) && (
                <TDButton
                  onClick={item.onClick}
                  type="blue"
                  className="w-full h-[41px] text-gallery text-[14px]"
                >
                  {item.button}
                </TDButton>
              )}
            </div>
          ))}
        </div>

        <ModalContainer
          isOpen={passwordModal}
          title={shouldUseSetPasswordMode ? "Set Login Password" : "Change Login Password"}
          className="lg:w-[30%]"
          onClose={togglePasswordModal}
        >
          <div className="flex flex-col gap-2">
            <div className="p-4 rounded-[12px] gap-4 flex flex-col bg-white-4">
              {!shouldUseSetPasswordMode && (
                <>
                  <h2 className="font-bold text-white text-[0.875rem]">Current Password</h2>
                  <div className="password-input-container">
                    <input
                      id="change-pass-old"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter current password"
                      className="form-input"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <div className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (<EyeSlashIcon className="h-6 w-6" />) : (<EyeIcon className="w-6 h-6" />)}
                    </div>
                  </div>
                </>
              )}
              {shouldUseSetPasswordMode && (
                <div className="text-casper text-[14px] mb-2">
                  Since you haven't set a password yet, you can set a password for your account without providing an old password.
                </div>
              )}
              <h2 className="font-bold text-white text-[0.875rem]">New Password</h2>
              <div className="password-input-container">
                <input
                  id="change-pass-new-1"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  className="form-input"
                  value={newPassword1}
                  onChange={(e) => setNewPassword1(e.target.value)}
                />
                <div className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (<EyeSlashIcon className="h-6 w-6" />) : (<EyeIcon className="w-6 h-6" />)}
                </div>
              </div>
              {passwordErrors.newPassword && (
                <span className="text-[12px] text-red-400">{passwordErrors.newPassword}</span>
              )}
              <h2 className="font-bold text-white text-[0.875rem]">Confirm New Password</h2>
              <div className="password-input-container">
                <input
                  id="change-pass-new-2"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  className="form-input"
                  value={newPassword2}
                  onChange={(e) => setNewPassword2(e.target.value)}
                />
                <div className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (<EyeSlashIcon className="h-6 w-6" />) : (<EyeIcon className="w-6 h-6" />)}
                </div>
              </div>
              {passwordErrors.confirmPassword && (
                <span className="text-[12px] text-red-400">{passwordErrors.confirmPassword}</span>
              )}
              {(newPassword1 || newPassword2) && newPassword1 !== newPassword2 && !passwordErrors.confirmPassword && (
                <span className="text-[12px] text-yellow-orange">New passwords do not match.</span>
              )}
            </div>
          </div>
          <TDButton
            type="blue"
            onClick={() => {
              // Clear previous errors
              setPasswordErrors({})
              
              const oldPass = oldPassword
              const new1 = newPassword1
              const new2 = newPassword2
              
              // Basic field validation - different based on whether user should use set-password mode
              if (shouldUseSetPasswordMode) {
                // For users who haven't set a password yet (like fresh Google OAuth users)
                if (!new1 || !new2) { 
                  showError('Error', 'Please fill all password fields'); 
                  return 
                }
              } else {
                // For users who have already set a password and need to provide old password
                if (!oldPass || !new1 || !new2) { 
                  showError('Error', 'Please fill all fields'); 
                  return 
                }
              }
              
              // Validate new password using the same logic as login
              const newPasswordValidation = validatePassword(new1)
              if (!newPasswordValidation.isValid) {
                setPasswordErrors({ newPassword: newPasswordValidation.message! })
                return
              }
              
              // Check if passwords match
              if (new1 !== new2) { 
                setPasswordErrors({ confirmPassword: 'New passwords do not match' })
                return 
              }
              
              // Clear any errors before submitting
              setPasswordErrors({})
              
              // Use appropriate action based on whether user should use set-password mode
              const action = shouldUseSetPasswordMode 
                ? dispatch(setPassword({ newPassword: new1 }))
                : dispatch(changePassword({ password: oldPass, newPassword: new1 }))
              
              action
                .unwrap()
                .then((result) => { 
                  const successMessage = extractSuccessMessage(result, shouldUseSetPasswordMode 
                    ? 'Password set successfully. You will be logged out for security.'
                    : 'Password changed successfully. You will be logged out for security.')
                  showSuccess('Success', successMessage)
                  togglePasswordModal()
                })
                .catch((err: any) => {
                  const errorMessage = extractErrorMessage(err, 'Failed to update password')
                  showError('Error', errorMessage)
                })
            }}
            disabled={
              shouldUseSetPasswordMode 
                ? (!newPassword1 || !newPassword2 || newPassword1 !== newPassword2 || Object.keys(passwordErrors).length > 0)
                : (!oldPassword || !newPassword1 || !newPassword2 || newPassword1 !== newPassword2 || Object.keys(passwordErrors).length > 0)
            }
            className="w-full h-[41px] text-gallery text-[14px]"
          >
            Submit
          </TDButton>
        </ModalContainer>
        <ModalContainer
          isOpen={withdrawModal}
          title="Set Withdrawal Password"
          className="lg:w-[30%]"
          onClose={toggleWithdraw}
        >
          <div className="flex flex-col gap-2">
            <div className="p-4 rounded-[12px] gap-4 flex flex-col bg-white-4">
              <h2 className="font-bold text-white text-[0.875rem]">
                Login Password
              </h2>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your login password"
                  className="form-input"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <div
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-6 w-6" />
                  ) : (
                    <EyeIcon className="w-6 h-6" />
                  )}
                </div>
              </div>
              <div className="text-casper text-[14px] mb-2">
                You must enter your login password to set or change your withdrawal password for security verification.
              </div>
              {/* Current withdrawal password field removed as requested */}
              <h2 className="font-bold text-white text-[0.875rem]">
                {withdrawPasswordSet ? 'New Withdrawal Password' : 'Withdrawal Password'}
              </h2>

              <div className="password-input-container">
                <input
                  id="withdraw-password-1"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="form-input"
                  value={withdrawPassword1}
                  onChange={(e) => setWithdrawPassword1(e.target.value)}
                />
                <div
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-6 w-6" />
                  ) : (
                    <EyeIcon className="w-6 h-6" />
                  )}
                </div>
              </div>
              {withdrawPasswordErrors.withdrawPassword && (
                <div className="text-red-400 text-sm mt-1">
                  {withdrawPasswordErrors.withdrawPassword}
                </div>
              )}
              <h2 className="font-bold text-white text-[0.875rem]">
                Confirm Withdrawal Password
              </h2>

              <div className="password-input-container">
                <input
                  id="withdraw-password-2"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className="form-input"
                  value={withdrawPassword2}
                  onChange={(e) => setWithdrawPassword2(e.target.value)}
                />
                <div
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-6 w-6" />
                  ) : (
                    <EyeIcon className="w-6 h-6" />
                  )}
                </div>
              </div>
              {withdrawPasswordErrors.confirmWithdrawPassword && (
                <div className="text-red-400 text-sm mt-1">
                  {withdrawPasswordErrors.confirmWithdrawPassword}
                </div>
              )}
            </div>
          </div>
          <div className="p-4 bg-white-4 flex justify-between rounded-[8px] h-[56px] items-center">
            <span className="text-dodger-blue font-bold text-[12px]">
              {user?.email || '-'}
            </span>
            {emailVerified ? (
              <span className="text-malachite font-medium flex gap-2 items-center">
                <CheckCircleIcon />
                Verified
              </span>
            ) : (
              <FlatButton
                onClick={() => {
                  setWithdrawModal(false)
                  setEmailModal(true)
                }}
                className="h-9 px-3 text-gallery font-bold text-[12px]"
              >
                Verify Email
              </FlatButton>
            )}
          </div>
          <TDButton
            type="blue"
            onClick={() => {
              // Clear previous errors
              setWithdrawPasswordErrors({})
              
              // Basic field validation - always require login password for withdrawal password
              if (!loginPassword || !withdrawPassword1 || !withdrawPassword2) { 
                showError('Error', 'Please fill all fields'); 
                return 
              }
              
              // Old password validation removed since current password field is removed
              
              // Validate withdrawal password using the same logic as login
              const withdrawalPasswordValidation = validatePassword(withdrawPassword1)
              if (!withdrawalPasswordValidation.isValid) {
                setWithdrawPasswordErrors({ withdrawPassword: withdrawalPasswordValidation.message! })
                return
              }
              
              // Check if passwords match
              if (withdrawPassword1 !== withdrawPassword2) { 
                setWithdrawPasswordErrors({ confirmWithdrawPassword: 'Withdrawal passwords do not match' })
                return 
              }
              
              // Clear any errors before submitting
              setWithdrawPasswordErrors({})
              
              console.log('Frontend: Sending withdrawal password request:', {
                hasPassword: !!withdrawPassword1,
                hasLoginPassword: !!loginPassword,
                loginPasswordLength: loginPassword?.length
              });
              
              dispatch(setWithdrawPassword({ 
                password: withdrawPassword1,
                oldPassword: undefined, // Removed current password field
                loginPassword: loginPassword
              }))
                .unwrap()
                .then((result) => {
                  console.log('Frontend: Withdrawal password set successfully:', result);
                  if (user?.id) {
                    dispatch(setWithdrawPasswordSet({ userId: user.id as number, set: true }))
                  }
                  // Use the message from backend response or a clear success message
                  const successMessage = result?.message || 'Withdrawal password set successfully'
                  showSuccess('Success', successMessage)
                  toggleWithdraw()
                })
                .catch(err => {
                  console.log('Frontend: Withdrawal password error:', err);
                  const errorMessage = extractErrorMessage(err, 'Failed to update withdrawal password')
                  
                  // Show specific error message for invalid login password
                  if (errorMessage.includes('Invalid login password') || errorMessage.includes('401')) {
                    showError('Authentication Error', 'Invalid login password. Please check your login password and try again.')
                  } else {
                    showError('Error', errorMessage)
                  }
                })
            }}
            disabled={
              !emailVerified || 
              !loginPassword || 
              Object.keys(withdrawPasswordErrors).length > 0
            }
            className="w-full h-[41px] text-gallery text-[14px]"
          >
            {emailVerified ? 'Submit' : 'Verify Email First'}
          </TDButton>
        </ModalContainer>
        <ModalContainer
          isOpen={emailModal}
          title="Verify Email"
          className="lg:w-[30%] "
          onClose={toggleEmailModal}
        >
          <div className="flex flex-col gap-2">
            <div className="rounded-[12px] flex flex-col gap-4 p-4 bg-white-4">
              <h2 className="text-white text-[14px] font-bold">Email</h2>
              <div className="rounded-[0.75rem] bg-white-8 p-2 flex justify-between items-center">
                <span className="text-white font-medium text-[12px]">
                  {user?.email || '-'}
                </span>
                <FlatButton
                  onClick={() => {
                    if (emailSendCooldown > 0) return
                    dispatch(requestEmailVerification())
                      .unwrap()
                      .then(() => {
                        showSuccess('Success', 'Verification code sent to your email')
                        setEmailSendCooldown(60)
                      })
                      .catch(err => showError('Error', err))
                  }}
                  disabled={emailSendCooldown > 0}
                  className={`w-[64px] h-9  text-gallery font-bold text-[12px] ${emailSendCooldown > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {emailSendCooldown > 0 ? `${emailSendCooldown}s` : 'Send'}
                </FlatButton>
              </div>
            </div>
            <h2 className="text-[12px] text-white font-bold indent-[20px]">
              Enter verification code
            </h2>
            <div className="mt-2">
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  disabled={isVerifying}
                  className="w-full h-12 px-4 bg-deep-blue border rounded-xl text-white placeholder-blue-bayoux text-sm focus:outline-none border-blue-bayoux focus:border-dodger-blue"
                />
              </div>
              <TDButton
                onClick={handleVerifyAndBind}
                loading={isVerifying}
                disabled={!verificationCode.trim() || isVerifying}
                className="w-full h-10"
                type="red"
              >
                {isVerifying ? 'Verifying & Binding...' : 'Bind Email'}
              </TDButton>
            </div>
            <div className="p-4 rounded-[12px] font-medium text-[14px] bg-[#1BB83D21] text-white">
              Check your email for the verification code. The code will expire in 10 minutes.
            </div>
          </div>
        </ModalContainer>
      </div>
    </div>
  )
}

export default Security
