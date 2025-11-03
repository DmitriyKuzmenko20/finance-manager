import { useMemo } from 'react'
import { Coins, Link, TrendingUp } from 'lucide-react'
import { useAssetsStore, useExpensesStore } from '@/store'
import { ASSET_CATEGORY } from '@/constant'
import { PageWrapper } from '@/components'
import { ExpensesCharts } from './ExpensesCharts'
import { StatsWidget } from './StatsWidget'

const stats = [
  {
    label: 'Total stocks',
    category: ASSET_CATEGORY.STOCKS,
    cardClassName: 'bg-blue-50',
    icon: <TrendingUp className="size-6 text-blue-500" />,
  },
  {
    label: 'Total crypto',
    category: ASSET_CATEGORY.CRYPTO,
    cardClassName: 'bg-orange-50',
    icon: <Coins className="size-6 text-orange-500" />,
  },
  {
    label: 'Total bonds',
    category: ASSET_CATEGORY.BONDS,
    cardClassName: 'bg-green-50',
    icon: <Link className="size-6 text-green-500" />,
  },
]

const Dashboard = () => {
  const assets = useAssetsStore((state) => state.assets)
  const expenses = useExpensesStore((state) => state.expenses)

  const formattedStats = useMemo(() => {
    return stats.map((stat) => {
      const value = assets
        .filter((asset) => asset.category === stat.category)
        .reduce((prev, cur) => {
          return prev + cur.amount
        }, 0)

      return {
        ...stat,
        value,
      }
    })
  }, [assets])

  return (
    <PageWrapper title="Dashboard" description="Track all your main data here">
      <StatsWidget stats={formattedStats} />
      <ExpensesCharts expenses={expenses} />
    </PageWrapper>
  )
}

export default Dashboard
