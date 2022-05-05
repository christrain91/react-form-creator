import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { ToolInstance, FieldProps } from 'types'
import { SortableContext } from '@dnd-kit/sortable'
import useToolInstanceChildrenDndMonitor from './hooks/useToolInstanceChildrenDndMonitor'

interface ToolInstanceChildrenDragWrapperProps {
  children: React.ReactElement
  toolInstance: ToolInstance<FieldProps>
  id?: string
  className?: string
}

const ToolInstanceChildrenDragWrapper = (
  props: ToolInstanceChildrenDragWrapperProps
) => {
  const { toolInstance, className } = props

  const droppableId = props.id || toolInstance.name

  const { setNodeRef, isOver } = useDroppable({
    id: droppableId
  })

  useToolInstanceChildrenDndMonitor({ toolInstance, droppableId })

  return (
    <div
      ref={setNodeRef}
      className={`${className || ''} ${isOver ? 'bg-slate-100' : ''}`}
    >
      <SortableContext items={toolInstance.children.map((ti) => ti.name)}>
        {props.children}
      </SortableContext>
    </div>
  )
}

export default ToolInstanceChildrenDragWrapper
