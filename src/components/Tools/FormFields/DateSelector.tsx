import React from 'react'
import { TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useState } from 'react'

const DateSelector = (options: Record<string, unknown>) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const name = options.name as string
  const label = options.label as string

  return <DatePicker value={selectedDate} onChange={((date: unknown) => setSelectedDate((date as Date) || null))} label={options.label as string}
    renderInput={(params) => <TextField label={label} {...params} name={name} />}
  />
}

export default DateSelector