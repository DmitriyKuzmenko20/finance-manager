import { memo, useCallback } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from '@/components'
import { DropdownProps } from './types'
import clsx from 'clsx'

export const Dropdown = memo(
  ({
    options,
    selectedValue,
    label,
    placeholder,
    isRequired,
    isDisabled,
    isClearOption,
    error,
    containerClassName,
    onChange,
  }: DropdownProps) => {
    const handleValueChange = useCallback((value: string) => onChange(value !== 'Clear' ? value : null), [onChange])

    return (
      <div className={clsx('w-full', containerClassName)}>
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
            {isRequired && <span className="ml-1 text-red-500">&#42;</span>}
          </label>
        )}
        <Select value={selectedValue} disabled={isDisabled} onValueChange={handleValueChange}>
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue placeholder={placeholder || 'Select...'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} className="cursor-pointer">
                  {option.label}
                </SelectItem>
              ))}
              {isClearOption && <SelectItem value="Clear">- Clear -</SelectItem>}
            </SelectGroup>
          </SelectContent>
        </Select>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)
