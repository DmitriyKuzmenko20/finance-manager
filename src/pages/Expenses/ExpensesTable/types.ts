import { Expense } from '@/store/expensesStore/models'

export type ExpensesTableProps = {
  onEditClick: (expense: Expense) => void
}
