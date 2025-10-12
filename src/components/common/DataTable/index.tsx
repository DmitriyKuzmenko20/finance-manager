import { memo, useMemo, useState, JSX, useEffect } from 'react'
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
import { DataTableProps } from './types'
import { Button, Checkbox, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components'
import { EmptyData } from './EmptyData'
import { Actions } from './Actions'

const DataTableComponent = <T extends { id: string }>({
  data,
  columns,
  actions,
  className,
  onSelectChange,
}: DataTableProps<T>) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

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
    if (onSelectChange) {
      const selectedIds = Object.keys(rowSelection)
        .filter((index) => rowSelection[Number(index)])
        .map((index) => data[Number(index)]?.id)
      onSelectChange(selectedIds)
    }
  }, [rowSelection, onSelectChange, data])

  function handleRowSelectionChange(updater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) {
    setRowSelection((prev) => {
      const newSelection = typeof updater === 'function' ? updater(prev) : updater
      return newSelection
    })
  }

  return (
    <div className={clsx('w-full', className)}>
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
    </div>
  )
}

export const DataTable = memo(DataTableComponent) as <T extends { id: string }>(props: DataTableProps<T>) => JSX.Element
