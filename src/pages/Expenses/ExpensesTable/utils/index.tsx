import { ColumnDef } from '@tanstack/react-table'
import { Banknote, DeleteIcon, EditIcon, Landmark } from 'lucide-react'
import { Expense, ExpenseCategory, ExpenseType } from '@/store/expensesStore/models'
import { formatPrice } from '@/utils'
import { EXPENSE_CATEGORY, EXPENSE_TYPE } from '@/constant'
import { Action } from '@/components/common/DataTable/types'
import { CategoryLabel } from '@/components/common/CategoryLabel'
import { STATUS_COLORS } from '@/components/common/CategoryLabel/constant'

const CATEGORY_COLORS = {
  [EXPENSE_CATEGORY.FOOD]: STATUS_COLORS.ORANGE,
  [EXPENSE_CATEGORY.TRAVEL]: STATUS_COLORS.BLUE,
  [EXPENSE_CATEGORY.EDUCATION]: STATUS_COLORS.INDIGO,
  [EXPENSE_CATEGORY.CLOTHES]: STATUS_COLORS.PINK,
  [EXPENSE_CATEGORY.ENTERTAINMENT]: STATUS_COLORS.PURPLE,
  [EXPENSE_CATEGORY.SHOPPING]: STATUS_COLORS.TEAL,
  [EXPENSE_CATEGORY.TRANSPORT]: STATUS_COLORS.CYAN,
  [EXPENSE_CATEGORY.HEALTH]: STATUS_COLORS.GREEN,
  [EXPENSE_CATEGORY.UTILITIES]: STATUS_COLORS.YELLOW,
  [EXPENSE_CATEGORY.OTHER]: STATUS_COLORS.CYAN,
}

export const getExpenseColumns = (): ColumnDef<Expense>[] => [
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      return formatPrice(row.getValue('amount'))
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => row.getValue('title'),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => row.getValue('description') || '-',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type: ExpenseType = row.getValue('type')
      const isBank = type === EXPENSE_TYPE.BANK

      return (
        <div className="flex items-center gap-2">
          {!isBank ? <Banknote className="size-4 text-green-600" /> : <Landmark className="size-4 text-blue-600" />}
          <span>{type}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category: ExpenseCategory = row.getValue('category')
      const color = CATEGORY_COLORS[category]

      return <CategoryLabel text={category} color={color} />
    },
  },
]

export const getActions = (onEdit: (row: Expense) => void, onDelete: (row: Expense) => void): Action<Expense>[] => [
  {
    label: 'Edit',
    icon: <EditIcon className="size-4" />,
    action: onEdit,
  },
  {
    label: 'Delete',
    icon: <DeleteIcon className="size-4" />,
    className: 'text-red-500 hover:!text-red-500',
    action: onDelete,
  },
]
