import React from 'react'
import MuiTextField from '@mui/material/TextField'
import { getPrefixAndSuffixAddornments } from './util/adornments'
import { FieldProps } from 'types/index'
import useRegisterField from 'hooks/useRegisterField'
import { omit } from 'lodash'

export interface TextFieldProps extends FieldProps {
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
      {...omit(otherProps, 'toolInstance')}
      InputProps={inputProps}
    />
  )
}

export default TextField
