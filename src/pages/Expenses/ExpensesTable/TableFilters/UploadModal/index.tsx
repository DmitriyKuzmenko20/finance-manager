import { memo, useRef } from 'react'
import { Image } from 'lucide-react'
import { UploadModalProps } from './types'
import { Modal } from '@/components'

export const UploadModal = memo(
  ({ isOpen, uploadedFile, errors, handleUploadFile, onCloseClick, onSaveClick }: UploadModalProps) => {
    const uploadRef = useRef<HTMLInputElement>(null)

    const fileName = uploadedFile?.name
    const hasErrors = Boolean(errors?.length)

    const onUploadFileClick = () => {
      const element = uploadRef?.current
      if (element) element.click()
    }

    return (
      <Modal
        isOpen={isOpen}
        title="Upload file"
        saveText="Upload"
        isSaveButtonDisabled={!uploadedFile || hasErrors}
        onCloseClick={onCloseClick}
        onSaveClick={onSaveClick}
      >
        <>
          <div
            className={
              'flex flex-col items-center justify-center w-full h-[200px] p-8 rounded-md cursor-pointer border border-dashed border-gray-200 transition-colors duration-200 hover:bg-indigo-50 hover:border-indigo-500'
            }
            onClick={onUploadFileClick}
          >
            <Image className="w-6 h-6 !text-gray-600" />
            {!fileName ? (
              <>
                <p className="mt-4 text-sm font-medium text-zinc-950">Attach your file here</p>
                <p className="mt-1.5 text-xs text-gray-600">CSV format up to 10 mb</p>
              </>
            ) : (
              <p className="mt-4 text-sm font-medium text-zinc-950">{fileName}</p>
            )}
            {hasErrors && (
              <div className="grid gap-1 max-h-64 mt-2 overflow-y-auto no-scrollbar">
                {errors.map((error) => (
                  <p key={error} className="text-xs text-red-500">
                    {error}
                  </p>
                ))}
              </div>
            )}
          </div>
          <input
            ref={uploadRef}
            className="hidden"
            type="file"
            id="file"
            name="file"
            accept=".csv"
            onChange={handleUploadFile}
          />
        </>
      </Modal>
    )
  }
)
