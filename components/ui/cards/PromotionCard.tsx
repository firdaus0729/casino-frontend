import RewardCard from './RewardCard'
import FlatButton from '../Button/FlatButton'
import ArrowUpRightStrokeIcon from '../icons/arrow-up-right-stroke'
import TabButton from '../Button/TabButton'
import Link from 'next/link'
import { useT } from '@/context/I18nProvider'

export default function CasinoPromotionCard({
  button,
  image,
  link,
}: {
  button: string
  image: string
  link: string
}) {
  const t = useT()

  return (
    <div className="">
      {/* Card Container */}
      <div className="flex flex-col w-[21.166875rem] bg-mirage-1-2 rounded-xl overflow-hidden shadow-lg">
        {/* Hero Section with Background Image */}
        <div className="group relative overflow-hidden rounded-t-[0.875rem] h-[11.75rem] w-full px-6 py-8 text-white shadow-md transition-all duration-300 ">
          {/* Background image layer with hover zoom */}
          <div
            className="absolute inset-0 bg-no-repeat transition-transform duration-500 "
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
            }}
          />

          {/* subtle dark overlay for readability */}
          {/* <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/30" /> */}

          {/* sheen sweep on hover */}
          {/* <div className="pointer-events-none absolute inset-y-0 left-[-40%] w-[40%] skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:left-[140%]" /> */}

          <div className="relative z-10 h-full flex flex-col justify-between">
            <h1
              className="text-3xl font-extrabold leading-tight drop-shadow-md"
              style={{ fontWeight: '900 !important' }}
            ></h1>
            <div>
              <Link href={'/promotions/' + link}>
                <FlatButton className="w-[7.84875rem] text-[0.8575rem] h-[2.108125rem] font-bold rounded-[0.571875rem] uppercase bg-[linear-gradient(#0C60FF,#2C9FFA)]">
                  {button}
                </FlatButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Content Section */}
        <div className="p-4 bg-mirage-2 rounded-b-xl">
          <div className="space-y-2">
            {/* Top Row - Date and Casino Badge */}
            <div className="flex items-center justify-between">
              <span className="text-casper font-montserrat text-[0.875rem] font-normal">
                Finishes on July 23, 2025
              </span>

              {/* Casino Badge */}
              <TabButton
                type="one"
                title="Casino"
                className="h-[1.25rem] w-[3.6875rem] text-[0.75rem]"
              />
            </div>

            {/* Title Row */}
            <div className="flex items-center justify-between">
              <h3 className="text-white font-montserrat text-[1rem] font-bold flex-1">
                Celebrating 13 Years of Endorphins
              </h3>
            </div>
          </div>

          {/* Read More Link */}
          <div className="mt-3 text-right">
            <Link
              href={'/promotions/' + link}
              className="inline-flex items-center gap-2 text-dodger-blue font-montserrat text-[0.875rem] font-bold hover:text-dodger-blue/80 transition-colors group"
            >
              {t('promotions.readmore')}
              <ArrowUpRightStrokeIcon className="w-6 h-6 text-casper group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
