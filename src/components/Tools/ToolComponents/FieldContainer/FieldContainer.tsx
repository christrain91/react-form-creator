import React, { useMemo } from 'react'
import { FieldContainerProps } from '.'
import { getClassNameFromProps } from './util'
import { useTools, getToolInstanceByName } from '@pcs/react-form-creator-core'

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
