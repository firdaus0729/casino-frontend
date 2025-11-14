import React, { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { DropdownSelect } from '@/components/ui/DropdownSelect'
import CopyIcon from '@/components/ui/icons/copy'
import InfoCircleIcon from '@/components/ui/icons/info-circle'
import TDButton from '@/components/ui/Button/TDButton'
import { useI18n } from '@/context/I18nProvider'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchWalletInfo } from '@/store/slices/walletSlice'
import { QRCodeCanvas } from 'qrcode.react'

const Deposit: React.FC = () => {
  const { t } = useI18n()
  const dispatch = useAppDispatch()
  const { addresses, balances, isLoading, error } = useAppSelector(
    state => state.wallet
  )
  const [selectedCurrencyType, setSelectedCurrencyType] = useState('Crypto')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [selectedValue, setSelectedValue] = useState('')
  const [selectedNetworkValue, setSelectedNetworkValue] = useState('')
  const [selectedCurrencyValue, setSelectedCurrencyValue] = useState('uah')

  const currencyOptions = useMemo(() => {
    if (!balances || balances.length === 0) {
      return [
        {
          value: 'usdt',
          label: 'USDT',
          icon: <img src="/icons/coin-icon/USDT.svg" alt="" />,
        },
      ]
    }

    return balances.map(balance => ({
      value: balance.currency.toLowerCase(),
      label: balance.currency.toUpperCase(),
      icon: (
        <img
          src={`/icons/coin-icon/${balance.currency.toUpperCase()}.svg`}
          alt=""
        />
      ),
    }))
  }, [balances])

  const currencyOptions1 = [
    {
      value: 'uah',
      label: 'UAH',
      icon: (
        <img
          src="/icons/flag-icon/ua.svg"
          alt=""
          className="h-6 rounded-[4px]"
        />
      ),
    },
  ]

  const networkOptions = useMemo(() => {
    if (!addresses || addresses.length === 0) {
      return [
        {
          value: 'trc',
          label: 'TRC20',
          icon: <img src="/icons/coin-icon/TRX.svg" alt="" />,
        },
      ]
    }

    // Create network options based on available blockchains
    const uniqueBlockchains = [
      ...new Set(addresses.map(addr => addr.blockchain)),
    ]
    return uniqueBlockchains.map(blockchain => {
      // Map blockchain names to network values and labels
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

      // Map blockchain to appropriate icon
      const iconName =
        blockchain === 'Tron'
          ? 'TRX'
          : blockchain === 'Ethereum'
            ? 'ETH'
            : blockchain === 'BNB'
              ? 'BNB'
              : blockchain === 'Solana'
                ? 'SOL'
                : 'USDT' // fallback

      return {
        value: networkValue,
        label: networkLabel,
        icon: <img src={`/icons/coin-icon/${iconName}.svg`} alt="" />,
      }
    })
  }, [addresses])

  useEffect(() => {
    const sub = searchParams.get('sub')
    if (sub === 'crypto') setSelectedCurrencyType('Crypto')
    if (sub === 'fiat') setSelectedCurrencyType('Fiat')
  }, [searchParams])

  useEffect(() => {
    // Fetch wallet info (balances + addresses) on first mount
    dispatch(fetchWalletInfo())
  }, [dispatch])

  // Update selected values when data is loaded
  useEffect(() => {
    if (currencyOptions.length > 0 && selectedValue === '') {
      setSelectedValue(currencyOptions[0].value)
    }
  }, [currencyOptions, selectedValue])

  useEffect(() => {
    if (networkOptions.length > 0 && selectedNetworkValue === '') {
      setSelectedNetworkValue(networkOptions[0].value)
    }
  }, [networkOptions, selectedNetworkValue])

  const networkToBlockchain = useMemo(
    () =>
      ({
        trc: 'Tron',
        erc: 'Ethereum',
        bsc: 'BNB',
        sol: 'Solana',
      }) as Record<string, string>,
    []
  )

  const selectedBlockchain = networkToBlockchain[selectedNetworkValue]
  const selectedPublicKey = useMemo(() => {
    if (!addresses || addresses.length === 0) return ''
    // Find address by matching the blockchain name
    const entry = addresses.find(
      a => a.blockchain?.toLowerCase() === selectedBlockchain?.toLowerCase()
    )
    return entry?.publicKey || ''
  }, [addresses, selectedBlockchain])

  // Debug logging to see what data we're getting
  useEffect(() => {
    console.log('Deposit Component - Wallet Data:', {
      balances,
      addresses,
      isLoading,
      error,
      selectedPublicKey,
      selectedBlockchain,
      selectedNetworkValue,
    })
  }, [
    balances,
    addresses,
    isLoading,
    error,
    selectedPublicKey,
    selectedBlockchain,
    selectedNetworkValue,
  ])

  const selectedFiatBalance = useMemo(() => {
    const code = selectedCurrencyValue?.toUpperCase()
    const item = balances?.find(b => b.currency?.toUpperCase() === code)
    return item?.amount ?? 0
  }, [balances, selectedCurrencyValue])

  const handleCopy = async () => {
    if (!selectedPublicKey) return
    try {
      await navigator.clipboard.writeText(selectedPublicKey)
    } catch {}
  }

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
      <div className="w-full flex flex-col gap-4">
        {/* Deposit Header */}
        <h1 className="text-lg sm:text-xl font-bold text-white hidden lg:block">
          {selectedCurrencyType === 'Crypto' ? 'Deposit' : 'To replenish'}
        </h1>
        <div className="grid grid-cols-2 gap-4 bg-white-4 rounded-[12px] overflow-hidden p-1 h-11">
          {[
            { label: 'crypto', key: 'Crypto' },
            { label: 'fiat', key: 'Fiat' },
          ].map((item, index) => (
            <div
              key={index}
              className={cn(
                'text-[14px] font-bold rounded-[8px] overflow-hidden flex justify-center items-center',
                selectedCurrencyType === item.key
                  ? 'bg-white-13 text-gallery'
                  : 'text-casper'
              )}
              onClick={() => handleCurrencyTypeClick(item.key)}
            >
              {t(`wallet.${item.label}`)}
            </div>
          ))}
        </div>

        {selectedCurrencyType === 'Crypto' ? (
          <>
            <div className="grid grid-cols-2 gap-4 rounded-[12px] ">
              <DropdownSelect
                label={t('wallet.currency')}
                value={selectedValue}
                options={currencyOptions}
                onChange={setSelectedValue}
              />
              <DropdownSelect
                label={t('wallet.network')}
                value={selectedNetworkValue}
                options={networkOptions}
                onChange={setSelectedNetworkValue}
              />
            </div>

            <div className="p-2 grid grid-cols-1 sm:grid-cols-[150px_auto] gap-4 rounded-[12px] bg-white-4">
              <div className="rounded-[8px] p-2 mx-auto bg-white flex items-center justify-center">
                {/* Simple QR code generated via Google Chart API without extra deps */}
                <QRCodeCanvas
                  value={selectedPublicKey}
                  size={125}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H" // Error correction level: L, M, Q, H
                />
              </div>
              <div className="flex flex-col justify-between w-full gap-2">
                <h2 className="font-bold text-[1rem] text-white">
                  {t('wallet.address')}
                </h2>
                <div className="bg-white-8 rounded-[8px] w-full min-h-[62px] flex justify-center items-center">
                  <span className="text-casper font-bold break-all p-2 text-[.8rem]">
                    {isLoading
                      ? t('app.loading')
                      : error
                        ? `Error: ${error}`
                        : selectedPublicKey || t('wallet.address') + ' N/A'}
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex bg-white-13 justify-center text-casper text-[1rem] font-bold items-center rounded-[12px] gap-1 h-[48px] w-full"
                >
                  <CopyIcon />
                  <span>{t('wallet.copy')}</span>
                </button>
              </div>
            </div>
            <div className="p-2 flex gap-2 rounded-[12px] items-center bg-[#1BB83D21] pl-2">
              <InfoCircleIcon className="h-6 w-6" color="#1BB83D" />
              <p className="font-medium text-[14px] w-[90%] text-white">
                <span>{t('wallet.noticeUsdt')}</span>
              </p>
            </div>
          </>
        ) : (
          <>
            <DropdownSelect
              label={t('wallet.currency')}
              value={selectedCurrencyValue}
              options={currencyOptions1}
              onChange={setSelectedCurrencyValue}
            />
            <div className="rounded-[12px] overflow-hidden p-4 bg-white-4 flex flex-col gap-4">
              <h2 className="text-[14px] font-bold text-white">
                <span>{t('wallet.relenishmentMethod')}</span>
              </h2>
              <div className="text-[12px] text-casper font-bold">
                Available: {selectedFiatBalance}{' '}
                {selectedCurrencyValue.toUpperCase()}
              </div>
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
                {t('wallet.noCurrency')}?
              </h2>
              <p className="text-[14px] text-casper">
                {t('wallet.relenishmentMethodDescription')}
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
                  pay{' '}
                  <span className="text-malachite">+{selectedFiatBalance}</span>
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

export default Deposit
