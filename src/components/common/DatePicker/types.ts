export type DatePickerProps = {
  selectedDate: Date | null
  dateFormat?: string
  label?: string
  isRequired?: boolean
  isDisabled?: boolean
  error?: string
  containerClassName?: string
  onChange: (date: string) => void
}
