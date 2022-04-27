import React from 'react'
import IconButton from '@mui/material/IconButton'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import StopIcon from '@mui/icons-material/Stop'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

interface ToolControlsProps {
  className?: string
  isSelected: boolean
  onEditClick: () => void
  onRemoveClick: () => void
  onMoveUpClick: () => void
  onMoveDownClick: () => void
}

const ToolControls = (props: ToolControlsProps) => {
  return <div className={`${props.className} flex gap-x-2 mb-2`}>
    <IconButton aria-label="move up" size="small" onClick={props.onMoveUpClick}>
      <ArrowUpwardIcon fontSize="inherit" />
    </IconButton>
    <IconButton aria-label="move down" size="small" onClick={props.onMoveDownClick}>
      <ArrowDownwardIcon fontSize="inherit" />
    </IconButton>
    <IconButton aria-label="edit" size="small" onClick={props.onEditClick}>
      {props.isSelected ? <StopIcon fontSize="inherit" /> : <EditIcon fontSize="inherit" />}
    </IconButton>
    <IconButton aria-label="delete" size="small" onClick={props.onRemoveClick}>
      <DeleteIcon fontSize="inherit" />
    </IconButton>
  </div>
}

export default ToolControls