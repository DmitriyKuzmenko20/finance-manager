import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDebouncedValue } from '@/hooks'
import { DebouncedSearchInputProps } from './types'
import { Input } from '@/components/ui'

export const DebouncedSearchInput = ({ onDebounceChange, ...inputProps }: DebouncedSearchInputProps) => {
  const [search, setSearch] = useState('')

  const debouncedSearchValue = useDebouncedValue(search.trim(), 300)

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
  }, [])

  useEffect(() => {
    onDebounceChange(debouncedSearchValue)
  }, [debouncedSearchValue, onDebounceChange])

  return <Input {...inputProps} value={search} onChange={handleSearchChange} />
}
