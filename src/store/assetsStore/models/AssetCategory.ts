import { ASSET_CATEGORY } from '@/constant'

export type AssetCategory = (typeof ASSET_CATEGORY)[keyof typeof ASSET_CATEGORY]
