import { cn } from '@/lib/utils'
import { ButtonProps } from './types'
import { buttonVariants } from './variants'
import { LoadingIcon } from '@/assets'
import { memo } from 'react'

export const Button = memo(({ variant, isLoading, isDisabled, className, children, ...props }: ButtonProps) => {
  const disabled = isLoading || isDisabled

  return (
    <button className={cn(buttonVariants({ variant }), className)} disabled={disabled} {...props}>
      {isLoading ? <LoadingIcon /> : children}
    </button>
  )
})
