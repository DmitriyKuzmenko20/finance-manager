import { DataNotFound } from '@/assets'

export const EmptyData = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[100px] px-4 py-8">
      <DataNotFound />
      <h2 className="mt-2 text-xl">No data</h2>
    </div>
  )
}
