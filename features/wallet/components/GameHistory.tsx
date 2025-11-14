import ModalContainer from '@/components/modals/ModalContainer'
import { Dropdown } from '@/components/ui'
import { CopyBox } from '@/components/ui/CopyBox'
import ChevronRightIcon from '@/components/ui/icons/chevron-right'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'

const GameHistory: React.FC = () => {
  const [selectedOption1, setSelectedOption1] = useState('Past 90 days')
  const [selectedOption2, setSelectedOption2] = useState('USDT')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)

  const [selectedOption3, setSelectedOption3] = useState('Hash Betting')
  const [selectedOption4, setSelectedOption4] = useState('Order number')

  const options1 = [
    {
      value: 'Past 90 days',
      label: 'Past 90 days',
    },
  ]

  const options2 = [
    {
      value: 'USDT',
      label: 'USDT',
    },
  ]

  const options3 = [
    {
      value: 'Hash Betting',
      label: 'Hash Betting',
    },
  ]

  const options4 = [
    {
      value: 'Order number',
      label: 'Order number',
    },
  ]

  const history = [
    {
      name: 'Odd and Even - Tron Chain',
      order: '22972977',
      available: '0.150263 USDT',
      playgame: 'Hash single and double wave field chain',
      blockheight: '72385147',
      blockhash: '00**df83e28c',
      betcontent: 'pair',
      betamount: 1,
      situation: 0.95,
      bettingtime: '2025-05-20 22:26:55',
    },
    {
      name: 'Size - Tron Chain',
      order: '22972977',
      available: '0.150263 USDT',
      playgame: 'Hash single and double wave field chain',
      blockheight: '72385147',
      blockhash: '00**df83e28c',
      betcontent: 'pair',
      betamount: 1,
      situation: -1,
      bettingtime: '2025-05-20 22:26:55',
    },
    {
      name: 'Size - Tron Chain',
      order: '22972977',
      available: '0.150263 USDT',
      playgame: 'Hash single and double wave field chain',
      blockheight: '72385147',
      blockhash: '00**df83e28c',
      betcontent: 'pair',
      betamount: 1,
      situation: 0.95,
      bettingtime: '2025-05-20 22:26:55',
    },
    {
      name: 'Size - Tron Chain',
      order: '22972977',
      available: '0.150263 USDT',
      playgame: 'Hash single and double wave field chain',
      blockheight: '72385147',
      blockhash: '00**df83e28c',
      betcontent: 'pair',
      betamount: 1,
      situation: -1,
      bettingtime: '2025-05-20 22:26:55',
    },
    {
      name: 'Size - Tron Chain',
      order: '22972977',
      available: '0.150263 USDT',
      playgame: 'Hash single and double wave field chain',
      blockheight: '72385147',
      blockhash: '00**df83e28c',
      betcontent: 'pair',
      betamount: 1,
      situation: -1,
      bettingtime: '2025-05-20 22:26:55',
    },
    {
      name: 'Size - Tron Chain',
      order: '22972977',
      available: '0.150263 USDT',
      playgame: 'Hash single and double wave field chain',
      blockheight: '72385147',
      blockhash: '00**df83e28c',
      betcontent: 'pair',
      betamount: 1,
      situation: -1,
      bettingtime: '2025-05-20 22:26:55',
    },
    {
      name: 'Size - Tron Chain',
      order: '22972977',
      available: '0.150263 USDT',
      playgame: 'Hash single and double wave field chain',
      blockheight: '72385147',
      blockhash: '00**df83e28c',
      betcontent: 'pair',
      betamount: 1,
      situation: -1,
      bettingtime: '2025-05-20 22:26:55',
    },
    {
      name: 'Size - Tron Chain',
      order: '22972977',
      available: '0.150263 USDT',
      playgame: 'Hash single and double wave field chain',
      blockheight: '72385147',
      blockhash: '00**df83e28c',
      betcontent: 'pair',
      betamount: 1,
      situation: -1,
      bettingtime: '2025-05-20 22:26:55',
    },
  ]

  return (
    <div className=" [@media(max-width:660px)]:w-full flex flex-col gap-4">
      <p className="text-[18px] font-bold  text-white [@media(max-width:660px)]:hidden">
        GameHistory
      </p>
      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          options={options1}
          className="text-casper font-bold text-[14px] border-none"
          value={selectedOption1}
          onChange={setSelectedOption1}
        />
        <Dropdown
          options={options2}
          className="text-casper font-bold text-[14px] border-none"
          value={selectedOption2}
          onChange={setSelectedOption2}
        />
        <Dropdown
          options={options3}
          className="text-casper font-bold text-[14px] border-none"
          value={selectedOption3}
          onChange={setSelectedOption3}
        />
        <Dropdown
          options={options4}
          className="text-casper font-bold text-[14px] border-none"
          value={selectedOption4}
          onChange={setSelectedOption4}
        />
      </div>
      <div>
        <div className="grid h-[56px] border-b border-ebony-clay items-center grid-cols-[auto_60px_60px_60px] gap-4 py-2 px-4 rounded-t-[8px] bg-mirage text-blue-bayoux text-[12px] font-bold">
          <span className="word-break">Game</span>
          <span className="word-break">Order</span>
          <span className="word-break flex justify-center items-center">
            Bet amount
          </span>
          <span className="word-break flex justify-center items-center">
            Win or lose
          </span>
        </div>
        <div className="flex flex-col gap-px rounded-[8px] overflow-hidden">
          {history.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setModalIndex(index)
                setModalOpen(true)
              }}
              className={cn(
                'grid items-center grid-cols-[auto_60px_60px_60px] gap-4 py-2 px-4 font-bold',
                index % 2 === 0 ? 'bg-white-4' : 'bg-white-8'
              )}
            >
              <div className="flex flex-col">
                <span className="text-[10px] text-white">{item.name}</span>
                <span className="word-break text-[10px] text-casper">
                  {item.bettingtime.split(' ')[0]}
                </span>
                <span className="word-break text-[10px] text-casper">
                  {item.bettingtime.split(' ')[1]}
                </span>
              </div>
              <span className="text-[12px] text-casper">{item.order}</span>
              <span className="text-[12px] text-casper flex justify-center items-center">
                {item.betamount}
              </span>
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'text-[12px]',
                    item.situation > 0 ? 'text-malachite' : 'text-crimson'
                  )}
                >
                  {item.situation}
                </span>
                <ChevronRightIcon className="h-6 w-6" color="#A7B5CA" />
              </div>
            </div>
          ))}
          <ModalContainer
            onClose={() => setModalOpen(false)}
            isOpen={modalOpen}
            title="Note details"
          >
            <div className="rounded-[12px] bg-white-4 p-4 flex flex-col  gap-4">
              <h2 className="text-casper text-[14px] font-bold">
                Lottery results
              </h2>
              <div className="rounded-[12px] bg-mirage py-4 px-16 flex justify-between items-center ">
                <span className="text-white font-bold text-[14px] p-4 bg-mirage-4 rounded-[12px]">
                  8
                </span>
                <span className="w-px h-full bg-casper"></span>
                <span className="text-white font-bold capitalize text-[14px] p-4 bg-mirage-4 rounded-[12px]">
                  {history[modalIndex].betcontent}
                </span>
              </div>
            </div>
            <div className="rounded-[8px] overflow-hidden flex flex-col">
              <div className="flex items-center h-[48px] p-4 bg-mirage justify-between w-full">
                <span className="flex text-casper text-[12px] items-center">
                  Available
                  <CopyBox className="bg-transparent text-[12px] py-0 hover:bg-transparent ">
                    {history[modalIndex].available}
                  </CopyBox>
                </span>
                <span>
                  <img src="/icons/coin-icon/USDT.svg" className="w-4 h-4" />
                </span>
              </div>
              <div className="flex bg-white-4  h-[48px] items-center text-casper text-[12px] font-medium px-4 py-2 bg-mirage justify-between w-full">
                <span>Play the game</span>
                <span className="text-white">
                  {history[modalIndex].playgame}
                </span>
              </div>
              <div className="flex bg-white-8 h-[48px] items-center text-casper text-[12px] font-medium px-4 py-2 bg-mirage justify-between w-full">
                <span>Block height</span>
                <span className="text-white">
                  <CopyBox className="bg-transparent text-[12px] pr-0 hover:bg-transparent ">
                    {history[modalIndex].blockheight}
                  </CopyBox>
                </span>
              </div>
              <div className="flex bg-white-4  h-[48px] items-center text-casper text-[12px] font-medium px-4 py-2 bg-mirage justify-between w-full">
                <span>Block hash</span>
                <span className="text-white flex items-center">
                  <CopyBox className="bg-transparent text-[12px] pr-0 pl-[10px] hover:bg-transparent ">
                    {history[modalIndex].blockhash}
                  </CopyBox>
                  <span className="text-malachite text-[12px] font-bold">
                    Verify fairness
                  </span>
                </span>
              </div>
              <div className="flex bg-white-8  h-[48px] items-center text-casper text-[12px] font-medium px-4 py-2 bg-mirage justify-between w-full">
                <span>Bet content</span>
                <span className="text-white">
                  {history[modalIndex].betcontent}
                </span>
              </div>
              <div className="flex bg-white-4  h-[48px] items-center text-casper text-[12px] font-medium px-4 py-2 bg-mirage justify-between w-full">
                <span>Bet amount</span>
                <span className="text-white">
                  {history[modalIndex].betamount}
                </span>
              </div>
              <div className="flex bg-white-8   h-[48px] items-center text-casper text-[12px] font-medium px-4 py-2 bg-mirage justify-between w-full">
                <span>Win or lose situation</span>
                <span
                  className={
                    history[modalIndex].situation > 0
                      ? 'text-white font-bold'
                      : 'text-crimson font-bold'
                  }
                >
                  {history[modalIndex].situation}
                </span>
              </div>
              <div className="flex bg-white-4  h-[48px] items-center text-casper text-[12px] font-medium px-4 py-2 bg-mirage justify-between w-full">
                <span>Betting time</span>
                <span className="text-white">
                  {history[modalIndex].bettingtime}
                </span>
              </div>
            </div>
          </ModalContainer>
        </div>
      </div>
      <div className="flex justify-center items-center text-casper text-[12px]">
        No more
      </div>
    </div>
  )
}

export default GameHistory
