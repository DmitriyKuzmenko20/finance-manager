import { ExpenseCategory } from '@/store/expensesStore/models'

export type CategoryMultiSelectProps = {
  selectedCategories: ExpenseCategory[]
  label?: string
  placeholder?: string
  isDisabled?: boolean
  containerClassName?: string
  onChange: (categories: ExpenseCategory[]) => void
}
