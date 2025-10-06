import { EXPENSE_TYPE, MAX_AMOUNT_COUNT, MAX_CATEGORY_COUNT, MAX_DESCRIPTION_COUNT, MAX_TITLE_COUNT } from '@/constant'
import { ExpenseType } from '@/store/expensesStore/models'
import * as yup from 'yup'

export const expenseSchema = yup.object({
  amount: yup
    .string()
    .required('Amount is required')
    .test('is-number', 'Amount must be a number', (value) => !isNaN(Number(value)))
    .test('positive', 'Amount must be positive', (value) => (value ? Number(value) > 0 : true))
    .test('max-amount', `Amount cannot exceed ${MAX_AMOUNT_COUNT}`, (value) =>
      value ? Number(value) <= MAX_AMOUNT_COUNT : true
    ),
  title: yup
    .string()
    .required('Title is required')
    .max(MAX_TITLE_COUNT, `Title cannot exceed ${MAX_TITLE_COUNT} characters`),
  description: yup
    .string()
    .max(MAX_DESCRIPTION_COUNT, `Description cannot exceed ${MAX_DESCRIPTION_COUNT} characters`)
    .default(''),
  category: yup
    .string()
    .required('Category is required')
    .max(MAX_CATEGORY_COUNT, `Category cannot exceed ${MAX_CATEGORY_COUNT} characters`),
  type: yup
    .mixed<ExpenseType>()
    .oneOf([EXPENSE_TYPE.CASH, EXPENSE_TYPE.BANK], 'Invalid expense type')
    .required('Type is required'),
})
