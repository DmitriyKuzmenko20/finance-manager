import { cn } from '@/lib/utils'
import type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
} from './types'

const Table = ({ className, ...props }: TableProps) => {
  return (
    <div className="relative w-full overflow-auto">
      <table className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  )
}

const TableHeader = ({ className, ...props }: TableHeaderProps) => {
  return <thead className={cn('[&_tr]:border-b', className)} {...props} />
}

const TableBody = ({ className, ...props }: TableBodyProps) => {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
}

const TableFooter = ({ className, ...props }: TableFooterProps) => {
  return <tfoot className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)} {...props} />
}

const TableRow = ({ className, ...props }: TableRowProps) => {
  return (
    <tr
      className={cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)}
      {...props}
    />
  )
}

const TableHead = ({ className, ...props }: TableHeadProps) => {
  return (
    <th
      className={cn(
        'h-10 px-2 text-left align-middle font-medium text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}

const TableCell = ({ className, ...props }: TableCellProps) => {
  return (
    <td
      className={cn('p-2 align-middle', className)}
      {...props}
    />
  )
}

const TableCaption = ({ className, ...props }: TableCaptionProps) => {
  return <caption className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
}

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption }
