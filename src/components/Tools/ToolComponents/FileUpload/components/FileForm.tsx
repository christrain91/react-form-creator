import React from 'react'
import {
  ToolInstanceRenderer,
  ToolInstance
} from '@pcs/react-form-creator-core'

interface FileFormProps {
  name: string
  toolInstance: ToolInstance<any>
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
