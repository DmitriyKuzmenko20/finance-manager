import { memo } from 'react'
import { TargetsTableProps } from './types'
import { DataTable } from '@/components'
import { getActions, getTargetColumns } from './utils'
import { useTargets } from './hooks'
import { TableFilters } from './TableFilters'

export const TargetsTable = memo(({ onEditClick }: TargetsTableProps) => {
  const {
    targets,
    selectedIds,
    handleSearchChange,
    handleSelectChange,
    handleEditClick,
    handleDeleteClick,
    handleBulkDeleteClick,
  } = useTargets(onEditClick)

  const hasSelectedIds = !!selectedIds.length

  const columns = getTargetColumns()
  const actions = getActions(handleEditClick, handleDeleteClick)

  return (
    <div className="mt-4">
      <TableFilters
        hasSelectedIds={hasSelectedIds}
        onSearchChange={handleSearchChange}
        onBulkDeleteClick={handleBulkDeleteClick}
      />
      <DataTable
        data={targets}
        columns={columns}
        actions={actions}
        selectedIds={selectedIds}
        className="mt-4"
        onSelectChange={handleSelectChange}
      />
    </div>
  )
})
