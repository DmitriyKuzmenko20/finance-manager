import { memo } from 'react'
import { ManageAssetModalProps } from './types'
import { Dropdown, Input, Modal } from '@/components'
import { useManageAssetFormData } from './hooks'
import { ASSET_TYPE, ASSET_CATEGORY } from '@/constant'
import { Controller } from 'react-hook-form'

const TYPE_OPTIONS = [
  {
    label: 'Investments',
    value: ASSET_TYPE.INVESTMENTS,
  },
  {
    label: 'Savings',
    value: ASSET_TYPE.SAVINGS,
  },
]

const CATEGORY_OPTIONS = [
  {
    label: 'Crypto',
    value: ASSET_CATEGORY.CRYPTO,
  },
  {
    label: 'Stocks',
    value: ASSET_CATEGORY.STOCKS,
  },
  {
    label: 'Bonds',
    value: ASSET_CATEGORY.BONDS,
  },
]

export const ManageAssetModal = memo(({ isOpen, initialAsset, onCloseClick, onSaveClick }: ManageAssetModalProps) => {
  const { isInvestmentsType, control, errors, register, handleSubmit } = useManageAssetFormData(initialAsset, isOpen)

  return (
    <Modal
      isOpen={isOpen}
      title={!initialAsset ? 'Add new asset' : 'Edit asset'}
      saveText="Save"
      saveButtonType="submit"
      isSaveButtonDisabled={false}
      formId="manageAssetForm"
      onCloseClick={onCloseClick}
    >
      <>
        <form id="manageAssetForm" className="grid gap-4" onSubmit={handleSubmit(onSaveClick)}>
          <Input
            label="Amount"
            placeholder="Enter amount"
            type="number"
            isRequired
            register={register('amount')}
            error={errors.amount?.message}
          />
          <Input
            label="Title"
            placeholder="Enter title"
            isRequired
            register={register('title')}
            error={errors.title?.message}
          />
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Dropdown
                options={TYPE_OPTIONS}
                selectedValue={field.value}
                label="Type"
                placeholder="Select type"
                isRequired
                error={errors.type?.message}
                onChange={field.onChange}
              />
            )}
          />
          {isInvestmentsType && (
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Dropdown
                  options={CATEGORY_OPTIONS}
                  selectedValue={field.value}
                  label="Category"
                  placeholder="Select category"
                  isRequired
                  error={errors.category?.message}
                  onChange={field.onChange}
                />
              )}
            />
          )}
        </form>
      </>
    </Modal>
  )
})
