import React, { useEffect, useState } from 'react'
import FAQ from './FAQ'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface CommissionData {
  agentLevel: string
  performance: string
  rebate: string
}

interface AffiliateData {
  id: string
  teamPerformance: string
  ratePerTenK: string
  rewardEarned: string
  validBet: string
  directPerformance?: string
  directCommission?: string
  subordinateCommission?: string
  totalRewards?: string
}

const Introduction: React.FC = () => {
  const [selectedGameType, setSelectedGameType] = useState('Hash Games')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const sub = searchParams.get('sub')
    if (sub === 'hash-games') setSelectedGameType('Hash Games')
    if (sub === 'slots') setSelectedGameType('Slots')
  }, [searchParams])

  const handleGameTypeClick = (gameType: string) => {
    setSelectedGameType(gameType)
    const params = new URLSearchParams(searchParams.toString())
    const value = gameType === 'Hash Games' ? 'hash-games' : 'slots'
    params.set('sub', value)
    router.replace(`${pathname}?${params.toString()}`)
  }

  const commissionData: CommissionData[] = [
    {
      agentLevel: '1class',
      performance: 'valid bet > 50',
      rebate: '10k/30',
    },
    {
      agentLevel: '2class',
      performance: 'valid bet > 2.5M',
      rebate: '10k/31',
    },
    {
      agentLevel: '3class',
      performance: 'valid bet > 7.5M',
      rebate: '10k/32',
    },
    {
      agentLevel: '4class',
      performance: 'valid bet > 15M',
      rebate: '10k/33',
    },
    {
      agentLevel: '5class',
      performance: 'valid bet > 25M',
      rebate: '10k/34',
    },
    {
      agentLevel: '6class',
      performance: 'valid bet > 75M',
      rebate: '10k/35',
    },
    {
      agentLevel: '7class',
      performance: 'valid bet > 150M',
      rebate: '10k/37',
    },
    {
      agentLevel: '8class',
      performance: 'valid bet > 250M',
      rebate: '10k/39',
    },
    {
      agentLevel: '9class',
      performance: 'valid bet > 750M',
      rebate: '10k/42',
    },
    {
      agentLevel: '10class',
      performance: 'valid bet > 1250M',
      rebate: '10k/45',
    },
  ]

  const affiliateAData: AffiliateData = {
    id: 'A',
    teamPerformance: '4.12M',
    ratePerTenK: '35',
    rewardEarned: '14420',
    validBet: '2640',
    directPerformance: '720K',
    directCommission: '2520',
    subordinateCommission: '2520',
    totalRewards: '2640',
  }

  const affiliateBData: AffiliateData[] = [
    {
      id: 'B1',
      teamPerformance: '400K',
      ratePerTenK: '32',
      rewardEarned: '1280',
      validBet: '200K',
    },
    {
      id: 'B2',
      teamPerformance: '0',
      ratePerTenK: '0',
      rewardEarned: '0',
      validBet: '500K',
    },
    {
      id: 'B3',
      teamPerformance: '3M',
      ratePerTenK: '35',
      rewardEarned: '10500',
      validBet: '20K',
    },
  ]

  const affiliateCData: AffiliateData[] = [
    {
      id: 'C1',
      teamPerformance: '0',
      ratePerTenK: '0',
      rewardEarned: '0',
      validBet: '200K',
    },
    {
      id: 'C2',
      teamPerformance: '0',
      ratePerTenK: '0',
      rewardEarned: '0',
      validBet: '200K',
    },
    {
      id: 'C3',
      teamPerformance: '0',
      ratePerTenK: '0',
      rewardEarned: '0',
      validBet: '3M',
    },
  ]
  // /icons/Home.svg", active: true },
  //   { id: "hash", label: "Hash Games", icon: "/icons/Hash.svg", active: false },
  //   { id: "slots", label: "Slots", icon: "/icons/Slots.svg", active: false },
  //   { id: "casino", label: "Casino", icon: "/icons/Casino1.svg", active: false },
  //   { id: "sport", label: "Sport", icon: "/icons/Sport.svg", active: false },
  const gameTypes = [
    { name: 'Hash Games', icon: '/icons/Home.svg', active: true },
    { name: 'Slots', icon: '/icons/Hash.svg', active: false },
  ]
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

  return (
    <div className=" [@media(max-width:660px)]:w-full">
      <div className="w-full">
        {/* Commission Rules */}
        <div className="bg-[#ffffff0a] rounded-xl p-3 sm:p-4">
          <h2 className="text-sm font-bold text-[#ededed] mb-2">
            Commission Rules
          </h2>
          <p className="text-sm font-normal text-casper">
            Commission rates vary depending on the game and the valid bet amount
          </p>
        </div>
        {/* Game Type Tabs */}
        <div className="flex flex-wrap gap-1 my-4">
          {gameTypes.map((game, index) => (
            <div
              key={index}
              onClick={() => handleGameTypeClick(game.name)}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-bold transition-colors duration-200 hover:bg-white/10 hover:shadow-md cursor-pointer ${
                selectedGameType === game.name
                  ? 'bg-[#2283f6] text-white'
                  : 'bg-transparent text-casper hover:bg-[#ffffff0a]'
              }`}
            >
              <img src={game.icon} alt={game.name} width={26} height={26} />
              <span>{game.name}</span>
            </div>
          ))}
        </div>
        {/* Commission Table */}
        <div className="bg-[#ffffff0a] rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#11192389] border-b border-[#2a3546] p-4">
            <div className="flex grid-cols-3 gap-4 justify-center items-center">
              <div className="text-xs font-bold text-[#55657e]">
                Agent level
              </div>
              <div className="text-xs font-bold text-[#55657e]">
                Performance
              </div>
              <div className="text-xs font-bold text-[#55657e]">Rebate</div>
            </div>
          </div>
          {/* Table Body */}
          <div className="divide-y divide-[#2a3546]">
            {commissionData.map((row, index) => (
              <div
                key={index}
                className={`p-3 ${
                  index % 2 === 0 ? 'bg-[#ffffff14]' : 'bg-[#ffffff0a]'
                }`}
              >
                <div className="flex grid-cols-3 gap-4  justify-center items-center">
                  <div className="text-xs font-bold text-casper">
                    {row.agentLevel}
                  </div>
                  <div className="text-xs font-bold text-white">
                    {row.performance}
                  </div>
                  <div className="text-xs font-bold text-[#2283f6]">
                    {row.rebate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Affiliate Introduction */}
        <div className=" rounded-xl">
          <h2 className="text-xl font-bold text-white my-6 pl-4">
            Affiliate Introduction
          </h2>

          {/* Main Affiliate A - Responsive card matching design */}
          <div className="mb-6">
            <div className="relative bg-[#1a2332]  rounded-xl p-4 sm:p-6 w-full border border-[#ffffff1a]">
              {/* A badge */}
              <div className="absolute top-0 left-0 h-5 px-2 rounded-[12px_0_12px_0] text-[11px] border-t border-[#ffffff38] font-bold bg-chip-orange text-white flex items-center shadow">
                A
              </div>

              {/* Avatar / Title */}

              <div className="flex items-start gap-3 mb-4">
                {/* Details grid */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10  flex items-center justify-center">
                    <img src="/images/img_frame.png" alt="Avatar" />
                  </div>
                  {/* No title next to avatar in the design */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-xs">
                  <div className="flex gap-1 items-end">
                    <span className="text-casper">Team performance:</span>
                    <span className="text-chip-orange font-bold">
                      {affiliateAData.teamPerformance}
                    </span>
                  </div>
                  <div className="flex gap-1 items-end">
                    <span className="text-casper">Direct performance:</span>
                    <span className="text-chip-orange font-bold">
                      {affiliateAData.directPerformance}
                    </span>
                  </div>

                  <div className="flex gap-1 items-end">
                    <span className="text-casper">Rate per 10K:</span>
                    <span className="text-chip-orange font-bold">
                      {affiliateAData.ratePerTenK}
                    </span>
                  </div>
                  <div className="flex gap-1 items-end">
                    <span className="text-casper">Direct commission:</span>
                    <span className="text-chip-orange font-bold">
                      {affiliateAData.directCommission}
                    </span>
                  </div>

                  <div className="flex gap-1 items-end">
                    <span className="text-casper">Team commission:</span>
                    <span className="text-chip-orange font-bold">
                      {affiliateAData.rewardEarned}
                    </span>
                  </div>
                  <div className="flex gap-1 items-end">
                    <span className="text-casper">Subordinate commission:</span>
                    <span className="text-chip-orange font-bold">
                      {affiliateAData.subordinateCommission}
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider and total */}
              <div className="mt-4 border-t border-[#ffffff1a] pt-3 flex justify-between">
                <span className="text-white font-bold">Total Rewards:</span>
                <span className="text-chip-orange font-bold">
                  {affiliateAData.totalRewards}
                </span>
              </div>
            </div>
          </div>

          {/* Connecting Arrow from A to B level - Mobile */}
          <div className="flex justify-center items-end mb-4">
            <img src="/images/arrow(3).svg" className="w-[30%]" alt="arrow" />
            <img src="/images/arrow(1).svg" className="w-[16px]" alt="arrow" />
            <img src="/images/arrow(2).svg" className="w-[30%]" alt="arrow" />
          </div>

          {/* B Level Affiliates - Mobile Row Layout */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {affiliateBData.map((affiliate, index) => (
              <div
                key={index}
                className="bg-[#1a2332] relative  rounded-[12px] p-2 border border-[#ffffff1a]"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-8 h-8  flex items-center justify-center">
                    <img src="/images/img_frame.png" alt="Avatar" />
                  </div>
                  <div className="text-white absolute top-0 left-0 bg-[#1BB83D] border-t border-[#ffffff38] rounded-[12px_0_12px_0] w-[30px]  h-[19px] flex items-center justify-center font-bold text-[10px]">
                    {affiliate.id}
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex gap-1 flex-wrap items-end">
                    <p className="text-gray-400">Team performance:</p>
                    <p className="text-chip-orange font-bold">
                      {affiliate.teamPerformance}
                    </p>
                  </div>
                  <div className="flex gap-1 items-end">
                    <p className="text-gray-400">Rate per 10K:</p>
                    <p className="text-chip-orange font-bold">
                      {affiliate.ratePerTenK}
                    </p>
                  </div>
                  <div className="flex gap-1 items-end">
                    <p className="text-gray-400">Reward Earned:</p>
                    <p className="text-chip-orange font-bold">
                      {affiliate.rewardEarned}
                    </p>
                  </div>
                  <div className="border-t border-[#ffffff1a] pt-2 flex gap-1 items-end">
                    <p className="text-gray-400">Valid Bet:</p>
                    <p className="text-chip-orange font-bold">
                      {affiliate.validBet}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/*  Arrow from B to C level - Mobile */}
          {/* ConnectiConnectingng Arrow from A to B level - Mobile */}
          <div className="grid grid-cols-[15%_35%_31%_19%] justify-center items-end mb-4">
            <div></div>
            <div className="flex justify-start items-end">
              <img
                src="/images/arrow(1).svg"
                className="w-[16px]"
                alt="arrow"
              />
              <img
                src="/images/arrow(2).svg"
                className="w-[87%] "
                alt="arrow"
              />
            </div>
            <div></div>
            <img src="/images/arrow(1).svg" className="w-[16px]" alt="arrow" />
          </div>

          {/* C Level Affiliates - Mobile Row Layout */}
          <div className="grid grid-cols-3 gap-2 mb-8">
            {affiliateCData.map((affiliate, index) => (
              <div
                key={index}
                className="bg-[#1a2332] rounded-[12px] relative p-3 border border-[#ffffff1a]"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img src="/images/img_frame.png" alt="Avatar" />
                  </div>
                  <div className="text-white absolute top-0 left-0 bg-[#2283F6] border-t border-[#ffffff38] rounded-[12px_0_12px_0] w-[30px] h-[19px] flex items-center justify-center font-bold text-[10px]">
                    {affiliate.id}
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex flex-wrap  gap-1">
                    <p className="text-gray-400">Team performance:</p>
                    <p className="text-chip-orange font-bold">
                      {affiliate.teamPerformance}
                    </p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <p className="text-gray-400">Rate per 10K:</p>
                    <p className="text-chip-orange font-bold">
                      {affiliate.ratePerTenK}
                    </p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <p className="text-gray-400">Reward Earned:</p>
                    <p className="text-chip-orange font-bold">
                      {affiliate.rewardEarned}
                    </p>
                  </div>
                  <div className="border-t border-[#ffffff1a] flex gap-1 pt-2">
                    <p className="text-gray-400">Valid Bet:</p>
                    <p className="text-chip-orange font-bold">
                      {affiliate.validBet}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          {/* Commission Calculation */}
          <div className="bg-[#ffffff0a] rounded-xl p-4 mb-4">
            <h2 className="text-lg font-bold text-white">
              Commission Calculation
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div className="bg-[#ffffff0a] rounded-xl p-4">
              <h3 className="text-sm font-bold text-[#ededed] mb-2">
                Commission Calculation
              </h3>
              <p className="text-sm font-normal text-casper mb-2">
                Direct Subordinates' Effective Bets × Commission Ratio = Direct
                Commission
              </p>
              <p className="text-sm font-normal text-casper">
                Team Total Commission - Direct Commission - Sub-agent Commission
                = Agent Commission
              </p>
            </div>
            <div className="bg-[#ffffff0a] rounded-xl p-4">
              <h3 className="text-sm font-bold text-[#ededed] mb-2">
                Team A total performance
              </h3>
              <p className="text-sm font-normal text-casper mb-2">
                Team A Total Performance: 4.12 million (Direct Performance
                720,000 + Sub-agent Performance 3.4 million)
              </p>
              <p className="text-sm font-normal text-casper mb-2">
                Commission rate: 35 per ten thousand returns
              </p>
              <p className="text-sm font-normal text-casper">
                Total commission earned by the team：412×35=14420 USDT
              </p>
            </div>
            <div className="bg-[#ffffff0a] rounded-xl p-4">
              <h3 className="text-sm font-bold text-[#ededed] mb-2">
                Calculation of direct commission for A
              </h3>
              <p className="text-sm font-normal text-casper mb-2">
                Performance of A's direct subordinates B1, B2, B3 is:
                20+50+2=720,000.
              </p>
              <p className="text-sm font-normal text-casper">
                Received direct commission: 72×35=2520 USDT.
              </p>
            </div>
            <div className="bg-[#ffffff0a] rounded-xl p-4">
              <h3 className="text-sm font-bold text-[#ededed] mb-2">
                Commission from A's subordinate agents
              </h3>
              <p className="text-sm font-normal text-casper mb-2">
                Direct agent B1: Team performance 400,000, commission rate per
                ten thousand 32, received 40×32=1280 USDT.
              </p>
              <p className="text-sm font-normal text-casper mb-2">
                Team performance 0, no commission generated.
              </p>
              <p className="text-sm font-normal text-casper">
                Direct agent B3: Team performance 3 million, commission rate per
                ten thousand 35, received 300×35=10,500 USDT.
              </p>
            </div>
            <div className="bg-[#ffffff0a] rounded-xl p-4">
              <h3 className="text-sm font-bold text-[#ededed] mb-2">
                Commission calculation for A
              </h3>
              <p className="text-sm font-normal text-casper">
                14420-2520-1280-0-10500= 120 USDT
              </p>
            </div>
            <div className="bg-[#ffffff0a] rounded-xl p-4">
              <h3 className="text-sm font-bold text-[#ededed] mb-2">
                Total commission earned by A (Direct commission + Agent
                commission):
              </h3>
              <p className="text-sm font-normal text-casper">
                2520+120=2640 USDT
              </p>
            </div>
          </div>
        </div>
        {/* How to get commission rewards */}
        <div className="bg-[#ffffff0a] rounded-xl p-4 mb-6">
          <h2 className="text-lg font-bold text-white mb-4">
            How to get commission rewards?
          </h2>
          <div className="space-y-3">
            <p className="text-sm font-normal text-casper">
              1、Sharing friends must register through your link to become your
              valid member.
            </p>
            <p className="text-sm font-normal text-casper">
              2、Share the developed users for valid bet
            </p>
            <p className="text-sm font-normal text-casper">
              3、Performance calculation: player turnover (effective bet
              amount), regardless of winning or losing, commission is calculated
              based on this basis
            </p>
            <p className="text-sm font-normal text-casper">
              4、Commission calculation: Offline users are composed of
              commissions generated by direct member performance + agent
              difference commissions
            </p>
            <p className="text-sm font-normal text-casper">
              5、Rebates are calculated based on valid bets. In all products,
              any cancellation or principal refund and simultaneous bets on
              matched markets in the same game will not be counted as valid
              bets.
            </p>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <FAQ faqs={faqs} />
    </div>
  )
}

export default Introduction
