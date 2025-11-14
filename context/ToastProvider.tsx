'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import ToastComponent, { Toast } from '@/components/ui/Toast'

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void
  showSuccess: (title: string, message: string, duration?: number) => void
  showError: (title: string, message: string, duration?: number) => void
  showWarning: (title: string, message: string, duration?: number) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000, // Default 5 seconds
    }
    setToasts(prev => [...prev, newToast])
  }, [])

  const showSuccess = useCallback((title: string, message: string, duration?: number) => {
    showToast({ type: 'success', title, message, duration })
  }, [showToast])

  const showError = useCallback((title: string, message: string, duration?: number) => {
    showToast({ type: 'error', title, message, duration })
  }, [showToast])

  const showWarning = useCallback((title: string, message: string, duration?: number) => {
    showToast({ type: 'warning', title, message, duration })
  }, [showToast])

  const value: ToastContextType = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    removeToast,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Toast Container - Highest z-index to appear above all modals */}
      <div className="fixed top-4 right-4 space-y-2 pointer-events-none" style={{ zIndex: 999999 }}>
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastComponent toast={toast} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
