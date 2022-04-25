import React from 'react'
import IconButton from '@mui/material/IconButton'
import { ToolInstance } from '../../../types'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import StopIcon from '@mui/icons-material/Stop'


interface ToolInstanceContainerProps {
  tool: ToolInstance
  isSelected: boolean
  onEditClick: (tool: ToolInstance) => void
  onRemoveClick: (tool: ToolInstance) => void
  onMoveUpClick: (tool: ToolInstance) => void
  onMoveDownClick: (tool: ToolInstance) => void
}

const ToolInstanceContainer: React.FC<ToolInstanceContainerProps> = (props) => {
  const { tool } = props

  const handleEditClick = () => {
    props.onEditClick(tool)
  }

  const handleRemoveClick = () => {
    props.onRemoveClick(tool)
  }

  const handleMoveUpClick = () => {
    props.onMoveUpClick(tool)
  }

  const handleMoveDownClick = () => {
    props.onMoveDownClick(tool)
  }

  return <div className={`flex flex-col rounded pt-1 pb-2 pl-6 pr-6 ${props.isSelected ? 'bg-blue-100/50' : ''}`} >
    <div className="w-full flex flex-row" >
      <ToolControls
        className="flex-1"
        isSelected={props.isSelected}
        onEditClick={handleEditClick}
        onRemoveClick={handleRemoveClick}
        onMoveUpClick={handleMoveUpClick}
        onMoveDownClick={handleMoveDownClick}
      />
      {props.isSelected && <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 animate-ping"></div>}
    </div >
    {tool.render({ ...tool.options, name: tool.name })}
  </div >
}

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

export default ToolInstanceContainer