import { NotepadText } from 'lucide-react'
import { useExpensesStore } from '@/store'
import { WidgetTitle } from '../WidgetTitle'
import { DonutChart } from './DonutChart'
import { AreaChart } from './AreaChart'

export const ExpensesCharts = () => {
  const expenses = useExpensesStore((state) => state.expenses)

  const hasExpenses = !!expenses.length

  return (
    <div className="w-full p-4 rounded-xl shadow-sm border">
      <WidgetTitle title="Total Expenses" subTitle="See your expenses" icon={<NotepadText className="size-4" />} />
      <div className="flex flex-col items-center justify-center min-h-96">
        {hasExpenses ? (
          <div className="grid grid-col-1 gap-4 md:grid-cols-[1fr_auto_1fr]">
            <DonutChart expenses={expenses} />
            <div className="w-full h-[1px] bg-border md:w-[1px] md:h-full" />
            <AreaChart expenses={expenses} />
          </div>
        ) : (
          <p>No expenses available yet</p>
        )}
      </div>
    </div>
  )
}
