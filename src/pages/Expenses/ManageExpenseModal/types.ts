import { Expense } from '@/store/expensesStore/models'
import { ExpenseFormValues } from './hooks'

export type ManageExpenseModalProps = {
  isOpen: boolean
  initialExpense?: Expense
  onCloseClick: VoidFunction
  onSaveClick: (values: ExpenseFormValues) => void
}
