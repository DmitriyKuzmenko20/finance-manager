import { memo } from 'react'
import { CategoryLabelProps } from './types'
import { STATUS_COLORS } from './constant'

const COLOR_PALETTE = {
  [STATUS_COLORS.GREEN]: 'text-green-600 bg-green-100',
  [STATUS_COLORS.RED]: 'text-red-600 bg-red-100',
  [STATUS_COLORS.ORANGE]: 'text-orange-600 bg-orange-100',
  [STATUS_COLORS.YELLOW]: 'text-yellow-600 bg-yellow-100',
  [STATUS_COLORS.BLUE]: 'text-blue-600 bg-blue-100',
  [STATUS_COLORS.INDIGO]: 'text-indigo-600 bg-indigo-100',
  [STATUS_COLORS.PURPLE]: 'text-purple-600 bg-purple-100',
  [STATUS_COLORS.PINK]: 'text-pink-600 bg-pink-100',
  [STATUS_COLORS.TEAL]: 'text-teal-600 bg-teal-100',
  [STATUS_COLORS.CYAN]: 'text-cyan-600 bg-cyan-100',
}

export const CategoryLabel = memo(({ text, color }: CategoryLabelProps) => {
  const colorStyles = COLOR_PALETTE[color]

  return (
    <div className={`w-fit px-2 py-0.5 text-center text-xs rounded-md ${colorStyles}`}>
      <span>{text}</span>
    </div>
  )
})
