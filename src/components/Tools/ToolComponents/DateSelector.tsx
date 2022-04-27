import React from 'react'
import { TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useState } from 'react'

export interface DateSelectorProps {
  name: string
  label: string
  defaultDate?: Date
}

const DateSelector = (props: DateSelectorProps) => {
  const { name, label, defaultDate } = props
  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultDate || new Date())

  return <DatePicker
    value={selectedDate}
    label={label}
    onChange={((date: unknown) => setSelectedDate((date as Date) || null))}
    renderInput={(params) => <TextField label={label} {...params} name={name} />}
  />
}

export default DateSelector