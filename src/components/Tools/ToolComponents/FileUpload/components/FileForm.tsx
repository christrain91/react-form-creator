import ToolInstanceRenderer from 'components/ToolInstanceRenderer'
import React from 'react'
import { FieldProps, ToolInstance } from 'types/index'

interface FileFormProps {
  name: string
  toolInstance: ToolInstance<FieldProps>
  className?: string
}

const FileForm = (props: FileFormProps) => {
  const children = props.toolInstance.children || []

  return (
    <div className={`flex flex-col ${props.className || ''}`}>
      {children.map((childToolInstance) => (
        <ToolInstanceRenderer
          name={`${props.name}.${childToolInstance.name}`}
          key={childToolInstance.name}
          toolInstance={childToolInstance}
        />
      ))}
    </div>
  )
}

export default FileForm
