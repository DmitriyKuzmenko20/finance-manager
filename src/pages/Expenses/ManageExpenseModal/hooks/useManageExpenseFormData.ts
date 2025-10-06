import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EXPENSE_TYPE } from '@/constant'
import { Expense, ExpenseType } from '@/store/expensesStore/models'
import { expenseSchema } from '@/validation'

export type ExpenseFormValues = {
  amount: string
  title: string
  description: string
  category: string
  type: ExpenseType
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
      category: '',
      type: EXPENSE_TYPE.BANK,
    },
  })

  useEffect(() => {
    if (isOpen) {
      reset({
        amount: initialExpense?.amount?.toString() || '',
        title: initialExpense?.title || '',
        description: initialExpense?.description || '',
        category: initialExpense?.category || '',
        type: initialExpense?.type || EXPENSE_TYPE.BANK,
      })
    }
  }, [initialExpense, isOpen, reset])

  return { control, errors, register, handleSubmit }
}
