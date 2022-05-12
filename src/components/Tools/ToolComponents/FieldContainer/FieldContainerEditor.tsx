import React from 'react'
import ToolInstanceContainer from 'components/FormEditor/components/ToolInstanceContainer'
import { FieldContainerProps } from '.'
import { getClassNameFromProps } from './util'
import { ToolInstanceChildrenDragWrapper } from '@pcs/react-form-creator-core'

const FieldContainerEditor = (props: FieldContainerProps) => {
  const { toolInstance } = props

  const className = `${getClassNameFromProps(props)} border-2 min-h-64 rounded`

  return (
    <ToolInstanceChildrenDragWrapper
      toolInstance={toolInstance}
      className={className}
    >
      <>
        {toolInstance.children.map((ti, index) => {
          return (
            <ToolInstanceContainer
              key={ti.name}
              toolInstance={ti}
              index={index}
            />
          )
        })}
      </>
    </ToolInstanceChildrenDragWrapper>
  )
}

export default FieldContainerEditor
