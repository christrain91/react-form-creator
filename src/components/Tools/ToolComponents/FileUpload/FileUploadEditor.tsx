import React from 'react'
import { FileUploadProps } from './FileUpload'
import useFileViewCount from './hooks/useFileViewCount'
import { times } from 'lodash'
import FileView from './components/FileView'
import FileFormEditor from './components/FileFormEditor'

const FileUploadEditor = (props: FileUploadProps) => {
  const fileViewCount = useFileViewCount(props.name)

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-4 w-full">
      {times(fileViewCount, (i) => (
        <FileView
          formComponent={FileFormEditor}
          key={i}
          name={`${props.name}[${i}]`}
          toolInstance={props.toolInstance}
        />
      ))}
    </div>
  )
}

export default FileUploadEditor
