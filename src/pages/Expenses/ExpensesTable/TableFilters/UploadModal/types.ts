import { ChangeEvent } from "react"

export type UploadModalProps = {
  isOpen: boolean
  uploadedFile: File | null
  errors: string[]
  handleUploadFile: (event: ChangeEvent<HTMLInputElement>) => void
  onCloseClick: VoidFunction
  onSaveClick: VoidFunction
}
