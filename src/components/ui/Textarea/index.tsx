import { ChangeEvent, memo, useState } from 'react'
import { cn } from '@/lib/utils'
import { TextareaProps } from './types'

export const Textarea = memo(
  ({ label, isRequired, isDisabled, register, maxCharacters = 150, error, className, ...props }: TextareaProps) => {
    const [characterCount, setCharacterCount] = useState(0)

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value
      const valueCount = value?.length

      if (maxCharacters && valueCount > maxCharacters) {
        e.target.value = value.slice(0, maxCharacters)
        setCharacterCount(maxCharacters)

        const syntheticEvent = {
          ...e,
          target: { ...e.target, value: e.target.value },
        }
        register?.onChange?.(syntheticEvent)

        return
      }

      setCharacterCount(valueCount)
      register?.onChange?.(e)
    }

    return (
      <div className="relative w-full">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
            {isRequired && <span className="ml-1 text-red-500">&#42;</span>}
          </label>
        )}
        <textarea
          {...register}
          disabled={isDisabled}
          className={cn(
            'w-full rounded-md border border-gray-100 pl-2 pr-8 pt-1 pb-8 resize-none text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
          )}
          {...props}
          onChange={onChange}
        />
        {maxCharacters && (
          <div className="absolute bottom-2 right-2 flex justify-end w-[calc(100%-20px)] text-[10px] text-gray-400">
            {characterCount}/{maxCharacters}
          </div>
        )}
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)
