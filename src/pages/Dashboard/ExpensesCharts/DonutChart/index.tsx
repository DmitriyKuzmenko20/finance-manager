import { memo } from 'react'
import Chart from 'react-apexcharts'
import { DonutChartProps } from './types'
import { useDonutChartOptions } from './hooks'

export const DonutChart = memo(({ expenses }: DonutChartProps) => {
  const { options, series, categories } = useDonutChartOptions(expenses)

  return (
    <div>
      <Chart options={options} series={series} type="donut" width="100%" height="400" />
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category, i) => (
          <div key={category} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: options.colors?.[i % options.colors.length] }}
            />
            <span className="text-sm text-gray-800">{category}</span>
          </div>
        ))}
      </div>
    </div>
  )
})
