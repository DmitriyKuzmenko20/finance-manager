import { memo } from 'react'
import { motion } from 'framer-motion'
import { PageWrapperProps } from './types'
import { Button } from '@/components/ui'

const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.1,
      ease: 'easeOut' as const,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.1,
      ease: 'easeIn' as const,
    },
  },
}

export const PageWrapper = memo(
  ({
    title,
    description,
    children,
    actionText,
    actionButtonVariant,
    actionIcon,
    actionClassName,
    onActionClick,
  }: PageWrapperProps) => {
    return (
      <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants}>
        <header className="flex justify-between items-center mobile:flex-col mobile:items-start gap-2">
          <div>
            {title && <h1 className="text-lg font-medium md:text-2xl">{title}</h1>}
            {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
          </div>
          {actionText && (
            <Button variant={actionButtonVariant} className={actionClassName} onClick={onActionClick}>
              {actionIcon}
              {actionText}
            </Button>
          )}
        </header>
        {children}
      </motion.div>
    )
  }
)
