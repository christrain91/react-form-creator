import React from 'react'
import MuiTextField from '@mui/material/TextField'
import { getPrefixAndSuffixAddornments } from './util/adornments'
import { FieldProps } from '../../../types'
import useRegisterField from 'hooks/useRegisterField'
import InputAdornment from '@mui/material/InputAdornment'

export interface TextFieldProps extends FieldProps {
  name: string
  label: string
  placeholder?: string
  multiline?: boolean
  required?: boolean
  prefix?: string
  suffix?: string
}

const TextField = (props: TextFieldProps) => {
  const { prefix, suffix, name, required, ...otherProps } = props
  const fieldProps = useRegisterField(name, { required })
  const inputProps = getPrefixAndSuffixAddornments({ prefix, suffix })

  return (
    <MuiTextField
      variant="outlined"
      required={required}
      {...fieldProps}
      {...otherProps}
      InputProps={inputProps}
    />
  )
}

export default TextField
