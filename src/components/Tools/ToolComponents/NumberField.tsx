import React from 'react'
import TextField from '@mui/material/TextField'
import { getPrefixAndSuffixAddornments } from './util/adornments'
import { FieldProps } from '../../../types'
import { omit } from 'lodash'
import useRegisterField from 'hooks/useRegisterField'

export interface NumberFieldProps extends FieldProps {
  name: string
  label: string
  required?: boolean
  min?: number
  max?: number
  prefix?: string
  suffix?: string
}

const NumberField = (props: NumberFieldProps) => {
  const { prefix, suffix, min, max, name, required, ...otherProps } = props
  const fieldProps = useRegisterField(name, { min, max, required })
  const inputProps = getPrefixAndSuffixAddornments({ prefix, suffix })

  return (
    <TextField
      type="number"
      variant="outlined"
      {...fieldProps}
      InputProps={{ ...inputProps }}
      inputProps={{ min, max }}
      {...omit(otherProps, 'toolInstance')}
    />
  )
}

export default NumberField
