import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { exchangeCurrency, fetchWalletInfo } from '@/store/slices/walletSlice'
import { useToast } from '@/context/ToastProvider'
import { useLoadingState } from '@/hooks'
import { Loader } from 'lucide-react'
import SwapDiagonalIcon from '@/components/ui/icons/swap-diagonal'
import { CopyBox } from '@/components/ui/CopyBox'

const Swap: React.FC = () => {
  const dispatch = useAppDispatch()
  const { balances, isLoading: walletLoading } = useAppSelector(state => state.wallet)
  const { showSuccess, showError } = useToast()
  const { isLoading: isExchanging, withLoading: withExchangeLoading } = useLoadingState()
  
  const [fromCurrency, setFromCurrency] = useState('USDT')
  const [toCurrency, setToCurrency] = useState('TRX')
  const [amount, setAmount] = useState('')
  const [exchangeRate, setExchangeRate] = useState(0)
  const [exchangeFee, setExchangeFee] = useState(0)

  // Available currencies
  const currencies = ['USDT', 'TRX', 'ETH']
  
  // Get balance for selected currency
  const getBalance = (currency: string) => {
    const balance = balances.find(b => b.currency === currency)
    return balance ? balance.amount : 0
  }

  // Calculate exchange amount
  const calculateExchangeAmount = () => {
    if (!amount || !exchangeRate) return 0
    const inputAmount = parseFloat(amount)
    return inputAmount * exchangeRate
  }

  // Handle currency swap
  const handleCurrencySwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setAmount('')
  }

  // Handle percentage buttons
  const handlePercentageClick = (percentage: number) => {
    const balance = getBalance(fromCurrency)
    const calculatedAmount = (balance * percentage) / 100
    setAmount(calculatedAmount.toString())
  }

  // Handle exchange
  const handleExchange = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      showError('Error', 'Please enter a valid amount')
      return
    }

    if (parseFloat(amount) > getBalance(fromCurrency)) {
      showError('Error', 'Insufficient balance')
      return
    }

    if (fromCurrency === toCurrency) {
      showError('Error', 'Cannot exchange same currency')
      return
    }

    try {
      await withExchangeLoading(async () => {
        await dispatch(exchangeCurrency({
          fromCurrency,
          toCurrency,
          amount: parseFloat(amount)
        })).unwrap()
        
        showSuccess('Success', 'Currency exchanged successfully')
        setAmount('')
        
        // Refresh wallet balances
        await dispatch(fetchWalletInfo()).unwrap()
      })
    } catch (error) {
      showError('Error', error instanceof Error ? error.message : 'Exchange failed')
    }
  }

  // Mock exchange rate calculation (in real app, this would come from API)
  useEffect(() => {
    // Simple mock rates - in real app, fetch from exchange rate API
    const rates: Record<string, Record<string, number>> = {
      'USDT': { 'TRX': 6.5, 'ETH': 0.0004 },
      'TRX': { 'USDT': 0.15, 'ETH': 0.00006 },
      'ETH': { 'USDT': 2500, 'TRX': 16250 }
    }
    
    if (rates[fromCurrency] && rates[fromCurrency][toCurrency]) {
      setExchangeRate(rates[fromCurrency][toCurrency])
    }
  }, [fromCurrency, toCurrency])

  return (
    <div className="[@media(max-width:660px)]:w-full flex flex-col gap-4">
      <p className="text-[18px] font-bold text-white [@media(max-width:660px)]:hidden">
        Swap
      </p>
      
      {/* From Currency */}
      <div className="p-4 flex gap-4 rounded-[12px] bg-white-4 flex-col">
        <h2 className="font-bold text-[14px] text-white flex items-center justify-between indent-[20px]">
          Send
          <span>
            Balance <span className="text-dodger-blue">{getBalance(fromCurrency)} {fromCurrency}</span>
          </span>
        </h2>
        <div className="px-4 h-[47px] flex items-center bg-white-8 rounded-[8px] text-casper font-bold text-[12px]">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full bg-transparent border-none outline-none text-white"
            disabled={isExchanging}
          />
        </div>
        <div className="grid grid-cols-4 h-[47px] items-center gap-4 font-bold text-[12px]">
          <button
            onClick={() => handlePercentageClick(25)}
            disabled={isExchanging}
            className="text-casper text-[12px] font-bold h-full flex items-center justify-center bg-white-8 rounded-[8px] hover:bg-white-13 transition-colors disabled:opacity-50"
          >
            25%
          </button>
          <button
            onClick={() => handlePercentageClick(50)}
            disabled={isExchanging}
            className="text-casper text-[12px] font-bold h-full flex items-center justify-center bg-white-8 rounded-[8px] hover:bg-white-13 transition-colors disabled:opacity-50"
          >
            50%
          </button>
          <button
            onClick={() => handlePercentageClick(75)}
            disabled={isExchanging}
            className="text-casper text-[12px] font-bold h-full flex items-center justify-center bg-white-8 rounded-[8px] hover:bg-white-13 transition-colors disabled:opacity-50"
          >
            75%
          </button>
          <button
            onClick={() => handlePercentageClick(100)}
            disabled={isExchanging}
            className="text-casper text-[12px] font-bold h-full flex items-center justify-center bg-white-8 rounded-[8px] hover:bg-white-13 transition-colors disabled:opacity-50"
          >
            Max
          </button>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center">
        <button
          onClick={handleExchange}
          disabled={isExchanging || !amount || parseFloat(amount) <= 0}
          className="p-2 rounded-full bg-white-8 hover:bg-white-13 transition-colors disabled:opacity-50"
        >
          {isExchanging ? (
            <Loader className="w-8 h-8 animate-spin" color="#A7B5CA" />
          ) : (
            <SwapDiagonalIcon className="w-8 h-8" color="#A7B5CA" />
          )}
        </button>
      </div>

      {/* To Currency */}
      <div className="rounded-[12px] overflow-hidden p-4 bg-white-4 flex flex-col gap-4">
        <h2 className="text-[14px] text-gallery font-bold">Get</h2>
        <div className="rounded-[12px] overflow-hidden bg-white-8 p-1 flex gap-2">
          <div className="h-9 px-3 bg-white-13 rounded-[12px] items-center gap-2 flex">
            <img
              src={`/icons/coin-icon/${toCurrency}.svg`}
              className="h-6 w-6"
              alt={toCurrency.toLowerCase()}
            />
            <span className="text-[14px] font-bold text-gallery uppercase">
              {toCurrency}
            </span>
          </div>
          <div className="flex justify-end font-bold text-[14px] text-casper uppercase items-center">
            {calculateExchangeAmount().toFixed(6)}
          </div>
        </div>
      </div>

      {/* Exchange Details */}
      <div className="flex flex-col gap-4 py-4 border-t border-white-8">
        <div className="flex justify-between items-center">
          <span className="text-casper font-medium text-[12px] flex items-center gap-1">
            Exchange rate:
          </span>
          <span className="text-white font-bold text-[12px]">
            1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-casper font-medium text-[12px] flex items-center gap-1">
            Exchange fee:
          </span>
          <span className="text-white font-bold text-[12px]">
            {exchangeFee.toFixed(6)} {fromCurrency}
          </span>
        </div>
      </div>

    </div>
  )
}

export default Swap
