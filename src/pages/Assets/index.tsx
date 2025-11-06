import { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Plus } from 'lucide-react'
import { useAssetsStore } from '@/store'
import { Asset } from '@/store/assetsStore/models'
import { useModal } from '@/hooks'
import { ROUTES } from '@/routes/constant'
import { ASSET_TYPE } from '@/constant'
import { AssetFormValues } from './ManageAssetModal/hooks'
import { HelmetWrapper, PageWrapper } from '@/components'
import { AssetsTable } from './AssetsTable'
import { ManageAssetModal } from './ManageAssetModal'

const Assets = () => {
  const [openedAsset, setOpenedAsset] = useState<Asset | null>(null)

  const { isOpen, onOpenClick, onCloseClick } = useModal()
  const addAsset = useAssetsStore((state) => state.addAsset)
  const editAsset = useAssetsStore((state) => state.editAsset)

  const handleEditAssetClick = useCallback(
    (asset: Asset) => {
      setOpenedAsset(asset)
      onOpenClick()
    },
    [onOpenClick]
  )

  const handleCloseModalClick = useCallback(() => {
    setOpenedAsset(null)
    onCloseClick()
  }, [onCloseClick])

  const handleSaveAssetClick = useCallback(
    (values: AssetFormValues) => {
      const newAsset = {
        ...values,
        amount: Number(values.amount),
        id: openedAsset?.id || uuidv4(),
        category: values.type === ASSET_TYPE.INVESTMENTS ? values.category : undefined,
      }

      if (openedAsset) {
        editAsset(newAsset)
      } else {
        addAsset(newAsset)
      }

      handleCloseModalClick()
    },
    [openedAsset, addAsset, editAsset, handleCloseModalClick]
  )

  return (
    <HelmetWrapper route={ROUTES.ASSETS}>
      <PageWrapper
        title="Assets"
        description="Track all your assets here"
        actionText="Add asset"
        actionIcon={<Plus className="size-4" />}
        onActionClick={onOpenClick}
      >
        <AssetsTable onEditClick={handleEditAssetClick} />
        <ManageAssetModal
          isOpen={isOpen}
          initialAsset={openedAsset ?? undefined}
          onCloseClick={handleCloseModalClick}
          onSaveClick={handleSaveAssetClick}
        />
      </PageWrapper>
    </HelmetWrapper>
  )
}

export default Assets
