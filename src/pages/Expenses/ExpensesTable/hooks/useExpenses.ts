import { useExpensesStore } from '@/store'
import { Expense } from '@/store/expensesStore/models'
import { useCallback, useMemo, useState } from 'react'

export const useExpenses = (onEditClick: (expense: Expense) => void) => {
  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const expenses = useExpensesStore((state) => state.expenses)
  const deleteExpenses = useExpensesStore((state) => state.deleteExpenses)

  const filteredExpenses = useMemo(() => {
    const searchableKeys = ['title', 'description', 'category', 'type', 'amount'] as const

    return expenses.filter((expense) =>
      searchableKeys.some((key) => {
        const value = expense[key]
        return String(value).toLowerCase().includes(search.toLowerCase())
      })
    )
  }, [expenses, search])

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const handleSelectChange = useCallback((ids: string[]) => {
    setSelectedIds(ids)
  }, [])

  const handleEditClick = useCallback(
    (expense: Expense) => {
      onEditClick(expense)
    },
    [onEditClick]
  )

  const handleDeleteClick = useCallback(
    (expense: Expense) => {
      deleteExpenses([expense.id])
    },
    [deleteExpenses]
  )

  const handleBulkDeleteClick = useCallback(() => {
    deleteExpenses(selectedIds)
    handleSelectChange([])
  }, [selectedIds, deleteExpenses, handleSelectChange])

  return {
    expenses: filteredExpenses,
    selectedIds,
    handleSearchChange,
    handleSelectChange,
    handleEditClick,
    handleDeleteClick,
    handleBulkDeleteClick,
  }
}
