import { AssetCategory } from './AssetCategory'
import { AssetType } from './AssetType'

export interface Asset {
  id: string
  amount: number
  title: string
  type: AssetType
  category?: AssetCategory
}
