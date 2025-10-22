import { memo } from 'react'
import { TableFiltersProps } from './types'
import { Button, DebouncedSearchInput, Dropdown } from '@/components'
import { ASSET_TYPE } from '@/constant'

const typeOptions = [...Object.values(ASSET_TYPE).map((type) => ({ label: type, value: type }))]

export const TableFilters = memo(
  ({ hasSelectedIds, typeFilter, onSearchChange, onBulkDeleteClick, onTypeFilterChange }: TableFiltersProps) => {
    return (
      <div className="flex flex-wrap items-end gap-2">
        <DebouncedSearchInput placeholder="Search..." containerClassName="!w-52" onDebounceChange={onSearchChange} />
        {hasSelectedIds && (
          <Button variant="critical" onClick={onBulkDeleteClick}>
            Delete
          </Button>
        )}
        <Dropdown
          options={typeOptions}
          selectedValue={typeFilter || ''}
          isClearOption
          label="Type"
          placeholder="Select type"
          containerClassName="max-w-52"
          onChange={onTypeFilterChange}
        />
      </div>
    )
  }
)
