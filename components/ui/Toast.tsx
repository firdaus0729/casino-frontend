'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { X, CheckCircle, AlertCircle, AlertTriangle, AlertCircleIcon } from 'lucide-react'
import AlertSquareIcon from './icons/alert-square'
import CheckCircleIcon from './icons/check-circle'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning'
  title: string
  message: string
  duration?: number
}

interface ToastProps {
  toast: Toast
  onRemove: (id: string) => void
}

const ToastComponent: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleRemove()
      }, toast.duration)
      return () => clearTimeout(timer)
    }
  }, [toast.duration])

  const handleRemove = () => {
    setIsLeaving(true)
    setTimeout(() => {
      onRemove(toast.id)
    }, 300) // Match animation duration
  }

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-malachite" />
      case 'error':
        return <AlertSquareIcon className="h-5 w-5" color="#ed1d49" />
      case 'warning':
        return <AlertCircleIcon className="h-5 w-5 text-yellow-orange" />
    }
  }

  const getIconBg = () => {
    switch (toast.type) {
      case 'success':
        return 'text-malachite'
      case 'error':
        return 'text-crimson'
      case 'warning':
        return 'text-yellow-orange'
      default:
        return 'text-crimson'
    }
  }

  return (
    <div
      className={cn(
        'relative flex items-start gap-3 p-4 rounded-lg border-t border-white/10 bg-mirage  w-[307px] transform transition-all duration-300 ease-out',
        isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
    >
      {/* Icon */}
      <div className={cn('flex-shrink-0 flex items-center justify-center', getIconBg() )}>
        {getIcon()}
      </div>

      {/* Content */} 
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-white mb-1">
          {toast.title}
        </h4>
        <p className="text-sm text-gray-300 leading-relaxed">
          {toast.message}
        </p>
      </div>

      {/* Close button */}
      <button
        onClick={handleRemove}
        className="flex-shrink-0 p-1 rounded-md hover:bg-white/10 transition-colors"
      >
        <X className="h-4 w-4 text-gray-400" />
      </button>
    </div>
  )
}

export default ToastComponent
