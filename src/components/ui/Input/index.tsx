import { memo } from 'react'
import { cn } from '@/lib/utils'
import { InputProps } from './types'

export const Input = memo(
  ({ label, type = 'text', isRequired, isDisabled, register, error, className, ...props }: InputProps) => {
    return (
      <div className="w-full">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
            {isRequired && <span className="ml-1 text-red-500">&#42;</span>}
          </label>
        )}
        <input
          {...register}
          type={type}
          disabled={isDisabled}
          className={cn(
            'h-8 w-full rounded-md border border-gray-100 px-2 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)
