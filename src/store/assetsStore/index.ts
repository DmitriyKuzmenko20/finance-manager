import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { Asset, AssetFilters } from './models'

interface AssetsState {
  assets: Asset[]
  filters: AssetFilters
  addAsset: (asset: Asset) => void
  deleteAssets: (ids: string[]) => void
  editAsset: (asset: Asset) => void
  setFilters: (filters: AssetFilters) => void
}

export const useAssetsStore = create<AssetsState>()(
  persist(
    immer((set) => ({
      assets: [],
      filters: {
        type: null,
      },
      addAsset: (asset) =>
        set((state) => {
          state.assets.push(asset)
        }),
      deleteAssets: (ids) =>
        set((state) => {
          state.assets = state.assets.filter((asset) => !ids.includes(asset.id))
        }),
      editAsset: (updatedAsset) =>
        set((state) => {
          const idx = state.assets.findIndex((asset) => asset.id === updatedAsset.id)
          if (idx !== -1) {
            state.assets[idx] = updatedAsset
          }
        }),
      setFilters: (filters) =>
        set((state) => {
          state.filters = filters
        }),
    })),
    {
      name: 'assets-storage',
    }
  )
)
