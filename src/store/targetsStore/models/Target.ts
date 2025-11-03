import { ExpenseCategory } from '@/store/expensesStore/models'

export interface Target {
  id: string
  title: string
  targetAmount: number
  category: ExpenseCategory
  month: number
  year: number
  description: string
}
