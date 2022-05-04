import React, { useMemo } from 'react'
import { useTools } from 'context/ToolContext'
import getToolInstanceByName from 'utils/getToolInstanceByName'
import { FieldContainerProps } from '.'
import { getClassNameFromProps } from './util'

const FieldContainer = (props: FieldContainerProps) => {
  const { name } = props
  const { toolInstances } = useTools()

  const toolInstance = useMemo(
    () => getToolInstanceByName(name, toolInstances),
    [name, toolInstances]
  )

  const className = getClassNameFromProps(props)

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
