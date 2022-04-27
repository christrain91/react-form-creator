import InputAdornment from '@mui/material/InputAdornment'
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'
import React from 'react'

export function getPrefixAndSuffixAddornments({ prefix, suffix }: { prefix?: string, suffix?: string }) {
  const inputProps: MuiTextFieldProps["inputProps"] = {}

  if (prefix) {
    inputProps.startAdornment = <InputAdornment position="start">{prefix}</InputAdornment>
  }
  if (suffix) {
    inputProps.endAdornment = <InputAdornment position="end">{suffix}</InputAdornment>
  }

  return inputProps
}
