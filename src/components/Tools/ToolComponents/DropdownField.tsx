import React from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useRegisterField, FieldProps } from '@pcs/react-form-creator-core'

export interface DropdownFieldProps extends FieldProps {
  name: string
  label: string
  required?: boolean
  items: { value: string; text: string }[]
}

const DropdownField = (props: DropdownFieldProps) => {
  const { label, name, required } = props
  const fieldProps = useRegisterField(name, { required })

  const menuItems = props.items.map((item) => (
    <MenuItem
      key={item.value}
      value={item.value}
    >
      {item.text}
    </MenuItem>
  ))

  const labelId = `dropdown-label-${name}`
  const selectId = `dropdown-select-${name}`

  return (
    <FormControl required={required}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        label={label}
        {...fieldProps}
        id={selectId}
        labelId={labelId}
        required={props.required}
      >
        {menuItems}
      </Select>
    </FormControl>
  )
}

export default DropdownField
