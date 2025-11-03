import { memo, useMemo } from 'react'
import { ManageTargetModalProps } from './types'
import { Dropdown, Input, Modal, Textarea } from '@/components'
import { useManageTargetFormData } from './hooks'
import { EXPENSE_CATEGORY } from '@/constant'
import { Controller } from 'react-hook-form'

const CATEGORY_OPTIONS = [
  { label: 'Food', value: EXPENSE_CATEGORY.FOOD },
  { label: 'Travel', value: EXPENSE_CATEGORY.TRAVEL },
  { label: 'Education', value: EXPENSE_CATEGORY.EDUCATION },
  { label: 'Clothes', value: EXPENSE_CATEGORY.CLOTHES },
  { label: 'Entertainment', value: EXPENSE_CATEGORY.ENTERTAINMENT },
  { label: 'Shopping', value: EXPENSE_CATEGORY.SHOPPING },
  { label: 'Transport', value: EXPENSE_CATEGORY.TRANSPORT },
  { label: 'Health', value: EXPENSE_CATEGORY.HEALTH },
  { label: 'Utilities', value: EXPENSE_CATEGORY.UTILITIES },
  { label: 'Other', value: EXPENSE_CATEGORY.OTHER },
]

const MONTH_OPTIONS = [
  { label: 'January', value: '1' },
  { label: 'February', value: '2' },
  { label: 'March', value: '3' },
  { label: 'April', value: '4' },
  { label: 'May', value: '5' },
  { label: 'June', value: '6' },
  { label: 'July', value: '7' },
  { label: 'August', value: '8' },
  { label: 'September', value: '9' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
]

export const ManageTargetModal = memo(
  ({ isOpen, initialTarget, onCloseClick, onSaveClick }: ManageTargetModalProps) => {
    const { control, errors, register, handleSubmit } = useManageTargetFormData(initialTarget, isOpen)

    const yearOptions = useMemo(() => {
      const currentYear = new Date().getFullYear()
      const years = []

      for (let i = currentYear - 2; i <= currentYear + 5; i++) {
        years.push({ label: i.toString(), value: i.toString() })
      }

      return years
    }, [])

    return (
      <Modal
        isOpen={isOpen}
        title={!initialTarget ? 'Add new target' : 'Edit target'}
        saveText="Save"
        saveButtonType="submit"
        isSaveButtonDisabled={false}
        formId="manageTargetForm"
        onCloseClick={onCloseClick}
      >
        <>
          <form id="manageTargetForm" className="grid gap-4" onSubmit={handleSubmit(onSaveClick)}>
            <Input
              label="Title"
              placeholder="Enter target title"
              isRequired
              register={register('title')}
              error={errors.title?.message}
            />
            <Input
              label="Target Amount"
              placeholder="Enter target amount"
              type="number"
              isRequired
              register={register('targetAmount')}
              error={errors.targetAmount?.message}
            />
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
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="month"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    options={MONTH_OPTIONS}
                    selectedValue={field.value}
                    label="Month"
                    placeholder="Select month"
                    isRequired
                    error={errors.month?.message}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="year"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    options={yearOptions}
                    selectedValue={field.value}
                    label="Year"
                    placeholder="Select year"
                    isRequired
                    error={errors.year?.message}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <Textarea
              label="Description"
              placeholder="Enter description (optional)"
              register={register('description')}
            />
          </form>
        </>
      </Modal>
    )
  }
)
