import { memo } from 'react'
import { PageWrapperProps } from './types'
import { Button } from '@/components/ui'

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
      <>
        <header className="flex justify-between items-center mobile:flex-col mobile:items-start gap-2">
          <div>
            {title && <h1 className="text-lg font-medium md:text-2xl">{title}</h1>}
            {description && <p className="text-sm text-gray-600">{description}</p>}
          </div>
          {actionText && (
            <Button variant={actionButtonVariant} className={actionClassName} onClick={onActionClick}>
              {actionIcon}
              {actionText}
            </Button>
          )}
        </header>
        {children}
      </>
    )
  }
)
