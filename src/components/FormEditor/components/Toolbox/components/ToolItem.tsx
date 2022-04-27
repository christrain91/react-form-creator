import React from 'react'
import { Tool } from '../../../../../types'

interface ToolItemProps {
  tool: Tool<any>
  onClick?: () => void
}

const ToolItem = (props: ToolItemProps) => {
  const { onClick, tool } = props

  return <div
    onClick={onClick}
    className="bg-slate-100 hover:bg-slate-200 w-40 h-24 p-6 rounded flex text-center cursor-pointer flex-col gap-y-2 items-center justify-center align-middle"
  >
    {tool.icon}
    {tool.title}
  </div>
}

export default ToolItem