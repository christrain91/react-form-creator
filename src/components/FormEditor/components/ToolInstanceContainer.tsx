import React from 'react'
import ToolControls from './ToolControls'
import {
  ToolInstance,
  ToolInstanceRenderer,
  ToolInstanceDraggableWrapper,
  useTools
} from '@pcs/react-form-creator-core'

interface ToolInstanceContainerProps {
  index: number
  toolInstance: ToolInstance<any>
  name?: string
}

const ToolInstanceContainer: React.FC<ToolInstanceContainerProps> = (props) => {
  const { toolInstance, index } = props

  const {
    moveToolInstance,
    selectToolInstance,
    clearSelectedToolInstance,
    removeToolInstance,
    selectedToolInstance
  } = useTools()

  const isSelected = toolInstance.name === selectedToolInstance?.name

  const handleMoveUpClick = () => {
    moveToolInstance(toolInstance.name, index - 1)
  }

  const handleMoveDownClick = () => {
    moveToolInstance(toolInstance.name, index + 1)
  }

  const handleEditClick = () => {
    if (isSelected) {
      clearSelectedToolInstance()
    } else {
      selectToolInstance(toolInstance)
    }
  }

  const handleRemoveClick = () => {
    removeToolInstance(toolInstance)
  }

  return (
    <ToolInstanceDraggableWrapper
      toolInstance={toolInstance}
      className={`flex flex-col rounded cursor-move pt-1 pb-2 pl-6 pr-6 mb-1 bg-slate-50 ${
        isSelected ? 'bg-blue-100/80' : ''
      }`}
      isDraggingClassName="bg-white shadow-2xl z-40"
    >
      <div className="w-full flex flex-row">
        <ToolControls
          className="flex-1"
          isSelected={isSelected}
          onEditClick={handleEditClick}
          onRemoveClick={handleRemoveClick}
          onMoveUpClick={handleMoveUpClick}
          onMoveDownClick={handleMoveDownClick}
        />
        {isSelected && (
          <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 animate-ping"></div>
        )}
      </div>
      <ToolInstanceRenderer
        editMode
        name={props.name}
        toolInstance={toolInstance}
      />
    </ToolInstanceDraggableWrapper>
  )
}

export default ToolInstanceContainer
