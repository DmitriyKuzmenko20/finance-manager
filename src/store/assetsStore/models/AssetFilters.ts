import { AssetType } from './AssetType'

export type AssetFilters = {
  type: AssetTypeFilter
}

export type AssetTypeFilter = AssetType | null
