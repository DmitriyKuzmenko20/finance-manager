import { memo } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from '@/components'
import { DropdownProps } from './types'

export const Dropdown = memo(
  ({ options, selectedValue, label, placeholder, isRequired, isDisabled, error, onChange }: DropdownProps) => {
    return (
      <div className="w-full">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
            {isRequired && <span className="ml-1 text-red-500">&#42;</span>}
          </label>
        )}
        <Select value={selectedValue} disabled={isDisabled} onValueChange={onChange}>
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
            </SelectGroup>
          </SelectContent>
        </Select>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)
