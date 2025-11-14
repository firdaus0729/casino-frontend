import { cn } from '@/lib/utils'
import { ZoomIn, ZoomOut } from 'lucide-react'
import { useState } from 'react'

const GameHistoryTable = () => {
  const [zoomOneState, setZoomOneState] = useState(false)
  const [zoomTwoState, setZoomTwoState] = useState(false)

  const historydata = ['O', 'O', 'E', 'E', 'E', 'E']

  for (let i = 0; i < 120 - 6; i++) {
    historydata.push('')
  }

  const history_data = [
    'r',
    'r',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'y',
    '',
    '',
    '',
  ]
  for (let i = 0; i < 444 - 15; i++) {
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
                    label === 'O'
                      ? 'bg-crimson'
                      : label === 'E'
                        ? 'bg-yellow-orange'
                        : ''
                  )}
                >
                  <span className="text-[10px] md:text-xs font-bold text-bunker">
                    {label}
                  </span>
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
                    label === 'O'
                      ? 'bg-crimson'
                      : label === 'E'
                        ? 'bg-yellow-orange'
                        : ''
                  )}
                >
                  <span className="text-[10px] md:text-xs font-bold text-bunker">
                    {label}
                  </span>
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
