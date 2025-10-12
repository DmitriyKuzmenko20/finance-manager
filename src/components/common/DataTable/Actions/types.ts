import { Action } from '../types'

export type ActionsProps<T> = {
  actions: Action<T>[]
  row: T
}
