import { memo } from 'react'
import Chart from 'react-apexcharts'
import { AreaChartProps } from './types'
import { useAreaChartOptions } from './hooks'

export const AreaChart = memo(({ expenses }: AreaChartProps) => {
  const { options, series } = useAreaChartOptions(expenses)

  return <Chart options={options} series={series} type="area" width="100%" height="400" />
})
