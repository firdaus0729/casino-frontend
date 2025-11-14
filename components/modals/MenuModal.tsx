import { useModal } from '../../context/ModalProvider'
import { useI18n } from '../../context/I18nProvider'
import ModalContainer from './ModalContainer'

interface MenuModalProps {
  isOpen: boolean
  onClose: () => void
}

// Custom SVG icons matching the Figma design exactly
const HeartIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.6724 5.32336C14.5884 3.58542 17.41 3.57914 19.3208 5.31653L19.5034 5.49036C21.4641 7.46107 21.4615 10.5283 19.5034 12.4865L12.022 19.9679C12.0099 19.9794 12.0012 19.9832 12.0005 19.9835L11.9937 19.9825L4.49756 12.4865C2.53989 10.5288 2.53625 7.4621 4.49561 5.49133C6.41752 3.57786 9.36087 3.53163 11.3267 5.32239L11.9985 5.93469L12.6724 5.32336Z"
      stroke="currentColor"
      className="text-crimson"
      strokeWidth="2"
    />
  </svg>
)

const GamepadIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.59965 3.56046C4.52167 3.76007 3.66181 4.19323 2.90374 4.9186C2.03278 5.75203 1.5792 6.62631 1.3267 7.95834C0.806624 10.7018 0.468612 13.6997 0.407304 16.1121C0.382472 17.0887 0.389294 17.2993 0.455514 17.5969C0.687465 18.6396 1.49284 19.5933 2.59793 20.1342C3.13369 20.3963 3.52569 20.5 3.98145 20.5C5.02832 20.5 5.95331 19.8962 7.53503 18.1805C8.85556 16.7481 9.23055 16.3994 9.72411 16.1448L9.96579 16.0202H11.9906H14.0154L14.313 16.1666C14.7519 16.3827 15.1808 16.7743 16.242 17.9275C17.6244 19.4298 18.2939 19.99 19.1081 20.3255C19.4487 20.4658 19.5051 20.4752 20.017 20.4762C20.4752 20.4771 20.6139 20.4598 20.8812 20.3686C22.1338 19.9409 23.1217 19.0108 23.478 17.9237C23.6084 17.5261 23.6099 17.5085 23.6048 16.5204C23.5951 14.6529 23.3743 12.2229 22.991 9.76656C22.6774 7.757 22.5083 7.0616 22.1672 6.37826C21.2347 4.5105 19.3973 3.4231 17.3109 3.50424C16.5904 3.53226 16.3853 3.58274 15.5006 3.94982C14.2376 4.47384 13.8676 4.53602 12.0124 4.53602C10.1696 4.53602 9.79092 4.4733 8.5437 3.9616C7.57001 3.56214 7.42693 3.52803 6.6457 3.50938C6.17352 3.4981 5.85148 3.51384 5.59965 3.56046ZM6.62019 6.91797C6.31929 6.99898 6.12727 7.15538 6.00415 7.41981C5.90496 7.63284 5.89614 7.71002 5.89573 8.36803L5.89527 9.08435H5.15198C4.46168 9.08435 4.39446 9.0919 4.20826 9.19019C4.09801 9.24836 3.94643 9.38316 3.87138 9.48972C3.75018 9.66178 3.73494 9.72022 3.73494 10.0126C3.73494 10.2948 3.75259 10.3684 3.85901 10.5292C3.92723 10.6323 4.08014 10.7735 4.19875 10.843C4.40619 10.9646 4.44294 10.9702 5.15489 10.9874L5.89527 11.0052V11.6753C5.89527 12.3842 5.92857 12.56 6.10885 12.8028C6.43536 13.2426 7.17669 13.2675 7.5645 12.8517C7.76739 12.6342 7.80546 12.4532 7.80546 11.7056V11.0039L8.54452 10.9862C9.34012 10.9672 9.51121 10.922 9.74758 10.6686C10.1262 10.2627 10.0464 9.56995 9.58335 9.24354C9.39046 9.10755 9.38737 9.107 8.60901 9.08435L7.8282 9.06161L7.80546 8.2808L7.78272 7.49999L7.64428 7.30297C7.40514 6.96268 7.00823 6.81351 6.62019 6.91797ZM18.6813 6.90551C18.0208 7.03299 17.5773 7.55748 17.5732 8.2159C17.5698 8.74229 17.8443 9.18296 18.3342 9.43797C18.6686 9.61202 19.1443 9.61079 19.5023 9.43501C20.5037 8.94323 20.5192 7.51654 19.5282 7.04455C19.2031 6.88964 18.9656 6.85066 18.6813 6.90551ZM16.3892 10.4983C15.9844 10.5936 15.6225 10.8845 15.4405 11.2609C15.2886 11.5751 15.2955 12.0739 15.4561 12.3817C15.7091 12.8666 16.1528 13.146 16.6787 13.1516C17.3036 13.1584 17.8694 12.7039 17.9966 12.0929C18.1413 11.3983 17.7332 10.7277 17.0407 10.522C16.7706 10.4418 16.6479 10.4373 16.3892 10.4983Z"
      fill="currentColor"
      className="text-blue-bayoux"
    />
  </svg>
)

const MessageDotsIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.0049 2.5H4.00488C2.90488 2.5 2.00488 3.4 2.00488 4.5V16.5C2.00488 17.6 2.90488 18.5 4.00488 18.5H7.00488V20.5C7.00488 20.86 7.19488 21.19 7.51488 21.37C7.66488 21.46 7.83488 21.5 8.00488 21.5C8.17488 21.5 8.36488 21.45 8.51488 21.36L13.2749 18.5H19.9949C21.0949 18.5 21.9949 17.6 21.9949 16.5V4.5C21.9949 3.4 21.0949 2.5 19.9949 2.5H20.0049ZM9.00488 12.5C7.90488 12.5 7.00488 11.6 7.00488 10.5C7.00488 9.4 7.90488 8.5 9.00488 8.5C10.1049 8.5 11.0049 9.4 11.0049 10.5C11.0049 11.6 10.1049 12.5 9.00488 12.5ZM15.0049 12.5C13.9049 12.5 13.0049 11.6 13.0049 10.5C13.0049 9.4 13.9049 8.5 15.0049 8.5C16.1049 8.5 17.0049 9.4 17.0049 10.5C17.0049 11.6 16.1049 12.5 15.0049 12.5Z"
      fill="currentColor"
      className="text-blue-bayoux"
    />
  </svg>
)

const HeadphoneMicIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.49 2 2 6.49 2 12V17C2 17.55 2.45 18 3 18H6C6.55 18 7 17.55 7 17V12C7 11.45 6.55 11 6 11H4.07C4.56 7.06 7.93 4 12 4C16.07 4 19.44 7.06 19.93 11H18C17.45 11 17 11.45 17 12V17C17 17.55 17.45 18 18 18H20V19C20 19.55 19.55 20 19 20H15C15 19.45 14.55 19 14 19H10C9.45 19 9 19.45 9 20V21C9 21.55 9.45 22 10 22H19C20.65 22 22 20.65 22 19V12C22 6.49 17.51 2 12 2Z"
      fill="currentColor"
      className="text-blue-bayoux"
    />
  </svg>
)

const MedalStarIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.58 19C8.01 19 7.47 18.83 7 18.54V21C7 21.35 7.18 21.67 7.47 21.85C7.76 22.03 8.13 22.05 8.44 21.89L11.99 20.11L15.54 21.89C15.68 21.96 15.83 22 15.99 22C16.17 22 16.36 21.95 16.52 21.85C16.81 21.67 16.99 21.35 16.99 21V18.54C16.52 18.83 15.98 19 15.41 19H8.57H8.58Z"
      fill="currentColor"
      className="text-blue-bayoux"
    />
    <path
      d="M6.83996 16.99C7.18996 17.61 7.85996 18 8.57996 18H15.42C16.13 18 16.8 17.61 17.16 16.99L20.59 10.99C20.94 10.38 20.94 9.62 20.59 9.01L17.16 3.01C16.8 2.39 16.14 2 15.42 2H8.57996C7.85996 2 7.19996 2.39 6.83996 3.01L3.40996 9.01C3.05996 9.62 3.05996 10.38 3.40996 10.99L6.83996 16.99ZM10.91 8.63L11.99 6.44L13.07 8.63L15.49 8.98L13.74 10.69L14.15 13.1L11.99 11.96L9.82996 13.1L10.24 10.69L8.48996 8.98L10.91 8.63Z"
      fill="currentColor"
      className="text-blue-bayoux"
    />
  </svg>
)

const InfoCircleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.9907 22.0194C17.5007 22.0194 21.9907 17.5294 21.9907 12.0194C21.9907 6.50944 17.5007 2.01944 11.9907 2.01944C6.48072 2.01944 1.99072 6.50944 1.99072 12.0194C1.99072 17.5294 6.48072 22.0194 11.9907 22.0194ZM10.9907 7.01944H12.9907V9.01944H10.9907V7.01944ZM10.9907 11.0194H12.9907V17.0194H10.9907V11.0194Z"
      fill="currentColor"
      className="text-blue-bayoux"
    />
  </svg>
)

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const { openRuleModal } = useModal()
  const { t } = useI18n()

  const menuItems = [
    {
      id: 'favorite',
      label: t('games.favorites'),
      icon: HeartIcon,
      onClick: () => console.log('Favorite clicked'),
    },
    {
      id: 'lobby',
      label: t('navigation.lobby'),
      icon: GamepadIcon,
      onClick: () => console.log('lobby clicked'),
    },
    {
      id: 'chat',
      label: t('navigation.chat'),
      icon: MessageDotsIcon,
      onClick: () => console.log('Chat clicked'),
    },
    {
      id: 'online-service',
      label: t('help.onlineService'),
      icon: HeadphoneMicIcon,
      onClick: () => console.log('Online service clicked'),
    },
    {
      id: 'betting-record',
      label: t('navigation.bettingRecord'),
      icon: MedalStarIcon,
      onClick: () => console.log('Betting record clicked'),
    },
    {
      id: 'rule',
      label: t('navigation.rules'),
      icon: InfoCircleIcon,
      onClick: () => {
        openRuleModal()
        onClose() // Close the menu modal when opening rule modal
      },
    },
  ]

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title={t('navigation.menu')}
      size="md"
      position="responsive"
      width="90vw"
      className="max-w-[740px]"
      contentClassName="px-6 py-6 "
      showHeader={true}
      showCloseButton={true}
    >
      {menuItems.map(item => {
        const IconComponent = item.icon
        return (
          <div
            key={item.id}
            onClick={item.onClick}
            className="flex items-center w-full px-4 py-3 rounded-xl bg-white-4 hover:bg-white-8 transition-colors group"
          >
            <div className="flex items-center justify-center w-6 h-6 mr-4">
              <IconComponent />
            </div>
            <span className="text-sm font-bold text-white font-montserrat">
              {item.label}
            </span>
          </div>
        )
      })}
    </ModalContainer>
  )
}
