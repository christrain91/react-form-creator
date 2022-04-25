import React from 'react'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import NumberIcon from '@mui/icons-material/Numbers'
import CheckboxIcon from '@mui/icons-material/CheckBox'
import TitleIcon from '@mui/icons-material/Title'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { Tool } from '../../types'
import Typography from '@mui/material/Typography'
import Alignment, { AlignmentValue } from './OptionFields/Alignment'
import HeaderSelector, { HeaderType } from './OptionFields/HeaderSelector'
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Items from './OptionFields/Items'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import DateRangeIcon from '@mui/icons-material/DateRange'
import DateSelector from './FormFields/DateSelector'


const iconProps = {
  fontSize: 'large'
} as { fontSize: 'large' }

export const textField: Tool = {
  title: 'Text Field',
  tool_type: 'text',
  icon: <TextFieldsIcon {...iconProps} />,
  options: {
    label: 'Text Field',
    placeholder: 'Enter your text here...',
    required: true
  },
  optionsFields: {

  },
  render: (options: Record<string, unknown>) => {
    return <TextField {...(options as TextFieldProps)} />
  }
}

export const numberField: Tool = {
  title: 'Number Field',
  tool_type: 'number',
  icon: <NumberIcon {...iconProps} />,
  options: {
    label: 'Number Field',
    min: 0,
    max: 100,
    required: true
  },
  render: (options: Record<string, unknown>) => {
    return <TextField {...(options as TextFieldProps)} type="number" />
  }
}

export const checkboxField: Tool = {
  title: 'Checkbox',
  tool_type: 'checkbox',
  icon: <CheckboxIcon {...iconProps} />,
  options: {
    label: 'Checkbox Field',
    defaultChecked: false
  },
  render: (options: Record<string, unknown>) => {
    const checkboxOptions = options as { label: string, defaultChecked: boolean }
    return <FormControlLabel control={<Checkbox defaultChecked={checkboxOptions.defaultChecked} />} label={checkboxOptions.label} />
  }
}

export const header: Tool = {
  title: 'Header',
  tool_type: 'header',
  icon: <TitleIcon {...iconProps} />,
  options: {
    content: 'Header',
    headerType: 'h2',
    align: 'center'
  },
  optionsFields: {
    align: Alignment,
    headerType: HeaderSelector
  },
  render: (options: Record<string, unknown>) => {
    const { content } = options as { content: string }
    return <Typography align={options.align as AlignmentValue} variant={options.headerType as HeaderType}>{content || ''}</Typography>
  }
}

export const paragraph: Tool = {
  title: 'Paragraph',
  tool_type: 'paragraph',
  icon: <FormatIndentIncreaseIcon {...iconProps} />,
  options: {
    content: 'Paragraph',
    align: 'left'
  },
  optionsFields: {
    align: Alignment
  },
  render: (options: Record<string, unknown>) => {
    const { content } = options as { content: string }
    return <Typography align={options.align as AlignmentValue} variant="body1">{content || ''}</Typography>
  }
}

export const dropdown: Tool = {
  title: 'Dropdown',
  tool_type: 'dropdown',
  icon: <ArrowDropDownCircleIcon {...iconProps} />,
  options: {
    label: 'Dropdown',
    items: [{ value: 'option_1', text: 'First Option' }, { value: 'option_2', text: 'Second Option' }, { value: 'option_3', text: 'Third Option' }],
    multiple: false
  },
  optionsFields: {
    items: Items
  },
  render: (options: Record<string, unknown>) => {
    const menuItems = (options.items as { value: string, text: string }[]).map(item => (
      <MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>
    ))

    const label = options.label as string
    const name = options.name as string

    const labelId = `dropdown-label-${name}`
    const selectId = `dropdown-select-${name}`

    return <FormControl>
      <InputLabel id={labelId}>{options.label as string}</InputLabel>
      <Select
        label={label}
        name={name}
        id={selectId}
        labelId={labelId}
      >
        {menuItems}
      </Select>
    </FormControl>
  }
}

export const radioButton: Tool = {
  title: 'Radio Buttons',
  tool_type: 'radio',
  icon: <RadioButtonCheckedIcon {...iconProps} />,
  options: {
    label: 'Radio',
    items: [{ value: 'option_1', text: 'First Option' }, { value: 'option_2', text: 'Second Option' }, { value: 'option_3', text: 'Third Option' }],
  },
  optionsFields: {
    items: Items
  },
  render: (options: Record<string, unknown>) => {
    const label = options.label as string
    const name = options.name as string
    const items = options.items as { value: string, text: string }[]

    const labelId = `radio-label-${name}`
    const radioId = `radio-select-${name}`

    return <FormControl>
      <FormLabel id={labelId}>{label}</FormLabel>
      <RadioGroup
        id={radioId}
        aria-labelledby={labelId}
        defaultValue={items[0]?.value}
        name={name}
      >
        {items.map(item => <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.text} />)}
      </RadioGroup>
    </FormControl>
  }
}

export const dateField: Tool = {
  title: 'Date Field',
  tool_type: 'date',
  icon: <DateRangeIcon {...iconProps} />,
  render: (options: Record<string, unknown>) => {
    return <DateSelector {...options} />
  },
  options: {
    label: 'Date',
  }
}

const tools: Tool[] = [header, textField, dropdown, numberField, checkboxField, radioButton, paragraph, dateField]


export default tools

