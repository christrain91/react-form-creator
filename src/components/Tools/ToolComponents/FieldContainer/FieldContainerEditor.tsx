import React from 'react'
import { useDroppable, DragEndEvent, useDndMonitor } from '@dnd-kit/core'
import { useTools } from '../../../../context/ToolContext'
import { FieldContainerProps } from './FieldContainer'
import ToolInstanceContainer from '../../../FormEditor/components/ToolInstanceContainer'

const FieldContainer = (props: FieldContainerProps) => {
  const { createToolInstance, tools, toolInstances } = useTools()

  const flexDirection = props.orientation === 'vertical' ? 'flex-col' : 'flex-row'

  const childToolInstances = toolInstances.filter(ti => ti.parent === props.name)

  const { setNodeRef, isOver } = useDroppable({
    id: props.name,
  })

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      if (event.over?.id !== props.name) {
        return
      }

      const isTool = event.active.data.current?.type === 'tool'

      if (!isTool) return

      const tool = tools.find(t => t.toolType === event.active.id)

      if (!tool) return

      createToolInstance(tool, undefined, props.name)
    }
  })

  const className = `flex p-24 border-2 ${flexDirection} gap-y-2 gap-x-2 items-center justify-center align-middle ${isOver ? 'bg-red-500' : ''}`

  return <div ref={setNodeRef} className={className}>
    {childToolInstances.map((ti, index) => {
      return <ToolInstanceContainer key={ti.name} toolInstance={ti} index={index} />
    })}
  </div>

}

export default FieldContainer