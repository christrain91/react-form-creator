import React from 'react'
import { Tool, FieldProps } from 'types'
import ToolItem from './components/ToolItem'
import Draggable from 'components/Drag/Draggable'
import { DragOverlay } from '@dnd-kit/core'
import { useTools } from 'context/ToolContext'

interface ToolboxProps {
  className?: string
  activeDraggingTool?: Tool<FieldProps>
}

const Toolbox = (props: ToolboxProps) => {
  const { activeDraggingTool } = props
  const { tools, createToolInstance } = useTools()

  return (
    <div
      className={`${props.className || ''} flex flex-wrap gap-x-2 gap-y-3 pt-6 justify-center content-start`}
    >
      <DragOverlay>
        {activeDraggingTool ? <ToolItem tool={activeDraggingTool} /> : null}
      </DragOverlay>
      {tools.map((tool) => {
        return (
          <React.Fragment key={tool.toolType}>
            <Draggable
              id={tool.toolType}
              data={{ type: 'tool' }}
            >
              <ToolItem
                tool={tool}
                onClick={() => createToolInstance({ tool })}
              />
            </Draggable>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Toolbox
