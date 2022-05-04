import React, { useRef, useEffect } from 'react'
import Button from '@mui/material/Button'
import { UseFormRegisterReturn } from 'react-hook-form'
import { omit } from 'lodash'

interface UploadButtonProps {
  name: string
  fieldProps: UseFormRegisterReturn
}

const UploadButton = (props: UploadButtonProps) => {
  const { fieldProps } = props
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fieldProps.ref(fileInputRef.current)
  }, [fileInputRef.current])

  const onUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return <div>
    <input className="hidden" ref={fileInputRef} {...omit(fieldProps, 'ref')} type="file" />
    <Button onClick={onUploadButtonClick}>Upload File</Button>
  </div>
}

export default UploadButton
