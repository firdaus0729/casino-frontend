import React, { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { DropdownSelect } from '@/components/ui/DropdownSelect'
import InfoCircleIcon from '@/components/ui/icons/info-circle'
import TDButton from '@/components/ui/Button/TDButton'
import FlatButton from '@/components/ui/Button/FlatButton'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { withdrawCrypto, fetchWalletInfo } from '@/store/slices/walletSlice'
import { useToast } from '@/context/ToastProvider'

const Withdraw: React.FC = () => {
  const [selectedCurrencyType, setSelectedCurrencyType] = useState('Crypto')
  const dispatch = useAppDispatch()
  const { addresses, balances, isLoading } = useAppSelector(
    state => state.wallet
  )
  const { showSuccess, showError } = useToast()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [selectedValue, setSelectedValue] = useState('')
  const [selectedNetworkValue, setSelectedNetworkValue] = useState('')
  const [selectedCurrencyValue, setSelectedCurrencyValue] = useState('uah')
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState<number | ''>('')
  const [withdrawalPassword, setWithdrawalPassword] = useState('')

  // Withdrawal limits and fees (these could come from backend config)
  const WITHDRAWAL_LIMITS = {
    USDT: { min: 1, max: 10000, fee: 1 },
    BTC: { min: 0.001, max: 10, fee: 0.0005 },
    ETH: { min: 0.01, max: 100, fee: 0.005 },
    TRX: { min: 1, max: 10000, fee: 1 },
    SOL: { min: 0.01, max: 100, fee: 0.005 },
    USDC: { min: 1, max: 10000, fee: 1 },
    BNB: { min: 0.01, max: 100, fee: 0.005 },
  } as Record<string, { min: number; max: number; fee: number }>

  // Currency options based on selected network
  const currencyOptions = useMemo(() => {
    if (selectedNetworkValue === 'sol' || selectedNetworkValue === 'solana') {
      return [
        {
          value: 'sol',
          label: 'SOL',
          icon: <img src="/icons/coin-icon/SOL.svg" />,
        },
        {
          value: 'usdc',
          label: 'USDC',
          icon: <img src="/icons/coin-icon/USDC.svg" />,
        },
      ]
    } else if (selectedNetworkValue === 'trc') {
      return [
        {
          value: 'trx',
          label: 'TRX',
          icon: <img src="/icons/coin-icon/TRX.svg" />,
        },
        {
          value: 'usdt',
          label: 'USDT',
          icon: <img src="/icons/coin-icon/USDT.svg" />,
        },
      ]
    } else if (selectedNetworkValue === 'erc') {
      return [
        {
          value: 'eth',
          label: 'ETH',
          icon: <img src="/icons/coin-icon/ETH.svg" />,
        },
        {
          value: 'usdt',
          label: 'USDT',
          icon: <img src="/icons/coin-icon/USDT.svg" />,
        },
      ]
    } else if (selectedNetworkValue === 'bsc') {
      return [
        {
          value: 'bnb',
          label: 'BNB',
          icon: <img src="/icons/coin-icon/BNB.svg" />,
        },
        {
          value: 'usdt',
          label: 'USDT',
          icon: <img src="/icons/coin-icon/USDT.svg" />,
        },
      ]
    } else {
      return [
        {
          value: 'usdt',
          label: 'USDT',
          icon: <img src="/icons/coin-icon/USDT.svg" />,
        },
      ]
    }
  }, [selectedNetworkValue])

  const currencyOptions1 = [
    {
      value: 'uah',
      label: 'UAH',
      icon: (
        <img src="/icons/flag-icon/ua.svg" className="h-6 rounded-[0.25rem]" />
      ),
    },
  ]

  const networkOptions = useMemo(() => {
    if (!addresses || addresses.length === 0) {
      return [
        {
          value: 'trc',
          label: 'TRC20',
          icon: <img src="/icons/coin-icon/TRX.svg" />,
        },
        {
          value: 'sol',
          label: 'Solana',
          icon: <img src="/icons/coin-icon/SOL.svg" />,
        },
      ]
    }

    // Create network options based on available blockchains
    const uniqueBlockchains = [
      ...new Set(addresses.map(addr => addr.blockchain)),
    ]
    return uniqueBlockchains.map(blockchain => {
      const networkValue =
        blockchain === 'Tron'
          ? 'trc'
          : blockchain === 'Ethereum'
            ? 'erc'
            : blockchain === 'BNB'
              ? 'bsc'
              : blockchain === 'Solana'
                ? 'sol'
                : blockchain.toLowerCase().substring(0, 3)

      const networkLabel =
        blockchain === 'Tron'
          ? 'TRC20'
          : blockchain === 'Ethereum'
            ? 'ERC20'
            : blockchain === 'BNB'
              ? 'BEP20'
              : blockchain === 'Solana'
                ? 'Solana'
                : blockchain.toUpperCase()

      const iconName =
        blockchain === 'Tron'
          ? 'TRX'
          : blockchain === 'Ethereum'
            ? 'ETH'
            : blockchain === 'BNB'
              ? 'BNB'
              : blockchain === 'Solana'
                ? 'SOL'
                : 'USDT'

      return {
        value: networkValue,
        label: networkLabel,
        icon: <img src={`/icons/coin-icon/${iconName}.svg`} />,
      }
    })
  }, [addresses])

  // Computed values
  const selectedCurrency = selectedValue.toUpperCase()
  const availableBalance = useMemo(() => {
    const balance = balances?.find(
      b => b.currency.toUpperCase() === selectedCurrency
    )
    return balance?.amount || 0
  }, [balances, selectedCurrency])

  const withdrawalLimits = WITHDRAWAL_LIMITS[selectedCurrency] || {
    min: 1,
    max: 1000,
    fee: 0.1,
  }
  const withdrawalFee = withdrawalLimits.fee
  const maxWithdrawable = Math.max(0, availableBalance - withdrawalFee)
  const withdrawalAmount = typeof amount === 'number' ? amount : 0
  const totalDeduction = withdrawalAmount + withdrawalFee
  const actualReceived = Math.max(0, withdrawalAmount - withdrawalFee)

  // Validation
  const isValidAmount =
    withdrawalAmount >= withdrawalLimits.min &&
    withdrawalAmount <= withdrawalLimits.max &&
    totalDeduction <= availableBalance
  const isValidAddress = toAddress.trim().length > 0
  const isValidPassword = withdrawalPassword.trim().length > 0

  const handleWithdraw = () => {
    if (!isValidAddress) {
      showError('Error', 'Please enter a valid destination address')
      return
    }
    if (!isValidAmount) {
      if (withdrawalAmount < withdrawalLimits.min) {
        showError(
          'Error',
          `Minimum withdrawal amount is ${withdrawalLimits.min} ${selectedCurrency}`
        )
      } else if (withdrawalAmount > withdrawalLimits.max) {
        showError(
          'Error',
          `Maximum withdrawal amount is ${withdrawalLimits.max} ${selectedCurrency}`
        )
      } else if (totalDeduction > availableBalance) {
        showError(
          'Error',
          `Insufficient balance. Available: ${availableBalance} ${selectedCurrency}`
        )
      }
      return
    }
    if (!isValidPassword) {
      showError('Error', 'Please enter your withdrawal password')
      return
    }

    const blockchain =
      selectedNetworkValue === 'trc'
        ? 'Tron'
        : selectedNetworkValue === 'sol'
          ? 'Solana'
          : selectedNetworkValue === 'solana'
            ? 'Solana'
            : selectedNetworkValue === 'erc'
              ? 'Ethereum'
              : selectedNetworkValue === 'bsc'
                ? 'BNB'
                : 'Ethereum'
    dispatch(
      withdrawCrypto({
        blockchain,
        currency: selectedCurrency,
        to: toAddress,
        amount: withdrawalAmount,
        withdrawalPassword: withdrawalPassword,
      })
    )
      .unwrap()
      .then(() => {
        showSuccess('Success', 'Withdrawal request submitted successfully')
        setAmount('')
        setToAddress('')
        setWithdrawalPassword('')
        dispatch(fetchWalletInfo()) // Refresh balance
      })
      .catch((err: any) => {
        showError('Error', err || 'Withdrawal failed')
      })
  }

  const handleQuickAmount = (percentage: number) => {
    const quickAmount =
      percentage === 100
        ? maxWithdrawable
        : (maxWithdrawable * percentage) / 100
    setAmount(Math.max(0, Number(quickAmount.toFixed(6))))
  }

  useEffect(() => {
    const sub = searchParams.get('sub')
    if (sub === 'crypto') setSelectedCurrencyType('Crypto')
    if (sub === 'fiat') setSelectedCurrencyType('Fiat')
  }, [searchParams])

  useEffect(() => {
    // Fetch wallet info on component mount
    dispatch(fetchWalletInfo())
  }, [dispatch])

  // Set default currency when balances are loaded
  useEffect(() => {
    if (balances && balances.length > 0 && selectedValue === '') {
      setSelectedValue(balances[0].currency.toLowerCase())
    }
  }, [balances, selectedValue])

  // Reset currency when network changes
  useEffect(() => {
    //! TODO
    // const availableCurrencies = getCurrencyOptions()
    // if (availableCurrencies.length > 0) {
    //   setSelectedValue(availableCurrencies[0].value)
    // }
  }, [selectedNetworkValue])

  const handleCurrencyTypeClick = (gameType: string) => {
    setSelectedCurrencyType(gameType)
    const params = new URLSearchParams(searchParams.toString())
    const value = gameType === 'Crypto' ? 'crypto' : 'fiat'
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
        {/* Withdraw Header */}
        <h1 className="text-lg sm:text-xl hidden lg:block font-bold text-white">
          {selectedCurrencyType === 'Crypto' ? 'Crypto' : 'To replenish'}
        </h1>
        <div className="grid grid-cols-2 gap-4 bg-white-4 rounded-[0.75rem] overflow-hidden p-1 h-11">
          {['Crypto', 'Fiat'].map((item, index) => (
            <div
              className={cn(
                'text-[0.875rem] font-bold rounded-[0.5rem] overflow-hidden flex justify-center items-center',
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

        {selectedCurrencyType === 'Crypto' ? (
          <>
            <div className="grid grid-cols-2 gap-4 rounded-[0.75rem] ">
              <DropdownSelect
                label="Currency"
                value={selectedValue}
                options={currencyOptions}
                onChange={setSelectedValue}
              />
              <DropdownSelect
                label="Network"
                value={selectedNetworkValue}
                options={networkOptions}
                onChange={setSelectedNetworkValue}
              />
            </div>
            <div className="rounded-[0.75rem] bg-white-4 flex flex-col gap-4">
              <div className="flex justify-between"></div>
            </div>

            <div className="p-4 flex gap-4 rounded-[0.75rem] bg-white-4 flex-col">
              <h2 className="font-bold text-[0.875rem] text-white flex items-center justify-between indent-[1.25rem]">
                Wallet Address{' '}
                <span className="text-dodger-blue">Address book</span>
              </h2>
              <input
                value={toAddress}
                onChange={e => setToAddress(e.target.value)}
                placeholder="Destination address"
                className="px-4 h-[47px] flex items-center bg-white-8 rounded-[0.5rem] text-casper font-bold text-[0.75rem]"
              />
            </div>

            <div className="p-4 flex gap-4 rounded-[0.75rem] bg-white-4 flex-col">
              <h2 className="font-bold text-[0.875rem] text-white flex items-center justify-between indent-[1.25rem]">
                Withdrawal account
                <span>
                  Minimum{' '}
                  <span className="text-crimson">
                    {withdrawalLimits.min} {selectedCurrency}
                  </span>
                </span>
              </h2>
              <input
                value={amount}
                onChange={e =>
                  setAmount(e.target.value === '' ? '' : Number(e.target.value))
                }
                placeholder="Amount"
                className="px-4 h-[47px] flex items-center bg-white-8 rounded-[0.5rem] text-casper font-bold text-[0.75rem]"
              />

              <div className="grid grid-cols-4 h-[47px] items-center  gap-4 font-bold text-[0.75rem]">
                <div
                  onClick={() => handleQuickAmount(withdrawalLimits.min)}
                  className="text-casper text-[0.75rem] font-bold h-full flex items-center justify-center bg-white-8 rounded-[0.5rem] cursor-pointer hover:bg-white-13 transition-colors"
                >
                  Lowest
                </div>
                <div
                  onClick={() => handleQuickAmount(25)}
                  className="text-casper text-[0.75rem] font-bold h-full flex items-center justify-center bg-white-8 rounded-[0.5rem] cursor-pointer hover:bg-white-13 transition-colors"
                >
                  25%
                </div>
                <div
                  onClick={() => handleQuickAmount(50)}
                  className="text-casper text-[0.75rem] font-bold h-full flex items-center justify-center bg-white-8 rounded-[0.5rem] cursor-pointer hover:bg-white-13 transition-colors"
                >
                  50%
                </div>
                <div
                  onClick={() => handleQuickAmount(100)}
                  className="text-casper text-[0.75rem] font-bold h-full flex items-center justify-center bg-white-8 rounded-[0.5rem] cursor-pointer hover:bg-white-13 transition-colors"
                >
                  Max
                </div>
              </div>
            </div>

            <div className="p-4 flex gap-4 rounded-[0.75rem] bg-white-4 flex-col">
              <h2 className="font-bold text-[0.875rem] text-white indent-[1.25rem]">
                Withdrawal Password
              </h2>
              <input
                type="password"
                value={withdrawalPassword}
                onChange={e => setWithdrawalPassword(e.target.value)}
                placeholder="Enter your withdrawal password"
                className="px-4 h-[47px] flex items-center bg-white-8 rounded-[0.5rem] text-casper font-bold text-[0.75rem]"
              />
              <div className="text-casper text-[0.75rem]">
                Enter your withdrawal password for security verification.
              </div>
            </div>

            <div className="">
              <span className="font-middle text-casper h-[47px] flex border-b border-white-8 items-center gap-1">
                Available{' '}
                <span className="font-bold text-white">
                  {availableBalance.toFixed(6)} {selectedCurrency}
                </span>
              </span>
              <div className="flex justify-between py-2 items-center">
                <span className="text-dodger-blue font-medium text-[0.75rem]">
                  Withdraw amount
                </span>
                <span className="text-dodger-blue font-bold text-[0.75rem]">
                  {withdrawalAmount.toFixed(6)} {selectedCurrency}
                </span>
              </div>
              <div className="flex justify-between py-2 items-center">
                <span className="text-casper font-medium text-[0.75rem] flex items-center gap-1">
                  Handling fee: <InfoCircleIcon className="w-6 h-6" />
                </span>
                <span className="text-white font-bold text-[0.75rem]">
                  {withdrawalFee.toFixed(6)} {selectedCurrency}
                </span>
              </div>
              <div className="flex justify-between py-2 items-center">
                <span className="text-casper font-medium text-[0.75rem]">
                  You will receive
                </span>
                <span className="text-white font-bold text-[0.75rem]">
                  {actualReceived.toFixed(6)} {selectedCurrency}
                </span>
              </div>
              {!isValidAmount && withdrawalAmount > 0 && (
                <div className="text-yellow-orange text-[0.75rem] font-medium py-2">
                  {withdrawalAmount < withdrawalLimits.min &&
                    `Minimum withdrawal: ${withdrawalLimits.min} ${selectedCurrency}`}
                  {withdrawalAmount > withdrawalLimits.max &&
                    `Maximum withdrawal: ${withdrawalLimits.max} ${selectedCurrency}`}
                  {totalDeduction > availableBalance &&
                    'Insufficient balance (including fees)'}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <FlatButton
                onClick={handleWithdraw}
                disabled={
                  !isValidAmount ||
                  !isValidAddress ||
                  !isValidPassword ||
                  isLoading
                }
                className={`h-9 w-full text-[0.75rem] font-bold text-gallery ${!isValidAmount || !isValidAddress || !isValidPassword || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Processing...' : 'Withdraw money'}
              </FlatButton>
              <div className="font-medium text-[0.875rem] flex gap-2 text-white items-center">
                <InfoCircleIcon className="h-6 w-6" color="var(--malachite)" />
                Please set a fund password
              </div>

              <div className="p-4  rounded-[0.75rem] items-center font-medium text-[0.875rem]  text-white bg-[var(--malachite)21]">
                For security reasons, larger or suspicious withdrawals may take
                1-6 hours to review. Thank you for your patience!
              </div>
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
            <div className="rounded-[0.75rem] overflow-hidden p-4 bg-white-4 flex flex-col gap-4">
              <h2 className="text-[0.875rem] font-bold text-white">
                Replenishment method
              </h2>
              <div className="bg-mirage rounded-[0.75rem] h-[48px] p-[6px] grid items-center  grid-cols-[auto_auto_56px] pl-2">
                <div className="flex justify-center items-center">
                  <img
                    src="/images/wallets/transak.png"
                    alt="transak"
                    className="h-6"
                  />
                </div>
                <div className="font-medium text-[0.75rem] text-dodger-blue">
                  Transak
                </div>
                <div className="text-polo-blue text-[0.75rem] font-bold">
                  10-99999
                </div>
              </div>
            </div>
            <div className="rounded-[0.75rem] overflow-hidden p-4 bg-white-4 flex flex-col gap-2">
              <h2 className="text-[0.875rem] text-gallery font-bold">
                No cryptocurrency?
              </h2>
              <p className="text-[0.875rem] text-casper">
                Follow these simple steps and the funds will be automatically
                transferred to your wallet as shown below.
              </p>
            </div>
            <div className="rounded-[0.75rem] overflow-hidden p-4 bg-white-4 flex flex-col gap-4">
              <h2 className="text-[0.875rem] text-gallery font-bold">
                Networks
              </h2>
              <div className="rounded-[0.75rem] overflow-hidden bg-white-8 p-1 flex justify-between">
                <div className="h-9 w-[148px] px-3 bg-white-13 rounded-[0.75rem] items-center gap-2 flex">
                  <img
                    src="/icons/coin-icon/USDT.svg"
                    className="h-6 w-6"
                    alt="usdt"
                  />
                  <span className="text-[0.875rem] font-bold text-gallery">
                    Tether
                  </span>
                  <span className="text-[0.875rem] font-bold text-casper">
                    USDT
                  </span>
                </div>
                <div className="flex justify-end  font-bold text-[0.875rem] text-white uppercase items-center">
                  tron
                </div>
              </div>
            </div>
            <div className="rounded-[0.75rem] overflow-hidden p-4 bg-white-4 flex flex-col gap-4">
              <h2 className="text-[0.875rem] text-gallery font-bold">
                Purchase amount
              </h2>
              <div className="rounded-[0.75rem] overflow-hidden bg-white-8 p-1 flex justify-between">
                <div className="h-9  px-3 bg-white-13 rounded-[0.75rem] items-center gap-2 flex">
                  <img
                    src="/icons/coin-icon/USDT.svg"
                    className="h-6 w-6"
                    alt="usdt"
                  />
                  <span className="text-[0.875rem] font-bold text-gallery">
                    0
                  </span>
                </div>
                <div className="flex justify-end  font-bold text-[0.875rem] text-white gap-1 items-center">
                  pay <span className="text-malachite">+0</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 font-medium text-white text-[0.875rem] py-4">
              Minimum purchase amount{' '}
              <span className="text-dodger-blue">10 USDT</span>
            </div>
            <TDButton
              onClick={() => {}}
              className="h-[41px] w-full text-[0.875rem] text-gallery"
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

export default Withdraw
