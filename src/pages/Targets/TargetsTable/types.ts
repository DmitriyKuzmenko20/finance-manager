import { Target } from '@/store/targetsStore/models'

export type TargetsTableProps = {
  onEditClick: (target: Target) => void
}

export type TargetWithExpenses = Target & {
  currentSpent: number
  remaining: number
  isExceeded: boolean
}
