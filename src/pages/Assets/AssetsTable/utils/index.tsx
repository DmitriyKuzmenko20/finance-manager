import { ColumnDef } from '@tanstack/react-table'
import { ChartNoAxesCombined, DeleteIcon, EditIcon, HandCoins } from 'lucide-react'
import { Asset, AssetCategory, AssetType } from '@/store/assetsStore/models'
import { formatPrice } from '@/utils'
import { ASSET_CATEGORY, ASSET_TYPE } from '@/constant'
import { Action } from '@/components/common/DataTable/types'
import { CategoryLabel } from '@/components/common/CategoryLabel'
import { STATUS_COLORS } from '@/components/common/CategoryLabel/constant'

const CATEGORY_COLORS = {
  [ASSET_CATEGORY.CRYPTO]: STATUS_COLORS.ORANGE,
  [ASSET_CATEGORY.STOCKS]: STATUS_COLORS.BLUE,
  [ASSET_CATEGORY.BONDS]: STATUS_COLORS.GREEN,
}

export const getAssetColumns = (): ColumnDef<Asset>[] => [
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
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type: AssetType = row.getValue('type')
      const isInvestments = type === ASSET_TYPE.INVESTMENTS

      return (
        <div className="flex items-center gap-2">
          {!isInvestments ? (
            <HandCoins className="size-4 text-green-600" />
          ) : (
            <ChartNoAxesCombined className="size-4 text-blue-600" />
          )}
          <span>{type}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category: AssetCategory = row.getValue('category')
      const color = CATEGORY_COLORS[category]

      return category ? <CategoryLabel text={category} color={color} /> : '-'
    },
  },
]

export const getActions = (onEdit: (row: Asset) => void, onDelete: (row: Asset) => void): Action<Asset>[] => [
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
