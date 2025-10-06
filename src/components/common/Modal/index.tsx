import { memo } from 'react'
import { ModalProps } from './types'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, Button } from '@/components'

export const Modal = memo(
  ({
    isOpen,
    title,
    saveText,
    saveButtonType,
    isSaveButtonDisabled,
    formId,
    children,
    onCloseClick,
    onSaveClick,
  }: ModalProps) => {
    return (
      <Dialog open={isOpen} onOpenChange={onCloseClick}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {children}
          <DialogFooter>
            <Button variant="critical" onClick={onCloseClick}>
              Cancel
            </Button>
            <Button type={saveButtonType} form={formId} isDisabled={isSaveButtonDisabled} onClick={onSaveClick}>
              {saveText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
)
