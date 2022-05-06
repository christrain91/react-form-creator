import React from 'react'
import { ToolInstance } from 'types/index'
import ToolInstanceContainer from 'components/FormEditor/components/ToolInstanceContainer'
import ToolInstanceChildrenDragWrapper from 'components/FormEditor/components/Drag/ToolInstanceChildrenDragWrapper'

interface FileFormProps {
  name: string
  toolInstance: ToolInstance<any>
  className?: string
}

const FileForm = (props: FileFormProps) => {
  const { toolInstance } = props

  return (
    <ToolInstanceChildrenDragWrapper
      toolInstance={toolInstance}
      id={props.name}
      className={`flex flex-col border-2 p-3 pt-6 pb-6 ${
        props.className || ''
      }`}
    >
      <>
        {toolInstance.children.map((childToolInstance, index) => (
          <ToolInstanceContainer
            index={index}
            name={`${props.name}.${childToolInstance.name}`}
            key={childToolInstance.name}
            toolInstance={childToolInstance}
          />
        ))}
      </>
    </ToolInstanceChildrenDragWrapper>
  )
}

export default FileForm
