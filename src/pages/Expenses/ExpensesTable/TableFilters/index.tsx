import { memo, useCallback } from 'react'
import { TableFiltersProps } from './types'
import { useModal } from '@/hooks'
import { useDownloadTemplate, useUploadTemplate } from './hooks'
import { Button, DebouncedSearchInput } from '@/components'
import { UploadModal } from './UploadModal'

export const TableFilters = memo(({ hasSelectedIds, onSearchChange, onBulkDeleteClick }: TableFiltersProps) => {
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
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <DebouncedSearchInput placeholder="Search..." containerClassName="!w-64" onDebounceChange={onSearchChange} />
        {hasSelectedIds && (
          <Button variant="critical" onClick={onBulkDeleteClick}>
            Delete
          </Button>
        )}
      </div>
      <div className="flex justify-end items-center gap-2">
        <Button variant="secondary" onClick={onDownloadTemplateClick}>
          Download template
        </Button>
        <Button onClick={onOpenClick}>Upload</Button>
      </div>
      <UploadModal
        isOpen={isOpen}
        uploadedFile={uploadedFile}
        errors={errors}
        handleUploadFile={handleUploadFile}
        onCloseClick={handleCloseModalClick}
        onSaveClick={handleUploadFileClick}
      />
    </div>
  )
})
