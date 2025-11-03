import { memo, useCallback } from 'react'
import Picker from 'react-datepicker'
import clsx from 'clsx'
import { format } from 'date-fns'
import { DatePickerProps } from './types'
import { CalendarIcon } from 'lucide-react'
import 'react-datepicker/dist/react-datepicker.css'

export const DatePicker = memo(
  ({
    selectedDate,
    dateFormat = 'dd/MM/yyyy',
    label,
    isRequired,
    isDisabled,
    error,
    containerClassName,
    onChange,
  }: DatePickerProps) => {
    const onDateChange = useCallback(
      (date: Date | null) => {
        const formattedDate = date ? format(date, dateFormat) : ''
        onChange(formattedDate)
      },
      [dateFormat, onChange]
    )

    return (
      <div className={containerClassName}>
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
            {isRequired && <span className="ml-1 text-red-500">&#42;</span>}
          </label>
        )}
        <Picker
          selected={selectedDate}
          placeholderText="Select date"
          showPopperArrow={false}
          dateFormat={dateFormat}
          disabled={isDisabled}
          minDate={new Date()}
          showIcon
          icon={<CalendarIcon className="absolute top-0 right-0 size-4 text-muted-foreground" />}
          className={clsx(
            'flex w-full items-center justify-between whitespace-nowrap rounded-md border border-gray-100 bg-transparent h-8 !px-2 py-1 text-sm shadow-sm cursor-pointer placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            error && 'ring-red-500'
          )}
          wrapperClassName="relative w-full"
          calendarClassName="custom-date-picker !border-gray-100"
          onChange={onDateChange}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)
