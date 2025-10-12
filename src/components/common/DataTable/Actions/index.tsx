import { memo, JSX } from 'react'
import { DotsIcon } from '@/assets'
import { ActionsProps } from './types'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components'

const ActionsComponent = <T,>({ actions, row }: ActionsProps<T>) => {
  return (
    <Select
      onValueChange={(value) => {
        const selected = actions[Number(value)]
        if (selected) selected.action(row)
      }}
    >
      <SelectTrigger hideIcon className="w-auto h-auto p-1 cursor-pointer border-none shadow-none hover:bg-gray-200">
        <DotsIcon className="rotate-90 size-4 text-gray-600" />
      </SelectTrigger>
      <SelectContent className="w-32">
        {actions.map((action, index) => (
          <SelectItem key={index} value={String(index)} hideIcon className={action?.className}>
            <div className="flex items-center gap-2">
              {action.icon}
              <span>{action.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export const Actions = memo(ActionsComponent) as <T>(props: ActionsProps<T>) => JSX.Element
