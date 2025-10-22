import { Asset } from '@/store/assetsStore/models'
import { AssetFormValues } from './hooks'

export type ManageAssetModalProps = {
  isOpen: boolean
  initialAsset?: Asset
  onCloseClick: VoidFunction
  onSaveClick: (values: AssetFormValues) => void
}
