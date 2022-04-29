import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { FieldProps } from '../../../types'
import useRegisterField from 'hooks/useRegisterField'
export interface CheckboxFieldProps extends FieldProps {
  name: string
  label: string
  defaultChecked: boolean
}

const CheckboxField = (props: CheckboxFieldProps) => {
  const { name, label, defaultChecked } = props
  const fieldProps = useRegisterField(name)
  return (
    <FormControlLabel
      control={
        <Checkbox
          {...fieldProps}
          defaultChecked={defaultChecked}
        />
      }
      label={label}
    />
  )
}

export default CheckboxField
