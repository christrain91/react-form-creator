import React from 'react'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import InputLabel from '@mui/material/InputLabel'
import VerticalIcon from '@mui/icons-material/ViewColumn'

type Orientation = 'vertical' | 'horizontal'

interface OrientationSelectorProps {
  label: string
  value: Orientation | unknown
  onChange: (value: Orientation) => void
}

const OrientationSelector = (props: OrientationSelectorProps) => {
  const { value, onChange } = props

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string | undefined
  ) => {
    onChange((newAlignment || value) as Orientation)
  }

  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleChange}
        aria-label={props.label}
      >
        <ToggleButton
          value="horizontal"
          aria-label="horizontal"
        >
          <VerticalIcon />
        </ToggleButton>
        <ToggleButton
          value="vertical"
          aria-label="vertical"
        >
          <VerticalIcon className="rotate-90" />
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  )
}

export default OrientationSelector
