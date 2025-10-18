import { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useModal } from '@/hooks'
import { Plus } from 'lucide-react'
import { useExpensesStore } from '@/store'
import { Expense } from '@/store/expensesStore/models'
import { ExpenseFormValues } from './ManageExpenseModal/hooks'
import { PageWrapper } from '@/components'
import { ExpensesTable } from './ExpensesTable'
import { ManageExpenseModal } from './ManageExpenseModal'

const Expenses = () => {
  const [openedExpense, setOpenedExpense] = useState<Expense | null>(null)

  const { isOpen, onOpenClick, onCloseClick } = useModal()
  const addExpense = useExpensesStore((state) => state.addExpense)
  const editExpense = useExpensesStore((state) => state.editExpense)

  const handleEditExpenseClick = useCallback(
    (expense: Expense) => {
      setOpenedExpense(expense)
      onOpenClick()
    },
    [onOpenClick]
  )

  const handleCloseModalClick = useCallback(() => {
    setOpenedExpense(null)
    onCloseClick()
  }, [onCloseClick])

  const handleSaveExpenseClick = useCallback(
    (values: ExpenseFormValues) => {
      const newExpense = {
        ...values,
        amount: Number(values.amount),
        id: openedExpense?.id || uuidv4(),
      }

      if (openedExpense) {
        editExpense(newExpense)
      } else {
        addExpense(newExpense)
      }

      handleCloseModalClick()
    },
    [openedExpense, addExpense, editExpense, handleCloseModalClick]
  )

  return (
    <PageWrapper
      title="Expenses"
      description="Track and manage all your contracts"
      actionText="Add expense"
      actionIcon={<Plus className="size-4" />}
      onActionClick={onOpenClick}
    >
      <ExpensesTable onEditClick={handleEditExpenseClick} />
      <ManageExpenseModal
        isOpen={isOpen}
        initialExpense={openedExpense ?? undefined}
        onCloseClick={handleCloseModalClick}
        onSaveClick={handleSaveExpenseClick}
      />
    </PageWrapper>
  )
}

export default Expenses
