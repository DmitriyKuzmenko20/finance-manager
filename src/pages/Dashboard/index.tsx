import { PageWrapper } from '@/components'
import { ExpensesChart } from './ExpensesChart'

const Dashboard = () => {
  return (
    <PageWrapper title="Dashboard" description="Track all your main data here">
      <ExpensesChart />
    </PageWrapper>
  )
}

export default Dashboard
