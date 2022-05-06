import React, { useMemo } from 'react'
import Typography from '@mui/material/Typography'

interface FilePreviewProps {
  file: FileList
  className?: string
}

const FilePreview = (props: FilePreviewProps) => {
  const file = props.file[0]
  const fileUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file]
  )

  if (!file || !fileUrl) return null
  return (
    <div className={`${props.className || ''} text-center`}>
      <div className="h-40 w-full flex flex-col justify-center items-center align-middle">
        <img
          className="w-auto h-auto max-w-full max-h-full"
          src={fileUrl}
          alt="preview_thumbnail"
        />
      </div>
      <Typography variant="caption">{file.name}</Typography>
    </div>
  )
}

export default FilePreview
