import { memo, useMemo, JSX, useEffect } from 'react'
import clsx from 'clsx'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table'
import { motion, Variants } from 'framer-motion'
import { DataTableProps } from './types'
import { Button, Checkbox, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components'
import { EmptyData } from './EmptyData'
import { Actions } from './Actions'

const tableVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 15,
    },
  },
}

const DataTableComponent = <T extends { id: string }>({
  data,
  columns,
  actions,
  selectedIds,
  className,
  onSelectChange,
}: DataTableProps<T>) => {
  const rowSelection: RowSelectionState = useMemo(() => {
    const selection: RowSelectionState = {}

    data.forEach((row, index) => {
      if (selectedIds?.includes(row.id)) {
        selection[index] = true
      }
    })

    return selection
  }, [data, selectedIds])

  const columnsWithSelectors = useMemo<ColumnDef<T>[]>(() => {
    let baseColumns = [...columns]

    if (onSelectChange) {
      const selectColumn: ColumnDef<T> = {
        id: 'select',
        header: ({ table }) => {
          const isAllSelected = table.getIsAllPageRowsSelected()
          const isSomeSelected = table.getIsSomePageRowsSelected()

          return (
            <Checkbox
              checked={isAllSelected || (isSomeSelected && 'indeterminate')}
              aria-label="Select all"
              onCheckedChange={(value) => {
                table.toggleAllPageRowsSelected(!!value)
              }}
            />
          )
        },
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            aria-label="Select row"
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
        ),
      }

      baseColumns = [selectColumn, ...baseColumns]
    }

    if (actions?.length) {
      const actionsColumn: ColumnDef<T> = {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => <Actions actions={actions} row={row.original} />,
      }

      baseColumns = [...baseColumns, actionsColumn]
    }

    return baseColumns
  }, [columns, actions, onSelectChange])

  const table = useReactTable({
    data,
    columns: columnsWithSelectors,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: handleRowSelectionChange,
    state: { rowSelection },
  })

  const hasData = table.getRowModel().rows.length > 0

  useEffect(() => {
    if (selectedIds && onSelectChange) {
      const validSelectedIds = selectedIds.filter((id) => data.some((row) => row.id === id))
      if (validSelectedIds.length !== selectedIds.length) {
        onSelectChange(validSelectedIds)
      }
    }
  }, [data, selectedIds, onSelectChange])

  function handleRowSelectionChange(updater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) {
    const newSelection = typeof updater === 'function' ? updater(rowSelection) : updater

    const newSelectedIds = Object.keys(newSelection)
      .filter((index) => newSelection[Number(index)])
      .map((index) => data[Number(index)]?.id)
      .filter(Boolean) as string[]

    onSelectChange?.(newSelectedIds)
  }

  return (
    <motion.div variants={tableVariants} initial="hidden" animate="show" className={clsx('w-full', className)}>
      <div className="overflow-hidden rounded-md border">
        {hasData ? (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="px-2 h-[50px] w-auto whitespace-nowrap font-medium text-gray-600 text-13 leading-4"
                    >
                      {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyData />
        )}
      </div>
      {hasData && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected
          </div>
          <div className="space-x-2">
            <Button variant="tertiary" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              Previous
            </Button>
            <Button variant="tertiary" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export const DataTable = memo(DataTableComponent) as <T extends { id: string }>(props: DataTableProps<T>) => JSX.Element
