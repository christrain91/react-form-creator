import React from 'react'
import { useDraggable } from '@dnd-kit/core'

interface DraggableProps {
  id: string
  children: React.ReactElement
  data?: Record<string, unknown>
}

const Draggable = (props: DraggableProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: props.id,
    data: props.data
  })

  return (
    <div
      className={`${
        isDragging ? 'border-4 border-dashed border-gray-200' : ''
      }`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  )
}

export default Draggable
