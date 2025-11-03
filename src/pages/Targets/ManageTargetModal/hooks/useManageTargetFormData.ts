import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EXPENSE_CATEGORY } from '@/constant'
import { Target } from '@/store/targetsStore/models'
import { targetSchema } from '@/validation'
import { ExpenseCategory } from '@/store/expensesStore/models'

export type TargetFormValues = {
  targetAmount: string
  title: string
  description: string
  category: ExpenseCategory
  month: string
  year: string
}

export const useManageTargetFormData = (initialTarget: Target | undefined, isOpen: boolean) => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<TargetFormValues>({
    resolver: yupResolver(targetSchema),
    defaultValues: {
      targetAmount: '',
      title: '',
      description: '',
      category: EXPENSE_CATEGORY.OTHER,
      month: currentMonth.toString(),
      year: currentYear.toString(),
    },
  })

  useEffect(() => {
    if (isOpen) {
      reset({
        targetAmount: initialTarget?.targetAmount?.toString() || '',
        title: initialTarget?.title || '',
        description: initialTarget?.description || '',
        category: initialTarget?.category || EXPENSE_CATEGORY.OTHER,
        month: initialTarget?.month?.toString() || currentMonth.toString(),
        year: initialTarget?.year?.toString() || currentYear.toString(),
      })
    }
  }, [initialTarget, isOpen, reset, currentMonth, currentYear])

  return { control, errors, register, handleSubmit }
}
