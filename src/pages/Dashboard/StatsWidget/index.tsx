import { memo } from 'react'
import { motion } from 'framer-motion'
import { StatsWidgetProps } from './types'
import { StatsItem } from './StatsItem'

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export const StatsWidget = memo(({ stats }: StatsWidgetProps) => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-3 gap-4 mt-4">
      {stats.map((stat) => {
        return <StatsItem key={stat.label} {...stat} />
      })}
    </motion.div>
  )
})
