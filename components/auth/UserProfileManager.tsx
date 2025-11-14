'use client'

import React, { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, Calendar, Pin, Shield, Eye, EyeOff, Camera, Upload, Save, Edit3, Settings, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  dateOfBirth?: string
  country: string
  city?: string
  address?: string
  avatar?: string
  bio?: string
  preferences: {
    language: string
    timezone: string
    notifications: {
      email: boolean
      sms: boolean
      push: boolean
    }
    privacy: {
      profileVisibility: 'public' | 'friends' | 'private'
      showEmail: boolean
      showPhone: boolean
    }
  }
  security: {
    twoFactorEnabled: boolean
    lastPasswordChange: string
    loginHistory: Array<{
      date: string
      location: string
      device: string
    }>
  }
  verification: {
    emailVerified: boolean
    phoneVerified: boolean
    identityVerified: boolean
  }
}

interface UserProfileManagerProps {
  profile: UserProfile
  onUpdate: (updatedProfile: Partial<UserProfile>) => void
  onSave: (profile: UserProfile) => void
  isLoading?: boolean
  readOnly?: boolean
}

const UserProfileManager: React.FC<UserProfileManagerProps> = ({
  profile,
  onUpdate,
  onSave,
  isLoading = false,
  readOnly = false
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'preferences' | 'security' | 'verification'>('basic')
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    setEditedProfile(profile)
  }, [profile])

  const handleInputChange = (field: string, value: any) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleNestedInputChange = (section: string, field: string, value: any) => {
    setEditedProfile(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof UserProfile] as any),
        [field]: value
      }
    }))
    setErrors(prev => ({ ...prev, [`${section}.${field}`]: '' }))
  }

  const validateProfile = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!editedProfile.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!editedProfile.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!editedProfile.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedProfile.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (editedProfile.phone && !/^\+?[\d\s\-\(\)]+$/.test(editedProfile.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validateProfile()) return

    onSave(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setErrors({})
    setIsEditing(false)
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Create a preview URL for the uploaded image
      const reader = new FileReader()
      reader.onload = (e) => {
        handleInputChange('avatar', e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const renderBasicInfo = () => (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-white-2 border-2 border-white-4">
            {editedProfile.avatar ? (
              <img 
                src={editedProfile.avatar} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="h-8 w-8 text-casper" />
              </div>
            )}
          </div>
          {isEditing && (
            <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
              <Camera className="h-4 w-4 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gallery">
            {editedProfile.firstName} {editedProfile.lastName}
          </h3>
          <p className="text-casper">{editedProfile.email}</p>
          <div className="flex items-center space-x-4 mt-2">
            <span className={cn(
              "text-xs px-2 py-1 rounded-full",
              editedProfile.verification.emailVerified 
                ? "bg-green-500/10 text-green-500" 
                : "bg-red-500/10 text-red-500"
            )}>
              {editedProfile.verification.emailVerified ? 'Email Verified' : 'Email Unverified'}
            </span>
            {editedProfile.verification.phoneVerified && (
              <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500">
                Phone Verified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-casper mb-2">First Name</label>
          <input
            type="text"
            value={editedProfile.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            disabled={!isEditing || readOnly}
            className={cn(
              "w-full p-3 rounded-lg border bg-white-2 text-gallery placeholder-casper focus:outline-none",
              errors.firstName ? "border-red-500" : "border-white-4 focus:border-blue-500",
              (!isEditing || readOnly) && "bg-white-1 cursor-not-allowed"
            )}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-casper mb-2">Last Name</label>
          <input
            type="text"
            value={editedProfile.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            disabled={!isEditing || readOnly}
            className={cn(
              "w-full p-3 rounded-lg border bg-white-2 text-gallery placeholder-casper focus:outline-none",
              errors.lastName ? "border-red-500" : "border-white-4 focus:border-blue-500",
              (!isEditing || readOnly) && "bg-white-1 cursor-not-allowed"
            )}
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-casper mb-2">Email</label>
          <input
            type="email"
            value={editedProfile.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={!isEditing || readOnly}
            className={cn(
              "w-full p-3 rounded-lg border bg-white-2 text-gallery placeholder-casper focus:outline-none",
              errors.email ? "border-red-500" : "border-white-4 focus:border-blue-500",
              (!isEditing || readOnly) && "bg-white-1 cursor-not-allowed"
            )}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-casper mb-2">Phone</label>
          <input
            type="tel"
            value={editedProfile.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            disabled={!isEditing || readOnly}
            className={cn(
              "w-full p-3 rounded-lg border bg-white-2 text-gallery placeholder-casper focus:outline-none",
              errors.phone ? "border-red-500" : "border-white-4 focus:border-blue-500",
              (!isEditing || readOnly) && "bg-white-1 cursor-not-allowed"
            )}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-casper mb-2">Date of Birth</label>
          <input
            type="date"
            value={editedProfile.dateOfBirth || ''}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            disabled={!isEditing || readOnly}
            className={cn(
              "w-full p-3 rounded-lg border bg-white-2 text-gallery focus:outline-none",
              "border-white-4 focus:border-blue-500",
              (!isEditing || readOnly) && "bg-white-1 cursor-not-allowed"
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-casper mb-2">Country</label>
          <select
            value={editedProfile.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            disabled={!isEditing || readOnly}
            className={cn(
              "w-full p-3 rounded-lg border bg-white-2 text-gallery focus:outline-none",
              "border-white-4 focus:border-blue-500",
              (!isEditing || readOnly) && "bg-white-1 cursor-not-allowed"
            )}
          >
            <option value="">Select Country</option>
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
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-casper mb-2">Bio</label>
        <textarea
          value={editedProfile.bio || ''}
          onChange={(e) => handleInputChange('bio', e.target.value)}
          disabled={!isEditing || readOnly}
          rows={3}
          className={cn(
            "w-full p-3 rounded-lg border bg-white-2 text-gallery placeholder-casper focus:outline-none resize-none",
            "border-white-4 focus:border-blue-500",
            (!isEditing || readOnly) && "bg-white-1 cursor-not-allowed"
          )}
          placeholder="Tell us about yourself..."
        />
      </div>
    </div>
  )

  const renderPreferences = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-casper mb-2">Language</label>
        <select
          value={editedProfile.preferences.language}
          onChange={(e) => handleNestedInputChange('preferences', 'language', e.target.value)}
          disabled={!isEditing || readOnly}
          className={cn(
            "w-full p-3 rounded-lg border bg-white-2 text-gallery focus:outline-none",
            "border-white-4 focus:border-blue-500",
            (!isEditing || readOnly) && "bg-white-1 cursor-not-allowed"
          )}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="zh">Chinese</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-casper mb-2">Timezone</label>
        <select
          value={editedProfile.preferences.timezone}
          onChange={(e) => handleNestedInputChange('preferences', 'timezone', e.target.value)}
          disabled={!isEditing || readOnly}
          className={cn(
            "w-full p-3 rounded-lg border bg-white-2 text-gallery focus:outline-none",
            "border-white-4 focus:border-blue-500",
            (!isEditing || readOnly) && "bg-white-1 cursor-not-allowed"
          )}
        >
          <option value="UTC-12">UTC-12:00</option>
          <option value="UTC-8">UTC-08:00 (PST)</option>
          <option value="UTC-5">UTC-05:00 (EST)</option>
          <option value="UTC+0">UTC+00:00 (GMT)</option>
          <option value="UTC+1">UTC+01:00 (CET)</option>
          <option value="UTC+8">UTC+08:00 (CST)</option>
          <option value="UTC+9">UTC+09:00 (JST)</option>
        </select>
      </div>

      {/* Notifications */}
      <div>
        <h4 className="text-gallery font-medium mb-3">Notification Preferences</h4>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={editedProfile.preferences.notifications.email}
              onChange={(e) => handleNestedInputChange('preferences', 'notifications', {
                ...editedProfile.preferences.notifications,
                email: e.target.checked
              })}
              disabled={!isEditing || readOnly}
              className="w-4 h-4 text-blue-500 border-white-4 rounded focus:ring-blue-500"
            />
            <span className="text-casper">Email notifications</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={editedProfile.preferences.notifications.sms}
              onChange={(e) => handleNestedInputChange('preferences', 'notifications', {
                ...editedProfile.preferences.notifications,
                sms: e.target.checked
              })}
              disabled={!isEditing || readOnly}
              className="w-4 h-4 text-blue-500 border-white-4 rounded focus:ring-blue-500"
            />
            <span className="text-casper">SMS notifications</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={editedProfile.preferences.notifications.push}
              onChange={(e) => handleNestedInputChange('preferences', 'notifications', {
                ...editedProfile.preferences.notifications,
                push: e.target.checked
              })}
              disabled={!isEditing || readOnly}
              className="w-4 h-4 text-blue-500 border-white-4 rounded focus:ring-blue-500"
            />
            <span className="text-casper">Push notifications</span>
          </label>
        </div>
      </div>

      {/* Privacy */}
      <div>
        <h4 className="text-gallery font-medium mb-3">Privacy Settings</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-casper mb-2">Profile Visibility</label>
            <select
              value={editedProfile.preferences.privacy.profileVisibility}
              onChange={(e) => handleNestedInputChange('preferences', 'privacy', {
                ...editedProfile.preferences.privacy,
                profileVisibility: e.target.value
              })}
              disabled={!isEditing || readOnly}
              className={cn(
                "w-full p-3 rounded-lg border bg-white-2 text-gallery focus:outline-none",
                "border-white-4 focus:border-blue-500",
                (!isEditing || readOnly) && "bg-white-1 cursor-not-allowed"
              )}
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={editedProfile.preferences.privacy.showEmail}
              onChange={(e) => handleNestedInputChange('preferences', 'privacy', {
                ...editedProfile.preferences.privacy,
                showEmail: e.target.checked
              })}
              disabled={!isEditing || readOnly}
              className="w-4 h-4 text-blue-500 border-white-4 rounded focus:ring-blue-500"
            />
            <span className="text-casper">Show email on profile</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={editedProfile.preferences.privacy.showPhone}
              onChange={(e) => handleNestedInputChange('preferences', 'privacy', {
                ...editedProfile.preferences.privacy,
                showPhone: e.target.checked
              })}
              disabled={!isEditing || readOnly}
              className="w-4 h-4 text-blue-500 border-white-4 rounded focus:ring-blue-500"
            />
            <span className="text-casper">Show phone on profile</span>
          </label>
        </div>
      </div>
    </div>
  )

  const renderSecurity = () => (
    <div className="space-y-6">
      {/* Security Status */}
      <div className="bg-white-2 rounded-lg p-4 border border-white-4">
        <h4 className="text-gallery font-medium mb-3">Security Status</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-casper">Two-Factor Authentication</span>
            <span className={cn(
              "text-xs px-2 py-1 rounded-full",
              editedProfile.security.twoFactorEnabled 
                ? "bg-green-500/10 text-green-500" 
                : "bg-red-500/10 text-red-500"
            )}>
              {editedProfile.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-casper">Last Password Change</span>
            <span className="text-gallery text-sm">{editedProfile.security.lastPasswordChange}</span>
          </div>
        </div>
      </div>

      {/* Login History */}
      <div>
        <h4 className="text-gallery font-medium mb-3">Recent Login History</h4>
        <div className="space-y-2">
          {editedProfile.security.loginHistory.map((login, index) => (
            <div key={index} className="bg-white-2 rounded-lg p-3 border border-white-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gallery text-sm font-medium">{login.device}</div>
                  <div className="text-casper text-xs">{login.location}</div>
                </div>
                <div className="text-casper text-xs">{login.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderVerification = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white-2 rounded-lg border border-white-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-casper" />
            <div>
              <div className="text-gallery font-medium">Email Verification</div>
              <div className="text-casper text-sm">{editedProfile.email}</div>
            </div>
          </div>
          <span className={cn(
            "text-xs px-2 py-1 rounded-full",
            editedProfile.verification.emailVerified 
              ? "bg-green-500/10 text-green-500" 
              : "bg-red-500/10 text-red-500"
          )}>
            {editedProfile.verification.emailVerified ? 'Verified' : 'Unverified'}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-white-2 rounded-lg border border-white-4">
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-casper" />
            <div>
              <div className="text-gallery font-medium">Phone Verification</div>
              <div className="text-casper text-sm">{editedProfile.phone || 'Not provided'}</div>
            </div>
          </div>
          <span className={cn(
            "text-xs px-2 py-1 rounded-full",
            editedProfile.verification.phoneVerified 
              ? "bg-green-500/10 text-green-500" 
              : "bg-red-500/10 text-red-500"
          )}>
            {editedProfile.verification.phoneVerified ? 'Verified' : 'Unverified'}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-white-2 rounded-lg border border-white-4">
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-casper" />
            <div>
              <div className="text-gallery font-medium">Identity Verification</div>
              <div className="text-casper text-sm">Government ID verification</div>
            </div>
          </div>
          <span className={cn(
            "text-xs px-2 py-1 rounded-full",
            editedProfile.verification.identityVerified 
              ? "bg-green-500/10 text-green-500" 
              : "bg-red-500/10 text-red-500"
          )}>
            {editedProfile.verification.identityVerified ? 'Verified' : 'Unverified'}
          </span>
        </div>
      </div>
    </div>
  )

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'verification', label: 'Verification', icon: CheckCircle }
  ] as const

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gallery">Profile Management</h2>
        {!readOnly && (
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-casper hover:text-gallery transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-white-4 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors",
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-casper hover:text-gallery"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'basic' && renderBasicInfo()}
        {activeTab === 'preferences' && renderPreferences()}
        {activeTab === 'security' && renderSecurity()}
        {activeTab === 'verification' && renderVerification()}
      </div>
    </div>
  )
}

export default UserProfileManager
