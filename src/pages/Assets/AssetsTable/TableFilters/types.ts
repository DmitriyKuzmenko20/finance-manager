import { AssetTypeFilter } from '@/store/assetsStore/models'

export type TableFiltersProps = {
  hasSelectedIds: boolean
  typeFilter: AssetTypeFilter
  onSearchChange: (value: string) => void
  onBulkDeleteClick: VoidFunction
  onTypeFilterChange: (value: string | null) => void
}
