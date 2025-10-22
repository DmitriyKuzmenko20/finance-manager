import { ASSET_TYPE } from '@/constant'

export type AssetType = (typeof ASSET_TYPE)[keyof typeof ASSET_TYPE]
