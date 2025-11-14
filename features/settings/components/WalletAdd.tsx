import React, { useState } from 'react'
import EditIcon from '@/components/ui/icons/edit'
import TDButton from '@/components/ui/Button/TDButton'
import FlatButton from '@/components/ui/Button/FlatButton'
import ModalContainer from '@/components/modals/ModalContainer'
import { DropdownSelect } from '@/components/ui/DropdownSelect'
import WalletIcon from '@/components/ui/icons/wallet'
import { FAQ } from '@/features/alliance/components'
import PlusIcon from '@/components/ui/icons/plus'
import { cn } from '@/lib/utils'
import ChevronsUpIcon from '@/components/ui/icons/chevrons-up'
import ChevronsDownIcon from '@/components/ui/icons/chevrons-down'
import { CopyBox } from '@/components/ui/CopyBox'
import TelegramIcon from '@/components/ui/icons/TelegramIcon'

const WalletAdd: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('usdt')
  const [selectedNetworkValue, setSelectedNetworkValue] = useState('trc')
  const [selectedTab, setSelectedTab] = useState('add')
  const [collapsedAddress, setCollapsedAddress] = useState(true)
  const toggleAddress = () => {
    setCollapsedAddress(!collapsedAddress)
  }

  const tabs = [
    {
      id: 'add',
      desc: 'Add address',
    },
    {
      id: 'activate',
      desc: 'Activation address',
    },
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

  const networkOptions = [
    {
      value: 'trc',
      label: 'TRC20',
      icon: <img src="/icons/coin-icon/TRX.svg" />,
    },
  ]

  const currencyOptions = [
    {
      value: 'usdt',
      label: 'USDT',
      icon: <img src="/icons/coin-icon/USDT.svg" />,
    },
  ]

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className=" [@media(max-width:660px)]:w-full">
      <div className="w-full  flex flex-col gap-4">
        {/* WalletAdd Header */}
        <h1 className="text-lg sm:text-xl hidden lg:block font-bold text-white ">
          Wallet Address
        </h1>
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
        <div className="p-4 flex flex-col gap-4 items-center text-casper">
          <WalletIcon className="w-[3.5rem] h-[3.5rem]" />
          <p className="text-[0.875rem]">
            You have not added a wallet address yet.
          </p>
        </div>
        <TDButton
          onClick={toggleModal}
          type="blue"
          className="w-[14.8125rem] gap-3 mx-auto h-[2.5625rem] text-gallery text-[0.875rem] font-bold"
        >
          <PlusIcon />
          Add wallet address
        </TDButton>
        <h2 className="uppercase indent-[1.25rem] text-white font-bold text-[1.125rem]">
          faqs
        </h2>
        <FAQ faqs={faqs} title={false} />
      </div>
      <ModalContainer
        isOpen={isModalOpen}
        onClose={toggleModal}
        title="Activation address"
        className="lg:w-[30%]"
      >
        <div className="flex flex-col gap-2">
          <div className="p-1 rounded-[0.75rem] bg-white-4 gap-4 grid grid-cols-2">
            {tabs.map(tab => (
              <div
                onClick={() => setSelectedTab(tab.id)}
                className={cn(
                  'h-9 font-bold text-[0.875rem] flex justify-center items-center rounded-[0.5rem]',
                  tab.id === selectedTab
                    ? 'bg-white-13 text-white'
                    : 'text-casper'
                )}
              >
                {tab.desc}
              </div>
            ))}
          </div>
          {selectedTab === 'add' ? (
            <>
              <div className="p-4 rounded-[0.75rem] bg-white-4 flex flex-col gap-4">
                <h2 className="text-[0.875rem] font-bold text-white">
                  Your address
                </h2>
                <input
                  type="text"
                  placeholder="Please enter the address to be activated"
                  className="form-input"
                />
              </div>
            </>
          ) : (
            <>
              <div className="p-4 rounded-[0.75rem] bg-white-4 flex flex-col gap-4">
                <h2 className="text-[0.875rem] font-bold text-white flex justify-between items-center ">
                  Transfer activation amount{' '}
                  <img src="/icons/coin-icon/USDT.svg" className="w-4 h-4" />
                </h2>
                <CopyBox className="bg-white-8">0.0888</CopyBox>
              </div>
              <div className="p-4 rounded-[0.75rem] bg-white-4 flex flex-col gap-4">
                <h2 className="text-[0.875rem] font-bold text-white">
                  Activate transfer address
                </h2>
                <CopyBox className="bg-white-8">
                  <span className="text-dodger-blue">TXS3</span>
                  PfAU9hemKkoBWRUfsUkGBSrZGa
                  <span className="text-dodger-blue">gh6X</span>
                </CopyBox>
              </div>
            </>
          )}
          <h2 className="text-[0.875rem] font-bold text-white">
            Activated address: <span className="text-dodger-blue">0</span>
          </h2>
          {collapsedAddress ? (
            <div className="rounded-[0.5rem] overflow-hidden">
              <div className="grid font-bold text-[12px] bg-mirage  border-b border-white-13 grid-cols-[20%_40%_40%] items-center h-[56px] text-blue-bayoux">
                <span className="flex justify-center items-center">Type</span>
                <span className="flex justify-center items-center">
                  Address
                </span>
                <span className="flex justify-center items-center">State</span>
              </div>
              <div className="grid font-bold text-[12px] bg-white-4   grid-cols-[20%_40%_40%] items-center h-[48px] text-white">
                <span className="flex justify-center items-center">
                  <img
                    src="/icons/coin-icon/USDT.svg"
                    className="w-6 h-6 mx-auto"
                  />
                </span>
                <span className="flex justify-center items-center">
                  TGFf7****ePvThd
                </span>
                <span className="flex justify-center items-center font-medium">
                  To be activated
                </span>
              </div>
            </div>
          ) : (
            <div className="h-px bg-mirage-4 w-full" />
          )}
          <div onClick={toggleAddress} className="mx-auto">
            {collapsedAddress ? (
              <ChevronsUpIcon
                className="w-[26px] h-[26px] mx-auto"
                color="#A7B5CA"
              />
            ) : (
              <ChevronsDownIcon className="w-[26px] h-[26px]" color="#A7B5CA" />
            )}
          </div>
        </div>
      </ModalContainer>
    </div>
  )
}

export default WalletAdd
