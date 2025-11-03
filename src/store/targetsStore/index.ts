import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { Target } from './models'

interface TargetsState {
  targets: Target[]
  addTarget: (target: Target) => void
  deleteTargets: (ids: string[]) => void
  editTarget: (target: Target) => void
}

export const useTargetsStore = create<TargetsState>()(
  persist(
    immer((set) => ({
      targets: [],
      addTarget: (target) =>
        set((state) => {
          state.targets.unshift(target)
        }),
      deleteTargets: (ids) =>
        set((state) => {
          state.targets = state.targets.filter((target) => !ids.includes(target.id))
        }),
      editTarget: (updatedTarget) =>
        set((state) => {
          const idx = state.targets.findIndex((target) => target.id === updatedTarget.id)
          if (idx !== -1) {
            state.targets[idx] = updatedTarget
          }
        }),
    })),
    {
      name: 'targets-storage',
    }
  )
)
