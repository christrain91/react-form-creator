import React from 'react'
import Button from '@mui/material/Button'
import { ToolInstance } from 'types/index'
import { isString, isBoolean, isFunction, isNumber } from 'lodash'
import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import generateLabelForFieldName from 'utils/generateLabelForFieldName'
import { useTools } from 'context/ToolContext'

interface ToolOptionsProps {
  toolInstance: ToolInstance<any>
  className?: string
}

const ToolOptions = (props: ToolOptionsProps) => {
  const { options, optionFields } = props.toolInstance
  const { updateToolInstance, removeToolInstance } = useTools()

  const handleChange = (key: string, value: any) => {
    const newOptions = { ...options, [key]: value }
    updateToolInstance({ ...props.toolInstance, options: newOptions })
  }

  const entries = Object.entries(options)

  return (
    <div className={props.className}>
      <div className="p-3 flex flex-col gap-y-4">
        {entries.map(([key, value]) => {
          const label = generateLabelForFieldName(key)
          let component: JSX.Element | null = null

          if (optionFields && optionFields.hasOwnProperty(key)) {
            const OptionComponent = optionFields[key]
            if (!isFunction(OptionComponent)) {
              return null
            }
            const props = {
              label,
              value,
              onChange: (value: unknown) => handleChange(key, value)
            }
            component = (
              <OptionComponent
                key={key}
                {...props}
              />
            )
          } else if (isString(value) || isNumber(value)) {
            component = (
              <TextField
                type={isNumber(value) ? 'number' : 'text'}
                variant="outlined"
                key={key}
                label={label}
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            )
          } else if (isBoolean(value)) {
            component = (
              <FormControlLabel
                label={label}
                control={
                  <Switch
                    checked={value}
                    onChange={(e) => handleChange(key, e.target.checked)}
                  />
                }
              />
            )
          }

          return <React.Fragment key={key}>{component}</React.Fragment>
        })}
      </div>
      <Button
        color="error"
        onClick={() => removeToolInstance(props.toolInstance)}
      >
        Remove Tool
      </Button>
    </div>
  )
}

export default ToolOptions
