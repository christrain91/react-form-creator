import React from 'react'
import TextField from '@mui/material/TextField'
import { getPrefixAndSuffixAddornments } from './util/adornments'

export interface NumberFieldProps {
  name: string
  label: string
  required?: boolean
  min?: number
  max?: number
  prefix?: string
  suffix?: string
}

const NumberField = (props: NumberFieldProps) => {
  const { prefix, suffix, min, max, ...otherProps } = props
  const inputProps = getPrefixAndSuffixAddornments({ prefix, suffix })

  return <TextField type="number" variant='outlined' inputProps={{ ...inputProps, min, max }}  {...otherProps} />
}

export default NumberField