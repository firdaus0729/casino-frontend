import { Dropdown } from '@/components/ui'
import { cn } from '@/lib/utils'
import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchTransactions } from '@/store/slices/walletSlice'
import { useToast } from '@/context/ToastProvider'
import { Loader } from 'lucide-react'

const Transaction: React.FC = () => {
  const dispatch = useAppDispatch()
  const { transactions, isLoading } = useAppSelector(state => state.wallet)
  const { showError } = useToast()
  
  const [selectedOption1, setSelectedOption1] = useState('Past 90 days')
  const [selectedOption2, setSelectedOption2] = useState('All currencies')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)

  const [selectedOption3, setSelectedOption3] = useState('Hash Betting')
  const [selectedOption4, setSelectedOption4] = useState('All status')

  const options1 = [
    {
      value: 'Past 90 days',
      label: 'Past 90 days',
    },
  ]

  const options2 = [
    {
      value: 'All currencies',
      label: 'All currencies',
    },
    {
      value: 'TRX',
      label: 'TRX',
    },
    {
      value: 'USDT',
      label: 'USDT',
    },
    {
      value: 'ETH',
      label: 'ETH',
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
      value: 'All status',
      label: 'All status',
    },
  ]

  // Fetch transactions when currency filter changes
  useEffect(() => {
    if (selectedOption2 !== 'All currencies') {
      dispatch(fetchTransactions({ currency: selectedOption2 }))
        .unwrap()
        .catch(error => {
          showError('Error', error || 'Failed to fetch transactions')
        })
    }
  }, [selectedOption2, dispatch, showError])

  // Format transaction type for display
  const formatTransactionType = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'Top Up'
      case 'withdraw':
        return 'Withdraw'
      case 'exchange':
        return 'Exchange'
      default:
        return type
    }
  }

  // Format transaction status
  const formatTransactionStatus = (type: string, amount: number) => {
    if (type === 'deposit') {
      return 'Recharge successful'
    } else if (type === 'withdraw') {
      return 'Withdraw successful'
    } else if (type === 'exchange') {
      return 'Exchange successful'
    }
    return 'Completed'
  }

  // Format amount for display
  const formatAmount = (amount: number, currency: string) => {
    const sign = amount > 0 ? '+' : ''
    return `${sign}${amount} ${currency}`
  }

  return (
    <div className="[@media(max-width:660px)]:w-full flex flex-col gap-4">
      <p className="text-[18px] font-bold text-white [@media(max-width:660px)]:hidden">
        Transaction
      </p>
      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          options={options1}
          value={selectedOption1}
          onChange={setSelectedOption1}
        />
        <Dropdown
          options={options2}
          value={selectedOption2}
          onChange={setSelectedOption2}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          options={options3}
          value={selectedOption3}
          onChange={setSelectedOption3}
        />
        <Dropdown
          options={options4}
          value={selectedOption4}
          onChange={setSelectedOption4}
        />
      </div>
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader className="animate-spin h-8 w-8 text-dodger-blue" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8 text-casper">
            No transactions found
          </div>
        ) : (
          transactions.map((transaction, index) => (
            <div
              key={transaction.txId}
              className="p-4 bg-white-4 rounded-[12px] flex justify-between items-center cursor-pointer hover:bg-white-8 transition-colors"
              onClick={() => {
                setModalIndex(index)
                setModalOpen(true)
              }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-white font-bold text-[14px]">
                  {formatTransactionType(transaction.type)}
                </span>
                <span className="text-casper text-[12px]">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <span
                  className={cn(
                    'font-bold text-[14px]',
                    transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                  )}
                >
                  {formatAmount(transaction.amount, transaction.currency)}
                </span>
                <span className="text-casper text-[12px]">
                  {formatTransactionStatus(transaction.type, transaction.amount)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Transaction Detail Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white-4 rounded-[12px] p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold text-[18px]">Transaction Details</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-casper hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            {transactions[modalIndex] && (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-casper">Transaction ID:</span>
                  <span className="text-white font-mono text-sm">
                    {transactions[modalIndex].txId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-casper">Type:</span>
                  <span className="text-white">
                    {formatTransactionType(transactions[modalIndex].type)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-casper">Amount:</span>
                  <span
                    className={cn(
                      'font-bold',
                      transactions[modalIndex].amount > 0 ? 'text-green-400' : 'text-red-400'
                    )}
                  >
                    {formatAmount(transactions[modalIndex].amount, transactions[modalIndex].currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-casper">Currency:</span>
                  <span className="text-white">{transactions[modalIndex].currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-casper">Status:</span>
                  <span className="text-green-400">
                    {formatTransactionStatus(transactions[modalIndex].type, transactions[modalIndex].amount)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Transaction