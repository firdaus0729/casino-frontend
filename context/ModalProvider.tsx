'use client'

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import dynamic from 'next/dynamic'
import GamingProviderModal from '@/components/modals/GameProvider'
import ChooseModal from '@/components/modals/ChooseModal'
import GameSearchModal from '@/components/modals/GameSearch'
import LocalGameSearchModal from '@/components/modals/LocalGameSearch'
import RuleModal from '@/components/modals/RuleModal'
import ChangeGameModal from '@/components/modals/ChangeGameModal'
import CustomizeChipModal from '@/components/modals/CustomizeChipModal'
import { AUTH_CHANGED_EVENT, getIsLoggedIn } from '@/lib/auth'
import { SuccessForm } from '@/components/auth/SuccessForm'

type SortOption = 'view-all' | 'new' | 'popular' | 'a-z' | 'z-a'

interface ModalContextType {
  // Game Provider Modal
  isGameProviderModalOpen: boolean
  openGameProviderModal: () => void
  closeGameProviderModal: () => void

  // Choose Modal
  isChooseModalOpen: boolean
  selectedOption: SortOption
  openChooseModal: () => void
  closeChooseModal: () => void
  setSelectedOption: (option: SortOption) => void

  // Game Search Modal
  isGameSearchModalOpen: boolean
  openGameSearchModal: () => void
  closeGameSearchModal: () => void

  // Local Game Search Modal
  isLocalGameSearchModalOpen: boolean
  localSearchCategory: string
  localSearchCategoryLabel: string
  openLocalGameSearchModal: (category: string, categoryLabel: string) => void
  closeLocalGameSearchModal: () => void

  // Rule Modal
  isRuleModalOpen: boolean
  openRuleModal: () => void
  closeRuleModal: () => void

  // Change Game Modal
  isChangeGameModalOpen: boolean
  openChangeGameModal: () => void
  closeChangeGameModal: () => void

  // Customize Chip Modal
  isCustomizeChipModalOpen: boolean
  openCustomizeChipModal: () => void
  closeCustomizeChipModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

interface ModalProviderProps {
  children: ReactNode
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isGameProviderModalOpen, setIsGameProviderModalOpen] = useState(false)
  const [isChooseModalOpen, setIsChooseModalOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<SortOption>('view-all')
  const [isGameSearchModalOpen, setIsGameSearchModalOpen] = useState(false)
  const [isLocalGameSearchModalOpen, setIsLocalGameSearchModalOpen] =
    useState(false)
  const [localSearchCategory, setLocalSearchCategory] = useState('')
  const [localSearchCategoryLabel, setLocalSearchCategoryLabel] = useState('')
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false)
  const [isChangeGameModalOpen, setIsChangeGameModalOpen] = useState(false)
  const [isCustomizeChipModalOpen, setIsCustomizeChipModalOpen] =
    useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const openGameProviderModal = () => setIsGameProviderModalOpen(true)
  const closeGameProviderModal = () => setIsGameProviderModalOpen(false)

  const openChooseModal = () => setIsChooseModalOpen(true)
  const closeChooseModal = () => setIsChooseModalOpen(false)

  const openGameSearchModal = () => setIsGameSearchModalOpen(true)
  const closeGameSearchModal = () => setIsGameSearchModalOpen(false)

  const openLocalGameSearchModal = (
    category: string,
    categoryLabel: string
  ) => {
    setLocalSearchCategory(category)
    setLocalSearchCategoryLabel(categoryLabel)
    setIsLocalGameSearchModalOpen(true)
  }
  const closeLocalGameSearchModal = () => setIsLocalGameSearchModalOpen(false)

  const openRuleModal = () => setIsRuleModalOpen(true)
  const closeRuleModal = () => setIsRuleModalOpen(false)

  const openChangeGameModal = () => setIsChangeGameModalOpen(true)
  const closeChangeGameModal = () => setIsChangeGameModalOpen(false)

  const openCustomizeChipModal = () => setIsCustomizeChipModalOpen(true)
  const closeCustomizeChipModal = () => setIsCustomizeChipModalOpen(false)

  // Open Success modal when auth state changes to logged-in
  useEffect(() => {
    if (typeof window === 'undefined') return
    const handler = () => {
      if (getIsLoggedIn()) {
        setIsSuccessOpen(true)
      }
    }
    window.addEventListener(AUTH_CHANGED_EVENT, handler)
    return () => {
      window.removeEventListener(AUTH_CHANGED_EVENT, handler)
    }
  }, [])

  const value: ModalContextType = {
    isGameProviderModalOpen,
    openGameProviderModal,
    closeGameProviderModal,
    isChooseModalOpen,
    selectedOption,
    openChooseModal,
    closeChooseModal,
    setSelectedOption,
    isGameSearchModalOpen,
    openGameSearchModal,
    closeGameSearchModal,
    isLocalGameSearchModalOpen,
    localSearchCategory,
    localSearchCategoryLabel,
    openLocalGameSearchModal,
    closeLocalGameSearchModal,
    isRuleModalOpen,
    openRuleModal,
    closeRuleModal,
    isChangeGameModalOpen,
    openChangeGameModal,
    closeChangeGameModal,
    isCustomizeChipModalOpen,
    openCustomizeChipModal,
    closeCustomizeChipModal,
  }

  return (
    <ModalContext.Provider value={value}>
      {children}

      {/* Modals rendered at root level */}
      <SuccessForm isOpen={isSuccessOpen} />
      <GamingProviderModal
        isOpen={isGameProviderModalOpen}
        onClose={closeGameProviderModal}
      />
      <ChooseModal
        isOpen={isChooseModalOpen}
        onClose={closeChooseModal}
        selectedOption={selectedOption}
        onOptionChange={setSelectedOption}
      />
      <GameSearchModal
        isOpen={isGameSearchModalOpen}
        onClose={closeGameSearchModal}
      />
      <LocalGameSearchModal
        isOpen={isLocalGameSearchModalOpen}
        onClose={closeLocalGameSearchModal}
        category={localSearchCategory}
        categoryLabel={localSearchCategoryLabel}
      />
      <RuleModal isOpen={isRuleModalOpen} onClose={closeRuleModal} />
      <ChangeGameModal
        isOpen={isChangeGameModalOpen}
        onClose={closeChangeGameModal}
      />
      <CustomizeChipModal
        isOpen={isCustomizeChipModalOpen}
        onClose={closeCustomizeChipModal}
      />
    </ModalContext.Provider>
  )
}
