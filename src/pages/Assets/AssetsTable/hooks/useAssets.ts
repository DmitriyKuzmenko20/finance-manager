import { useCallback, useMemo, useState } from 'react'
import { useAssetsStore } from '@/store'
import { Asset, AssetTypeFilter } from '@/store/assetsStore/models'

export const useAssets = (onEditClick: (asset: Asset) => void) => {
  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const assets = useAssetsStore((state) => state.assets)
  const filters = useAssetsStore((state) => state.filters)
  const deleteAssets = useAssetsStore((state) => state.deleteAssets)
  const setFilters = useAssetsStore((state) => state.setFilters)

  const typeFilter = filters.type

  const filteredAssets = useMemo(() => {
    const searchableKeys = ['title', 'amount', 'type', 'category'] as const

    const searchedAssets = assets.filter((asset) =>
      searchableKeys.some((key) => {
        const value = asset[key]
        return String(value).toLowerCase().includes(search.toLowerCase())
      })
    )
    const filteredAssets = filters?.type
      ? searchedAssets.filter((asset) => asset.type === filters.type)
      : searchedAssets

    return filteredAssets
  }, [assets, search, filters])

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const handleSelectChange = useCallback((ids: string[]) => {
    setSelectedIds(ids)
  }, [])

  const handleEditClick = useCallback(
    (asset: Asset) => {
      onEditClick(asset)
    },
    [onEditClick]
  )

  const handleDeleteClick = useCallback(
    (asset: Asset) => {
      deleteAssets([asset.id])
    },
    [deleteAssets]
  )

  const handleBulkDeleteClick = useCallback(() => {
    deleteAssets(selectedIds)
    handleSelectChange([])
  }, [selectedIds, deleteAssets, handleSelectChange])

  const handleTypeFilterChange = useCallback(
    (value: string | null) => {
      const newFilters = {
        type: value as AssetTypeFilter,
      }

      setFilters(newFilters)
    },
    [setFilters]
  )

  return {
    assets: filteredAssets,
    selectedIds,
    typeFilter,
    handleSearchChange,
    handleSelectChange,
    handleEditClick,
    handleDeleteClick,
    handleBulkDeleteClick,
    handleTypeFilterChange,
  }
}
