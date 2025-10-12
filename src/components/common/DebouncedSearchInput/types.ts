import { InputProps } from '@/components/ui/Input/types'

export type DebouncedSearchInputProps = {
  onDebounceChange: (value: string) => void
} & InputProps
