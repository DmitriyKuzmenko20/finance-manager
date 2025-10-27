import { PageWrapper } from '@/components'
import { ExpensesCharts } from './ExpensesCharts'

const Dashboard = () => {
  return (
    <PageWrapper title="Dashboard" description="Track all your main data here">
      <ExpensesCharts />
    </PageWrapper>
  )
}

export default Dashboard
