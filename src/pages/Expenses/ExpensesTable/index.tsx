import { useExpensesStore } from '@/store'
import { memo } from 'react'
import { ExpensesTableProps } from './types'

export const ExpensesTable = memo(({ onEditClick }: ExpensesTableProps) => {
  const expenses = useExpensesStore((state) => state.expenses)
  const deleteExpense = useExpensesStore((state) => state.deleteExpense)

  return (
    <div className="mt-4">
      {expenses?.map((expense) => (
        <div key={expense.id} className="flex gap-10">
          <p>{expense.title}</p>
          <p className="cursor-pointer" onClick={() => onEditClick(expense)}>
            Edit
          </p>
          <p className="cursor-pointer" onClick={() => deleteExpense(expense.id)}>
            Delete
          </p>
        </div>
      ))}
    </div>
  )
})
