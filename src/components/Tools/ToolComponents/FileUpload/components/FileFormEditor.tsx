import React from 'react'
import { ToolInstance } from 'types/index'
import ToolInstanceContainer from 'components/FormEditor/components/ToolInstanceContainer'
import { useDroppable, useDndMonitor, DragEndEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable'
import { useTools } from 'context/ToolContext';
import getToolInstanceByName from 'utils/getToolInstanceByName';

interface FileFormProps {
  name: string
  toolInstance: ToolInstance<any>
  className?: string
}

const FileForm = (props: FileFormProps) => {
  const { toolInstance } = props
  const childToolInstances = props.toolInstance.children || []

  const { setNodeRef, isOver } = useDroppable({
    id: props.name
  })

  const {
    createToolInstance,
    tools,
    toolInstances,
    removeToolInstance,
    updateToolInstance
  } = useTools()

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const isOverThis = event.over?.id === props.name
      const isDraggingSelf = event.active.id === props.name

      if (!isOverThis || isDraggingSelf) {
        return
      }

      const isTool = event.active.data.current?.type === 'tool'

      if (isTool) {
        const toolType = event.active.id
        const tool = tools.find((t) => t.toolType === toolType)
        if (!tool) return
        createToolInstance(tool, undefined, props.name)
      } else {
        const name = event.active.id
        const movedToolInstance = getToolInstanceByName(name, toolInstances)

        // If the moved tool instance is a child of this field container, then don't move it
        if (movedToolInstance.parent === props.name) {
          return
        }

        removeToolInstance(movedToolInstance)

        updateToolInstance({
          ...toolInstance,
          children: [
            ...toolInstance.children,
            { ...movedToolInstance, parent: toolInstance.name }
          ]
        })
      }
    }
  })

  return <div ref={setNodeRef} className={`flex flex-col ${props.className || ''} ${isOver ? 'bg-slate-100' : ''}`}>
    <SortableContext items={childToolInstances.map((ti) => ti.name)}>
      {childToolInstances.map((childToolInstance, index) => (
        <ToolInstanceContainer
          index={index}
          name={`${props.name}.${childToolInstance.name}`}
          key={childToolInstance.name}
          toolInstance={childToolInstance}
        />
      ))}
    </SortableContext>
  </div>
}

export default FileForm