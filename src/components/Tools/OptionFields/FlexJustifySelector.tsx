import React from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { FlexJustify } from '../../../types'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

interface FlexJustifySelectorProps {
  value: FlexJustify
  label: string
  onChange: (value: FlexJustify) => void
}

const items = [
  {
    value: 'justify-start',
    text: 'Justify Start'
  },
  {
    value: 'justify-end',
    text: 'Justfiy End'
  },
  {
    value: 'justify-center',
    text: 'Justify Center'
  },
  {
    value: 'justify-between',
    text: 'Space Between'
  },
  {
    value: 'justify-around',
    text: 'Space Around'
  },
  {
    value: 'justify-evenly',
    text: 'Space Evenly'
  }
]

const menuItems = items.map((item) => (
  <MenuItem
    key={item.value}
    value={item.value}
  >
    {item.text}
  </MenuItem>
))

const FlexJustifySelector = (props: FlexJustifySelectorProps) => {
  return (
    <FormControl>
      <InputLabel>{props.label}</InputLabel>
      <Select
        label={props.label}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value as FlexJustify)}
      >
        {menuItems}
      </Select>
    </FormControl>
  )
}

export default FlexJustifySelector
