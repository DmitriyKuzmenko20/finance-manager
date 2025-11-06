import { memo } from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CheckboxProps } from './types'

export const Checkbox = memo(({ className, ...props }: CheckboxProps) => {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'relative peer h-5 w-5 shrink-0 rounded-sm border border-border bg-background shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-background data-[state=checked]:text-foreground data-[state=checked]:border-border',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn('absolute top-[3px] left-[3px] text-current')}>
        <Check className="h-3 w-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
