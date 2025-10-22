export type DropdownProps = {
  options: DropdownOption[]
  selectedValue: string
  label?: string
  placeholder?: string
  isRequired?: boolean
  isDisabled?: boolean
  isClearOption?: boolean
  error?: string
  containerClassName?: string
  onChange: (value: string | null) => void
}

export type DropdownOption = {
  label: string
  value: string
}
