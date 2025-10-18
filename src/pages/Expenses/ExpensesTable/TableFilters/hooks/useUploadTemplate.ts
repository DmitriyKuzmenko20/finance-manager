import { ChangeEvent, useCallback, useState } from 'react'
import { useExpensesStore } from '@/store'
import { EXPENSE_TYPE, MAX_AMOUNT_COUNT, MAX_CATEGORY_COUNT, MAX_DESCRIPTION_COUNT, MAX_TITLE_COUNT } from '@/constant'
import { TEMPLATE_HEADER } from '../constant'
import { v4 as uuidv4 } from 'uuid'
import { BulkExpense, ExpenseType } from '@/store/expensesStore/models'

const MAX_FILE_LINES = 100
const MIN_FILE_LINE_LENGTH = 6
const START_ROW_INDEX = 2
const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/

type ValidatorMethod = (value: string, rowNumber: number) => string | null

const validatorMethods: Record<string, ValidatorMethod> = {
  [TEMPLATE_HEADER.AMOUNT]: (value, rowNumber) => {
    const amount = Number(value)

    if (isNaN(amount) || amount <= 0 || amount >= MAX_AMOUNT_COUNT) {
      return `Line ${rowNumber}: wrong amount format, should be more than 0 and less than ${MAX_AMOUNT_COUNT}`
    }

    return null
  },
  [TEMPLATE_HEADER.TITLE]: (value, rowNumber) => {
    if (value.length >= MAX_TITLE_COUNT) {
      return `Line ${rowNumber}: title length should be less than ${MAX_TITLE_COUNT}`
    }

    return null
  },
  [TEMPLATE_HEADER.DESCRIPTION]: (value, rowNumber) => {
    if (value.length >= MAX_DESCRIPTION_COUNT) {
      return `Line ${rowNumber}: description length should be less than ${MAX_DESCRIPTION_COUNT}`
    }

    return null
  },
  [TEMPLATE_HEADER.CATEGORY]: (value, rowNumber) => {
    if (value.length >= MAX_CATEGORY_COUNT) {
      return `Line ${rowNumber}: category length should be less than ${MAX_CATEGORY_COUNT}`
    }

    return null
  },
  [TEMPLATE_HEADER.TYPE]: (value, rowNumber) => {
    if (value !== EXPENSE_TYPE.BANK && value !== EXPENSE_TYPE.CASH) {
      return `Line ${rowNumber}: wrong type, should be ${EXPENSE_TYPE.BANK} or ${EXPENSE_TYPE.CASH}`
    }

    return null
  },
  [TEMPLATE_HEADER.DATE]: (value, rowNumber) => {
    if (!dateRegex.test(value)) {
      return `Line ${rowNumber}: wrong date format, should be DD/MM/YYYY`
    }

    return null
  },
}

export const useUploadTemplate = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  const setExpenses = useExpensesStore((state) => state.setExpenses)

  const validateValue = (value: string, header: string, rowNumber: number): string | null => {
    const trimmed = value.trim()

    if (!trimmed) {
      return `Line ${rowNumber}: there isn't any value in column ${header}`
    }

    const validatorMethod = validatorMethods[header]

    return validatorMethod ? validatorMethod(trimmed, rowNumber) : null
  }

  const handleUploadFile = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0] || null
    event.target.value = ''

    if (file) {
      const text = await file.text()
      const [headerLine, ...lines] = text.split('\n').map((line) => line.trim())
      const newErrors: string[] = []

      if (lines.length > MAX_FILE_LINES) setErrors([`File should contain less then ${MAX_FILE_LINES} lines`]) // validate file lines count

      if (headerLine) {
        const headers = headerLine.split(',')

        if (headers.length !== MIN_FILE_LINE_LENGTH) {
          newErrors.push(`Header row must contain ${MIN_FILE_LINE_LENGTH} records, found ${headers.length}`) // validate headers length
        }

        lines.forEach((line, rowIndex) => {
          if (!line) return // skip empty line

          const values = line.split(',')
          const rowNumber = rowIndex + START_ROW_INDEX // +2 because row 1 = headers

          if (values.length !== 6) {
            newErrors.push(`Row ${rowNumber} must contain ${MIN_FILE_LINE_LENGTH} records, found ${values.length}`) // validate each line length
            return
          }

          for (let i = 0; i < headers.length; i++) {
            const header = headers[i]
            const value = values[i] ?? ''

            const error = validateValue(value, header, rowNumber)
            if (error) {
              newErrors.push(error)
              return
            }
          }
        })

        setErrors(newErrors)
      }
    }

    setUploadedFile(file)
  }, [])

  const handleUploadClick = useCallback(async () => {
    if (!uploadedFile || errors.length > 0) return

    const text = await uploadedFile.text()
    const [headerLine, ...lines] = text.split('\n').map((line) => line.trim())
    const headers = headerLine.split(',')

    const expenses: BulkExpense[] = []

    lines.forEach((line) => {
      if (!line) return
      const values = line.split(',')

      const expense: BulkExpense = {
        id: uuidv4(),
        amount: Number(values[headers.indexOf(TEMPLATE_HEADER.AMOUNT)]),
        title: values[headers.indexOf(TEMPLATE_HEADER.TITLE)],
        description: values[headers.indexOf(TEMPLATE_HEADER.DESCRIPTION)],
        type: values[headers.indexOf(TEMPLATE_HEADER.TYPE)] as ExpenseType,
        category: values[headers.indexOf(TEMPLATE_HEADER.CATEGORY)],
      }

      expenses.push(expense)
    })

    setExpenses(expenses)
  }, [uploadedFile, errors, setExpenses])

  const handlerResetValues = useCallback(() => {
    setUploadedFile(null)
    setErrors([])
  }, [])

  return { uploadedFile, errors, handleUploadFile, handleUploadClick, handlerResetValues }
}
