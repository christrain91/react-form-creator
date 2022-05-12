import React from 'react'
import {
  Form,
  ToolInstanceRenderer,
  FormStructure,
  Tool,
  useTools
} from '@pcs/react-form-creator-core'
import ContextProvider from 'components/ContextProvider'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

export interface FormRendererProps {
  className?: string
  tools: Tool<any>[]
  items: FormStructure['items']
  onSubmit: (data: Record<string, unknown>) => void
}

const FormRendererWrapped = (props: FormRendererProps) => {
  const { tools, items, className, onSubmit } = props
  return (
    <ContextProvider
      tools={tools}
      initialValue={{ items }}
    >
      <FormRenderer
        className={className}
        onSubmit={onSubmit}
      />
    </ContextProvider>
  )
}

const FormRenderer = (
  props: Pick<FormRendererProps, 'className' | 'onSubmit'>
) => {
  const { toolInstances } = useTools()
  return (
    <Form
      onSubmit={props.onSubmit}
      className={props.className}
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
    </Form>
  )
}

export default FormRendererWrapped
