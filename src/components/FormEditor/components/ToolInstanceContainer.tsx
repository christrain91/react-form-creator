import React from 'react'
import { ToolInstance } from 'types/index'
import { useSortable } from '@dnd-kit/sortable'
import ToolControls from './ToolControls'
import { useTools } from 'context/ToolContext'
import ToolRenderer from 'components/ToolInstanceRenderer'

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

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: toolInstance.name
  })

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

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex flex-col rounded cursor-move pt-1 pb-2 pl-6 pr-6 mb-1 bg-slate-50 ${
        isSelected ? 'bg-blue-100/80' : ''
      } ${isDragging ? 'bg-white shadow-2xl z-40' : ''}`}
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
      <ToolRenderer
        editMode
        name={props.name}
        toolInstance={toolInstance}
      />
    </div>
  )
}

export default ToolInstanceContainer
