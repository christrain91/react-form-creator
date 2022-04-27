import React from 'react'
import ToolContextProvider from '../../context/ToolContext'
import { Tool, ToolInstance, FormDefinition } from '../../types'
import FormEditorView from './components/FormEditorView'

interface FormEditorProps {
  tools: Tool<any>[],
  defaultToolInstances: ToolInstance<any>[],
  header: React.FC<{ onSave: (performSave: (data: Pick<FormDefinition, 'items'>) => FormDefinition) => void }>
  onSave: (form: FormDefinition) => void
}

const FormEditor = (props: FormEditorProps) => {
  const { tools, defaultToolInstances, header, onSave } = props

  return <ToolContextProvider tools={tools} defaultToolInstances={defaultToolInstances}>
    <FormEditorView header={header} onSave={onSave} />
  </ToolContextProvider>
}

export default FormEditor