import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

export interface CheckboxFieldProps {
  name: string
  label: string
  defaultChecked: boolean
}


const CheckboxField = (props: CheckboxFieldProps) => {
  const { name, label, defaultChecked } = props
  return <FormControlLabel control={<Checkbox name={name as string} defaultChecked={defaultChecked} />} label={label} />
}

export default CheckboxField