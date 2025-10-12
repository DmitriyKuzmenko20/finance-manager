import { Expense } from '@/store/expensesStore/models'
import { ColumnDef } from '@tanstack/react-table'
import { Action } from '@/components/common/DataTable/types'
import { formatPrice } from '@/utils'
import { DeleteIcon, EditIcon } from 'lucide-react'

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
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => row.getValue('category'),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => row.getValue('description') || '-',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => row.getValue('type'),
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
