import { memo } from 'react'
import { ExpensesTableProps } from './types'
import { Button, DataTable, DebouncedSearchInput } from '@/components'
import { getActions, getExpenseColumns } from './utils'
import { useExpenses } from './hooks'

export const ExpensesTable = memo(({ onEditClick }: ExpensesTableProps) => {
  const {
    expenses,
    selectedIds,
    handleSearchChange,
    handleSelectChange,
    handleEditClick,
    handleDeleteClick,
    handleBulkDeleteClick,
  } = useExpenses(onEditClick)

  const hasSelectedIds = selectedIds.length > 0

  const columns = getExpenseColumns()
  const actions = getActions(handleEditClick, handleDeleteClick)

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2">
        <DebouncedSearchInput
          placeholder="Search..."
          containerClassName="!w-64"
          onDebounceChange={handleSearchChange}
        />
        {hasSelectedIds && (
          <Button variant="critical" onClick={handleBulkDeleteClick}>
            Delete
          </Button>
        )}
      </div>
      <DataTable
        data={expenses}
        columns={columns}
        actions={actions}
        className="mt-4"
        onSelectChange={handleSelectChange}
      />
    </div>
  )
})
