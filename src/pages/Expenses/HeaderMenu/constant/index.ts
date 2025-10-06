import { EXPENSE_TYPE } from "@/constant";

export const TEMPLATE_HEADER = {
  AMOUNT: 'Amount',
  TITLE: 'Title',
  DESCRIPTION: 'Description',
  CATEGORY: 'Category',
  TYPE: `Type (${EXPENSE_TYPE.BANK} or ${EXPENSE_TYPE.CASH})`,
  DATE: 'Date (DD/MM/YYYY format)',
} as const
