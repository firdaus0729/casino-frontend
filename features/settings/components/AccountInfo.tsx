import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import EditIcon from '@/components/ui/icons/edit'
import TDButton from '@/components/ui/Button/TDButton'
import FlatButton from '@/components/ui/Button/FlatButton'
import ModalContainer from '@/components/modals/ModalContainer'
import TelegramIcon from '@/components/ui/icons/TelegramIcon'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchProfile, setTelegram, setAvatar, setDisplayName, shouldShowEmailVerificationButtons } from '@/store/slices/authSlice'
import { useLoadingState } from '@/hooks'
import { Loader } from 'lucide-react'
import { useToast } from '@/context/ToastProvider'
import { extractErrorMessage, extractSuccessMessage } from '@/lib/error-utils'

const AccountInfo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false)
  const [telegramInput, setTelegramInput] = useState<string>('')
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, token, isAuthenticated } = useAppSelector(state => state.auth)
  const { isLoading: isTelegramLoading, withLoading: withTelegramLoading } = useLoadingState()
  const { isLoading: isAvatarLoading, withLoading: withAvatarLoading } = useLoadingState()
  const { isLoading: isNameLoading, withLoading: withNameLoading } = useLoadingState()
  const { showSuccess, showError } = useToast()
  const [disName, setDisName] = useState<string>(user?.name || '')
  const [isUpdatingName, setIsUpdatingName] = useState(false)
  const isDisplayNameValid = (disName || '').trim().length >= 3

  // Clean conditional logic for email verification buttons
  const showEmailVerificationButtons = shouldShowEmailVerificationButtons(user)
  
  // Debug logging
  console.log('AccountInfo - Email verification status:', {
    userId: user?.id,
    email: user?.email,
    provider: user?.provider,
    userIsVerified: user?.isVerified,
    showEmailVerificationButtons,
    hasUser: !!user,
    userObject: user
  })

  // Sync display name when user data changes (only after backend confirmation)
  useEffect(() => {
    if (user?.name !== undefined) {
      // Always sync with database value - this ensures we have the latest data
      console.log('Syncing display name from database:', user.name)
      setDisName(user.name || '')
    }
  }, [user?.name])

  // Debug: Log when user data changes
  useEffect(() => {
    console.log('AccountInfo - User data updated:', {
      telegram: user?.telegram,
      name: user?.name,
      hasUser: !!user
    })
  }, [user?.telegram, user?.name, user])

  useEffect(() => {
    console.log('AccountInfo - User data changed:', {
      isAuthenticated,
      hasToken: !!token,
      hasUser: !!user,
      user: user,
      telegram: user?.telegram,
      hasTelegram: !!user?.telegram
    })
    
    if (isAuthenticated && token && !user) {
      console.log('AccountInfo - Dispatching fetchProfile because user data is missing')
      dispatch(fetchProfile())
    }
  }, [isAuthenticated, token, user, dispatch])


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className="[@media(max-width:660px)]:w-full">
      <div className="w-full flex flex-col gap-3">
        {/* AccountInfo Header */}
        <h1 className="text-lg sm:text-xl hidden lg:block font-bold text-white mb-2">
          User Information
        </h1>
        <div className="rounded-[12px] bg-white-4 p-3 overflow-hidden flex gap-3 justify-between">
          <div className="flex gap-3 items-center">
            <div className="relative flex flex-col items-center">
              <div className="relative">
                <img
                  src={user?.avatar || '/images/Frame.png'}
                  alt="User avatar"
                  className="w-14 h-14 rounded-2xl shadow-[0_1px_0_0_rgba(255,255,255,0.16)_inset] backdrop-blur-[32px]"
                />
                {/* VIP Badge - positioned to overlap the bottom of the avatar */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className="h-4 px-2 flex items-center justify-center rounded-xl border border-white shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset]"
                    style={{ backgroundColor: 'var(--malachite)' }}
                  >
                    <span className="text-white text-xs font-bold whitespace-nowrap">
                      VIP 1
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[14px] text-white font-bold">
                {disName || user?.email || 'User'}
              </span>
              <span className="text-[12px] text-casper">User ID: {String(user?.id || '-')}</span>
            </div>
          </div>
          <div
            onClick={toggleModal}
            className="bg-mirage-4 cursor-pointer active:bg-mirage hover:bg-mirage flex gap-1 text-[14px] h-8 items-center px-3 text-casper font-bold rounded-[8px] overflow-hidden"
          >
            <EditIcon className="w-4 h-4" />
            Edit
          </div>
        </div>
        <div className="rounded-[12px] bg-white-4 p-3 lg:items-center justify-between flex lg:flex-row flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-white text-[14px]">Email Address</h2>
            <p className="text-[14px] text-casper">
              {user?.email || 'No email linked yet.'}
            </p>
          </div>
          {showEmailVerificationButtons && (
            <TDButton
              type="blue"
              className="lg:w-[164px] w-full h-[36px] text-gallery font-bold text-[14px]"
              onClick={() => {
                // Navigate to the Security settings page where email binding is handled
                router.push('/settings?tab=security')
              }}
            >
              Go to binding
            </TDButton>
          )}
        </div>
        <div className="rounded-[12px] bg-white-4 p-3 flex flex-col gap-2">
          <h2 className="font-bold text-[14px] text-white">
            Telegram
          </h2>
          <div className="p-2 bg-white-8 justify-between flex items-center pl-3 rounded-[12px]">
            <div className="flex text-casper text-[14px] font-bold gap-2">
              <TelegramIcon color="var(--casper)" className="w-5 h-5" />
              {user?.telegram || 'Not intertwined'}
            </div>
            <FlatButton
              onClick={() => {
                console.log('Opening Telegram modal with current value:', user?.telegram)
                setTelegramInput(user?.telegram || '')
                setIsTelegramModalOpen(true)
              }}
              disabled={isTelegramLoading}
              className={`w-[82px] h-8 font-bold text-gallery text-[12px] ${
                isTelegramLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isTelegramLoading ? (
                <span className="flex items-center gap-1">
                  <Loader className="animate-spin h-3 w-3" />
                  ...
                </span>
              ) : (
                user?.telegram ? 'Update' : 'Binding'
              )}
            </FlatButton>
          </div>
        </div>
      </div>

      <ModalContainer
        onClose={toggleModal}
        isOpen={isModalOpen}
        title="Edit profile"
        position="responsive"
        size="md"
        contentClassName="max-h-[calc(100dvh-12rem)] sm:max-h-[80vh] overflow-y-auto pb-4"
      >
        <div className="flex gap-2 flex-col">
          <div className="rounded-[14px] items-center bg-white-4 overflow-hidden p-3 gap-2 flex flex-col">
            <img
              src={
                avatarPreview || user?.avatar || '/images/Frame.png'
              }
              alt="User avatar"
              className="w-14 h-14 rounded-2xl shadow-[0_1px_0_0_rgba(255,255,255,0.16)_inset] backdrop-blur-[32px]"
            />
            <span 
              className={`font-bold p-3 text-casper text-[12px] ${
                isAvatarLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              }`}
              onClick={isAvatarLoading ? undefined : withAvatarLoading(async () => {
                try {
                  const fileInput = document.createElement('input')
                  fileInput.type = 'file'
                  fileInput.accept = 'image/*'
                  fileInput.onchange = async () => {
                    const file = (fileInput.files && fileInput.files[0]) || null
                    if (!file) return
                    const reader = new FileReader()
                    reader.onload = async () => {
                      const dataUrl = (reader.result as string) || ''
                      const base64 = dataUrl.split(',')[1] || ''
                      if (!base64) return
                      // Instant preview
                      if (dataUrl) setAvatarPreview(dataUrl)
                      try {
                        const result = await dispatch(setAvatar({ imageBase64: base64 })).unwrap()
                        const successMessage = extractSuccessMessage(result, 'Avatar updated successfully')
                        showSuccess('Success', successMessage)
                      } catch (err) {
                        const errorMessage = extractErrorMessage(err, 'Failed to update avatar')
                        showError('Error', errorMessage)
                        // Revert preview on failure
                        setAvatarPreview(null)
                      }
                    }
                    reader.readAsDataURL(file)
                  }
                  fileInput.click()
                } catch {}
              })}
            >
              {isAvatarLoading ? (
                <span className="flex items-center gap-2">
                  <Loader className="animate-spin h-3 w-3" />
                  Uploading...
                </span>
              ) : (
                'Change avatar'
              )}
            </span>
          </div>
          <div className="flex flex-col gap-2 p-3 bg-white-4 rounded-[12px]">
            <div className="input-group">
              <label className="input-label">Display name</label>
              <input
                id="display-name-input"
                type="text"
                placeholder="Enter display name"
                className="form-input rounded-[8px]"
                value={disName}
                onChange={e => setDisName(e.target.value)}
                disabled={isNameLoading || isUpdatingName}
              />
              {!isDisplayNameValid && (
                <span className="text-[12px] text-yellow-orange">Must be at least 3 characters.</span>
              )}
            </div>
            <p className="text-casper text-[12px]">
              Set the name that will be shown on your profile.
            </p>
            <TDButton
              onClick={withNameLoading(async () => {
                const name = (disName || '').trim()
                if (name.length < 3) { 
                  showError('Error', 'Display name must be at least 3 characters')
                  return 
                }
                
                setIsUpdatingName(true)
                
                try {
                  // Wait for backend confirmation before updating UI
                  const result = await dispatch(setDisplayName({ name })).unwrap()
                  
                  // Only proceed with UI updates after backend confirms success
                  if (result.code === 200 || result.code === 0) {
                    // Backend has confirmed the update - fetch fresh data from database
                    console.log('Backend update successful, fetching fresh profile data...')
                    await dispatch(fetchProfile()).unwrap()
                    
                    // Show success message from backend response
                    const successMessage = extractSuccessMessage(result, 'Name updated successfully')
                    showSuccess('Success', successMessage)
                    toggleModal()
                  } else {
                    // Backend returned error code - revert to original name
                    console.warn('Backend rejected update, reverting to original name')
                    setDisName(user?.name || '')
                    const errorMessage = extractErrorMessage(result, 'Failed to update name')
                    showError('Error', errorMessage)
                  }
                } catch (err) {
                  // Network error or other exception - revert to original name
                  console.error('Display name update failed:', err)
                  setDisName(user?.name || '')
                  const errorMessage = extractErrorMessage(err, 'Failed to update name')
                  showError('Error', errorMessage)
                } finally {
                  setIsUpdatingName(false)
                }
              })}
              loading={isNameLoading || isUpdatingName}
              disabled={!isDisplayNameValid || isUpdatingName}
              type="blue"
              className="w-full h-[41px] text-gallery font-bold text-[14px]"
            >
              Save
            </TDButton>
          </div>
        </div>
      </ModalContainer>

      <ModalContainer
        onClose={() => setIsTelegramModalOpen(false)}
        isOpen={isTelegramModalOpen}
        title={user?.telegram ? 'Update Telegram' : 'Bind Telegram'}
        position="responsive"
        size="md"
        contentClassName="max-h-[calc(100dvh-12rem)] sm:max-h-[80vh] overflow-y-auto pb-4"
      >
        <div className="flex flex-col gap-3">
          <div className="input-group">
            <label className="input-label">Telegram username</label>
            <input
              type="text"
              placeholder="Enter your Telegram username (without @)"
              className="form-input rounded-[8px]"
              value={telegramInput}
              onChange={e => setTelegramInput(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <TDButton
              type="red"
              className="flex-1 h-[41px] text-gallery font-bold text-[14px]"
              onClick={() => setIsTelegramModalOpen(false)}
            >
              Cancel
            </TDButton>
            <TDButton
              type="blue"
              className="flex-1 h-[41px] text-gallery font-bold text-[14px]"
              onClick={withTelegramLoading(async () => {
                const tg = (telegramInput || '').trim()
                if (!tg) { showError('Error', 'Please enter a Telegram username'); return }
                try {
                  console.log('Updating Telegram to:', tg)
                  const result = await dispatch(setTelegram({ telegram: tg })).unwrap()
                  console.log('Telegram update successful, new value should be:', tg)
                  
                  // Show success message from backend response
                  const successMessage = extractSuccessMessage(result, 'Telegram updated successfully')
                  showSuccess('Success', successMessage)
                  setIsTelegramModalOpen(false)
                } catch (err) {
                  console.error('Telegram update failed:', err)
                  const errorMessage = extractErrorMessage(err, 'Failed to update Telegram')
                  showError('Error', errorMessage)
                }
              })}
              disabled={isTelegramLoading}
            >
              {isTelegramLoading ? (
                <span className="flex items-center gap-1">
                  <Loader className="animate-spin h-3 w-3" />
                  ...
                </span>
              ) : (
                'Save'
              )}
            </TDButton>
          </div>
        </div>
      </ModalContainer>
    </div>
  )
}

export default AccountInfo
