export type DropdownProps = {
  options: DropdownOption[]
  selectedValue?: string
  label?: string
  placeholder?: string
  isRequired?: boolean
  isDisabled?: boolean
  error?: string
  onChange?: (value: string) => void
}

export type DropdownOption = {
  label: string
  value: string
}
