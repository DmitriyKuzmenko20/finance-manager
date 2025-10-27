import { useMemo } from 'react'
import { ApexOptions } from 'apexcharts'
import { parse } from 'date-fns'
import { Expense } from '@/store/expensesStore/models'
import { formatPrice } from '@/utils'

export const useAreaChartOptions = (expenses: Expense[]) => {
  return useMemo(() => {
    const groupedExpenses: Record<string, number> = {}

    expenses.forEach(({ amount, date }) => {
      const d = parse(date, 'dd/MM/yyyy', new Date())
      const firstDay = new Date(d.getFullYear(), d.getMonth(), 1)

      const key = firstDay.toLocaleDateString('en-US')

      if (!groupedExpenses[key]) {
        groupedExpenses[key] = 0
      }
      groupedExpenses[key] += Number(amount)
    })

    const values = Object.values(groupedExpenses)
    const formattedSeries = Object.entries(groupedExpenses)
      .map(([date, value]) => ({
        x: new Date(date).getTime(),
        y: value,
      }))
      .sort((a, b) => a.x - b.x)

    const seriesData = [
      {
        name: 'Expenses',
        data: formattedSeries,
        color: '#3b82f6',
      },
    ]

    const options: ApexOptions = {
      chart: {
        id: 'expenses-chart',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          type: 'vertical',
          shadeIntensity: 1,
          opacityFrom: 0.6,
          opacityTo: 0,
          stops: [0, 80],
          colorStops: [
            {
              offset: 0,
              color: '#3b82f6',
              opacity: 0.2,
            },
            {
              offset: 90,
              color: '#3b82f6',
              opacity: 0,
            },
          ],
        },
      },
      stroke: {
        width: 2,
        curve: 'straight',
      },
      markers: {
        size: 0,
        strokeColors: '#3b82f6',
        colors: '#ffffff',
        strokeWidth: 2,
        hover: {
          size: 5,
        },
      },
      xaxis: {
        type: 'category',
        labels: {
          formatter: (val) => {
            const d = new Date(val)
            const month = d.toLocaleString('en-US', {
              month: 'short',
            })

            return month
          },
          style: {
            colors: '#525866',
            fontFamily: 'inherit',
            fontSize: '12px',
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        min: Math.min(...values) >= 0 ? 0 : undefined,
        labels: {
          formatter: (value) => formatPrice(value),
          style: {
            colors: '#71717A',
            fontFamily: 'inherit',
            fontSize: '12px',
          },
          offsetX: -6,
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const date = new Date(w.globals.seriesX[seriesIndex][dataPointIndex])
          const formattedDate = date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })

          const value = series[seriesIndex][dataPointIndex]
          const price = formatPrice(value)

          return `
              <div style="padding-top: 8px; padding-bottom: 8px; padding-left: 10px; padding-right: 10px; border-radius: 8px; background-color: #0E121B;">
                  <p style="font-size: 12px; line-height: 16px; font-weight: 600; color: #ffffff;">${formattedDate}</p>
                  <p style="margin-top: 6px; font-size: 12px; line-height: 16px; color: #ffffff;">${price}</p>
              </div>
          `;
        },
      },
      legend: {
        show: false,
      },
      grid: {
        borderColor: 'transparent',
      },
    }

    return {
      options,
      series: seriesData,
    }
  }, [expenses])
}
