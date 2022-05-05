import React from 'react'
import useRegisterField from 'hooks/useRegisterField'
import UploadButton from './UploadButton'
import useFormValue from 'hooks/useFormValue'
import FilePreview from './FilePreview'
import { FieldProps, ToolInstance } from 'types/index'

interface FileViewProps {
  name: string
  toolInstance: ToolInstance<FieldProps>
  formComponent: React.FC<{
    toolInstance: ToolInstance<FieldProps>
    name: string
  }>
}

const FileView = (props: FileViewProps) => {
  const fileFieldName = `${props.name}.file`
  const fieldProps = useRegisterField(fileFieldName)
  const fileValue = (useFormValue(fileFieldName) as FileList | undefined) || { length: 0 }

  const hasFile = fileValue.length > 0

  const FormComponent = props.formComponent

  return (
    <div>
      {!hasFile && (
        <UploadButton
          name={fileFieldName}
          fieldProps={fieldProps}
        />
      )}
      {hasFile && (
        <div>
          <FilePreview file={fileValue as FileList} />
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
