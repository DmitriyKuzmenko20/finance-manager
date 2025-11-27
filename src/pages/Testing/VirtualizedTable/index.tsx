import { useState } from 'react'
import { TableVirtuoso } from 'react-virtuoso'
import { getUsers, User } from './utils'
import { LoadingIcon } from '@/assets'

const headerCellStyles =
  'h-10 px-4 text-left align-middle font-medium text-muted-foreground whitespace-nowrap bg-gray-200'
const cellStyles = 'p-4 align-middle truncate'

const renderHeaderContent = () => (
  <tr className="border-b transition-colors">
    <th className={headerCellStyles}>ID</th>
    <th className={headerCellStyles}>Name</th>
    <th className={headerCellStyles}>Email</th>
    <th className={headerCellStyles}>Phone</th>
    <th className={headerCellStyles}>Role</th>
    <th className={headerCellStyles}>Department</th>
  </tr>
)

const renderRowContent = (_index: number, user: User) => (
  <>
    <td className={cellStyles}>{user.id}</td>
    <td className={cellStyles}>{user.name}</td>
    <td className={cellStyles}>{user.email}</td>
    <td className={cellStyles}>{user.phone}</td>
    <td className={cellStyles}>{user.role}</td>
    <td className={cellStyles}>{user.department}</td>
  </>
)

const renderFooterContent = () => (
  <tr>
    <td colSpan={6}>
      <div className="flex items-center justify-center gap-2 p-3 border-t bg-muted/50">
        <LoadingIcon />
        <span className="text-sm text-muted-foreground">Loading more...</span>
      </div>
    </td>
  </tr>
)

export const VirtualizedTable = () => {
  const [users, setUsers] = useState<User[]>(getUsers(0, 20))
  const [isLoading, setIsLoading] = useState(false)

  const fetchNextPage = async () => {
    setIsLoading(true)

    const newUsers = getUsers(users.length, users.length + 20)

    setTimeout(() => {
      setUsers((prev) => [...prev, ...newUsers])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="mt-4 overflow-hidden rounded-md border">
      <TableVirtuoso
        data={users}
        components={{
          Table: (props) => <table {...props} className="w-full table-fixed" />,
        }}
        itemContent={renderRowContent}
        fixedHeaderContent={renderHeaderContent}
        fixedFooterContent={isLoading ? renderFooterContent : null}
        className="!h-96"
        endReached={fetchNextPage}
      />
    </div>
  )
}
