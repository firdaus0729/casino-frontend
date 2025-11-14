import React from 'react'
import FAQ from './FAQ'

const Report: React.FC = () => {
  const metrics = [
    { label: "Today's performance of direct subordinates", value: 0 },
    { label: "Today's team performance", value: 0 },
    { label: "Today's total performance", value: 0 },
    { label: "Yesterday's commission", value: 0 },
    { label: 'Today estimated commission', value: 0 },
    { label: 'Total history commission', value: 0 },
  ]

  const metricPairs = [
    [metrics[0], metrics[1]],
    [metrics[2], metrics[3]],
    [metrics[4], metrics[5]],
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
    <div className="">
      {/* Metrics Summary */}
      <div className="flex flex-col gap-6 rounded-[12px] mb-6 p-4 border border-[#ffffff14] bg-[#FFFFFF0A] md:mb-10">
        {metricPairs.map((pair, rowIdx) => (
          <div key={rowIdx} className={`grid grid-cols-2`}>
            <div className="flex flex-col pr-4">
              <span className="text-white text-sm font-bold tracking-wide text-center">
                {pair[0].value}
              </span>
              <span className="text-[#A7B5CA] text-sm text-center">
                {pair[0].label}
              </span>
            </div>
            <div className="flex flex-col pl-4 border-l border-[#ffffff1a]">
              <span className="text-white text-sm font-bold tracking-wide text-center">
                {pair[1].value}
              </span>
              <span className="text-[#A7B5CA] text-sm text-center">
                {pair[1].label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* FAQs Section */}
      <FAQ faqs={faqs} />
    </div>
  )
}

export default Report
