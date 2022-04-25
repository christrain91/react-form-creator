import React from 'react'
import Button from '@mui/material/Button'
import { ToolInstance } from '../../../types'
import { isString, isBoolean } from 'lodash'
import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Fragment } from 'react'
import generateLabelForFieldName from '../../../utils/generateLabelForFieldName'

interface ToolOptionsProps {
  tool: ToolInstance
  className?: string
  onChange: (tool: ToolInstance) => void
  onRemove: (tool: ToolInstance) => void
}

const ToolOptions = (props: ToolOptionsProps) => {
  const { options, optionsFields } = props.tool

  const handleChange = (key: string, value: any) => {
    const newOptions = { ...options, [key]: value }
    props.onChange({ ...props.tool, options: newOptions })
  }

  const entries = Object.entries(options)

  return <div className={props.className}>
    <div className="p-3 flex flex-col gap-y-4">
      {entries.map(([key, value]) => {
        const label = generateLabelForFieldName(key)

        if (optionsFields && optionsFields.hasOwnProperty(key)) {
          const props = { label, value, onChange: (value: unknown) => handleChange(key, value) }
          return <Fragment key={key}>{optionsFields[key](props)}</Fragment>
        }

        if (isString(value)) {
          return <TextField
            key={key}
            label={label}
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        }
        if (isBoolean(value)) {
          return <FormControlLabel label={label} control={
            <Switch checked={value} onChange={(e) => handleChange(key, e.target.checked)} />
          } />
        }
      })}
    </div>
    <Button color="error" onClick={() => props.onRemove(props.tool)}>Remove Tool</Button>
  </div >
}

export default ToolOptions