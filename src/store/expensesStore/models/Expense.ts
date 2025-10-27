import { ExpenseCategory } from './ExpenseCategory'
import { ExpenseType } from './ExpenseType'

export interface Expense {
  id: string
  amount: number
  title: string
  description: string
  type: ExpenseType
  category: ExpenseCategory
  date: string
}

export type BulkExpense = Omit<Expense, 'receipt'>
