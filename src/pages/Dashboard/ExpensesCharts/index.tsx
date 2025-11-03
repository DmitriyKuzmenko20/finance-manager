import { NotepadText } from 'lucide-react'
import { WidgetTitle } from '../WidgetTitle'
import { DonutChart } from './DonutChart'
import { AreaChart } from './AreaChart'
import { ExpensesChartsProps } from './types'

export const ExpensesCharts = ({ expenses }: ExpensesChartsProps) => {
  const hasExpenses = !!expenses.length

  return (
    <div className="w-full p-4 mt-4 rounded-xl border border-gray-100">
      <WidgetTitle title="Total Expenses" subTitle="See your expenses" icon={<NotepadText className="size-4" />} />
      <div className="flex flex-col items-center justify-center min-h-96">
        {hasExpenses ? (
          <div className="grid grid-col-1 gap-4 md:grid-cols-[1fr_auto_1fr]">
            <DonutChart expenses={expenses} />
            <div className="w-full h-[1px] bg-gray-100 md:w-[1px] md:h-full" />
            <AreaChart expenses={expenses} />
          </div>
        ) : (
          <p>No expenses available yet</p>
        )}
      </div>
    </div>
  )
}
