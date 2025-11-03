import { memo } from 'react'
import { TableFiltersProps } from './types'
import { Button, DebouncedSearchInput } from '@/components'

export const TableFilters = memo(({ hasSelectedIds, onSearchChange, onBulkDeleteClick }: TableFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <DebouncedSearchInput placeholder="Search targets..." containerClassName="!w-52" onDebounceChange={onSearchChange} />
        {hasSelectedIds && (
          <Button variant="critical" onClick={onBulkDeleteClick}>
            Delete
          </Button>
        )}
      </div>
    </div>
  )
})
