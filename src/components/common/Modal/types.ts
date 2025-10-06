import { ButtonType } from '../../ui/Button/types'

export type ModalProps = {
  isOpen: boolean
  title: string
  saveText: string
  saveButtonType?: ButtonType
  isSaveButtonDisabled?: boolean
  formId?: string
  children: React.ReactNode
  onCloseClick: VoidFunction
  onSaveClick?: VoidFunction
}
