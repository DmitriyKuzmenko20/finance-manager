import { EXPENSE_TYPE } from '@/constant'

export type ExpenseType = (typeof EXPENSE_TYPE)[keyof typeof EXPENSE_TYPE]
