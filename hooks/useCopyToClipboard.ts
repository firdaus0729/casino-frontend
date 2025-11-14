import { useState, useCallback } from 'react'

interface UseCopyToClipboardOptions {
  onCopy?: (text: string) => void
  onError?: (error: Error) => void
  successDuration?: number
}

interface UseCopyToClipboardReturn {
  copied: boolean
  copy: (text: string) => Promise<boolean>
  reset: () => void
}

/**
 * Custom hook for copy-to-clipboard functionality
 * @param options - Configuration options
 * @returns Object with copy state and functions
 */
export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {}
): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false)
  const { onCopy, onError, successDuration = 2000 } = options

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        // Try modern clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          onCopy?.(text)

          // Reset copied state after duration
          setTimeout(() => {
            setCopied(false)
          }, successDuration)

          return true
        } else {
          // Fallback for older browsers or non-secure contexts
          const textArea = document.createElement('textarea')
          textArea.value = text
          textArea.style.position = 'fixed'
          textArea.style.left = '-999999px'
          textArea.style.top = '-999999px'
          document.body.appendChild(textArea)
          textArea.focus()
          textArea.select()

          const successful = document.execCommand('copy')
          document.body.removeChild(textArea)

          if (successful) {
            setCopied(true)
            onCopy?.(text)

            setTimeout(() => {
              setCopied(false)
            }, successDuration)

            return true
          } else {
            throw new Error('Failed to copy text using execCommand')
          }
        }
      } catch (error) {
        console.error('Failed to copy text: ', error)
        onError?.(error as Error)
        return false
      }
    },
    [onCopy, onError, successDuration]
  )

  const reset = useCallback(() => {
    setCopied(false)
  }, [])

  return {
    copied,
    copy,
    reset,
  }
}
