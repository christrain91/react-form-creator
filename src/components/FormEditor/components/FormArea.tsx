import React, { useState } from 'react'
import { Paper, Button } from '@mui/material'
import ToolInstanceContainer from './ToolInstanceContainer'
import FormSubmitDataDialog from './FormSubmitDataDialog'
import { Form, useTools } from '@pcs/react-form-creator-core'

const FormArea = () => {
  const [showSubmitData, setShowSubmitData] = useState(false)
  const [submitData, setSubmitData] = useState<Record<string, unknown> | null>(
    null
  )
  const { toolInstances } = useTools()

  const onSubmit = (data: Record<string, unknown>) => {
    setSubmitData(data)
    setShowSubmitData(true)
  }

  return (
    <Paper
      elevation={2}
      className="p-6 flex-1 h-full overflow-y-auto flex justify-center"
    >
      <FormSubmitDataDialog
        title="Form submitted with data:"
        data={submitData}
        open={showSubmitData}
        onClose={() => setShowSubmitData(false)}
      />
      <Form
        className="flex-1 w-full max-w-2xl flex flex-col"
        onSubmit={onSubmit}
      >
        {toolInstances.map((toolInstance, index) => (
          <ToolInstanceContainer
            key={toolInstance.name}
            toolInstance={toolInstance}
            index={index}
          />
        ))}
        {submitButton}
      </Form>
    </Paper>
  )
}

const submitButton = (
  <div className="text-center">
    <Button
      variant="contained"
      color="primary"
      type="submit"
    >
      Submit
    </Button>
  </div>
)

export default FormArea
