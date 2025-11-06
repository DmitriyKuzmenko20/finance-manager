import { useExpensesStore } from '@/store'
import { Expense, ExpenseCategory } from '@/store/expensesStore/models'
import { useCallback, useMemo, useState } from 'react'

export const useExpenses = (onEditClick: (expense: Expense) => void) => {
  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<ExpenseCategory[]>([])

  const expenses = useExpensesStore((state) => state.expenses)
  const deleteExpenses = useExpensesStore((state) => state.deleteExpenses)

  const filteredExpenses = useMemo(() => {
    const searchableKeys = ['title', 'description', 'category', 'type', 'amount'] as const

    return expenses.filter((expense) => {
      const matchesSearch =
        !search ||
        searchableKeys.some((key) => {
          const value = expense[key]
          return value && String(value).toLowerCase().includes(search.toLowerCase())
        })

      const matchesCategory = !selectedCategories.length || selectedCategories.includes(expense.category)

      return matchesSearch && matchesCategory
    })
  }, [expenses, search, selectedCategories])

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const handleCategoriesChange = useCallback((categories: ExpenseCategory[]) => {
    setSelectedCategories(categories)
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
    selectedCategories,
    handleSearchChange,
    handleCategoriesChange,
    handleSelectChange,
    handleEditClick,
    handleDeleteClick,
    handleBulkDeleteClick,
  }
}
