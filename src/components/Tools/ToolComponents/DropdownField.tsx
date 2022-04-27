import React from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export interface DropdownFieldProps {
  name: string
  label: string
  required?: boolean
  items: { value: string, text: string }[]
}

const DropdownField = (props: DropdownFieldProps) => {
  const { label, name, required } = props

  const menuItems = (props.items).map(item => (
    <MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>
  ))

  const labelId = `dropdown-label-${name}`
  const selectId = `dropdown-select-${name}`

  return <FormControl required={required}>
    <InputLabel id={labelId}>{label}</InputLabel>
    <Select
      label={label}
      name={name}
      id={selectId}
      labelId={labelId}
      required={props.required}
    >
      {menuItems}
    </Select>
  </FormControl>
}

export default DropdownField