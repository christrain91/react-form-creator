import React from 'react'
import UploadButton from './UploadButton'
import FilePreview from './FilePreview'
import { useFormValue, ToolInstance } from '@pcs/react-form-creator-core'

interface FileViewProps {
  name: string
  toolInstance: ToolInstance<any>
  formComponent: React.FC<{
    toolInstance: ToolInstance<any>
    name: string
  }>
}

const FileView = (props: FileViewProps) => {
  const fileFieldName = `${props.name}.file`
  const fileValue = useFormValue(fileFieldName) as File | undefined

  const hasFile = !!fileValue
  const FormComponent = props.formComponent

  return (
    <div>
      {!hasFile && <UploadButton name={fileFieldName} />}
      {hasFile && (
        <div>
          <FilePreview file={fileValue as File} />
          <FormComponent
            name={props.name}
            toolInstance={props.toolInstance}
          />
        </div>
      )}
    </div>
  )
}

export default FileView
