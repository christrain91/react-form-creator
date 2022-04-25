
import React from 'react'
import { Tool, ToolInstance } from '../../../types'
import { useState } from 'react'
import ToolNameDialog from './ToolNameDialog'

interface ToolboxProps {
  className?: string
  onAddTool: (tool: ToolInstance) => true | string
  tools: Tool[]
}

const Toolbox = (props: ToolboxProps) => {
  const [pendingTool, setPendingTool] = useState<Tool | null>(null)

  const onToolClick = (tool: Tool) => {
    setPendingTool(tool)
  }

  return <>
    {<ToolNameDialog tool={pendingTool} onAdd={props.onAddTool} onClose={() => setPendingTool(null)} />}
    <div className={`${props.className} flex flex-wrap gap-x-2 gap-y-3 justify-center content-start`}>
      {props.tools.map(tool => (
        <div key={tool.tool_type} onClick={() => onToolClick(tool)} className="bg-slate-100 h-32 w-48 p-6 rounded flex text-center cursor-pointer flex-col gap-y-2 items-center justify-center align-middle">
          {tool.icon}
          {tool.title}
        </div>
      ))}
    </div>
  </>
}

export default Toolbox