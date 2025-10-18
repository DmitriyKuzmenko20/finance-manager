import Chart from 'react-apexcharts'
import { useExpensesStore } from '@/store'
import { useChartOptions } from './hooks'
import { WidgetTitle } from '../WidgetTitle'
import { Wallet } from 'lucide-react'

export const ExpensesChart = () => {
  const expenses = useExpensesStore((state) => state.expenses)

  const { options, series, categories } = useChartOptions(expenses)

  const hasExpenses = !!expenses.length

  return (
    <div className="w-full p-4 rounded-xl shadow-sm border md:w-1/2">
      <WidgetTitle title="Total Expenses" subTitle="See your expenses" icon={<Wallet className="size-4" />} />
      <div className="flex flex-col items-center justify-center min-h-96">
        {hasExpenses ? (
          <>
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
          </>
        ) : (
          <p>No expenses available yet</p>
        )}
      </div>
    </div>
  )
}
