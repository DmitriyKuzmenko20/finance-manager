import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EXPENSE_CATEGORY, EXPENSE_TYPE } from '@/constant'
import { Expense, ExpenseCategory, ExpenseType } from '@/store/expensesStore/models'
import { expenseSchema } from '@/validation'

export type ExpenseFormValues = {
  amount: string
  title: string
  description: string
  category: ExpenseCategory
  type: ExpenseType
  date: string
}

export const useManageExpenseFormData = (initialExpense: Expense | undefined, isOpen: boolean) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ExpenseFormValues>({
    resolver: yupResolver(expenseSchema),
    defaultValues: {
      amount: '',
      title: '',
      description: '',
      category: EXPENSE_CATEGORY.OTHER,
      type: EXPENSE_TYPE.BANK,
      date: '',
    },
  })

  useEffect(() => {
    if (isOpen) {
      reset({
        amount: initialExpense?.amount?.toString() || '',
        title: initialExpense?.title || '',
        description: initialExpense?.description || '',
        category: initialExpense?.category || EXPENSE_CATEGORY.OTHER,
        type: initialExpense?.type || EXPENSE_TYPE.BANK,
        date: initialExpense?.date || '',
      })
    }
  }, [initialExpense, isOpen, reset])

  return { control, errors, register, handleSubmit }
}
