import React, { useMemo, useState } from 'react'
import Typography from '@mui/material/Typography'
import UploadFileIcon from '@mui/icons-material/UploadFile'

interface FilePreviewProps {
  file: File
  className?: string
}

const FilePreview = (props: FilePreviewProps) => {
  const [loaded, setLoaded] = useState(false)
  const file = props.file
  const fileUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file]
  )

  if (!file || !fileUrl) return null
  return (
    <div className={`${props.className || ''} text-center`}>
      {loaded}
      <div className="h-40 w-full flex flex-col justify-center items-center align-middle">
        {!loaded && <UploadFileIcon sx={{ fontSize: 100 }} />}
        <img
          className={`w-auto h-auto max-w-full max-h-full ${
            !loaded ? 'hidden' : ''
          }`}
          src={fileUrl}
          alt="preview_thumbnail"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <Typography variant="caption">{file.name}</Typography>
    </div>
  )
}

export default FilePreview
