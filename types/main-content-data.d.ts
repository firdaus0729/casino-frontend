declare module '*/main-content-data.json' {
  interface CardItem {
    badge: string
    views?: string
    user?: string
    image: string
    link?: string
  }

  interface MainContentData {
    card1: CardItem[]
    card2: CardItem[]
    card3: CardItem[]
    card4: CardItem[]
    card5: CardItem[]
    card6: CardItem[]
    card7: CardItem[]
    card8: CardItem[]
    card9: CardItem[]
    card10: CardItem[]
    brand: string[]
    latestBets: Array<{
      game: string
      player: string
      time: string
      bet: string
      multiplier: string
      payout: string
    }>
  }

  const data: MainContentData
  export = data
}
