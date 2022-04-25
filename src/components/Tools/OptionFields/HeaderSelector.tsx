import React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import InputLabel from '@mui/material/InputLabel'

export type HeaderType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface HeaderSelectorProps {
  label: string
  value: HeaderType | unknown
  onChange: (value: HeaderType) => void
}

const HeaderSelector = (props: HeaderSelectorProps) => {
  const { value, onChange } = props

  const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string | undefined) => {
    onChange((newValue || value) as HeaderType)
  }

  return <>
    <InputLabel>
      {props.label}
    </InputLabel>
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      aria-label={props.label}
    >
      <ToggleButton value="h1" aria-label="left aligned">
        H1
      </ToggleButton>
      <ToggleButton value="h2" aria-label="centered">
        H2
      </ToggleButton>
      <ToggleButton value="h3" aria-label="right aligned">
        H3
      </ToggleButton>
      <ToggleButton value="h4" aria-label="justified">
        H4
      </ToggleButton>
    </ToggleButtonGroup>
  </>
}

export default HeaderSelector