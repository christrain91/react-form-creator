import React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import InputLabel from '@mui/material/InputLabel'
import { AlignmentValue } from '../../../types/index'

interface AlignmentProps {
  label: string
  value: AlignmentValue | unknown
  onChange: (value: AlignmentValue) => void
}

const Alignment = (props: AlignmentProps) => {
  const { value, onChange } = props

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string | undefined
  ) => {
    onChange((newAlignment || value) as AlignmentValue)
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
          value="left"
          aria-label="left aligned"
        >
          <FormatAlignLeftIcon />
        </ToggleButton>
        <ToggleButton
          value="center"
          aria-label="centered"
        >
          <FormatAlignCenterIcon />
        </ToggleButton>
        <ToggleButton
          value="right"
          aria-label="right aligned"
        >
          <FormatAlignRightIcon />
        </ToggleButton>
        <ToggleButton
          value="justify"
          aria-label="justified"
        >
          <FormatAlignJustifyIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  )
}

export default Alignment
