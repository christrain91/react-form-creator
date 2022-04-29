import React from 'react'
import { useDraggable } from '@dnd-kit/core'

interface DraggableProps {
  id: string
  element?: HTMLElement
  children: React.ReactElement
  data?: Record<string, unknown>
}

const Draggable = (props: DraggableProps) => {
  const Element = 'div'
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
    data: props.data
  })

  return (
    <Element
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </Element>
  )
}

export default Draggable
