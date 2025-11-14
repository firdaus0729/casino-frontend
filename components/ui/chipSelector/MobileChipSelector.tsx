import { useState, useEffect } from 'react'
import { PokerChip } from './PokerChip'
import { CircularChipSelector } from './CircularChipSelector'

interface MobileChipSelectorProps {
  onMenuClick: () => void
  onGridClick: () => void
}

const chipData: Record<
  string,
  {
    value: string | number
    color: 'blue' | 'purple' | 'green' | 'navy' | 'red' | 'orange'
  }
> = {
  '1': { value: 1, color: 'blue' },
  '5': { value: 5, color: 'purple' },
  '10': { value: 10, color: 'green' },
  '50': { value: 50, color: 'navy' },
  '100': { value: 100, color: 'red' },
  customize: { value: 'Customize', color: 'orange' },
}

export function MobileChipSelector({
  onMenuClick,
  onGridClick,
}: MobileChipSelectorProps) {
  const [selectedChip, setSelectedChip] = useState<string>('1')
  const [showCircularView, setShowCircularView] = useState<boolean>(false)

  // Prevent background scrolling and hide scrollbar when circular view is shown
  useEffect(() => {
    if (showCircularView) {
      // Store original values
      const originalBodyOverflow = document.body.style.overflow
      const originalDocumentOverflow = document.documentElement.style.overflow
      const originalBodyPaddingRight = document.body.style.paddingRight
      const originalBodyHeight = document.body.style.height
      const originalDocumentHeight = document.documentElement.style.height

      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth

      // Add CSS classes for complete scrollbar hiding
      document.body.classList.add('circular-view-active')
      document.documentElement.classList.add('circular-view-active')

      // Aggressively hide scrollbar and prevent scrolling
      document.body.style.overflow = 'hidden !important'
      document.documentElement.style.overflow = 'hidden !important'
      document.body.style.height = '100vh'
      document.documentElement.style.height = '100vh'

      // Add padding to prevent layout shift when scrollbar disappears
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }

      // Additional scrollbar hiding for webkit browsers
      ;(document.body.style as any).scrollbarWidth = 'none' // Firefox
      ;(document.body.style as any).msOverflowStyle = 'none' // IE/Edge

      // Target specific scrollable elements and containers
      const scrollableSelectors = [
        'main',
        '#__next',
        '[data-scrollable]',
        '.scrollable',
        'div[style*="overflow"]',
        'section[style*="overflow"]',
      ]

      scrollableSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector)
        elements.forEach(element => {
          const htmlElement = element as HTMLElement
          if (
            htmlElement.style.overflow === 'auto' ||
            htmlElement.style.overflow === 'scroll' ||
            getComputedStyle(htmlElement).overflow === 'auto' ||
            getComputedStyle(htmlElement).overflow === 'scroll'
          ) {
            htmlElement.style.overflow = 'hidden'
            htmlElement.setAttribute(
              'data-original-overflow',
              getComputedStyle(htmlElement).overflow
            )
          }
        })
      })

      // Also target the main app container
      const mainContainer =
        document.querySelector('main') ||
        document.querySelector('#__next') ||
        document.body
      if (mainContainer) {
        const htmlElement = mainContainer as HTMLElement
        htmlElement.style.overflow = 'hidden'
        htmlElement.setAttribute(
          'data-original-overflow',
          getComputedStyle(htmlElement).overflow
        )
      }

      // Cleanup function to restore original values
      return () => {
        document.body.classList.remove('circular-view-active')
        document.documentElement.classList.remove('circular-view-active')
        document.body.style.overflow = originalBodyOverflow
        document.documentElement.style.overflow = originalDocumentOverflow
        document.body.style.paddingRight = originalBodyPaddingRight
        document.body.style.height = originalBodyHeight
        document.documentElement.style.height = originalDocumentHeight
        ;(document.body.style as any).scrollbarWidth = ''
        ;(document.body.style as any).msOverflowStyle = ''

        // Restore scrollable elements
        scrollableSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector)
          elements.forEach(element => {
            const htmlElement = element as HTMLElement
            const originalOverflow = htmlElement.getAttribute(
              'data-original-overflow'
            )
            if (originalOverflow) {
              htmlElement.style.overflow = originalOverflow
              htmlElement.removeAttribute('data-original-overflow')
            } else if (htmlElement.style.overflow === 'hidden') {
              htmlElement.style.overflow = ''
            }
          })
        })

        // Restore main container
        const mainContainer =
          document.querySelector('main') ||
          document.querySelector('#__next') ||
          document.body
        if (mainContainer) {
          const htmlElement = mainContainer as HTMLElement
          const originalOverflow = htmlElement.getAttribute(
            'data-original-overflow'
          )
          if (originalOverflow) {
            htmlElement.style.overflow = originalOverflow
            htmlElement.removeAttribute('data-original-overflow')
          } else {
            htmlElement.style.overflow = ''
          }
        }
      }
    } else {
      // Remove CSS classes
      document.body.classList.remove('circular-view-active')
      document.documentElement.classList.remove('circular-view-active')

      // Restore scrolling and show scrollbar
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
      document.body.style.paddingRight = ''
      document.body.style.height = ''
      document.documentElement.style.height = ''
      ;(document.body.style as any).scrollbarWidth = ''
      ;(document.body.style as any).msOverflowStyle = ''
    }
  }, [showCircularView])

  const getChipDisplay = (chipId: string) => {
    return chipData[chipId] || chipData['1']
  }

  const handleChipSelect = (chipId: string) => {
    setSelectedChip(chipId)
    setShowCircularView(false) // Close circular view after selection
  }

  return (
    <>
      <div className="flex relative justify-center items-center w-full ">
        {showCircularView && (
          <CircularChipSelector
            onChipSelect={handleChipSelect}
            onClose={() => setShowCircularView(false)}
          />
        )}
        <div
          className="flex h-[52px] items-end justify-center w-full gap-2  px-2 py-2 rounded-xl"
          style={{ background: 'rgba(255, 255, 255, 0.04)' }}
        >
          {/* Grid/Menu Button */}
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/5 backdrop-blur-[32px]"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.16) inset',
            }}
            onClick={onGridClick}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.66683 10.6666H2.00016C1.63197 10.6666 1.3335 10.9651 1.3335 11.3333V14C1.3335 14.3681 1.63197 14.6666 2.00016 14.6666H4.66683C5.03502 14.6666 5.3335 14.3681 5.3335 14V11.3333C5.3335 10.9651 5.03502 10.6666 4.66683 10.6666Z"
                fill="var(--casper)"
              />
              <path
                d="M9.33333 10.6666H6.66667C6.29848 10.6666 6 10.9651 6 11.3333V14C6 14.3681 6.29848 14.6666 6.66667 14.6666H9.33333C9.70152 14.6666 10 14.3681 10 14V11.3333C10 10.9651 9.70152 10.6666 9.33333 10.6666Z"
                fill="var(--casper)"
              />
              <path
                d="M13.9998 10.6666H11.3332C10.965 10.6666 10.6665 10.9651 10.6665 11.3333V14C10.6665 14.3681 10.965 14.6666 11.3332 14.6666H13.9998C14.368 14.6666 14.6665 14.3681 14.6665 14V11.3333C14.6665 10.9651 14.368 10.6666 13.9998 10.6666Z"
                fill="var(--casper)"
              />
              <path
                d="M4.66683 6H2.00016C1.63197 6 1.3335 6.29848 1.3335 6.66667V9.33333C1.3335 9.70152 1.63197 10 2.00016 10H4.66683C5.03502 10 5.3335 9.70152 5.3335 9.33333V6.66667C5.3335 6.29848 5.03502 6 4.66683 6Z"
                fill="var(--casper)"
              />
              <path
                d="M9.33333 6H6.66667C6.29848 6 6 6.29848 6 6.66667V9.33333C6 9.70152 6.29848 10 6.66667 10H9.33333C9.70152 10 10 9.70152 10 9.33333V6.66667C10 6.29848 9.70152 6 9.33333 6Z"
                fill="var(--casper)"
              />
              <path
                d="M13.9998 6H11.3332C10.965 6 10.6665 6.29848 10.6665 6.66667V9.33333C10.6665 9.70152 10.965 10 11.3332 10H13.9998C14.368 10 14.6665 9.70152 14.6665 9.33333V6.66667C14.6665 6.29848 14.368 6 13.9998 6Z"
                fill="var(--casper)"
              />
              <path
                d="M4.66683 1.33331H2.00016C1.63197 1.33331 1.3335 1.63179 1.3335 1.99998V4.66665C1.3335 5.03484 1.63197 5.33331 2.00016 5.33331H4.66683C5.03502 5.33331 5.3335 5.03484 5.3335 4.66665V1.99998C5.3335 1.63179 5.03502 1.33331 4.66683 1.33331Z"
                fill="var(--casper)"
              />
              <path
                d="M9.33333 1.33331H6.66667C6.29848 1.33331 6 1.63179 6 1.99998V4.66665C6 5.03484 6.29848 5.33331 6.66667 5.33331H9.33333C9.70152 5.33331 10 5.03484 10 4.66665V1.99998C10 1.63179 9.70152 1.33331 9.33333 1.33331Z"
                fill="var(--casper)"
              />
              <path
                d="M13.9998 1.33331H11.3332C10.965 1.33331 10.6665 1.63179 10.6665 1.99998V4.66665C10.6665 5.03484 10.965 5.33331 11.3332 5.33331H13.9998C14.368 5.33331 14.6665 5.03484 14.6665 4.66665V1.99998C14.6665 1.63179 14.368 1.33331 13.9998 1.33331Z"
                fill="var(--casper)"
              />
            </svg>
          </div>

          {/* Undo Button */}
          <div className="flex flex-1 justify-center items-center gap-1">
            <div
              className="flex h-9 items-center gap-2 rounded-lg px-2 py-0 font-montserrat font-bold text-xs text-casper flex-1"
              style={{ background: 'rgba(0, 0, 0, 0.54)' }}
            >
              Undo
              <svg
                width="24"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5 10H15.5C17.71 10 19.5 11.79 19.5 14C19.5 16.21 17.71 18 15.5 18H12.5V20H15.5C18.81 20 21.5 17.31 21.5 14C21.5 10.69 18.81 8 15.5 8H9.5V4L3.5 9L9.5 14V10Z"
                  fill="var(--casper)"
                />
              </svg>
            </div>
          </div>

          {/* Main Poker Chip */}
          <PokerChip
            value={getChipDisplay(selectedChip).value}
            color={getChipDisplay(selectedChip).color}
            isSelected={true}
            onClick={() => {
              console.log('Chip clicked, showing circular view')
              setShowCircularView(true)
            }}
            className="relative"
          />

          {/* Confirm Button */}
          <div className="flex flex-1 justify-center items-center gap-1">
            <div
              className="flex h-9 items-center gap-2 rounded-lg px-2 py-0 font-montserrat font-bold text-xs text-casper flex-1"
              style={{ background: 'rgba(0, 0, 0, 0.54)' }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.0029 7.06018L9.36523 17.6979C9.2551 17.8023 9.1274 17.8502 9 17.8502C8.86105 17.8502 8.74186 17.8049 8.64355 17.7067L3.99707 13.0602L4.7002 12.3571L8.7832 16.4401H9.2168L19.2998 6.35706L20.0029 7.06018Z"
                  fill="var(--white-pure)"
                  stroke="var(--casper)"
                />
              </svg>
              Confirm
            </div>
          </div>

          {/* Menu Button */}
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/5 backdrop-blur-[32px]"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.16) inset',
            }}
            onClick={onMenuClick}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.6685 11.332V11.335H3.33154V11.332H12.6685ZM12.6685 7.99805V8.00195H3.33154V7.99805H12.6685ZM12.6685 4.66504V4.66797H3.33154V4.66504H12.6685Z"
                fill="var(--white-pure)"
                stroke="var(--casper)"
                strokeWidth="1.33"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
