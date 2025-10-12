import { JSX } from 'react'
import { ColumnDef } from '@tanstack/react-table'

export type DataTableProps<T extends { id: string }> = {
  data: T[]
  columns: ColumnDef<T>[]
  actions?: Action<T>[]
  className?: string
  onSelectChange?: (selectedIds: string[]) => void
}

export type Action<T> = {
  label: string
  icon: JSX.Element
  className?: string
  action: (row: T) => void
}
