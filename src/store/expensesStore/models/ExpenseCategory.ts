import { EXPENSE_CATEGORY } from '@/constant'

export type ExpenseCategory = (typeof EXPENSE_CATEGORY)[keyof typeof EXPENSE_CATEGORY]
