import React from 'react'
import ToolContextProvider from 'context/ToolContext'
import { Tool, FormStructure } from '../../types'
import FormEditorView from './components/FormEditorView'
import { FormContextProvider } from 'context/FormContext'

export interface FormEditorProps<T extends FormStructure> {
  tools: Tool<any>[]
  initialValue: T
  header: React.FC<{
    onSave: (formatData: (data: Pick<T, 'items'>) => T) => void
    initialValue: T
  }>
  onSave: (form: T) => void
}

const FormEditor = <T extends FormStructure>(props: FormEditorProps<T>) => {
  const { tools, initialValue, header, onSave } = props

  return (
    <ToolContextProvider
      tools={tools}
      initialValue={initialValue}
    >
      <FormContextProvider>
        <FormEditorView
          header={header}
          initialValue={initialValue}
          onSave={onSave}
        />
      </FormContextProvider>
    </ToolContextProvider>
  )
}

export default FormEditor
