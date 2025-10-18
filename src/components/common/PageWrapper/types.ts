import { buttonVariants } from '@/components/ui/Button/variants'
import { VariantProps } from 'class-variance-authority'

export type PageWrapperProps = {
  title: string
  description?: string
  children?: React.ReactNode
  actionText?: string
  actionButtonVariant?: VariantProps<typeof buttonVariants>['variant']
  actionIcon?: React.ReactNode
  actionClassName?: string
  onActionClick?: VoidFunction
}
