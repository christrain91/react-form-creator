import React from 'react'
import useFormSubmit from 'hooks/useFormSubmit'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { useTools } from 'context/ToolContext'
import ToolInstanceRenderer from 'components/ToolInstanceRenderer'

interface FormContentProps {
  className?: string
  onSubmit: (data: Record<string, unknown>) => void
}

const FormContent = (props: FormContentProps) => {
  const { className, onSubmit } = props
  const { toolInstances } = useTools()
  const submitHandler = useFormSubmit(onSubmit)

  return (
    <form
      onSubmit={submitHandler}
      className={className || ''}
    >
      <Paper
        elevation={2}
        className="p-6 h-full overflow-y-auto flex justify-center"
      >
        <div className="w-full max-w-2xl flex flex-col gap-y-6">
          {toolInstances.map((toolInstance) => (
            <ToolInstanceRenderer
              key={toolInstance.name}
              toolInstance={toolInstance}
            />
          ))}
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </div>
      </Paper>
    </form>
  )
}

export default FormContent
