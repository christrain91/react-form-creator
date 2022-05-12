import React from 'react'
import ToolItem from './components/ToolItem'
import { useTools, ToolboxItemWrapper } from '@pcs/react-form-creator-core'

interface ToolboxProps {
  className?: string
}

const Toolbox = (props: ToolboxProps) => {
  const { tools, createToolInstance } = useTools()

  return (
    <div
      className={`${
        props.className || ''
      } flex flex-wrap gap-x-2 gap-y-3 pt-6 justify-center content-start`}
    >
      {tools.map((tool) => {
        return (
          <ToolboxItemWrapper
            key={tool.toolType}
            tool={tool}
            isDraggingClassName="border-2 border-double border-gray-200 select-none"
          >
            <ToolItem
              tool={tool}
              onClick={() => createToolInstance({ tool })}
            />
          </ToolboxItemWrapper>
        )
      })}
    </div>
  )
}

export default Toolbox
