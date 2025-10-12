import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { Expense } from './models'

interface ExpensesState {
  expenses: Expense[]
  setExpenses: (expenses: Expense[]) => void
  addExpense: (expense: Expense) => void
  deleteExpenses: (ids: string[]) => void
  editExpense: (expense: Expense) => void
}

export const useExpensesStore = create<ExpensesState>()(
  persist(
    immer((set) => ({
      expenses: [],
      setExpenses: (newExpenses) =>
        set((state) => {
          state.expenses.push(...newExpenses)
        }),
      addExpense: (expense) =>
        set((state) => {
          state.expenses.push(expense)
        }),
      deleteExpenses: (ids) =>
        set((state) => {
          state.expenses = state.expenses.filter((exp) => !ids.includes(exp.id))
        }),
      editExpense: (updatedExpense) =>
        set((state) => {
          const idx = state.expenses.findIndex((exp) => exp.id === updatedExpense.id)
          if (idx !== -1) {
            state.expenses[idx] = updatedExpense
          }
        }),
    })),
    {
      name: 'expenses-storage',
    }
  )
)
