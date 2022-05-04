import React, { useMemo } from 'react'
import Typography from '@mui/material/Typography';

interface FilePreviewProps {
  file: FileList
  className?: string
}

const FilePreview = (props: FilePreviewProps) => {
  const file = props.file[0]

  const fileUrl = useMemo(() => URL.createObjectURL(file), [])

  if (!file) return null
  return <div className={`text-center ${props.className || ''}`}>
    <div className="w-full h-40 flex justify-center align-middle">
      <img className="max-w-full max-h-full" src={fileUrl} alt="preview_thumbnail" />
    </div>
    <Typography variant='caption'>{file.name}</Typography>
  </div>
}

export default FilePreview