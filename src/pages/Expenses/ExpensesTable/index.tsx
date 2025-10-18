import { memo } from 'react'
import { ExpensesTableProps } from './types'
import { DataTable } from '@/components'
import { getActions, getExpenseColumns } from './utils'
import { useExpenses } from './hooks'
import { TableFilters } from './TableFilters'

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

  const hasSelectedIds = !!selectedIds.length

  const columns = getExpenseColumns()
  const actions = getActions(handleEditClick, handleDeleteClick)

  return (
    <div className="mt-4">
      <TableFilters
        hasSelectedIds={hasSelectedIds}
        onSearchChange={handleSearchChange}
        onBulkDeleteClick={handleBulkDeleteClick}
      />
      <DataTable
        data={expenses}
        columns={columns}
        actions={actions}
        selectedIds={selectedIds}
        className="mt-4"
        onSelectChange={handleSelectChange}
      />
    </div>
  )
})
