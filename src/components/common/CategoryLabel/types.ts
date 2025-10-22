import { STATUS_COLORS } from './constant'

export type CategoryLabelProps = {
  text: string
  color: StatusColor
}

export type StatusColor = (typeof STATUS_COLORS)[keyof typeof STATUS_COLORS]
