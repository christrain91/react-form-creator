import React from 'react'
import { FieldProps, FormStructure, Tool } from 'types/index'
import ToolContextProvider from 'context/ToolContext'
import { FormContextProvider } from 'context/FormContext'
import FormContent from './FormContent'

export interface FormRendererProps {
  className?: string
  tools: Tool<any>[]
  items: FormStructure['items']
  onSubmit: (data: Record<string, unknown>) => void
}

const FormRenderer = (props: FormRendererProps) => {
  const { tools, items, className, onSubmit } = props
  return (
    <ToolContextProvider
      tools={tools}
      initialValue={{ items }}
    >
      <FormContextProvider>
        <FormContent
          className={className}
          onSubmit={onSubmit}
        />
      </FormContextProvider>
    </ToolContextProvider>
  )
}

export default FormRenderer
