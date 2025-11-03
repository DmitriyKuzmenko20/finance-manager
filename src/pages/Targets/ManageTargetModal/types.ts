import { Target } from '@/store/targetsStore/models'
import { TargetFormValues } from './hooks'

export type ManageTargetModalProps = {
  isOpen: boolean
  initialTarget?: Target
  onCloseClick: VoidFunction
  onSaveClick: (values: TargetFormValues) => void
}
