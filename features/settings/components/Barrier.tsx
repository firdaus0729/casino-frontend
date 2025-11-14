import React, { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const Barrier: React.FC = () => {
  const [activeTabOption, setActiveTabOption] = useState<'Active' | 'Default'>(
    'Active'
  )
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const sub = searchParams.get('sub')
    if (sub === 'today') {
      setActiveTabOption('Default') // Today corresponds to "Default" in current styling logic
    } else if (sub === 'yesterday') {
      setActiveTabOption('Active') // Yesterday corresponds to "Active"
    }
  }, [searchParams])

  const setSubQuery = (value: 'today' | 'yesterday') => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sub', value)
    router.replace(`${pathname}?${params.toString()}`)
  }

  const faqs = [
    {
      question: 'How to activate a wallet address?',
      answer:
        'Upgrade bonuses can be applied on the VIP Activity page on a self-service basis after members reach a membership level. Each member can only receive one upgrade bonus for each level.',
    },
    {
      question: 'Why do I need to activate the wallet address?',
      answer:
        'Upgrade bonuses can be applied on the VIP Activity page on a self-service basis after members reach a membership level. Each member can only receive one upgrade bonus for each level.',
    },
    {
      question: 'Will not activating the wallet address affect withdrawals?',
      answer:
        'Upgrade bonuses can be applied on the VIP Activity page on a self-service basis after members reach a membership level. Each member can only receive one upgrade bonus for each level.',
    },
  ]

  const BarrierData = [
    { gameType: 'Hash Game', total: 0, direct: 0, agent: 0 },
    { gameType: 'Crypto Games', total: 0, direct: 0, agent: 0 },
    { gameType: 'Hash Lottery', total: 0, direct: 0, agent: 0 },
    { gameType: 'Table Games', total: 0, direct: 0, agent: 0 },
    { gameType: 'Slots', total: 0, direct: 0, agent: 0 },
    { gameType: 'Live Casino', total: 0, direct: 0, agent: 0 },
    { gameType: 'Sports', total: 0, direct: 0, agent: 0 },
    { gameType: 'Low Frequency Lottery', total: 0, direct: 0, agent: 0 },
    { gameType: 'HASH Roulette', total: 0, direct: 0, agent: 0 },
  ]

  return (
    <div className=" [@media(max-width:660px)]:w-full">
      <p className="text-[18px] font-bold text-white p-4 [@media(max-width:660px)]:hidden">
        Barrier
      </p>
      <div className="flex bg-[#72707038] rounded-lg w-fit p-1 mb-4 w-67 [@media(max-width:660px)]:w-full">
        <div
          onClick={() => {
            setActiveTabOption('Default')
            setSubQuery('today')
          }}
          className={`px-9 py-1.5 hover:bg-[rgba(255,255,255,0.08)] hover:shadow-lg hover:scale-[1.01] [@media(max-width:660px)]:w-[50%] cursor-pointer [@media(max-width:660px)]:flex [@media(max-width:660px)]:justify-center rounded-lg font-bold transition-all duration-200 text-[14px] border-none flex items-center gap-2 ${
            activeTabOption === 'Active'
              ? 'bg-transparent text-white shadow-lg'
              : 'bg-[rgba(255,255,255,0.13)] text-gray-300  border border-[rgba(255,255,255,0.1)]'
          }`}
        >
          Today
        </div>
        <div
          onClick={() => {
            setActiveTabOption('Active')
            setSubQuery('yesterday')
          }}
          className={`px-9 py-1.5 [@media(max-width:660px)]:w-[50%] hover:bg-[rgba(255,255,255,0.08)] hover:shadow-lg hover:scale-[1.01] cursor-pointer [@media(max-width:660px)]:flex [@media(max-width:660px)]:justify-center rounded-lg font-bold transition-all duration-200 text-[14px] border-none flex items-center gap-2 ${
            activeTabOption === 'Default'
              ? 'bg-transparent text-white shadow-lg'
              : 'bg-[rgba(255,255,255,0.13)] text-gray-300  border border-[rgba(255,255,255,0.1)]'
          }`}
        >
          Yesterday
        </div>
      </div>

      {/* Barrier Table */}
      <div className="overflow-x-auto rounded-lg mb-4">
        <table className="w-full text-white border-[0.5px] border-[#FFFFFF1A]">
          <thead>
            <tr className="bg-[#1119238A]">
              <th className="py-3 px-4 [@media(max-width:500px)]:px-0 font-bold text-[12px] text-[#FFFFFFCC]">
                Game Type
              </th>
              <th className="py-3 px-4 [@media(max-width:500px)]:px-0 font-bold text-[12px] text-[#FFFFFFCC]">
                Total Barrier
              </th>
              <th className="py-3 px-4 [@media(max-width:500px)]:px-0 font-bold text-[12px] text-[#FFFFFFCC]">
                Direct Barrier
              </th>
              <th className="py-3 px-4 [@media(max-width:500px)]:px-0 font-bold text-[12px] text-[#FFFFFFCC]">
                Agent Barrier
              </th>
            </tr>
          </thead>
          <tbody>
            {BarrierData.map((row, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-[10px] font-bold flex justify-center items-center text-[#A7B5CA]">
                  {row.gameType}
                </td>
                <td className="py-3 px-4 text-[12px] font-bold flex justify-center items-center text-white">
                  {row.total}
                </td>
                <td className="py-3 px-4 text-[12px] font-bold  text-white">
                  <div className="flex items-center justify-center gap-2">
                    {row.direct}
                    <img
                      src="/icons/file-report.svg"
                      alt="report"
                      className="w-4 h-4 opacity-60"
                    />
                  </div>
                </td>
                <td className="py-3 px-4 text-[12px] font-bold text-white">
                  <div className="flex items-center justify-center gap-2">
                    {row.agent}
                    <img
                      src="/icons/file-report.svg"
                      alt="report"
                      className="w-4 h-4 opacity-60"
                    />
                  </div>
                </td>
              </tr>
            ))}
            {/* Total Row */}
            <tr>
              <td className="py-3 px-4 font-bold text-[12px] flex justify-center items-center text-[#A7B5CA]">
                Total
              </td>
              <td className="py-3 px-4 font-bold text-[12px] flex justify-center items-center text-[#60A5FA]">
                0
              </td>
              <td className="py-3 px-4 font-bold text-[12px] flex justify-center items-center text-[#60A5FA]">
                0
              </td>
              <td className="py-3 px-4 font-bold text-[12px] flex justify-center items-center text-[#60A5FA]">
                0
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Barrier
