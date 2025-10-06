import { ExpenseType } from './ExpenseType'

export interface Expense {
  id: string
  amount: number
  title: string
  description: string
  type: ExpenseType
  category: string
  receipt?: string
}

export type BulkExpense = Omit<Expense, 'receipt'>
