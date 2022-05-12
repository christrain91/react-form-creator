import React, { useRef, useEffect } from 'react'
import Button from '@mui/material/Button'
import { Controller } from 'react-hook-form'
import { useFormControl } from '@pcs/react-form-creator-core'

interface ControlledUploadButton {
  name: string
}

const ControlledUploadButton = (props: ControlledUploadButton) => {
  const control = useFormControl()
  return <Controller
    render={({ field }) => <UploadButton {...field} />}
    control={control}
    name={props.name}
    defaultValue={null}
  />
}

const UploadButton = (props: { value: File | null, onChange: (file: File) => void, onBlur: () => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const onUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      props.onChange(e.target.files[0])
    }
  }

  return <>
    <input
      className="hidden"
      ref={fileInputRef}
      onChange={handleChange}
      onBlur={props.onBlur}
      type="file"
    />
    <Button onClick={onUploadButtonClick}>Upload File</Button>
  </>
}

export default ControlledUploadButton
