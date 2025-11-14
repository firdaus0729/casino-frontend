'use client'

import React from 'react'
import { CheckCircle, Circle, Clock, AlertTriangle, Lock, Shield, User, Key, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProgressStep {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  status: 'completed' | 'current' | 'pending' | 'locked' | 'error'
  required: boolean
  estimatedTime?: string
}

interface ProgressTrackerProps {
  steps: ProgressStep[]
  currentStep: string
  onStepClick?: (stepId: string) => void
  showTimeEstimates?: boolean
  showSecurityLevel?: boolean
  className?: string
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  steps,
  currentStep,
  onStepClick,
  showTimeEstimates = true,
  showSecurityLevel = true,
  className = ''
}) => {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep)
  const completedSteps = steps.filter(step => step.status === 'completed').length
  const totalSteps = steps.length
  const progressPercentage = (completedSteps / totalSteps) * 100

  const getStatusIcon = (step: ProgressStep) => {
    const iconProps = { className: "h-5 w-5" }
    
    switch (step.status) {
      case 'completed':
        return <CheckCircle {...iconProps} className="h-5 w-5 text-green-500" />
      case 'current':
        return <Circle {...iconProps} className="h-5 w-5 text-blue-500" />
      case 'error':
        return <AlertTriangle {...iconProps} className="h-5 w-5 text-red-500" />
      case 'locked':
        return <Lock {...iconProps} className="h-5 w-5 text-gray-400" />
      case 'pending':
      default:
        return <Circle {...iconProps} className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (step: ProgressStep) => {
    switch (step.status) {
      case 'completed':
        return 'border-green-500/20 bg-green-500/5'
      case 'current':
        return 'border-blue-500/20 bg-blue-500/5'
      case 'error':
        return 'border-red-500/20 bg-red-500/5'
      case 'locked':
        return 'border-gray-500/20 bg-gray-500/5'
      case 'pending':
      default:
        return 'border-gray-500/20 bg-gray-500/5'
    }
  }

  const getSecurityLevel = () => {
    const enabledSteps = steps.filter(step => 
      step.status === 'completed' || step.status === 'current'
    ).length

    if (enabledSteps >= 4) return { level: 'High', color: 'text-green-500', bg: 'bg-green-500/10' }
    if (enabledSteps >= 2) return { level: 'Medium', color: 'text-yellow-500', bg: 'bg-yellow-500/10' }
    return { level: 'Low', color: 'text-red-500', bg: 'bg-red-500/10' }
  }

  const securityLevel = getSecurityLevel()

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header with Progress */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gallery mb-2">
          Authentication Progress
        </h3>
        <p className="text-casper text-sm mb-4">
          Step {currentStepIndex + 1} of {totalSteps}
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Security Level Indicator */}
        {showSecurityLevel && (
          <div className={cn(
            "inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium",
            securityLevel.bg, securityLevel.color
          )}>
            <Shield className="h-4 w-4" />
            <span>Security Level: {securityLevel.level}</span>
          </div>
        )}
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isClickable = onStepClick && (step.status !== 'locked')
          
          return (
            <div
              key={step.id}
              onClick={() => isClickable && onStepClick(step.id)}
              className={cn(
                "p-4 rounded-lg border transition-all",
                getStatusColor(step),
                isClickable && "cursor-pointer hover:border-blue-500/30",
                !isClickable && "cursor-not-allowed"
              )}
            >
              <div className="flex items-start space-x-3">
                {/* Step Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  {getStatusIcon(step)}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={cn(
                      "font-medium",
                      step.status === 'completed' && "text-green-400",
                      step.status === 'current' && "text-blue-400",
                      step.status === 'error' && "text-red-400",
                      step.status === 'locked' && "text-gray-400",
                      step.status === 'pending' && "text-gallery"
                    )}>
                      {step.title}
                    </h4>
                    
                    <div className="flex items-center space-x-2">
                      {step.required && (
                        <span className="text-xs text-red-500 font-medium">Required</span>
                      )}
                      {showTimeEstimates && step.estimatedTime && (
                        <div className="flex items-center space-x-1 text-xs text-casper">
                          <Clock className="h-3 w-3" />
                          <span>{step.estimatedTime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-casper mt-1">
                    {step.description}
                  </p>

                  {/* Step Status */}
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Icon className="h-4 w-4 text-casper" />
                      <span className="text-xs text-casper capitalize">
                        {step.status === 'completed' && 'Completed'}
                        {step.status === 'current' && 'In Progress'}
                        {step.status === 'pending' && 'Pending'}
                        {step.status === 'locked' && 'Locked'}
                        {step.status === 'error' && 'Error'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-300/30" />
              )}
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="bg-white-2 rounded-lg p-4 border border-white-4">
        <h4 className="font-medium text-gallery mb-2">Progress Summary</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-casper">Completed:</span>
            <span className="text-green-500 font-medium ml-2">
              {completedSteps}/{totalSteps}
            </span>
          </div>
          <div>
            <span className="text-casper">Remaining:</span>
            <span className="text-blue-500 font-medium ml-2">
              {totalSteps - completedSteps} steps
            </span>
          </div>
        </div>
        
        {/* Next Step */}
        {currentStepIndex < steps.length - 1 && (
          <div className="mt-3 pt-3 border-t border-white-4">
            <span className="text-casper text-sm">Next:</span>
            <span className="text-gallery font-medium ml-2">
              {steps[currentStepIndex + 1]?.title}
            </span>
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
              <li>• Complete all required steps for maximum security</li>
              <li>• Keep your authentication methods up to date</li>
              <li>• Review your security settings regularly</li>
              <li>• Enable backup codes for emergency access</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Default steps for authentication flow
export const defaultAuthSteps: ProgressStep[] = [
  {
    id: 'method',
    title: 'Choose Method',
    description: 'Select your preferred authentication method',
    icon: User,
    status: 'completed',
    required: true,
    estimatedTime: '1 min'
  },
  {
    id: 'credentials',
    title: 'Credentials',
    description: 'Enter your email and password',
    icon: Key,
    status: 'completed',
    required: true,
    estimatedTime: '2 mins'
  },
  {
    id: 'verification',
    title: 'Email Verification',
    description: 'Verify your email address',
    icon: Mail,
    status: 'current',
    required: true,
    estimatedTime: '3 mins'
  },
  {
    id: 'security',
    title: 'Security Setup',
    description: 'Set up security questions',
    icon: Shield,
    status: 'pending',
    required: true,
    estimatedTime: '2 mins'
  },
  {
    id: 'profile',
    title: 'Profile',
    description: 'Complete your profile information',
    icon: User,
    status: 'pending',
    required: false,
    estimatedTime: '3 mins'
  },
  {
    id: 'mfa',
    title: 'Multi-Factor Auth',
    description: 'Enable additional security layers',
    icon: Lock,
    status: 'locked',
    required: false,
    estimatedTime: '5 mins'
  }
]

export default ProgressTracker
