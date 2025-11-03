import { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Plus } from 'lucide-react'
import { useTargetsStore } from '@/store/targetsStore'
import { Target } from '@/store/targetsStore/models'
import { useModal } from '@/hooks'
import { ROUTES } from '@/routes/constant'
import { TargetFormValues } from './ManageTargetModal/hooks'
import { HelmetWrapper, PageWrapper } from '@/components'
import { TargetsTable } from './TargetsTable'
import { ManageTargetModal } from './ManageTargetModal'

const Targets = () => {
  const [openedTarget, setOpenedTarget] = useState<Target | null>(null)

  const { isOpen, onOpenClick, onCloseClick } = useModal()
  const addTarget = useTargetsStore((state) => state.addTarget)
  const editTarget = useTargetsStore((state) => state.editTarget)

  const handleEditTargetClick = useCallback(
    (target: Target) => {
      setOpenedTarget(target)
      onOpenClick()
    },
    [onOpenClick]
  )

  const handleCloseModalClick = useCallback(() => {
    setOpenedTarget(null)
    onCloseClick()
  }, [onCloseClick])

  const handleSaveTargetClick = useCallback(
    (values: TargetFormValues) => {
      const newTarget = {
        ...values,
        targetAmount: Number(values.targetAmount),
        month: Number(values.month),
        year: Number(values.year),
        id: openedTarget?.id || uuidv4(),
      }

      if (openedTarget) {
        editTarget(newTarget)
      } else {
        addTarget(newTarget)
      }

      handleCloseModalClick()
    },
    [openedTarget, addTarget, editTarget, handleCloseModalClick]
  )

  return (
    <HelmetWrapper route={ROUTES.TARGETS}>
      <PageWrapper
        title="Targets"
        description="Set spending targets for different expense categories"
        actionText="Add target"
        actionIcon={<Plus className="size-4" />}
        onActionClick={onOpenClick}
      >
        <TargetsTable onEditClick={handleEditTargetClick} />
        <ManageTargetModal
          isOpen={isOpen}
          initialTarget={openedTarget ?? undefined}
          onCloseClick={handleCloseModalClick}
          onSaveClick={handleSaveTargetClick}
        />
      </PageWrapper>
    </HelmetWrapper>
  )
}

export default Targets
