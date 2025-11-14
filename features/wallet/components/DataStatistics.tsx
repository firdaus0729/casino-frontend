import React, { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Dropdown, Select } from '@/components/ui'
import { PiIcon } from 'lucide-react'
import { DropdownSelect } from '@/components/ui/DropdownSelect'
import CopyIcon from '@/components/ui/icons/copy'
import InfoCircleIcon from '@/components/ui/icons/info-circle'
import TDButton from '@/components/ui/Button/TDButton'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchWalletBets } from '@/store/slices/walletSlice'

const DataStatistics: React.FC = () => {
  const [selectedCurrencyType, setSelectedCurrencyType] = useState('Game data')
  const dispatch = useAppDispatch()
  const { bets, isLoading } = useAppSelector(state => state.wallet)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [selectedValue, setSelectedValue] = useState('usdt')
  const [selectedNetworkValue, setSelectedNetworkValue] =
    useState('Past 7 days')
  const [selectedCurrencyValue, setSelectedCurrencyValue] = useState('uah')

  const currencyOptions = [
    {
      value: 'usdt',
      label: 'USDT',
      icon: <img src="/icons/coin-icon/USDT.svg" />,
    },
  ]

  const currencyOptions1 = [
    {
      value: 'uah',
      label: 'UAH',
      icon: <img src="/icons/flag-icon/ua.svg" className="h-6 rounded-[4px]" />,
    },
  ]

  const networkOptions = [{ value: 'Past 7 days', label: 'Past 7 days' }]

  const games = [
    {
      name: 'Hash Games',
      icon: '/icons/Hash.svg',
      numberBet: '1',
      betAmount: '1',
      win: 1,
    },
    {
      name: 'Slots',
      icon: '/icons/Slots.svg',
      numberBet: '1',
      betAmount: '1',
      win: 1,
    },
    {
      name: 'Sport',
      icon: '/icons/Sport.svg',
      numberBet: '1',
      betAmount: '1',
      win: 1,
    },
    {
      name: 'Live Casino',
      icon: '/icons/Casino1.svg',
      numberBet: '1',
      betAmount: '1',
      win: 1,
    },
    {
      name: 'Crypto Games',
      icon: '/icons/Cryptogra1.svg',
      numberBet: '1',
      betAmount: '1',
      win: 1,
    },
    {
      name: 'Table Games',
      icon: '/icons/tablegame.svg',
      numberBet: '1',
      betAmount: '1',
      win: 1,
    },
  ]

  useEffect(() => {
    const sub = searchParams.get('sub')
    if (sub === 'Game data') setSelectedCurrencyType('Game data')
    if (sub === 'Betting data') setSelectedCurrencyType('Betting data')
  }, [searchParams])

  useEffect(() => {
    dispatch(fetchWalletBets())
  }, [dispatch])

  const totalBets = bets?.length || 0
  const totalAmount = useMemo(() => bets?.reduce((sum, b) => sum + (b.amount || 0), 0) || 0, [bets])
  const totalWinLoss = useMemo(() => bets?.reduce((sum, b) => sum + (b.result === 'win' ? b.amount : -b.amount), 0) || 0, [bets])

  const handleCurrencyTypeClick = (gameType: string) => {
    setSelectedCurrencyType(gameType)
    const params = new URLSearchParams(searchParams.toString())
    const value = gameType === 'Game data' ? 'Game data' : 'Betting data'
    params.set('sub', value)
    router.replace(`${pathname}?${params.toString()}`)
  }

  const paymentMethods = [
    {
      icon: '/images/wallets/visa.png',
      alt: 'visa',
    },
    {
      icon: '/images/wallets/apay.png',
      alt: 'Apple Pay',
    },
    {
      icon: '/images/wallets/mc.png',
      alt: 'mc',
    },
    {
      icon: '/images/wallets/gpay.png',
      alt: 'gpay',
    },
  ]

  return (
    <div className=" [@media(max-width:660px)]:w-full">
      <div className="w-full flex flex-col gap-4 space-y-4">
        {/* DataStatistics Header */}
        <h1 className="text-lg sm:text-xl font-bold text-white hidden lg:block">
          Statistics
        </h1>
        <div className="grid grid-cols-2 gap-4 bg-white-4 rounded-[12px] overflow-hidden p-1 h-11">
          {['Game data', 'Betting data'].map((item, index) => (
            <div
              className={cn(
                'text-[14px] font-bold rounded-[8px] overflow-hidden flex justify-center items-center',
                selectedCurrencyType === item
                  ? 'bg-white-13 text-gallery'
                  : 'text-casper'
              )}
              onClick={() => handleCurrencyTypeClick(item)}
            >
              {item}
            </div>
          ))}
        </div>

        {selectedCurrencyType === 'Game data' ? (
          <>
            <div className="grid grid-cols-2 gap-4 rounded-[12px] ">
              <DropdownSelect
                value={selectedNetworkValue}
                options={networkOptions}
                onChange={setSelectedNetworkValue}
              />
              <DropdownSelect
                value={selectedValue}
                options={currencyOptions}
                onChange={setSelectedValue}
              />
            </div>

            <div className="p-4 grid grid-cols-3 gap-4 rounded-[12px] bg-white-4">
              <div className="flex items-center flex-col">
                <span className="text-[10px] text-casper">Total bets</span>
                <span className="text-[0.875rem] text-white font-bold">{isLoading ? '...' : totalBets}</span>
              </div>
              <div className="flex items-center flex-col border-l border-r border-white-13">
                <span className="text-[10px] text-casper">Bet Amount</span>
                <span className="text-[0.875rem] text-white font-bold">{isLoading ? '...' : totalAmount}</span>
              </div>
              <div className="flex items-center flex-col">
                <span className="text-[10px] text-casper">
                  Total win or loss
                </span>
                <span className="text-[0.875rem] text-dodger-blue font-bold">{isLoading ? '...' : totalWinLoss}</span>
              </div>
            </div>
            <div className="rounded-t-[8px] overflow-hidden">
              <div className="grid gap-4 grid-cols-[auto_70px_70px_70px] p-4 bg-mirage  items-center text-casper font-bold text-[12px]">
                <span>Game</span>
                <span className="flex justify-center items-center">
                  Number of Bets
                </span>
                <span className="flex justify-center items-center">
                  Bet amount
                </span>
                <span className="flex justify-center items-center">
                  Win or lose
                </span>
              </div>
              {(bets && bets.length > 0 ? bets : []).map((bet, index) => (
                <div
                  key={index}
                  className={cn(
                    'grid h-12 gap-4 grid-cols-[auto_70px_70px_70px] px-4 py-2 items-center font-bold text-[12px]',
                    index % 2 === 0 ? 'bg-white-4' : 'bg-white-8'
                  )}
                >
                  <div className="flex gap-2 items-center text-casper">
                    <img src="/icons/Hash.svg" alt="game" />
                    {bet.game}
                  </div>
                  <div className="flex justify-center items-center text-white">1</div>
                  <div className="flex justify-center items-center text-white">{bet.amount} {bet.currency}</div>
                  <div className="flex justify-center items-center text-dodger-blue">{bet.result}</div>
                </div>
              ))}
              {(!bets || bets.length === 0) && (
                <div className="p-4 text-center text-casper bg-white-4">{isLoading ? 'Loading...' : 'No recent bets'}</div>
              )}
            </div>
          </>
        ) : (
          <>
            <DropdownSelect
              label="Currency"
              value={selectedCurrencyValue}
              options={currencyOptions1}
              onChange={setSelectedCurrencyValue}
            />
            <div className="rounded-[12px] overflow-hidden p-4 bg-white-4 flex flex-col gap-4">
              <h2 className="text-[14px] font-bold text-white">
                Replenishment method
              </h2>
              <div className="bg-mirage rounded-[12px] h-[48px] p-[6px] grid items-center  grid-cols-[auto_auto_56px] pl-2">
                <div className="flex justify-center items-center">
                  <img
                    src="/images/wallets/transak.png"
                    alt="transak"
                    className="h-6"
                  />
                </div>
                <div className="font-medium text-[12px] text-dodger-blue">
                  Transak
                </div>
                <div className="text-polo-blue text-[12px] font-bold">
                  10-99999
                </div>
              </div>
            </div>
            <div className="rounded-[12px] overflow-hidden p-4 bg-white-4 flex flex-col gap-2">
              <h2 className="text-[14px] text-gallery font-bold">
                No Game datacurrency?
              </h2>
              <p className="text-[14px] text-casper">
                Follow these simple steps and the funds will be automatically
                transferred to your wallet as shown below.
              </p>
            </div>
            <div className="rounded-[12px] overflow-hidden p-4 bg-white-4 flex flex-col gap-4">
              <h2 className="text-[14px] text-gallery font-bold">Networks</h2>
              <div className="rounded-[12px] overflow-hidden bg-white-8 p-1 flex justify-between">
                <div className="h-9 w-[148px] px-3 bg-white-13 rounded-[12px] items-center gap-2 flex">
                  <img
                    src="/icons/coin-icon/USDT.svg"
                    className="h-6 w-6"
                    alt="usdt"
                  />
                  <span className="text-[14px] font-bold text-gallery">
                    Tether
                  </span>
                  <span className="text-[14px] font-bold text-casper">
                    USDT
                  </span>
                </div>
                <div className="flex justify-end  font-bold text-[14px] text-white uppercase items-center">
                  tron
                </div>
              </div>
            </div>
            <div className="rounded-[12px] overflow-hidden p-4 bg-white-4 flex flex-col gap-4">
              <h2 className="text-[14px] text-gallery font-bold">
                Purchase amount
              </h2>
              <div className="rounded-[12px] overflow-hidden bg-white-8 p-1 flex justify-between">
                <div className="h-9  px-3 bg-white-13 rounded-[12px] items-center gap-2 flex">
                  <img
                    src="/icons/coin-icon/USDT.svg"
                    className="h-6 w-6"
                    alt="usdt"
                  />
                  <span className="text-[14px] font-bold text-gallery">0</span>
                </div>
                <div className="flex justify-end  font-bold text-[14px] text-white gap-1 items-center">
                  pay <span className="text-malachite">+0</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 font-medium text-white text-[14px] py-4">
              Minimum purchase amount{' '}
              <span className="text-dodger-blue">10 USDT</span>
            </div>
            <TDButton
              onClick={() => {}}
              className="h-[41px] w-full text-[14px] text-gallery"
              type="blue"
            >
              Top up now
            </TDButton>
            <div className="flex gap-4 justify-center items-center">
              {paymentMethods.map(paymentMethod => (
                <img
                  src={paymentMethod.icon}
                  className="lg:h-8 h-[25.5px]"
                  alt="payment"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default DataStatistics
