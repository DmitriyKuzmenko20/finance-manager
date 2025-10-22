import { memo } from 'react'
import { AssetsTableProps } from './types'
import { DataTable } from '@/components'
import { getActions, getAssetColumns } from './utils'
import { useAssets } from './hooks'
import { TableFilters } from './TableFilters'

export const AssetsTable = memo(({ onEditClick }: AssetsTableProps) => {
  const {
    assets,
    selectedIds,
    typeFilter,
    handleSearchChange,
    handleSelectChange,
    handleEditClick,
    handleDeleteClick,
    handleBulkDeleteClick,
    handleTypeFilterChange,
  } = useAssets(onEditClick)

  const hasSelectedIds = !!selectedIds.length

  const columns = getAssetColumns()
  const actions = getActions(handleEditClick, handleDeleteClick)

  return (
    <div className="mt-4">
      <TableFilters
        hasSelectedIds={hasSelectedIds}
        typeFilter={typeFilter}
        onSearchChange={handleSearchChange}
        onBulkDeleteClick={handleBulkDeleteClick}
        onTypeFilterChange={handleTypeFilterChange}
      />
      <DataTable
        data={assets}
        columns={columns}
        actions={actions}
        selectedIds={selectedIds}
        className="mt-4"
        onSelectChange={handleSelectChange}
      />
    </div>
  )
})
