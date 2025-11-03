import { useTargetsStore } from '@/store/targetsStore'
import { useExpensesStore } from '@/store'
import { Target } from '@/store/targetsStore/models'
import { useCallback, useMemo, useState } from 'react'
import { TargetWithExpenses } from '../types'
import { parse } from 'date-fns'

export const useTargets = (onEditClick: (target: Target) => void) => {
  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const targets = useTargetsStore((state) => state.targets)
  const expenses = useExpensesStore((state) => state.expenses)
  const deleteTargets = useTargetsStore((state) => state.deleteTargets)

  const targetsWithExpenses = useMemo(() => {
    return targets.map((target): TargetWithExpenses => {
      // calculate current spent for this target's category and month/year
      const currentSpent = expenses
        .filter((expense) => {
          if (expense.category !== target.category) return

          const expenseDate = parse(expense.date, 'dd/MM/yyyy', new Date())
          const expenseMonth = expenseDate.getMonth() + 1
          const expenseYear = expenseDate.getFullYear()

          return expenseMonth === target.month && expenseYear === target.year
        })
        .reduce((sum, expense) => sum + expense.amount, 0)

      const remaining = target.targetAmount - currentSpent
      const isExceeded = currentSpent > target.targetAmount

      return {
        ...target,
        currentSpent,
        remaining,
        isExceeded,
      }
    })
  }, [targets, expenses])

  const filteredTargets = useMemo(() => {
    const searchableKeys = ['title', 'description', 'category'] as const

    return targetsWithExpenses.filter((target) =>
      searchableKeys.some((key) => {
        const value = target[key]
        return String(value).toLowerCase().includes(search.toLowerCase())
      })
    )
  }, [targetsWithExpenses, search])

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const handleSelectChange = useCallback((ids: string[]) => {
    setSelectedIds(ids)
  }, [])

  const handleEditClick = useCallback(
    (target: Target) => {
      onEditClick(target)
    },
    [onEditClick]
  )

  const handleDeleteClick = useCallback(
    (target: Target) => {
      deleteTargets([target.id])
    },
    [deleteTargets]
  )

  const handleBulkDeleteClick = useCallback(() => {
    deleteTargets(selectedIds)
    handleSelectChange([])
  }, [selectedIds, deleteTargets, handleSelectChange])

  return {
    targets: filteredTargets,
    selectedIds,
    handleSearchChange,
    handleSelectChange,
    handleEditClick,
    handleDeleteClick,
    handleBulkDeleteClick,
  }
}
