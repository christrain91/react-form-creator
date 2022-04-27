import React from 'react'
import { useTools } from '../../../../context/ToolContext'

export interface FieldContainerProps {
  name: string
  orientation: 'horizontal' | 'vertical'
}

const FieldContainer = (props: FieldContainerProps) => {
  const { toolInstances } = useTools()

  const childToolInstances = toolInstances.filter(ti => ti.parent === props.name)

  const flexDirection = props.orientation === 'vertical' ? 'flex-col' : 'flex-row'
  const className = `flex p-24 border-2 ${flexDirection} gap-y-2 gap-x-2 items-center justify-center align-middle`

  return <div className={className}>
    {childToolInstances.map(ti => {
      const Component = ti.component
      return <Component key={ti.name} name={ti.name} {...ti.options} />
    })}
  </div>
}

export default FieldContainer