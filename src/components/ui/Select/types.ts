// types.ts
import * as SelectPrimitive from '@radix-ui/react-select'

export type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
  hideIcon?: boolean
}

export type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
  position?: 'popper' | 'item-aligned'
}

export type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
  hideIcon?: boolean
}

export type SelectLabelProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>

export type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>

export type SelectScrollButtonProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.ScrollUpButton | typeof SelectPrimitive.ScrollDownButton
>
