import { lazy, Suspense } from 'react'
import { NotepadText } from 'lucide-react'
import { WidgetTitle } from '../WidgetTitle'
import { ExpensesChartsProps } from './types'

const DonutChart = lazy(() => import('./DonutChart').then((module) => ({ default: module.DonutChart })))
const AreaChart = lazy(() => import('./AreaChart').then((module) => ({ default: module.AreaChart })))

const ChartSkeleton = () => (
  <div className="flex flex-col items-center justify-center space-y-4 w-full">
    <div className="w-96 h-96 bg-muted rounded-lg animate-pulse" />
  </div>
)

export const ExpensesCharts = ({ expenses }: ExpensesChartsProps) => {
  const hasExpenses = !!expenses.length

  return (
    <div className="w-full p-4 mt-4 rounded-xl border border-border">
      <WidgetTitle title="Total Expenses" subTitle="See your expenses" icon={<NotepadText className="size-4" />} />
      <div className="flex flex-col items-center justify-center min-h-96">
        {hasExpenses ? (
          <div className="grid grid-col-1 gap-4 md:grid-cols-[1fr_auto_1fr] w-full">
            <Suspense fallback={<ChartSkeleton />}>
              <DonutChart expenses={expenses} />
            </Suspense>
            <div className="w-full h-[1px] bg-border md:w-[1px] md:h-full" />
            <Suspense fallback={<ChartSkeleton />}>
              <AreaChart expenses={expenses} />
            </Suspense>
          </div>
        ) : (
          <p>No expenses available yet</p>
        )}
      </div>
    </div>
  )
}
