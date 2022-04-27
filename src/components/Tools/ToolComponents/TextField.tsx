import React from 'react'
import MuiTextField from '@mui/material/TextField'
import { getPrefixAndSuffixAddornments } from './util/adornments'

export interface TextFieldProps {
  name: string
  label: string
  placeholder?: string
  multiline?: boolean
  required?: boolean
  prefix?: string
  suffix?: string
}

const TextField = (props: TextFieldProps) => {
  const { prefix, suffix, ...otherProps } = props
  const inputProps = getPrefixAndSuffixAddornments({ prefix, suffix })

  return <MuiTextField variant="outlined" {...otherProps} inputProps={inputProps} />
}

export default TextField