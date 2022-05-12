import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useRegisterField, FieldProps } from '@pcs/react-form-creator-core'

export interface DateSelectorProps extends FieldProps {
  label: string
  defaultDate?: Date
}

const DateSelector = (props: DateSelectorProps) => {
  const { name, label, defaultDate } = props
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    defaultDate || new Date()
  )
  const fieldProps = useRegisterField(name)

  return (
    <DatePicker
      value={selectedDate}
      label={label}
      onChange={(date: unknown) => setSelectedDate((date as Date) || null)}
      renderInput={(params) => (
        <TextField
          label={label}
          {...params}
          {...fieldProps}
        />
      )}
    />
  )
}

export default DateSelector
