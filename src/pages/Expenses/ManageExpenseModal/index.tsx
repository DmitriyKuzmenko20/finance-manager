import { memo } from 'react'
import { ManageExpenseModalProps } from './types'
import { DatePicker, Dropdown, Input, Modal, Textarea } from '@/components'
import { useManageExpenseFormData } from './hooks'
import { EXPENSE_TYPE } from '@/constant'
import { Controller } from 'react-hook-form'
import { parse } from 'date-fns'

const TYPE_OPTIONS = [
  {
    label: 'Bank',
    value: EXPENSE_TYPE.BANK,
  },
  {
    label: 'Cash',
    value: EXPENSE_TYPE.CASH,
  },
]

export const ManageExpenseModal = memo(
  ({ isOpen, initialExpense, onCloseClick, onSaveClick }: ManageExpenseModalProps) => {
    const { control, errors, register, handleSubmit } = useManageExpenseFormData(initialExpense, isOpen)

    return (
      <Modal
        isOpen={isOpen}
        title={!initialExpense ? 'Add new expense' : 'Edit expense'}
        saveText="Save"
        saveButtonType="submit"
        isSaveButtonDisabled={false}
        formId="manageExpenseForm"
        onCloseClick={onCloseClick}
      >
        <>
          <form id="manageExpenseForm" className="grid gap-4" onSubmit={handleSubmit(onSaveClick)}>
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
            <Input
              label="Category"
              placeholder="Enter category"
              isRequired
              register={register('category')}
              error={errors.category?.message}
            />
            <Textarea label="Description" placeholder="Enter description" register={register('description')} />
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
            <Controller
              name="date"
              control={control}
              render={({ field }) => {
                const selectedDate = field.value ? parse(field.value, 'dd/MM/yyyy', new Date()) : null

                return (
                  <DatePicker
                    selectedDate={selectedDate}
                    label="Date"
                    isRequired
                    error={errors.date?.message}
                    onChange={field.onChange}
                  />
                )
              }}
            />
          </form>
        </>
      </Modal>
    )
  }
)
