import { useEffect } from 'react'
import { Resolver, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ASSET_TYPE } from '@/constant'
import { Asset, AssetCategory, AssetType } from '@/store/assetsStore/models'
import { assetSchema } from '@/validation'

export type AssetFormValues = {
  amount: string
  title: string
  type: AssetType
  category?: AssetCategory
}

export const useManageAssetFormData = (initialAsset: Asset | undefined, isOpen: boolean) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<AssetFormValues>({
    resolver: yupResolver(assetSchema) as Resolver<AssetFormValues>,
    defaultValues: {
      amount: '',
      title: '',
      type: undefined,
      category: undefined,
    },
  })

  const isInvestmentsType = watch('type') === ASSET_TYPE.INVESTMENTS

  useEffect(() => {
    if (isOpen) {
      reset({
        amount: initialAsset?.amount?.toString() || '',
        title: initialAsset?.title || '',
        type: initialAsset?.type,
        category: initialAsset?.category,
      })
    }
  }, [initialAsset, isOpen, reset])

  return { isInvestmentsType, control, errors, register, handleSubmit }
}
