import React, { useMemo } from 'react'
import { useTools } from '../../../../context/ToolContext'
import { FieldProps } from '../../../../types'
import getToolInstanceByName from '../../../../utils/getToolInstanceByName'

export interface FieldContainerProps extends FieldProps {
  orientation: 'horizontal' | 'vertical'
}

const FieldContainer = (props: FieldContainerProps) => {
  const { name } = props
  const { toolInstances } = useTools()

  const toolInstance = useMemo(
    () => getToolInstanceByName(name, toolInstances),
    [name, toolInstances]
  )

  const flexDirection =
    props.orientation === 'vertical' ? 'flex-col' : 'flex-row'
  const className = `flex p-6 ${flexDirection} gap-y-2 gap-x-2 items-center justify-center align-middle`

  return (
    <div className={className}>
      {toolInstance.children.map((ti) => {
        const Component = ti.component
        return (
          <Component
            key={ti.name}
            {...ti.options}
            name={ti.name}
          />
        )
      })}
    </div>
  )
}

export default FieldContainer
