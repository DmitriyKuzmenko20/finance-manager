import {
  ASSET_CATEGORY,
  ASSET_TYPE,
  EXPENSE_CATEGORY,
  EXPENSE_TYPE,
  MAX_AMOUNT_COUNT,
  MAX_DESCRIPTION_COUNT,
  MAX_TITLE_COUNT,
} from '@/constant'
import { AssetCategory, AssetType } from '@/store/assetsStore/models'
import { ExpenseCategory, ExpenseType } from '@/store/expensesStore/models'
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
  type: yup
    .mixed<ExpenseType>()
    .oneOf(Object.values(EXPENSE_TYPE), 'Invalid expense type')
    .required('Type is required'),
  category: yup
    .mixed<ExpenseCategory>()
    .oneOf(Object.values(EXPENSE_CATEGORY), 'Invalid expense type')
    .required('Category is required'),
  date: yup.string().required('Date is required'),
})

export const assetSchema = yup.object({
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
  type: yup
    .mixed<AssetType>()
    .oneOf([ASSET_TYPE.INVESTMENTS, ASSET_TYPE.SAVINGS], 'Invalid asset type')
    .required('Type is required'),
  category: yup
    .mixed<AssetCategory>()
    .oneOf([ASSET_CATEGORY.CRYPTO, ASSET_CATEGORY.STOCKS, ASSET_CATEGORY.BONDS], 'Invalid asset category')
    .when('type', {
      is: ASSET_TYPE.INVESTMENTS,
      then: (schema) => schema.required('Category is required for investments'),
      otherwise: (schema) => schema.optional().nullable(),
    }),
})
