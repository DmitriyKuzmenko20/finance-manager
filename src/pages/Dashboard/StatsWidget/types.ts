import { JSX } from 'react'

export type StatsWidgetProps = {
  stats: StatsItem[]
}

type StatsItem = {
  value: number
  label: string
  icon: JSX.Element
  cardClassName?: string
}
