import React from 'react'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import { FieldProps } from 'types/index'
import useRegisterField from 'hooks/useRegisterField'

export interface RadioButtonsProps extends FieldProps {
  label: string
  name: string
  items: { value: string; text: string }[]
}

const RadioButtons = (props: RadioButtonsProps) => {
  const { label, name, items } = props

  const fieldProps = useRegisterField(name)

  const labelId = `radio-label-${name}`
  const radioId = `radio-select-${name}`

  return (
    <FormControl>
      <FormLabel id={labelId}>{label}</FormLabel>
      <RadioGroup
        id={radioId}
        aria-labelledby={labelId}
        defaultValue={items[0]?.value}
        {...fieldProps}
      >
        {items.map((item) => (
          <FormControlLabel
            key={item.value}
            value={item.value}
            control={<Radio />}
            label={item.text}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default RadioButtons
