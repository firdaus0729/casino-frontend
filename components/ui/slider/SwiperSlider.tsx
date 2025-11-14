'use client'

import React, { useRef, useEffect, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper'
import { Autoplay, Pagination, Grid } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/grid'

// Types
interface SwiperSliderProps {
  data: readonly any[] | any[]
  renderSlide: (item: any, index: number) => React.ReactNode
  grid?: {}
  slidesPerView?: number | 'auto'
  allowTouchMove?: boolean
  spaceBetween?: number
  autoplayDelay?: number
  loop?: boolean
  centeredSlides?: boolean
  direction?: 'horizontal' | 'vertical'
  breakpoints?: {
    [key: number]: {
      slidesPerView: number
      spaceBetween?: number
      grid?: {}
    }
  }
  className?: string
  slideClassName?: string
  showProgressBars?: boolean
  customPagination?: boolean
  paginationRenderBullet?: (index: number, className: string) => string
  navigationRef?: React.MutableRefObject<SwiperType | null>
  onSlideChange?: (swiper: SwiperType) => void
  onSwiper?: (swiper: SwiperType) => void
  autoplay?: boolean
  freeMode?: boolean
  initialSlide?: number
  carouselId?: string // Identifier for this carousel instance
}

const SwiperSlider: React.FC<SwiperSliderProps> = ({
  data,
  renderSlide,
  grid = {},
  allowTouchMove = true,
  slidesPerView = 3.2,
  spaceBetween = 20,
  autoplayDelay = 3000,
  loop = true,
  centeredSlides = false,
  direction = 'horizontal',
  breakpoints,
  className = '',
  slideClassName = '',
  showProgressBars = false,
  customPagination = false,
  paginationRenderBullet,
  navigationRef,
  onSlideChange,
  onSwiper,
  autoplay = true,
  freeMode = false,
  initialSlide = 0,
  carouselId,
}) => {
  const swiperRef = useRef<SwiperType | null>(null)
  const progressRefs = useRef<HTMLDivElement[]>([])
  const progressInitialized = useRef(false)
  const lastActiveIndex = useRef<number>(0)
  const isResizing = useRef(false)

  // Memoize the updateProgress function to prevent unnecessary re-renders
  const updateProgress = useCallback(
    (swiper: SwiperType) => {
      if (!swiper || !swiper.pagination || !swiper.pagination.el) return

      const activeIndex = swiper.realIndex ?? swiper.activeIndex

      // Store the last active index for resize handling
      lastActiveIndex.current = activeIndex

      // Only update if we have progress refs and they're valid
      if (progressRefs.current.length === 0) {
        // Try to re-attach progress refs if they're missing
        const bullets = swiper.pagination.el.querySelectorAll<HTMLSpanElement>(
          '.swiper-pagination-bullet .progress-bar'
        )
        progressRefs.current = Array.from(bullets) as HTMLDivElement[]
      }

      progressRefs.current.forEach((bar, index) => {
        if (!bar || !bar.style) return

        if (index < activeIndex) {
          bar.style.transition = 'none'
          bar.style.width = '100%' // past slides full blue
        } else if (index === activeIndex) {
          bar.style.transition = `width ${autoplayDelay}ms linear`
          bar.style.width = '100%' // animate current
        } else {
          bar.style.transition = 'none'
          bar.style.width = '0%' // future slides empty
        }
      })
    },
    [autoplayDelay]
  )

  // Determine if grid has multiple rows. Loop mode is incompatible with multi-row Grid in Swiper.
  const isMultiRowGrid = Boolean((grid as any)?.rows && (grid as any).rows > 1)
  const effectiveLoop = isMultiRowGrid ? false : loop

  // Swiper initialization
  const handleSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper
    if (navigationRef) navigationRef.current = swiper

    // Initialize progress bars after a short delay to ensure DOM is ready
    if (showProgressBars && customPagination) {
      setTimeout(() => {
        updateProgress(swiper)
      }, 100)
    }

    // Add event listener for slide change to ensure progress bars are always in sync
    if (showProgressBars && customPagination) {
      swiper.on('slideChange', () => {
        // Small delay to ensure DOM is updated
        setTimeout(() => {
          updateProgress(swiper)
        }, 10)
      })
    }

    if (onSwiper) onSwiper(swiper)
  }

  // Slide change
  const handleSlideChange = (swiper: SwiperType) => {
    if (showProgressBars) updateProgress(swiper)
    if (onSlideChange) onSlideChange(swiper)
  }

  // Default pagination render bullet
  const defaultPaginationRenderBullet = (index: number, className: string) => {
    return `
      <span class="${className} relative w-12 h-1.5 bg-gray-300 rounded overflow-hidden">
        <span class="progress-bar absolute rounded-full left-0 top-0 h-full w-0 bg-blue-500"></span>
      </span>
    `
  }

  // Function to restore progress state after resize
  const restoreProgressState = useCallback(() => {
    if (!swiperRef.current || !customPagination) return

    // Re-attach progress refs after resize
    const bullets =
      swiperRef.current.pagination.el.querySelectorAll<HTMLSpanElement>(
        '.swiper-pagination-bullet .progress-bar'
      )
    progressRefs.current = Array.from(bullets) as HTMLDivElement[]

    // Restore progress state based on last known active index
    const activeIndex = lastActiveIndex.current

    progressRefs.current.forEach((bar, index) => {
      if (!bar || !bar.style) return

      if (index < activeIndex) {
        bar.style.transition = 'none'
        bar.style.width = '100%' // past slides full blue
      } else if (index === activeIndex) {
        bar.style.transition = `width ${autoplayDelay}ms linear`
        bar.style.width = '100%' // animate current
      } else {
        bar.style.transition = 'none'
        bar.style.width = '0%' // future slides empty
      }
    })
  }, [autoplayDelay, customPagination])

  // Attach progress refs after mount - only run once when component mounts
  useEffect(() => {
    if (!customPagination || !swiperRef.current || progressInitialized.current)
      return

    const bullets =
      swiperRef.current.pagination.el.querySelectorAll<HTMLSpanElement>(
        '.swiper-pagination-bullet .progress-bar'
      )
    progressRefs.current = Array.from(bullets) as HTMLDivElement[]
    progressInitialized.current = true
    updateProgress(swiperRef.current)

    // Cleanup function to reset progress initialization
    return () => {
      progressInitialized.current = false
    }
  }, [customPagination]) // Remove 'data' dependency to prevent progress reset

  // Handle resize events to restore progress state
  useEffect(() => {
    if (!customPagination || !showProgressBars) return

    let resizeTimeout: NodeJS.Timeout

    const handleResize = () => {
      if (isResizing.current) return

      isResizing.current = true

      // Clear existing timeout
      if (resizeTimeout) clearTimeout(resizeTimeout)

      // Wait for resize to finish, then restore progress state
      resizeTimeout = setTimeout(() => {
        restoreProgressState()
        isResizing.current = false
      }, 150) // Wait 150ms after resize stops
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimeout) clearTimeout(resizeTimeout)
    }
  }, [customPagination, showProgressBars, restoreProgressState])

  // Monitor pagination element changes and restore progress state
  useEffect(() => {
    if (!customPagination || !showProgressBars || !swiperRef.current) return

    const swiper = swiperRef.current
    if (!swiper.pagination || !swiper.pagination.el) return

    // Create a mutation observer to watch for pagination changes
    const observer = new MutationObserver(mutations => {
      let shouldRestore = false

      mutations.forEach(mutation => {
        if (
          mutation.type === 'childList' &&
          mutation.target === swiper.pagination.el
        ) {
          shouldRestore = true
        }
      })

      if (shouldRestore) {
        // Small delay to ensure DOM is updated
        setTimeout(() => {
          restoreProgressState()
        }, 50)
      }
    })

    // Start observing
    observer.observe(swiper.pagination.el, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [customPagination, showProgressBars, restoreProgressState])

  return (
    <Swiper
      modules={[Autoplay, Pagination, Grid]}
      direction={direction}
      grid={grid}
      allowTouchMove={allowTouchMove}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      loop={effectiveLoop}
      centeredSlides={centeredSlides}
      autoplay={
        autoplay ? { delay: autoplayDelay, disableOnInteraction: false } : false
      }
      breakpoints={breakpoints}
      freeMode={freeMode}
      watchSlidesProgress={true}
      watchOverflow={true}
      initialSlide={initialSlide}
      pagination={
        customPagination
          ? {
              clickable: true,
              renderBullet:
                paginationRenderBullet || defaultPaginationRenderBullet,
            }
          : false
      }
      onSwiper={handleSwiper}
      onSlideChange={handleSlideChange}
      className={className}
    >
      {data.map((item, index) => (
        <SwiperSlide key={index} className={slideClassName}>
          {renderSlide(item, index)}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SwiperSlider
