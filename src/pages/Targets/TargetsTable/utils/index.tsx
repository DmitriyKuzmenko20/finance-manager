import { ColumnDef } from '@tanstack/react-table'
import { DeleteIcon, EditIcon } from 'lucide-react'
import { Target } from '@/store/targetsStore/models'
import { ExpenseCategory } from '@/store/expensesStore/models'
import { formatPrice } from '@/utils'
import { EXPENSE_CATEGORY } from '@/constant'
import { Action } from '@/components/common/DataTable/types'
import { CategoryLabel } from '@/components/common/CategoryLabel'
import { STATUS_COLORS } from '@/components/common/CategoryLabel/constant'
import { TargetWithExpenses } from '../types'

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

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const getTargetColumns = (): ColumnDef<TargetWithExpenses>[] => [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => row.getValue('title'),
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
  {
    accessorKey: 'month',
    header: 'Period',
    cell: ({ row }) => {
      const month = Number(row.getValue('month'))
      const year = row.original.year

      return `${MONTH_NAMES[month - 1]} ${year}`
    },
  },
  {
    accessorKey: 'targetAmount',
    header: 'Target Amount',
    cell: ({ row }) => {
      return formatPrice(row.getValue('targetAmount'))
    },
  },
  {
    accessorKey: 'currentSpent',
    header: 'Current Spent',
    cell: ({ row }) => {
      return <span className="font-semibold">{formatPrice(row.getValue('currentSpent'))}</span>
    },
  },
  {
    accessorKey: 'remaining',
    header: 'Remaining',
    cell: ({ row }) => {
      const isExceeded = row.original.isExceeded

      return (
        <span className={isExceeded ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
          {formatPrice(row.getValue('remaining'))}
        </span>
      )
    },
  },
]

export const getActions = (onEdit: (row: Target) => void, onDelete: (row: Target) => void): Action<Target>[] => [
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
