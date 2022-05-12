import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useRegisterField, FieldProps } from '@pcs/react-form-creator-core'

export interface CheckboxFieldProps extends FieldProps {
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
