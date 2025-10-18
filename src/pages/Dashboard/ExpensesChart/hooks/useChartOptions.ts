import { useMemo } from 'react'
import { ApexOptions } from 'apexcharts'
import { Expense } from '@/store/expensesStore/models'
import { formatPrice } from '@/utils'

type ChartData = {
  category: string
  amount: number
}

export const useChartOptions = (expenses: Expense[]) => {
  return useMemo(() => {
    const grouped = expenses.reduce<Record<string, number>>((acc, { category, amount }) => {
      acc[category] = (acc[category] || 0) + amount
      return acc
    }, {})

    const data: ChartData[] = Object.entries(grouped).map(([category, amount]) => ({
      category,
      amount,
    }))

    const sortedData = [...data].sort((a, b) => b.amount - a.amount)
    const categories = sortedData.map((d) => d.category)
    const amountSeries = sortedData.map((d) => d.amount)
    const totalExpenses = Number(amountSeries.reduce((sum, v) => sum + v, 0).toFixed(2))

    const options: ApexOptions = {
      chart: {
        type: 'donut',
        animations: {
          enabled: true,
          speed: 800,
          animateGradually: { enabled: true, delay: 100 },
          dynamicAnimation: { enabled: true, speed: 400 },
        },
        events: {
          dataPointMouseEnter: (event) => {
            if (event?.target) {
              ;(event.target as HTMLElement).style.cursor = 'pointer'
            }
          },
          dataPointMouseLeave: (event) => {
            if (event?.target) {
              ;(event.target as HTMLElement).style.cursor = 'default'
            }
          },
        },
      },
      labels: categories,
      tooltip: {
        theme: 'dark',
        y: {
          formatter: (value: number) => `${formatPrice(value)}`,
        },
        x: {
          formatter: (_, options) => options?.w?.globals?.labels[options.seriesIndex],
        },
      },
      legend: { show: false },
      dataLabels: { enabled: false },
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
            labels: {
              show: true,
              name: { show: false },
              value: {
                show: true,
                color: '#0a0a0a',
                fontSize: '18px',
                offsetY: 30,
                formatter: (val: string) => formatPrice(Number(val)),
              },
              total: {
                show: true,
                label: '',
                color: '#0a0a0a',
                fontSize: '18px',
                formatter: () => formatPrice(totalExpenses),
              },
            },
          },
        },
      },
      stroke: { width: 1 },
      colors: [
        '#008FFB',
        '#00E396',
        '#FEB019',
        '#FF4560',
        '#775DD0',
        '#3F51B5',
        '#546E7A',
        '#D4526E',
        '#8D5B4C',
        '#F86624',
        '#2E93fA',
        '#66DA26',
        '#E91E63',
        '#FF9800',
        '#9C27B0',
      ],
    }

    return { options, series: amountSeries, categories }
  }, [expenses])
}
