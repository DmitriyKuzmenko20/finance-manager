import { WidgetTitleProps } from './types'

export const WidgetTitle = ({ title, subTitle, icon }: WidgetTitleProps) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center p-2 ring-1 ring-gray-100 size-10 rounded-lg">{icon}</div>
        <div>
          <p className="text-base font-semibold">{title}</p>
          {subTitle && <p className="mt-1 text-xs font-medium text-gray-600">{subTitle}</p>}
        </div>
      </div>
      <div className="w-full h-[1px] my-4 bg-gray-100" />
    </>
  )
}
