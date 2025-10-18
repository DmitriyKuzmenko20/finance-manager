import { useCallback } from 'react'
import { TEMPLATE_HEADER } from '../constant'

export const useDownloadTemplate = () => {
  const onDownloadTemplateClick = useCallback(() => {
    const headers = [
      TEMPLATE_HEADER.AMOUNT,
      TEMPLATE_HEADER.TITLE,
      TEMPLATE_HEADER.DESCRIPTION,
      TEMPLATE_HEADER.CATEGORY,
      TEMPLATE_HEADER.TYPE,
      TEMPLATE_HEADER.DATE,
    ]
    const values = ['1', '1', '1', '1', 'Bank', '20/05/2025']

    const csvContent = [headers.join(','), values.join(',')].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })

    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'data.csv')
    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [])

  return { onDownloadTemplateClick }
}
