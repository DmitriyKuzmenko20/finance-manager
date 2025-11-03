import { memo, useCallback } from 'react'
import { TableFiltersProps } from './types'
import { useModal } from '@/hooks'
import { useDownloadTemplate, useUploadTemplate } from './hooks'
import { Button, DebouncedSearchInput, CategoryMultiSelect } from '@/components'
import { UploadModal } from './UploadModal'

export const TableFilters = memo(
  ({
    hasSelectedIds,
    selectedCategories,
    onSearchChange,
    onCategoriesChange,
    onBulkDeleteClick,
  }: TableFiltersProps) => {
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
      <>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div className="flex flex-wrap items-end gap-2 w-full md:flex-nowrap md:w-fit">
            <DebouncedSearchInput
              placeholder="Search..."
              containerClassName="w-full flex-shrink-0 md:!w-52"
              onDebounceChange={onSearchChange}
            />
            <CategoryMultiSelect
              selectedCategories={selectedCategories}
              label="Categories"
              placeholder="All categories"
              containerClassName="w-full flex-shrink-0 md:max-w-52"
              onChange={onCategoriesChange}
            />
            {hasSelectedIds && (
              <Button variant="critical" onClick={onBulkDeleteClick}>
                Delete
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
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
      </>
    )
  }
)
