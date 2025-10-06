import { Button } from '@/components'
import { useDownloadTemplate, useUploadTemplate } from './hooks'
import { useModal } from '@/hooks'
import { UploadModal } from './UploadModal'
import { useCallback } from 'react'
import { HeaderMenuProps } from './types'

export const HeaderMenu = ({ onAddClick }: HeaderMenuProps) => {
  const { uploadedFile, errors, handleUploadFile, handleUploadClick, handlerResetValues } = useUploadTemplate()
  const { onDownloadTemplateClick } = useDownloadTemplate()
  const { isOpen, onOpenClick, onCloseClick } = useModal()

  const handleCloseModalClick = useCallback(() => {
    onCloseClick()
    handlerResetValues()
  }, [onCloseClick, handlerResetValues])

  const handleUploadFileClick = useCallback(() => {
    handleUploadClick()
    onCloseClick()
  }, [onCloseClick, handleUploadClick])

  return (
    <header>
      <div className="flex justify-between">
        <Button onClick={onAddClick}>Add expense</Button>
        <div className="flex justify-end items-center gap-2">
          <Button variant="secondary" onClick={onDownloadTemplateClick}>
            Download template
          </Button>
          <Button onClick={onOpenClick}>Upload</Button>
        </div>
      </div>
      <UploadModal
        isOpen={isOpen}
        uploadedFile={uploadedFile}
        errors={errors}
        handleUploadFile={handleUploadFile}
        onCloseClick={handleCloseModalClick}
        onSaveClick={handleUploadFileClick}
      />
    </header>
  )
}
