import { ExpenseCategory } from '@/store/expensesStore/models'

export type TableFiltersProps = {
  hasSelectedIds: boolean
  selectedCategories: ExpenseCategory[]
  onSearchChange: (value: string) => void
  onCategoriesChange: (categories: ExpenseCategory[]) => void
  onBulkDeleteClick: VoidFunction
}
