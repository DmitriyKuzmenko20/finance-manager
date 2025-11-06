import { memo } from 'react'
import clsx from 'clsx'
import { motion, Variants } from 'framer-motion'
import { StatsItemProps } from './types'
import { formatPrice } from '@/utils'

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 15,
    },
  },
}

export const StatsItem = memo(({ value, label, icon, cardClassName }: StatsItemProps) => {
  const formattedValue = formatPrice(value)

  return (
    <motion.div variants={itemVariants} className={clsx('px-4 py-6 rounded-xl', cardClassName)}>
      <div className="flex justify-center items-center size-10 rounded-lg p-2">{icon}</div>
      <label className="mt-8 text-xs leading-[18px] font-medium text-muted-foreground">{label}</label>
      <p className="text-base font-medium text-foreground md:text-2xl md:leading-6">{formattedValue}</p>
    </motion.div>
  )
})
