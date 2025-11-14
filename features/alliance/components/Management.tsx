import React from 'react'
import FAQ from './FAQ'

const Management: React.FC = () => {
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
      <div className="relative w-full mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <img
            src="/icons/search.svg"
            alt="search"
            className="w-5 h-5 text-[#55657E] "
          />
        </div>
        <input
          type="text"
          placeholder="Manufacturer search"
          className="w-full border border-[#55657E] rounded-lg pl-10 pr-3 py-3 outline-none text-white bg-transparent placeholder-[#55657E]"
        />
      </div>
      <div className="overflow-x-auto rounded-[12px] mb-4">
        <table className="w-full text-white">
          <thead>
            <tr className="bg-[#1119238A]">
              <th className="py-3 px-4 [@media(max-width:500px)]:px-0 font-bold text-[12px] text-[#55657E]">
                Ranking
              </th>
              <th className="py-3 px-4 [@media(max-width:500px)]:px-0 font-bold text-[12px] text-[#55657E]">
                ID
              </th>
              <th className="py-3 px-4 [@media(max-width:500px)]:px-0 font-bold text-[12px] text-[#55657E]">
                Performance USDT
              </th>
              <th className="py-3 px-4 [@media(max-width:500px)]:px-0 font-bold text-[12px] text-[#55657E]">
                Performance TRX
              </th>
            </tr>
          </thead>
        </table>
        <img
          src="/images/login-into-banner.png"
          alt="arrow-down"
          className="w-[150px] h-[150px] grayscale mx-auto mt-4 z--1 relative"
        />
      </div>
      {/* FAQs Section */}
      <FAQ faqs={faqs} />
    </div>
  )
}

export default Management
