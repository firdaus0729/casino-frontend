'use client'

import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/context/I18nProvider'
import { useToast } from '@/context/ToastProvider'
import { useSidebar } from '@/context/SidebarProvider'
import { API_BASE_URL } from '@/types/api'

interface TelegramLoginProps {
  onSuccess?: (token: string) => void
  onError?: (error: string) => void
}

const TelegramLogin: React.FC<TelegramLoginProps> = ({ onSuccess, onError }) => {
  const { t } = useI18n()
  const { showError, showSuccess } = useToast()
  const { toggleAuthModal } = useSidebar()
  const [isLoading, setIsLoading] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    // Load Telegram widget script
    const loadTelegramWidget = () => {
      // Remove existing script if any
      if (scriptRef.current) {
        document.head.removeChild(scriptRef.current)
      }

      // Create new script element
      const script = document.createElement('script')
      script.src = 'https://telegram.org/js/telegram-widget.js?7'
      script.async = true
      script.setAttribute('data-telegram-login', 'ok777_casino_bot')
      script.setAttribute('data-size', 'large')
      script.setAttribute('data-auth-url', `${API_BASE_URL}/auth/telegram/callback`)
      script.setAttribute('data-request-access', 'write')
      
      scriptRef.current = script
      document.head.appendChild(script)

      // Handle widget events
      const handleTelegramAuth = (event: MessageEvent) => {
        if (event.origin !== 'https://oauth.telegram.org') return
        
        const data = event.data
        if (data.type === 'auth') {
          console.log('Telegram auth data received:', data)
          setIsLoading(true)
          
          // The widget will redirect to our backend callback
          // The backend will then redirect to /auth/success with the token
        }
      }

      window.addEventListener('message', handleTelegramAuth)

      return () => {
        window.removeEventListener('message', handleTelegramAuth)
        if (scriptRef.current) {
          document.head.removeChild(scriptRef.current)
        }
      }
    }

    loadTelegramWidget()
  }, [])

  const handleTelegramClick = () => {
    console.log('Telegram login clicked')
    setIsLoading(true)
    
    // Redirect to Telegram login widget
    const telegramLoginUrl = `https://oauth.telegram.org/auth?bot_id=ok777_casino_bot&origin=${encodeURIComponent(window.location.origin)}&return_to=${encodeURIComponent(`${API_BASE_URL}/auth/telegram/callback`)}`
    window.location.href = telegramLoginUrl
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        ref={widgetRef}
        onClick={handleTelegramClick}
        className="flex h-9 w-9 items-center justify-center text-casper rounded-lg bg-white-4 backdrop-blur-[32px] transition-colors hover:bg-white-8 cursor-pointer"
        style={{
          boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.16) inset',
        }}
      >
        {isLoading ? (
          <div className="animate-spin h-4 w-4 border-2 border-casper border-t-transparent rounded-full" />
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-.14.05-.22.08-1.01.66-2.74 1.86-3.82 2.51-.34.2-.65.3-.99.3-.33 0-.96-.2-1.43-.36-.58-.2-1.04-.31-1-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"
              fill="currentColor"
            />
          </svg>
        )}
      </div>
    </div>
  )
}

export default TelegramLogin
