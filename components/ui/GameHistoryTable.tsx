import { cn } from '@/lib/utils'
import { ZoomIn, ZoomOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { API_BASE_URL, API_ENDPOINTS } from '@/types/api'

interface GameHistoryTableProps {
  gameId?: number // Game ID: 4 for Banker Player, 5 for Odd/Even, etc.
}

const GameHistoryTable = ({ gameId = 4 }: GameHistoryTableProps) => {
  const [zoomOneState, setZoomOneState] = useState(false)
  const [zoomTwoState, setZoomTwoState] = useState(false)
  const [historydata, setHistorydata] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch betting history from API
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `${API_BASE_URL}${API_ENDPOINTS.BETTING_HISTORY}?game=${gameId}&limit=120`
        )
        const data = await response.json()
        
        if (data.code === 200 && data.data?.results) {
          // Pad with empty strings to fill 120 slots
          const results = data.data.results as string[]
          console.log('📊 GameHistoryTable: Received results:', results.slice(0, 20))
          console.log('📊 GameHistoryTable: T count:', results.filter(r => r === 'T').length)
          console.log('📊 GameHistoryTable: B count:', results.filter(r => r === 'B').length)
          console.log('📊 GameHistoryTable: P count:', results.filter(r => r === 'P').length)
          
          const padded = [...results]
          while (padded.length < 120) {
            padded.push('')
          }
          setHistorydata(padded.slice(0, 120))
        } else {
          console.warn('⚠️ GameHistoryTable: API response invalid', data)
          // Fallback to empty array if API fails
          setHistorydata(Array(120).fill(''))
        }
      } catch (error) {
        console.error('Error fetching betting history:', error)
        // Fallback to empty array on error
        setHistorydata(Array(120).fill(''))
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()
    // Refresh every 5 seconds to get new results
    const interval = setInterval(fetchHistory, 5000)
    return () => clearInterval(interval)
  }, [gameId])

  // Generate history_data from historydata (for the detailed grid view)
  // This creates a pattern based on the results
  const history_data: string[] = []
  historydata.forEach((label) => {
    if (label === 'B' || label === 'O') {
      history_data.push('r') // Red for Banker/Odd
    } else if (label === 'P' || label === 'E') {
      history_data.push('y') // Yellow for Player/Even
    } else if (label === 'T') {
      history_data.push('g') // Green for Tie
    } else {
      history_data.push('')
    }
  })
  
  // Pad to 444 items for the grid
  while (history_data.length < 444) {
    history_data.push('')
  }

  const toggleZoomOne = () => {
    setZoomOneState(!zoomOneState)
  }

  const toggleZoomTwo = () => {
    setZoomTwoState(!zoomTwoState)
  }
  return (
    <>
      <div className="flex items-start gap-px w-full relative">
        <div className="flex gap-px overflow-x-hidden relative">
          {/* Row Labels */}
          <div className="grid grid-flow-col grid-rows-6 gap-px ">
            {historydata.map((label, i) => (
              <div
                key={i}
                className="flex w-6 h-[25px] justify-center items-center bg-mirage"
              >
                <div
                  className={cn(
                    'w-3 h-3 md:w-4 md:h-4 rounded-full flex items-center justify-center',
                    label === 'B' || label === 'O'
                      ? 'bg-crimson'
                      : label === 'P' || label === 'E'
                        ? 'bg-yellow-orange'
                        : label === 'T'
                          ? 'bg-malachite'
                          : label === ''
                            ? ''
                            : 'bg-gray-500' // Debug: show unknown labels
                  )}
                >
                  {label && (
                    <span className="text-[10px] md:text-xs font-bold text-bunker">
                      {label}
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div
              onClick={toggleZoomOne}
              className="ml-2 flex-shrink-0 absolute top-0 right-0 cursor-pointer bg-mirage p-1"
            >
              {zoomOneState ? (
                <ZoomOut className="w-5 md:w-6 h-5 md:h-6 text-white" />
              ) : (
                <ZoomIn className="w-5 md:w-6 h-5 md:h-6 text-white" />
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-px overflow-hidden relative">
          {/* Right side detailed grid */}
          <div className="grid grid-flow-col grid-rows-12 gap-px">
            {history_data.map((item, rowIndex) => (
              <div key={rowIndex} className="flex gap-px">
                <div className="w-3 h-3 bg-mirage flex items-center justify-center">
                  <div
                    className={cn(
                      'w-2 h-2 rounded-full border border-',
                      item === 'r'
                        ? 'border-crimson'
                        : item === 'y'
                          ? 'border-yellow-orange'
                          : item === 'g'
                            ? 'border-malachite'
                            : 'border-transparent'
                    )}
                  ></div>
                </div>
              </div>
            ))}
            <div
              onClick={toggleZoomTwo}
              className="ml-2 flex-shrink-0 absolute top-0 right-0 cursor-pointer bg-mirage p-1"
            >
              {zoomTwoState ? (
                <ZoomOut className="w-5 md:w-6 h-5 md:h-6 text-white" />
              ) : (
                <ZoomIn className="w-5 md:w-6 h-5 md:h-6 text-white" />
              )}
            </div>
          </div>
        </div>
        {zoomOneState && (
          <div className="grid absolute w-[40%] overflow-x-hidden bottom-0 bg-[#171d25] grid-flow-col grid-rows-6 gap-px ">
            {historydata.map((label, i) => (
              <div
                key={i}
                className="flex w-[30px] h-[30px] md:h-[35px] justify-center items-center bg-mirage"
              >
                  <div
                    className={cn(
                      'w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center',
                      label === 'B' || label === 'O'
                        ? 'bg-crimson'
                        : label === 'P' || label === 'E'
                          ? 'bg-yellow-orange'
                          : label === 'T'
                            ? 'bg-malachite'
                            : label === ''
                              ? ''
                              : 'bg-gray-500' // Debug: show unknown labels
                    )}
                  >
                    {label && (
                      <span className="text-[10px] md:text-xs font-bold text-bunker">
                        {label}
                      </span>
                    )}
                  </div>
              </div>
            ))}
          </div>
        )}
        {zoomTwoState && (
          <div className="grid absolute w-[40%] overflow-x-hidden left-[45%] bottom-0 bg-[#171d25] grid-flow-col grid-rows-12 gap-px ">
            {history_data.map((item, rowIndex) => (
              <div key={rowIndex} className="flex gap-px">
                <div className="w-4 h-4 bg-mirage flex items-center justify-center">
                  <div
                    className={cn(
                      'w-3 h-3 rounded-full border border-',
                      item === 'r'
                        ? 'border-crimson'
                        : item === 'y'
                          ? 'border-yellow-orange'
                          : item === 'g'
                            ? 'border-malachite'
                            : 'border-transparent'
                    )}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default GameHistoryTable
